export interface FluffyshareConfig {
  // Twitter API Configuration
  twitter: {
    apiKey: string;
    baseUrl: string;
    timeout: number;
    maxRetries: number;
    retryDelay: number;
  };

  // Scoring Configuration
  scoring: {
    // Type multipliers
    typeMultipliers: {
      original: number;
      quote: number;
      retweet: number;
      reply: number;
    };
    
    // Engagement weights
    engagementWeights: {
      likes: number;
      retweets: number;
      replies: number;
      quotes: number;
    };
    
    // Other weights
    reachFactorWeight: number;
    originalityBonus: number;
    
    // Decay settings
    decayLambda: number;
    
    // Caps and limits
    dailyCapPerAccount: number;
    maxBonusMultiplier: number;
    
    // Bot detection
    botScoreThreshold: number;
    botPenalty: number;
    
    // Fluffy followers bonus
    fluffyFollowersBonus: number;
    fluffyFollowersBlockSize: number;
  };

  // Processing Configuration
  processing: {
    cronSchedule: string;
    timezone: string;
    windowDays: number;
    windowHours: number;
    maxTweetsPerBatch: number;
    retentionDays: number;
    logRetentionDays: number;
  };

  // Rate Limiting
  rateLimiting: {
    tweetsPerHour: number;
    usersPerHour: number;
    enableBackoff: boolean;
  };
}

/**
 * Default configuration for Fluffyshare
 */
export const defaultFluffyshareConfig: FluffyshareConfig = {
  twitter: {
    apiKey: process.env.TWITTER_API_KEY || '',
    baseUrl: 'https://api.twitterapi.io',
    timeout: 30000,
    maxRetries: 3,
    retryDelay: 1000,
  },

  scoring: {
    typeMultipliers: {
      original: 1.0,
      quote: 0.9,
      retweet: 0.4,
      reply: 0.7,
    },
    
    engagementWeights: {
      likes: 1.0,
      retweets: 1.2,
      replies: 1.5,
      quotes: 1.0,
    },
    
    reachFactorWeight: 0.2,
    originalityBonus: 1.0,
    decayLambda: 0.05,
    dailyCapPerAccount: 500,
    maxBonusMultiplier: 2.0,
    botScoreThreshold: 0.7,
    botPenalty: 0.5,
    fluffyFollowersBonus: 0.1,
    fluffyFollowersBlockSize: 10,
  },

  processing: {
    cronSchedule: '0 3 * * *', // 3:00 AM daily
    timezone: 'UTC',
    windowDays: 30,
    windowHours: 48,
    maxTweetsPerBatch: 2000,
    retentionDays: 60,
    logRetentionDays: 30,
  },

  rateLimiting: {
    tweetsPerHour: 1000,
    usersPerHour: 500,
    enableBackoff: true,
  },
};

/**
 * Load configuration from environment variables and defaults
 */
export function loadFluffyshareConfig(): FluffyshareConfig {
  const config = { ...defaultFluffyshareConfig };

  // Override with environment variables if present
  if (process.env.FLUFFYSHARE_DECAY_LAMBDA) {
    config.scoring.decayLambda = parseFloat(process.env.FLUFFYSHARE_DECAY_LAMBDA);
  }

  if (process.env.FLUFFYSHARE_DAILY_CAP) {
    config.scoring.dailyCapPerAccount = parseInt(process.env.FLUFFYSHARE_DAILY_CAP);
  }

  if (process.env.FLUFFYSHARE_MAX_BONUS) {
    config.scoring.maxBonusMultiplier = parseFloat(process.env.FLUFFYSHARE_MAX_BONUS);
  }

  if (process.env.FLUFFYSHARE_CRON_SCHEDULE) {
    config.processing.cronSchedule = process.env.FLUFFYSHARE_CRON_SCHEDULE;
  }

  if (process.env.FLUFFYSHARE_TIMEZONE) {
    config.processing.timezone = process.env.FLUFFYSHARE_TIMEZONE;
  }

  if (process.env.FLUFFYSHARE_WINDOW_DAYS) {
    config.processing.windowDays = parseInt(process.env.FLUFFYSHARE_WINDOW_DAYS);
  }

  if (process.env.FLUFFYSHARE_MAX_TWEETS) {
    config.processing.maxTweetsPerBatch = parseInt(process.env.FLUFFYSHARE_MAX_TWEETS);
  }

  if (process.env.FLUFFYSHARE_RETENTION_DAYS) {
    config.processing.retentionDays = parseInt(process.env.FLUFFYSHARE_RETENTION_DAYS);
  }

  return config;
}

/**
 * Validate configuration
 */
export function validateConfig(config: FluffyshareConfig): string[] {
  const errors: string[] = [];

  if (!config.twitter.apiKey) {
    errors.push('Twitter API key is required (TWITTER_API_KEY)');
  }

  if (config.scoring.decayLambda <= 0) {
    errors.push('Decay lambda must be positive');
  }

  if (config.scoring.dailyCapPerAccount <= 0) {
    errors.push('Daily cap per account must be positive');
  }

  if (config.scoring.maxBonusMultiplier < 1) {
    errors.push('Max bonus multiplier must be >= 1');
  }

  if (config.processing.windowDays <= 0) {
    errors.push('Window days must be positive');
  }

  if (config.processing.maxTweetsPerBatch <= 0) {
    errors.push('Max tweets per batch must be positive');
  }

  return errors;
}

/**
 * Get formatted configuration for logging
 */
export function getConfigSummary(config: FluffyshareConfig): Record<string, any> {
  return {
    scoring: {
      decayLambda: config.scoring.decayLambda,
      dailyCap: config.scoring.dailyCapPerAccount,
      maxBonus: config.scoring.maxBonusMultiplier,
      botThreshold: config.scoring.botScoreThreshold,
    },
    processing: {
      schedule: config.processing.cronSchedule,
      timezone: config.processing.timezone,
      windowDays: config.processing.windowDays,
      maxTweets: config.processing.maxTweetsPerBatch,
      retention: config.processing.retentionDays,
    },
    rateLimiting: {
      tweetsPerHour: config.rateLimiting.tweetsPerHour,
      usersPerHour: config.rateLimiting.usersPerHour,
    },
  };
}

// Export the loaded configuration
export const fluffyshareConfig = loadFluffyshareConfig();