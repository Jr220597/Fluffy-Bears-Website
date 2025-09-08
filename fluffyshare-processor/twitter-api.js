import fetch from 'node-fetch';

export class TwitterApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.twitterapi.io';
    this.rateLimitRemaining = 100;
    this.rateLimitReset = 0;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    let lastError = null;
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Check rate limits
        if (this.rateLimitRemaining <= 0 && Date.now() < this.rateLimitReset) {
          const waitTime = this.rateLimitReset - Date.now();
          console.log(`⏳ Rate limited. Waiting ${waitTime}ms`);
          await this.sleep(waitTime);
        }

        const response = await fetch(url, {
          ...options,
          headers,
          timeout: 30000,
        });

        // Update rate limit info
        this.rateLimitRemaining = parseInt(response.headers.get('x-rate-limit-remaining') || '100');
        this.rateLimitReset = parseInt(response.headers.get('x-rate-limit-reset') || '0') * 1000;

        if (!response.ok) {
          if (response.status === 429) {
            const backoffTime = 1000 * Math.pow(2, attempt);
            console.log(`⏳ Rate limited (429). Backing off for ${backoffTime}ms`);
            await this.sleep(backoffTime);
            continue;
          }

          if (response.status >= 500) {
            const backoffTime = 1000 * Math.pow(2, attempt);
            await this.sleep(backoffTime);
            continue;
          }

          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return await response.json();

      } catch (error) {
        lastError = error;
        console.log(`❌ Request failed on attempt ${attempt + 1}:`, error.message);

        if (attempt < maxRetries - 1) {
          const backoffTime = 1000 * Math.pow(2, attempt);
          await this.sleep(backoffTime);
        }
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Search for tweets mentioning target account
   */
  async searchMentions(query = '@Fluffy_Bearss', maxResults = 100, nextToken = null) {
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

    return this.makeRequest(`/2/tweets/search/recent?${params}`);
  }

  /**
   * Get users by IDs in batch
   */
  async getUsersByIds(userIds) {
    if (userIds.length === 0) return { data: [] };
    
    const chunks = this.chunkArray(userIds, 100);
    const allUsers = [];

    for (const chunk of chunks) {
      const params = new URLSearchParams({
        ids: chunk.join(','),
        'user.fields': 'public_metrics,verified,created_at,profile_image_url,description',
      });

      const response = await this.makeRequest(`/2/users?${params}`);
      if (response.data) {
        allUsers.push(...response.data);
      }
    }

    return { data: allUsers };
  }

  /**
   * Classify tweet type
   */
  classifyTweetType(tweet) {
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
   * Check if tweet mentions target account
   */
  mentionsTarget(tweet, target = '@Fluffy_Bearss') {
    const mentions = tweet.entities?.mentions?.map(m => `@${m.username.toLowerCase()}`) || [];
    return mentions.includes(target.toLowerCase()) || 
           tweet.text.toLowerCase().includes(target.toLowerCase());
  }

  /**
   * Utility to chunk arrays
   */
  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Get rate limit status
   */
  getRateLimitInfo() {
    return {
      remaining: this.rateLimitRemaining,
      reset: this.rateLimitReset,
    };
  }
}