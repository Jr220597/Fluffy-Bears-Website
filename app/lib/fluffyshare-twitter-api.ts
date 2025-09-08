interface TwitterApiConfig {
  apiKey: string;
  baseUrl: string;
  timeout: number;
  maxRetries: number;
  retryDelay: number;
}

interface PublicMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
  impression_count?: number;
}

interface TwitterUser {
  id: string;
  username: string;
  name: string;
  verified: boolean;
  created_at: string;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
  };
  profile_image_url?: string;
  description?: string;
}

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  public_metrics: PublicMetrics;
  referenced_tweets?: Array<{
    type: 'retweeted' | 'quoted' | 'replied_to';
    id: string;
  }>;
  entities?: {
    mentions?: Array<{
      username: string;
      id: string;
    }>;
    urls?: Array<{
      url: string;
      expanded_url: string;
    }>;
    hashtags?: Array<{
      tag: string;
    }>;
  };
}

interface TwitterApiResponse<T> {
  data?: T;
  meta?: {
    result_count?: number;
    next_token?: string;
  };
  errors?: Array<{
    detail: string;
    title: string;
    resource_type: string;
  }>;
}

export class FluffyshareTwitterApi {
  private config: TwitterApiConfig;
  private rateLimitRemaining: number = 0;
  private rateLimitReset: number = 0;

