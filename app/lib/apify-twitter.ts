import { ApifyClient } from 'apify-client';
import { TwitterCache } from './twitter-cache';

// Initialize Apify client
const apifyClient = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

export interface TwloTwitterPost {
  id: string;
  url: string;
  text: string;
  author: {
    id: string;
    username: string;
    name: string;
    followers: number;
    verified: boolean;
    profilePicture?: string;
  };
  createdAt: string;
  metrics: {
    likes: number;
    retweets: number;
    replies: number;
    quotes: number;
    views?: number;
  };
  media?: Array<{
    type: string;
    url: string;
  }>;
  hashtags: string[];
  mentions: string[];
  isRetweet: boolean;
  retweetedPost?: any;
}

export class ApifyTwitterService {
  
  // Search for tweets using Twlo Low scraper with caching
  static async searchTweets(params: {
    searchTerms: string[];
    maxTweets?: number;
    includeReplies?: boolean;
    onlyImages?: boolean;
    onlyVideos?: boolean;
    sinceDate?: string;
    untilDate?: string;
    useCache?: boolean;
  }): Promise<TwloTwitterPost[]> {
    try {
      // Create cache key from parameters
      const cacheKey = `search_${JSON.stringify(params).replace(/[^a-zA-Z0-9]/g, '_')}`;
      
      // Check cache first if enabled (default true)
      if (params.useCache !== false) {
        const cachedData = await TwitterCache.get(cacheKey);
        if (cachedData) {
          return cachedData;
        }
      }

      console.log('Starting Apify Twlo Low scraper with params:', params);

      const input = {
        searchTerms: params.searchTerms,
        maxTweets: params.maxTweets || 100,
        includeReplies: params.includeReplies || false,
        onlyImages: params.onlyImages || false,
        onlyVideos: params.onlyVideos || false,
        ...(params.sinceDate && { sinceDate: params.sinceDate }),
        ...(params.untilDate && { untilDate: params.untilDate }),
      };

      // Run the Twlo Low scraper
      const run = await apifyClient.actor('lhotanok/twitter-x-scraper').call(input);

      if (!run) {
        throw new Error('Failed to start Apify run');
      }

      // Get results from the dataset
      const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();

      console.log(`Retrieved ${items.length} tweets from Apify`);

      // Transform Apify data to our format
      const transformedData = items.map((item: any) => ({
        id: item.tweet_id || item.id || item.tweetId,
        url: item.url || `https://twitter.com/i/status/${item.tweet_id || item.id}`,
        text: item.text || item.full_text || item.fullText || '',
        author: {
          id: item.user_id || item.author?.id || item.user?.id || '',
          username: item.username || item.author?.userName || item.user?.screen_name || '',
          name: item.name || item.author?.name || item.user?.name || '',
          followers: item.author?.followers || item.user?.followers_count || 0,
          verified: item.author?.isVerified || item.user?.verified || false,
          profilePicture: item.author?.profilePicture || item.user?.profile_image_url,
        },
        createdAt: item.created_at || item.createdAt || new Date().toISOString(),
        metrics: {
          likes: item.like_count || item.likes || item.favorite_count || 0,
          retweets: item.retweet_count || item.retweets || 0,
          replies: item.reply_count || item.replies || 0,
          quotes: item.quote_count || item.quotes || 0,
          views: item.view_count || item.views,
        },
        media: item.media || [],
        hashtags: item.hashtags || [],
        mentions: item.mentions || [],
        isRetweet: item.isRetweet || false,
        retweetedPost: item.retweetedPost,
      }));

      // Cache the results
      if (params.useCache !== false) {
        await TwitterCache.set(cacheKey, transformedData);
      }

      return transformedData;

    } catch (error) {
      console.error('Error running Apify Twitter scraper:', error);
      throw error;
    }
  }

