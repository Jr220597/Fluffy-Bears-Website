/**
 * Utility functions for Twitter data processing
 */

/**
 * Extract username from Twitter URL
 * @param url - Twitter URL (e.g., "https://x.com/username/status/123" or "https://twitter.com/username/status/123")
 * @returns username or null if not found
 */
export function extractUsernameFromUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    // Handle both x.com and twitter.com domains
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)(?:\/.*)?/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      // Filter out common path segments that aren't usernames
      const username = match[1];
      const excludedPaths = ['status', 'i', 'search', 'hashtag', 'intent', 'home', 'notifications', 'messages', 'explore'];
      
      if (!excludedPaths.includes(username.toLowerCase())) {
        return username;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting username from URL:', error);
    return null;
  }
}

/**
 * Normalize Twitter data from XLSX format to TwloTwitterPost format
 */
export interface XlsxTwitterData {
  id: string;
  url: string;
  text: string;
  createdAt: string;
  'author.profilePicture': string;
  retweetCount: number;
  replyCount: number;
  likeCount: number;
  quoteCount: number;
  viewCount: number;
  bookmarkCount: number;
  source: string;
  lang: string;
  isReply: string | boolean;
  isPinned: string | boolean;
}

export interface TwitterAuthor {
  id: string;
  username: string;
  name: string;
  followers: number;
  verified: boolean;
  profilePicture?: string;
}

export interface TwitterMetrics {
  likes: number;
  retweets: number;
  replies: number;
  quotes: number;
  views: number;
  bookmarks?: number;
}

export interface TwitterPost {
  id: string;
  url: string;
  text: string;
  author: TwitterAuthor;
  createdAt: string;
  metrics: TwitterMetrics;
  media: Array<{ type: string; url: string }>;
  hashtags: string[];
  mentions: string[];
  isRetweet: boolean;
  isReply: boolean;
  isPinned: boolean;
}

/**
 * Convert XLSX data to normalized Twitter post format
 */
export function normalizeXlsxToTwitterPost(xlsxData: XlsxTwitterData): TwitterPost {
  const username = extractUsernameFromUrl(xlsxData.url) || 'unknown';
  
  // Extract hashtags from text
  const hashtags = xlsxData.text.match(/#[a-zA-Z0-9_]+/g) || [];
  
  // Extract mentions from text
  const mentions = xlsxData.text.match(/@[a-zA-Z0-9_]+/g) || [];
  
  // Check if it's a retweet
  const isRetweet = xlsxData.text.toLowerCase().startsWith('rt @');
  
  return {
    id: xlsxData.id,
    url: xlsxData.url,
    text: xlsxData.text,
    author: {
      id: `${username}_id`,
      username: username,
      name: username, // We'll use username as name for now
      followers: 1000, // Default value, could be enhanced with more data
      verified: false, // Default value, could be enhanced with more data
      profilePicture: xlsxData['author.profilePicture']
    },
    createdAt: xlsxData.createdAt,
    metrics: {
      likes: Number(xlsxData.likeCount) || 0,
      retweets: Number(xlsxData.retweetCount) || 0,
      replies: Number(xlsxData.replyCount) || 0,
      quotes: Number(xlsxData.quoteCount) || 0,
      views: Number(xlsxData.viewCount) || 0,
      bookmarks: Number(xlsxData.bookmarkCount) || 0
    },
    media: [], // Media URLs would need to be extracted from text or additional data
    hashtags,
    mentions,
    isRetweet,
    isReply: xlsxData.isReply === 'true' || xlsxData.isReply === true,
    isPinned: xlsxData.isPinned === 'true' || xlsxData.isPinned === true
  };
}

/**
 * Load and process Twitter data from XLSX file
 */
export async function loadTwitterDataFromXlsx(filePath: string): Promise<TwitterPost[]> {
  try {
    console.log('Loading XLSX from path:', filePath);
    const fs = require('fs');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('XLSX file does not exist:', filePath);
      return [];
    }
    
    const xlsx = require('xlsx');
    const workbook = xlsx.readFile(filePath);
    console.log('Sheet names:', workbook.SheetNames);
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const xlsxData: XlsxTwitterData[] = xlsx.utils.sheet_to_json(worksheet);
    
    console.log('Loaded', xlsxData.length, 'tweets from XLSX');
    
    const normalized = xlsxData.map(normalizeXlsxToTwitterPost);
    console.log('Normalized', normalized.length, 'tweets');
    
    return normalized;
  } catch (error) {
    console.error('Error loading Twitter data from XLSX:', error);
    return [];
  }
}