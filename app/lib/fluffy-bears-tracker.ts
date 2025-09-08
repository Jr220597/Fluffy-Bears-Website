import { ApifyTwitterService, TwloTwitterPost } from './apify-twitter';
import { TwitterPointsCalculator } from './twitter-points';

export class FluffyBearsTracker {
  
  // Get all Fluffy_Bearss profile activity
  static async getOfficialProfileActivity(maxTweets: number = 50): Promise<TwloTwitterPost[]> {
    return ApifyTwitterService.getUserTweets('Fluffy_Bearss', maxTweets);
  }

  // Get mentions and interactions with Fluffy_Bearss
  static async getFluffyBearsInteractions(hours: number = 24): Promise<{
    mentions: TwloTwitterPost[];
    replies: TwloTwitterPost[];
    retweets: TwloTwitterPost[];
    quotes: TwloTwitterPost[];
  }> {
    const tweets = await ApifyTwitterService.monitorFluffyBearsMentions(hours);
    
    const mentions = tweets.filter(tweet => 
      tweet.text.toLowerCase().includes('@fluffy_bearss') ||
      tweet.text.toLowerCase().includes('fluffy_bearss') ||
      tweet.mentions.some(mention => 
        mention.toLowerCase().includes('fluffy_bearss')
      )
    );

    const replies = tweets.filter(tweet => 
      tweet.text.toLowerCase().startsWith('@fluffy_bearss') ||
      tweet.text.toLowerCase().includes('replying to @fluffy_bearss')
    );

    const retweets = tweets.filter(tweet => 
      tweet.isRetweet && 
      (tweet.retweetedPost?.author?.username?.toLowerCase() === 'fluffy_bearss' ||
       tweet.text.toLowerCase().includes('fluffy_bearss'))
    );

    const quotes = tweets.filter(tweet => 
      tweet.metrics.quotes > 0 &&
      (tweet.text.toLowerCase().includes('fluffy_bearss') ||
       tweet.text.toLowerCase().includes('@fluffy_bearss'))
    );

    return { mentions, replies, retweets, quotes };
  }

  // Get community posts about Fluffy Bears
  static async getCommunityPosts(hours: number = 24): Promise<TwloTwitterPost[]> {
    const tweets = await ApifyTwitterService.searchTweets({
      searchTerms: [
        'Fluffy Bears NFT',
        '#FluffyBears',
        '#FluffyBearsNFT',
        'fluffy bears collection',
        'fluffy bears ethereum',
        'fluffy bears mint',
        'fluffy bear #NFT'
      ],
      maxTweets: 200,
      includeReplies: false,
      sinceDate: new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
    });

    // Filter out tweets from official account to get only community posts
    return tweets.filter(tweet => 
      tweet.author.username.toLowerCase() !== 'fluffy_bearss' &&
      ApifyTwitterService.isFluffyBearsRelated(tweet.text)
    );
  }

  // Get engagement analytics for Fluffy_Bearss profile
  static async getProfileEngagementAnalytics(): Promise<{
    totalTweets: number;
    totalEngagement: number;
    avgLikes: number;
    avgRetweets: number;
    avgReplies: number;
    topTweets: Array<TwloTwitterPost & { points: any; engagementRate: number }>;
  }> {
    const tweets = await this.getOfficialProfileActivity(100);
    
    const totalEngagement = tweets.reduce((sum, tweet) => 
      sum + tweet.metrics.likes + tweet.metrics.retweets + tweet.metrics.replies, 0
    );

    const avgLikes = tweets.reduce((sum, tweet) => sum + tweet.metrics.likes, 0) / tweets.length;
    const avgRetweets = tweets.reduce((sum, tweet) => sum + tweet.metrics.retweets, 0) / tweets.length;
    const avgReplies = tweets.reduce((sum, tweet) => sum + tweet.metrics.replies, 0) / tweets.length;

    const topTweets = tweets
      .map(tweet => ({
        ...tweet,
        points: TwitterPointsCalculator.calculateTweetPoints(tweet),
        engagementRate: TwitterPointsCalculator.calculateEngagementRate(tweet)
      }))
      .sort((a, b) => (b.metrics.likes + b.metrics.retweets + b.metrics.replies) - 
                      (a.metrics.likes + a.metrics.retweets + a.metrics.replies))
      .slice(0, 10);

    return {
      totalTweets: tweets.length,
      totalEngagement,
      avgLikes: Math.round(avgLikes),
      avgRetweets: Math.round(avgRetweets), 
      avgReplies: Math.round(avgReplies),
      topTweets
    };
  }

