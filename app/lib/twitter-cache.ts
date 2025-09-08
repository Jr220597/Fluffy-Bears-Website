import { TwloTwitterPost } from './apify-twitter';
import fs from 'fs/promises';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), 'data', 'twitter-cache');
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CacheData {
  timestamp: number;
  data: TwloTwitterPost[];
}

export class TwitterCache {
  private static async ensureCacheDir() {
    try {
      await fs.mkdir(CACHE_DIR, { recursive: true });
    } catch (error) {
      console.error('Failed to create cache directory:', error);
    }
  }

  private static getCacheFilePath(key: string): string {
    return path.join(CACHE_DIR, `${key}.json`);
  }

  static async get(key: string): Promise<TwloTwitterPost[] | null> {
    try {
      await this.ensureCacheDir();
      const filePath = this.getCacheFilePath(key);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const cacheData: CacheData = JSON.parse(fileContent);
      
      // Check if cache is still valid (less than 24 hours old)
      const now = Date.now();
      if (now - cacheData.timestamp < CACHE_DURATION) {
        console.log(`Cache hit for ${key}, returning cached data`);
        return cacheData.data;
      } else {
        console.log(`Cache expired for ${key}`);
        return null;
      }
    } catch (error) {
      console.log(`Cache miss for ${key}:`, error instanceof Error ? error.message : 'Unknown error');
      return null;
    }
  }

  static async set(key: string, data: TwloTwitterPost[]): Promise<void> {
    try {
      await this.ensureCacheDir();
      const filePath = this.getCacheFilePath(key);
      const cacheData: CacheData = {
        timestamp: Date.now(),
        data
      };
      
      await fs.writeFile(filePath, JSON.stringify(cacheData, null, 2));
      console.log(`Data cached for ${key}`);
    } catch (error) {
      console.error(`Failed to cache data for ${key}:`, error);
    }
  }

  static async isValid(key: string): Promise<boolean> {
    try {
      await this.ensureCacheDir();
      const filePath = this.getCacheFilePath(key);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const cacheData: CacheData = JSON.parse(fileContent);
      
      const now = Date.now();
      return (now - cacheData.timestamp) < CACHE_DURATION;
    } catch (error) {
      return false;
    }
  }

  static async clear(key?: string): Promise<void> {
    try {
      await this.ensureCacheDir();
      
      if (key) {
        const filePath = this.getCacheFilePath(key);
        await fs.unlink(filePath);
        console.log(`Cache cleared for ${key}`);
      } else {
        const files = await fs.readdir(CACHE_DIR);
        await Promise.all(
          files.map(file => fs.unlink(path.join(CACHE_DIR, file)))
        );
        console.log('All cache cleared');
      }
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  static async getCacheInfo(): Promise<{ [key: string]: { age: number; size: number; valid: boolean } }> {
    try {
      await this.ensureCacheDir();
      const files = await fs.readdir(CACHE_DIR);
      const info: { [key: string]: { age: number; size: number; valid: boolean } } = {};
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const key = file.replace('.json', '');
          const filePath = path.join(CACHE_DIR, file);
          const stats = await fs.stat(filePath);
          const fileContent = await fs.readFile(filePath, 'utf-8');
          const cacheData: CacheData = JSON.parse(fileContent);
          
          const now = Date.now();
          const age = now - cacheData.timestamp;
          const valid = age < CACHE_DURATION;
          
          info[key] = {
            age,
            size: stats.size,
            valid
          };
        }
      }
      
      return info;
    } catch (error) {
      console.error('Failed to get cache info:', error);
      return {};
    }
  }
}