  // Search for tweets by specific user with caching
  static async getUserTweets(username: string, maxTweets: number = 50, useCache: boolean = true): Promise<TwloTwitterPost[]> {
    try {
      const cacheKey = `user_${username}_${maxTweets}`;
      
      // Check cache first if enabled
      if (useCache) {
        const cachedData = await TwitterCache.get(cacheKey);
        if (cachedData) {
          return cachedData;
        }
      }

      console.log(`Getting tweets for user: ${username}`);

      const input = {
        searchTerms: [`from:${username}`],
        maxTweets,
        includeReplies: false,
      };

      const run = await apifyClient.actor('lhotanok/twitter-x-scraper').call(input);
      const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();

      const transformedData = items.map((item: any) => ({
        id: item.id || item.tweetId,
        url: item.url || `https://twitter.com/${username}/status/${item.id}`,
        text: item.text || item.fullText || '',
        author: {
          id: item.author?.id || '',
          username: username,
          name: item.author?.name || '',
          followers: item.author?.followers || 0,
          verified: item.author?.isVerified || false,
          profilePicture: item.author?.profilePicture,
        },
        createdAt: item.createdAt || new Date().toISOString(),
        metrics: {
          likes: item.like_count || item.likes || 0,
          retweets: item.retweet_count || item.retweets || 0,
          replies: item.reply_count || item.replies || 0,
          quotes: item.quote_count || item.quotes || 0,
          views: item.view_count || item.views,
        },
        media: item.media || [],
        hashtags: item.hashtags || [],
        mentions: item.mentions || [],
        isRetweet: item.isRetweet || false,
        retweetedPost: item.retweetedPost,
      }));

      // Cache the results
      if (useCache) {
        await TwitterCache.set(cacheKey, transformedData);
      }

      return transformedData;

    } catch (error) {
      console.error(`Error getting tweets for user ${username}:`, error);
      throw error;
    }
  }

  // Monitor Fluffy Bears mentions with caching
  static async monitorFluffyBearsMentions(hours: number = 24, useCache: boolean = true): Promise<TwloTwitterPost[]> {
    const sinceDate = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    
    return this.searchTweets({
      searchTerms: [
        '@Fluffy_Bearss',
        'Fluffy_Bearss',
        'Fluffy Bears',
        '#FluffyBears',
        '#FluffyBearsNFT', 
        'fluffybears nft',
        'fluffy bears collection',
        'fluffy bears ethereum',
        'fluffy bears mint'
      ],
      maxTweets: 300,
      includeReplies: true,
      sinceDate,
      useCache,
    });
  }

  // Get tweets with high engagement with caching
  static async getHighEngagementTweets(searchTerms: string[], minLikes: number = 10, useCache: boolean = true): Promise<TwloTwitterPost[]> {
    const tweets = await this.searchTweets({
      searchTerms,
      maxTweets: 500,
      useCache,
    });

    // Filter by engagement
    return tweets.filter(tweet => 
      tweet.metrics.likes >= minLikes || 
      tweet.metrics.retweets >= Math.floor(minLikes / 2)
    );
  }

  // Validate if content is Fluffy Bears related
  static isFluffyBearsRelated(text: string): boolean {
    const keywords = [
      'fluffy bears',
      'fluffybears', 
      'fluffy bear',
      '#fluffybears',
      '@fluffy_bearss',
      'fluffy_bearss',
      'fluffy bears nft',
      'honey bears',
      'fluffy bears collection',
      'fluffy bears ethereum',
      'fluffy bears mint'
    ];

    const textLower = text.toLowerCase();
    return keywords.some(keyword => textLower.includes(keyword));
  }

  // Extract hashtags from text
  static extractHashtags(text: string): string[] {
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    return text.match(hashtagRegex) || [];
  }

  // Extract mentions from text
  static extractMentions(text: string): string[] {
    const mentionRegex = /@[a-zA-Z0-9_]+/g;
    return text.match(mentionRegex) || [];
  }
}

export default ApifyTwitterService;