  // Get users who interact most with Fluffy_Bearss
  static async getTopCommunityMembers(hours: number = 168): Promise<Array<{
    username: string;
    interactions: number;
    mentions: number;
    replies: number;
    retweets: number;
    totalPoints: number;
  }>> {
    const interactions = await this.getFluffyBearsInteractions(hours);
    const allInteractionTweets = [
      ...interactions.mentions,
      ...interactions.replies, 
      ...interactions.retweets,
      ...interactions.quotes
    ];

    const userStats: { [username: string]: {
      interactions: number;
      mentions: number;
      replies: number;
      retweets: number;
      tweets: TwloTwitterPost[];
    }} = {};

    allInteractionTweets.forEach(tweet => {
      const username = tweet.author.username;
      if (!userStats[username]) {
        userStats[username] = {
          interactions: 0,
          mentions: 0,
          replies: 0,
          retweets: 0,
          tweets: []
        };
      }

      userStats[username].interactions++;
      userStats[username].tweets.push(tweet);

      if (interactions.mentions.includes(tweet)) userStats[username].mentions++;
      if (interactions.replies.includes(tweet)) userStats[username].replies++;
      if (interactions.retweets.includes(tweet)) userStats[username].retweets++;
    });

    return Object.entries(userStats)
      .map(([username, stats]) => ({
        username,
        interactions: stats.interactions,
        mentions: stats.mentions,
        replies: stats.replies,
        retweets: stats.retweets,
        totalPoints: stats.tweets.reduce((sum, tweet) => 
          sum + TwitterPointsCalculator.calculateTweetPoints(tweet).totalPoints, 0
        )
      }))
      .sort((a, b) => b.interactions - a.interactions)
      .slice(0, 20);
  }

  // Get trending content about Fluffy Bears
  static async getTrendingContent(hours: number = 24): Promise<{
    hashtags: Array<{ hashtag: string; count: number; avgPoints: number }>;
    mentions: Array<{ mention: string; count: number }>;
    keywords: Array<{ keyword: string; count: number }>;
  }> {
    const tweets = await ApifyTwitterService.monitorFluffyBearsMentions(hours);
    const fluffyTweets = tweets.filter(tweet => ApifyTwitterService.isFluffyBearsRelated(tweet.text));

    // Get trending hashtags
    const hashtags = TwitterPointsCalculator.getTrendingHashtags(fluffyTweets);

    // Get mention frequency
    const mentionCounts: { [mention: string]: number } = {};
    fluffyTweets.forEach(tweet => {
      tweet.mentions.forEach(mention => {
        const cleanMention = mention.toLowerCase();
        mentionCounts[cleanMention] = (mentionCounts[cleanMention] || 0) + 1;
      });
    });

    const mentions = Object.entries(mentionCounts)
      .map(([mention, count]) => ({ mention, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get keyword frequency
    const keywordCounts: { [keyword: string]: number } = {};
    const keywords = ['nft', 'mint', 'ethereum', 'collection', 'bears', 'fluffy', 'honey'];
    
    fluffyTweets.forEach(tweet => {
      const text = tweet.text.toLowerCase();
      keywords.forEach(keyword => {
        if (text.includes(keyword)) {
          keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        }
      });
    });

    const topKeywords = Object.entries(keywordCounts)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count);

    return { hashtags, mentions, keywords: topKeywords };
  }
}