import { TwloTwitterPost } from './apify-twitter';
import { TwitterCache } from './twitter-cache';

export class ApifyDirectService {
  private static readonly API_BASE = 'https://api.apify.com/v2';
  private static readonly TOKEN = process.env.APIFY_API_TOKEN;

  // Usar dados de uma run já executada
  static async getDatasetItems(datasetId: string): Promise<TwloTwitterPost[]> {
    try {
      const cacheKey = `dataset_${datasetId}`;
      
      // Check cache first
      const cachedData = await TwitterCache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      console.log(`Fetching dataset items from: ${datasetId}`);
      
      const response = await fetch(
        `${this.API_BASE}/datasets/${datasetId}/items?token=${this.TOKEN}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const items = await response.json();
      console.log(`Retrieved ${items.length} items from dataset`);

      // Transform data
      const transformedData = items.map((item: any) => ({
        id: item.tweet_id || item.id || item.tweetId || Math.random().toString(),
        url: item.url || `https://twitter.com/status/${item.tweet_id || item.id}`,
        text: item.text || item.full_text || item.fullText || '',
        author: {
          id: item.user_id || item.author?.id || item.user?.id || '',
          username: item.username || item.author?.userName || item.user?.screen_name || 'unknown',
          name: item.name || item.author?.name || item.user?.name || 'Unknown User',
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
      await TwitterCache.set(cacheKey, transformedData);
      
      return transformedData;

    } catch (error) {
      console.error('Error fetching dataset items:', error);
      throw error;
    }
  }

  // Monitor usando dataset existente
  static async monitorFluffyBearsMentions(datasetId?: string): Promise<TwloTwitterPost[]> {
    // Use um dataset ID padrão se não fornecido
    const defaultDatasetId = datasetId || 'e9N7PTX7LRlAiCVMn'; // Dataset ID do Fluffy Bears (106 resultados)
    return this.getDatasetItems(defaultDatasetId);
  }

  // Filtrar tweets para Fluffy Bears relacionados
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

  // Buscar tweets (usando dataset existente por enquanto)
  static async searchTweets(params: {
    searchTerms: string[];
    maxTweets?: number;
    useCache?: boolean;
    datasetId?: string;
  }): Promise<TwloTwitterPost[]> {
    const tweets = await this.monitorFluffyBearsMentions(params.datasetId);
    
    // Filter by search terms
    const filteredTweets = tweets.filter(tweet => 
      params.searchTerms.some(term => 
        tweet.text.toLowerCase().includes(term.toLowerCase()) ||
        tweet.author.username.toLowerCase().includes(term.toLowerCase())
      )
    );

    return params.maxTweets ? filteredTweets.slice(0, params.maxTweets) : filteredTweets;
  }

  // Get user tweets (filtrar por username do dataset)
  static async getUserTweets(username: string, maxTweets: number = 50, datasetId?: string): Promise<TwloTwitterPost[]> {
    const tweets = await this.monitorFluffyBearsMentions(datasetId);
    
    const userTweets = tweets.filter(tweet => 
      tweet.author.username.toLowerCase() === username.toLowerCase()
    );

    return userTweets.slice(0, maxTweets);
  }
}