  constructor() {
    this.config = {
      apiKey: process.env.TWITTER_API_KEY || '',
      baseUrl: 'https://api.twitterapi.io',
      timeout: 30000,
      maxRetries: 3,
      retryDelay: 1000,
    };

    if (!this.config.apiKey) {
      throw new Error('TWITTER_API_KEY environment variable is required');
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<TwitterApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers = {
      'X-API-Key': this.config.apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.config.maxRetries; attempt++) {
      try {
        // Check rate limits before making request
        if (this.rateLimitRemaining <= 0 && Date.now() < this.rateLimitReset) {
          const waitTime = this.rateLimitReset - Date.now();
          console.log(`Rate limited. Waiting ${waitTime}ms`);
          await this.sleep(waitTime);
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          ...options,
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Update rate limit info from headers
        this.rateLimitRemaining = parseInt(response.headers.get('x-rate-limit-remaining') || '100');
        this.rateLimitReset = parseInt(response.headers.get('x-rate-limit-reset') || '0') * 1000;

        if (!response.ok) {
          if (response.status === 429) {
            // Rate limited - exponential backoff
            const backoffTime = this.config.retryDelay * Math.pow(2, attempt);
            console.log(`Rate limited (429). Backing off for ${backoffTime}ms`);
            await this.sleep(backoffTime);
            continue;
          }

          if (response.status >= 500) {
            // Server error - retry
            const backoffTime = this.config.retryDelay * Math.pow(2, attempt);
            await this.sleep(backoffTime);
            continue;
          }

          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data;

      } catch (error) {
        lastError = error as Error;
        
        if (error instanceof TypeError && error.message.includes('aborted')) {
          console.log(`Request timeout on attempt ${attempt + 1}`);
        } else {
          console.log(`Request failed on attempt ${attempt + 1}:`, error);
        }

        if (attempt < this.config.maxRetries - 1) {
          const backoffTime = this.config.retryDelay * Math.pow(2, attempt);
          await this.sleep(backoffTime);
        }
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Search for tweets mentioning @Fluffy_Bearss
   */
  async searchMentions(
    query: string = '@Fluffy_Bearss',
    maxResults: number = 100,
    nextToken?: string
  ): Promise<TwitterApiResponse<Tweet[]>> {
    const params = new URLSearchParams({
      query,
      max_results: maxResults.toString(),
      'tweet.fields': 'public_metrics,created_at,author_id,entities,referenced_tweets',
      'user.fields': 'public_metrics,verified,created_at,profile_image_url,description',
      expansions: 'author_id',
    });

    if (nextToken) {
      params.append('next_token', nextToken);
    }

    return this.makeRequest<Tweet[]>(`/2/tweets/search/recent?${params}`);
  }

  /**
   * Get user information by IDs in batch
   */
  async getUsersByIds(userIds: string[]): Promise<TwitterApiResponse<TwitterUser[]>> {
    if (userIds.length === 0) return { data: [] };
    
    // API supports up to 100 IDs per request
    const chunks = this.chunkArray(userIds, 100);
    const allUsers: TwitterUser[] = [];

    for (const chunk of chunks) {
      const params = new URLSearchParams({
        ids: chunk.join(','),
        'user.fields': 'public_metrics,verified,created_at,profile_image_url,description',
      });

      const response = await this.makeRequest<TwitterUser[]>(`/2/users?${params}`);
      if (response.data) {
        allUsers.push(...response.data);
      }
    }

    return { data: allUsers };
  }

  /**
   * Get user information by usernames in batch
   */
  async getUsersByUsernames(usernames: string[]): Promise<TwitterApiResponse<TwitterUser[]>> {
    if (usernames.length === 0) return { data: [] };
    
    const chunks = this.chunkArray(usernames, 100);
    const allUsers: TwitterUser[] = [];

    for (const chunk of chunks) {
      const params = new URLSearchParams({
        usernames: chunk.join(','),
        'user.fields': 'public_metrics,verified,created_at,profile_image_url,description',
      });

      const response = await this.makeRequest<TwitterUser[]>(`/2/users/by?${params}`);
      if (response.data) {
        allUsers.push(...response.data);
      }
    }

    return { data: allUsers };
  }

  /**
   * Get followers for a specific user (with pagination)
   * Note: This can be expensive for large accounts
   */
  async getUserFollowers(
    userId: string,
    maxResults: number = 1000,
    nextToken?: string
  ): Promise<TwitterApiResponse<TwitterUser[]>> {
    const params = new URLSearchParams({
      max_results: Math.min(maxResults, 1000).toString(),
      'user.fields': 'public_metrics,verified,created_at',
    });

    if (nextToken) {
      params.append('pagination_token', nextToken);
    }

    return this.makeRequest<TwitterUser[]>(`/2/users/${userId}/followers?${params}`);
  }

  /**
   * Get tweet details by IDs
   */
  async getTweetsByIds(tweetIds: string[]): Promise<TwitterApiResponse<Tweet[]>> {
    if (tweetIds.length === 0) return { data: [] };

    const chunks = this.chunkArray(tweetIds, 100);
    const allTweets: Tweet[] = [];

    for (const chunk of chunks) {
      const params = new URLSearchParams({
        ids: chunk.join(','),
        'tweet.fields': 'public_metrics,created_at,author_id,entities,referenced_tweets',
      });

      const response = await this.makeRequest<Tweet[]>(`/2/tweets?${params}`);
      if (response.data) {
        allTweets.push(...response.data);
      }
    }

    return { data: allTweets };
  }

  /**
   * Check if specific users follow a target user
   * This is a workaround since direct "is following" endpoint might not be available
   */
  async checkFollowingRelationships(
    sourceUserIds: string[],
    targetUserId: string
  ): Promise<{ [sourceUserId: string]: boolean }> {
    // This would need to be implemented based on available endpoints
    // For now, returning empty results
    const results: { [sourceUserId: string]: boolean } = {};
    sourceUserIds.forEach(id => {
      results[id] = false;
    });
    return results;
  }

  /**
   * Utility function to chunk arrays
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Get current rate limit status
   */
  getRateLimitInfo(): { remaining: number; reset: number } {
    return {
      remaining: this.rateLimitRemaining,
      reset: this.rateLimitReset,
    };
  }

  /**
   * Classify tweet type based on referenced_tweets
   */
  classifyTweetType(tweet: Tweet): 'original' | 'retweet' | 'quote' | 'reply' {
    if (!tweet.referenced_tweets || tweet.referenced_tweets.length === 0) {
      return 'original';
    }

    const hasRetweet = tweet.referenced_tweets.some(ref => ref.type === 'retweeted');
    if (hasRetweet) return 'retweet';

    const hasQuote = tweet.referenced_tweets.some(ref => ref.type === 'quoted');
    if (hasQuote) return 'quote';

    const hasReply = tweet.referenced_tweets.some(ref => ref.type === 'replied_to');
    if (hasReply) return 'reply';

    return 'original';
  }

  /**
   * Extract mentions from tweet
   */
  extractMentions(tweet: Tweet): string[] {
    if (!tweet.entities?.mentions) return [];
    return tweet.entities.mentions.map(mention => mention.username.toLowerCase());
  }

  /**
   * Check if tweet mentions @Fluffy_Bearss
   */
  mentionsFluffyBears(tweet: Tweet): boolean {
    const mentions = this.extractMentions(tweet);
    return mentions.includes('fluffy_bearss') || 
           tweet.text.toLowerCase().includes('@fluffy_bearss');
  }

  /**
   * Calculate estimated reach based on metrics
   */
  calculateEstimatedReach(tweet: Tweet, authorFollowersCount: number): number {
    const impressions = tweet.public_metrics.impression_count;
    if (impressions && impressions > 0) {
      return impressions;
    }

    // Estimate based on engagement and follower count
    const engagement = tweet.public_metrics.like_count + 
                      tweet.public_metrics.retweet_count + 
                      tweet.public_metrics.reply_count;
    
    // Rough estimate: 1-10% of followers see organic tweets
    const organicReach = Math.floor(authorFollowersCount * 0.05);
    
    // Add viral component based on retweets
    const viralReach = tweet.public_metrics.retweet_count * 50; // Estimate 50 additional views per RT
    
    return Math.max(organicReach + viralReach, engagement * 10);
  }
}

export const fluffyshareTwitterApi = new FluffyshareTwitterApi();