import { TwloTwitterPost } from './apify-twitter';
import { TwitterPost } from './twitter-utils';

export interface PointsCalculation {
  basePoints: number;
  engagementBonus: number;
  qualityBonus: number;
  totalPoints: number;
  breakdown: {
    postType: string;
    hasMedia: boolean;
    hasHashtags: boolean;
    mentionsOfficial: boolean;
    engagementLevel: 'low' | 'medium' | 'high' | 'viral';
  };
}

export class TwitterPointsCalculator {
  
  // Calculate points for a tweet based on Twitter data (supports both TwloTwitterPost and TwitterPost)
  static calculateTweetPoints(tweet: TwloTwitterPost | TwitterPost): PointsCalculation {
    let basePoints = 0;
    let engagementBonus = 0;
    let qualityBonus = 0;

    // Base points by tweet type
    if (tweet.isRetweet) {
      basePoints = 10; // Retweet
    } else {
      basePoints = 25; // Original post
    }

    // Quality bonuses - handle both formats
    const hasMedia = (tweet.media && tweet.media.length > 0) || false;
    const hasHashtags = tweet.hashtags.length > 0;
    const mentionsOfficial = tweet.mentions.some(mention => 
      mention.toLowerCase().includes('fluffy_bearss') ||
      mention.toLowerCase().includes('@fluffy_bearss')
    ) || tweet.text.toLowerCase().includes('@fluffy_bearss') ||
       tweet.text.toLowerCase().includes('fluffy_bearss');
    const hasFluffyHashtags = tweet.hashtags.some(hashtag =>
      hashtag.toLowerCase().includes('fluffybears') ||
      hashtag.toLowerCase().includes('fluffy')
    );

    // Quality bonuses
    if (hasMedia) qualityBonus += 15;
    if (hasHashtags) qualityBonus += 10;
    if (mentionsOfficial) qualityBonus += 20;
    if (hasFluffyHashtags) qualityBonus += 15;

    // Engagement bonus calculation - handle both formats
    const { likes, retweets, replies, quotes } = tweet.metrics;
    const views = 'views' in tweet.metrics ? tweet.metrics.views : 0;
    const totalEngagement = likes + (retweets * 2) + (replies * 1.5) + (quotes * 1.8);

    let engagementLevel: 'low' | 'medium' | 'high' | 'viral';
    
    if (totalEngagement < 10) {
      engagementLevel = 'low';
      engagementBonus = Math.floor(totalEngagement * 0.5);
    } else if (totalEngagement < 50) {
      engagementLevel = 'medium';
      engagementBonus = Math.floor(totalEngagement * 0.8);
    } else if (totalEngagement < 200) {
      engagementLevel = 'high';
      engagementBonus = Math.floor(totalEngagement * 1.2);
    } else {
      engagementLevel = 'viral';
      engagementBonus = Math.floor(totalEngagement * 1.5);
      qualityBonus += 50; // Viral bonus
    }

    // Follower count multiplier (small bonus for larger accounts)
    const followerMultiplier = tweet.author.followers > 1000 ? 1.2 : 
                              tweet.author.followers > 10000 ? 1.5 : 1.0;
    
    engagementBonus = Math.floor(engagementBonus * followerMultiplier);

    // Cap maximum points
    const maxPoints = tweet.isRetweet ? 50 : 300;
    const totalPoints = Math.min(basePoints + engagementBonus + qualityBonus, maxPoints);

    return {
      basePoints,
      engagementBonus,
      qualityBonus,
      totalPoints,
      breakdown: {
        postType: tweet.isRetweet ? 'retweet' : 'original_post',
        hasMedia,
        hasHashtags: hasFluffyHashtags,
        mentionsOfficial,
        engagementLevel,
      },
    };
  }

  // Calculate points for user activity - supports both formats
  static calculateUserActivity(tweets: (TwloTwitterPost | TwitterPost)[]) {
    const userActivity: { [username: string]: {
      totalPoints: number;
      tweets: number;
      avgEngagement: number;
      bestTweet: TwloTwitterPost | null;
      breakdown: PointsCalculation[];
    }} = {};

    tweets.forEach(tweet => {
      const username = tweet.author.username;
      const calculation = this.calculateTweetPoints(tweet);

      if (!userActivity[username]) {
        userActivity[username] = {
          totalPoints: 0,
          tweets: 0,
          avgEngagement: 0,
          bestTweet: null,
          breakdown: [],
        };
      }

      const user = userActivity[username];
      user.totalPoints += calculation.totalPoints;
      user.tweets += 1;
      user.breakdown.push(calculation);

      // Update best tweet
      if (!user.bestTweet || calculation.totalPoints > this.calculateTweetPoints(user.bestTweet).totalPoints) {
        user.bestTweet = tweet;
      }

      // Calculate average engagement
      const totalEngagement = user.breakdown.reduce((sum, calc) => {
        const tweet = tweets.find(t => t.author.username === username);
        return sum + (tweet ? tweet.metrics.likes + tweet.metrics.retweets + tweet.metrics.replies : 0);
      }, 0);
      user.avgEngagement = Math.floor(totalEngagement / user.tweets);
    });

    return userActivity;
  }

  // Get leaderboard from user activity
  static generateLeaderboard(userActivity: ReturnType<typeof TwitterPointsCalculator.calculateUserActivity>) {
    return Object.entries(userActivity)
      .map(([username, data]) => ({
        username,
        totalPoints: data.totalPoints,
        tweets: data.tweets,
        avgEngagement: data.avgEngagement,
        bestTweet: data.bestTweet,
        pointsPerTweet: Math.floor(data.totalPoints / data.tweets),
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((user, index) => ({ ...user, rank: index + 1 }));
  }

  // Filter tweets by quality threshold - supports both formats
  static filterQualityTweets(tweets: (TwloTwitterPost | TwitterPost)[], minPoints: number = 30): (TwloTwitterPost | TwitterPost)[] {
    return tweets.filter(tweet => {
      const calculation = this.calculateTweetPoints(tweet);
      return calculation.totalPoints >= minPoints;
    });
  }

  // Get trending hashtags from tweets - supports both formats
  static getTrendingHashtags(tweets: (TwloTwitterPost | TwitterPost)[]): Array<{ hashtag: string; count: number; avgPoints: number }> {
    const hashtagStats: { [hashtag: string]: { count: number; totalPoints: number } } = {};

    tweets.forEach(tweet => {
      const points = this.calculateTweetPoints(tweet).totalPoints;
      tweet.hashtags.forEach(hashtag => {
        const tag = hashtag.toLowerCase();
        if (!hashtagStats[tag]) {
          hashtagStats[tag] = { count: 0, totalPoints: 0 };
        }
        hashtagStats[tag].count += 1;
        hashtagStats[tag].totalPoints += points;
      });
    });

    return Object.entries(hashtagStats)
      .map(([hashtag, stats]) => ({
        hashtag,
        count: stats.count,
        avgPoints: Math.floor(stats.totalPoints / stats.count),
      }))
      .filter(item => item.count >= 2) // Only hashtags used multiple times
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  // Calculate engagement rate - supports both formats
  static calculateEngagementRate(tweet: TwloTwitterPost | TwitterPost): number {
    const { likes, retweets, replies, quotes } = tweet.metrics;
    const totalEngagement = likes + retweets + replies + quotes;
    const followers = tweet.author.followers || 1;
    
    return Math.min((totalEngagement / followers) * 100, 100);
  }
}

export default TwitterPointsCalculator;