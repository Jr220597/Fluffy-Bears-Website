import { TwitterPost, loadTwitterDataFromXlsx, extractUsernameFromUrl } from './twitter-utils';
import { TwitterPointsCalculator } from './twitter-points';
import * as path from 'path';

export class TwitterDataService {
  private static readonly XLSX_FILE_PATH = path.join(process.cwd(), 'data', 'twitter-daily', 'fluffy-bears-tweets.xlsx');
  private static cachedData: TwitterPost[] | null = null;
  private static lastLoadTime: number = 0;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Load Twitter data from XLSX file with caching
   */
  static async loadData(forceRefresh: boolean = false): Promise<TwitterPost[]> {
    const now = Date.now();
    
    // Return cached data if still fresh
    if (!forceRefresh && this.cachedData && (now - this.lastLoadTime) < this.CACHE_DURATION) {
      console.log('Returning cached data:', this.cachedData.length, 'tweets');
      return this.cachedData;
    }

    try {
      console.log('Loading Twitter data from XLSX file...', this.XLSX_FILE_PATH);
      console.log('Working directory:', process.cwd());
      
      const fs = require('fs');
      console.log('File exists check:', fs.existsSync(this.XLSX_FILE_PATH));
      
      this.cachedData = await loadTwitterDataFromXlsx(this.XLSX_FILE_PATH);
      this.lastLoadTime = now;
      
      console.log(`Loaded ${this.cachedData.length} tweets from XLSX`);
      return this.cachedData;
    } catch (error) {
      console.error('Error loading Twitter data from XLSX:', error);
      // Return empty array on error
      return [];
    }
  }

  /**
   * Get all tweets with points calculated
   */
  static async getTweetsWithPoints(): Promise<Array<TwitterPost & { points: number }>> {
    const tweets = await this.loadData();
    
    return tweets.map(tweet => ({
      ...tweet,
      points: TwitterPointsCalculator.calculateTweetPoints(tweet).totalPoints
    }));
  }

  /**
   * Get leaderboard data
   */
  static async getLeaderboard() {
    const tweets = await this.loadData();
    const userActivity = TwitterPointsCalculator.calculateUserActivity(tweets);
    return TwitterPointsCalculator.generateLeaderboard(userActivity);
  }

  /**
   * Get statistics about the data
   */
  static async getStatistics() {
    const tweets = await this.loadData();
    
    const totalTweets = tweets.length;
    const uniqueUsers = new Set(tweets.map(t => t.author.username)).size;
    const totalEngagement = tweets.reduce((sum, tweet) => 
      sum + tweet.metrics.likes + tweet.metrics.retweets + tweet.metrics.replies + tweet.metrics.quotes, 0
    );
    
    const fluffyMentions = tweets.filter(tweet => 
      tweet.text.toLowerCase().includes('@fluffy_bearss') ||
      tweet.text.toLowerCase().includes('fluffy_bearss') ||
      tweet.mentions.some(mention => mention.toLowerCase().includes('fluffy_bearss'))
    ).length;

    const hashtagUsage = TwitterPointsCalculator.getTrendingHashtags(tweets);
    
    // Calculate points distribution
    const tweetsWithPoints = tweets.map(tweet => ({
      tweet,
      points: TwitterPointsCalculator.calculateTweetPoints(tweet).totalPoints
    }));
    
    const totalPoints = tweetsWithPoints.reduce((sum, item) => sum + item.points, 0);
    const avgPoints = totalPoints / tweets.length;
    
    // Get top performing tweets
    const topTweets = tweetsWithPoints
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);

    return {
      totalTweets,
      uniqueUsers,
      totalEngagement,
      avgEngagement: Math.floor(totalEngagement / totalTweets),
      fluffyMentions,
      hashtagUsage,
      points: {
        total: totalPoints,
        average: Math.floor(avgPoints),
        distribution: {
          low: tweetsWithPoints.filter(t => t.points < 30).length,
          medium: tweetsWithPoints.filter(t => t.points >= 30 && t.points < 100).length,
          high: tweetsWithPoints.filter(t => t.points >= 100).length,
        }
      },
      topTweets: topTweets.map(item => ({
        ...item.tweet,
        points: item.points
      }))
    };
  }

  /**
   * Get tweets by specific user
   */
  static async getUserTweets(username: string): Promise<TwitterPost[]> {
    const tweets = await this.loadData();
    return tweets.filter(tweet => 
      tweet.author.username.toLowerCase() === username.toLowerCase()
    );
  }

  /**
   * Search tweets by text content
   */
  static async searchTweets(query: string): Promise<TwitterPost[]> {
    const tweets = await this.loadData();
    const queryLower = query.toLowerCase();
    
    return tweets.filter(tweet => 
      tweet.text.toLowerCase().includes(queryLower) ||
      tweet.hashtags.some(tag => tag.toLowerCase().includes(queryLower)) ||
      tweet.mentions.some(mention => mention.toLowerCase().includes(queryLower))
    );
  }

  /**
   * Get high engagement tweets
   */
  static async getHighEngagementTweets(minEngagement: number = 50): Promise<TwitterPost[]> {
    const tweets = await this.loadData();
    
    return tweets.filter(tweet => {
      const totalEngagement = tweet.metrics.likes + tweet.metrics.retweets + 
                            tweet.metrics.replies + tweet.metrics.quotes;
      return totalEngagement >= minEngagement;
    }).sort((a, b) => {
      const aEngagement = a.metrics.likes + a.metrics.retweets + a.metrics.replies + a.metrics.quotes;
      const bEngagement = b.metrics.likes + b.metrics.retweets + b.metrics.replies + b.metrics.quotes;
      return bEngagement - aEngagement;
    });
  }

  /**
   * Get recent tweets (last N hours)
   */
  static async getRecentTweets(hours: number = 24): Promise<TwitterPost[]> {
    const tweets = await this.loadData();
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    return tweets.filter(tweet => {
      const tweetDate = new Date(tweet.createdAt);
      return tweetDate >= cutoffTime;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Get user rankings with detailed stats
   */
  static async getUserRankings() {
    const tweets = await this.loadData();
    const userActivity = TwitterPointsCalculator.calculateUserActivity(tweets);
    
    return Object.entries(userActivity).map(([username, activity]) => {
      const userTweets = tweets.filter(t => t.author.username === username);
      const totalEngagement = userTweets.reduce((sum, tweet) => 
        sum + tweet.metrics.likes + tweet.metrics.retweets + tweet.metrics.replies + tweet.metrics.quotes, 0
      );
      
      return {
        username,
        totalPoints: activity.totalPoints,
        tweets: activity.tweets,
        avgEngagement: activity.avgEngagement,
        pointsPerTweet: Math.floor(activity.totalPoints / activity.tweets),
        totalEngagement,
        bestTweet: activity.bestTweet,
        lastActive: userTweets.length > 0 ? 
          Math.max(...userTweets.map(t => new Date(t.createdAt).getTime())) : 0
      };
    }).sort((a, b) => b.totalPoints - a.totalPoints);
  }

  /**
   * Validate and clean username from URL
   */
  static extractUsername(url: string): string | null {
    return extractUsernameFromUrl(url);
  }

  /**
   * Force refresh cached data
   */
  static async refreshData(): Promise<TwitterPost[]> {
    return this.loadData(true);
  }
}