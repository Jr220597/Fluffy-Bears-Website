import { TwitterPost, loadTwitterDataFromXlsx, XlsxTwitterData, normalizeXlsxToTwitterPost } from './twitter-utils';
import { TwitterPointsCalculator } from './twitter-points';
import * as path from 'path';
import * as fs from 'fs';

export class TwitterFileService {
  private static readonly JSON_FILE_PATH = path.join(process.cwd(), 'data', 'twitter-daily', 'fluffy-bears-tweets.json');
  private static readonly XLSX_FILE_PATH = path.join(process.cwd(), 'data', 'twitter-daily', 'fluffy-bears-tweets.xlsx');
  private static cachedData: TwitterPost[] | null = null;
  private static lastLoadTime: number = 0;
  private static lastJsonModTime: number = 0;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Load Twitter data from JSON file first, fallback to XLSX if needed
   */
  static async loadData(forceRefresh: boolean = false): Promise<TwitterPost[]> {
    const now = Date.now();
    
    // Check if JSON file was modified since last load
    const jsonModified = this.isJsonFileModified();
    
    // Return cached data if still fresh AND file wasn't modified
    if (!forceRefresh && !jsonModified && this.cachedData && (now - this.lastLoadTime) < this.CACHE_DURATION) {
      console.log('Returning cached data:', this.cachedData.length, 'tweets');
      return this.cachedData;
    }
    
    if (jsonModified) {
      console.log('JSON file was modified, forcing refresh...');
    }

    try {
      console.log('Loading Twitter data...');
      
      // Try JSON first
      if (fs.existsSync(this.JSON_FILE_PATH)) {
        console.log('Loading from JSON file:', this.JSON_FILE_PATH);
        const jsonData = JSON.parse(fs.readFileSync(this.JSON_FILE_PATH, 'utf8'));
        
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          // Check if this is already in TwitterPost format or needs conversion
          const firstItem = jsonData[0];
          if (firstItem.author && firstItem.metrics && firstItem.hashtags) {
            // Already in TwitterPost format
            this.cachedData = jsonData;
            console.log(`Loaded ${this.cachedData.length} tweets from JSON (TwitterPost format)`);
          } else {
            // Convert from XlsxTwitterData format
            this.cachedData = jsonData.map(normalizeXlsxToTwitterPost);
            console.log(`Loaded and converted ${this.cachedData.length} tweets from JSON`);
          }
          
          this.lastLoadTime = now;
          this.updateJsonModTime();
          return this.cachedData;
        }
      }
      
      // Fallback to XLSX if JSON doesn't exist or is empty
      console.log('JSON not available, trying XLSX...');
      this.cachedData = await loadTwitterDataFromXlsx(this.XLSX_FILE_PATH);
      this.lastLoadTime = now;
      
      console.log(`Loaded ${this.cachedData.length} tweets from XLSX`);
      return this.cachedData;
      
    } catch (error) {
      console.error('Error loading Twitter data:', error);
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
   * Force refresh cached data
   */
  static async refreshData(): Promise<TwitterPost[]> {
    return this.loadData(true);
  }

  /**
   * Check if JSON file was modified since last load
   */
  private static isJsonFileModified(): boolean {
    try {
      if (!fs.existsSync(this.JSON_FILE_PATH)) {
        return false;
      }
      
      const stats = fs.statSync(this.JSON_FILE_PATH);
      const currentModTime = stats.mtime.getTime();
      
      return currentModTime > this.lastJsonModTime;
    } catch (error) {
      console.error('Error checking JSON file modification time:', error);
      return true; // Force refresh on error
    }
  }

  /**
   * Update the stored modification time of JSON file
   */
  private static updateJsonModTime(): void {
    try {
      if (fs.existsSync(this.JSON_FILE_PATH)) {
        const stats = fs.statSync(this.JSON_FILE_PATH);
        this.lastJsonModTime = stats.mtime.getTime();
      }
    } catch (error) {
      console.error('Error updating JSON file modification time:', error);
    }
  }

  /**
   * Get file info for debugging
   */
  static getFileInfo() {
    const jsonExists = fs.existsSync(this.JSON_FILE_PATH);
    let jsonModTime = null;
    
    if (jsonExists) {
      try {
        const stats = fs.statSync(this.JSON_FILE_PATH);
        jsonModTime = stats.mtime;
      } catch (error) {
        console.error('Error getting JSON file stats:', error);
      }
    }

    return {
      jsonPath: this.JSON_FILE_PATH,
      xlsxPath: this.XLSX_FILE_PATH,
      jsonExists,
      xlsxExists: fs.existsSync(this.XLSX_FILE_PATH),
      workingDir: process.cwd(),
      jsonLastModified: jsonModTime,
      lastJsonModTime: this.lastJsonModTime,
      cachedDataCount: this.cachedData?.length || 0
    };
  }
}