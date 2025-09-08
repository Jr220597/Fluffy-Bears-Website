/**
 * Configuration for Fluffyshare Processor
 */
export const config = {
  // Twitter API Configuration
  twitter: {
    apiKey: process.env.TWITTER_API_KEY || '',
    baseUrl: 'https://api.twitterapi.io',
    timeout: 30000,
    maxRetries: 3,
    retryDelay: 1000,
  },

  // Scoring Configuration
  scoring: {
    // Type multipliers
    typeMultipliers: {
      original: 1.0,
      quote: 0.9,
      retweet: 0.4,
      reply: 0.7,
    },
    
    // Engagement weights
    engagementWeights: {
      likes: 1.0,
      retweets: 1.2,
      replies: 1.5,
      quotes: 1.0,
    },
    
    // Other weights
    reachFactorWeight: 0.2,
    originalityBonus: 1.0,
    
    // Decay settings (meia-vida ~13.9 dias)
    decayLambda: 0.05,
    
    // Caps and limits
    dailyCapPerAccount: 500,
    maxBonusMultiplier: 2.0,
    
    // Bot detection
    botScoreThreshold: 0.7,
    botPenalty: 0.5,
    
    // Fluffy followers bonus
    fluffyFollowersBonus: 0.1, // 10% per 10 followers
    fluffyFollowersBlockSize: 10,
  },

  // Processing Configuration
  processing: {
    windowDays: 30,
    windowHours: 48,
    maxTweetsPerBatch: 2000,
    retentionDays: 60,
    targetAccount: '@Fluffy_Bearss', // Conta alvo para mencões
  },

  // Output Configuration
  output: {
    dataDir: '../public/data/fluffyshare',
    leaderboardFile: 'leaderboard.json',
    statsFile: 'stats.json',
    lastUpdatedFile: 'last-updated.json',
    metadataFile: 'metadata.json',
  },

  // Database Configuration (SQLite local)
  database: {
    path: './fluffyshare.db',
  },

  // Rate Limiting
  rateLimiting: {
    tweetsPerHour: 1000,
    usersPerHour: 500,
    enableBackoff: true,
  },
};

/**
 * Validate configuration
 */
export function validateConfig() {
  const errors = [];

  if (!config.twitter.apiKey) {
    errors.push('Twitter API key is required (set TWITTER_API_KEY environment variable)');
  }

  if (config.scoring.decayLambda <= 0) {
    errors.push('Decay lambda must be positive');
  }

  if (config.processing.maxTweetsPerBatch <= 0) {
    errors.push('Max tweets per batch must be positive');
  }

  return errors;
}

export default config;