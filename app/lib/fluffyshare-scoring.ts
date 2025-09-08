interface ScoringConfig {
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
  
  // Reach factor weight
  reachFactorWeight: number;
  
  // Originality bonus
  originalityBonus: number;
  
  // Decay settings
  decayLambda: number;
  
  // Caps and limits
  dailyCapPerAccount: number;
  maxBonusMultiplier: number;
  
  // Bot detection thresholds
  botScoreThreshold: number;
  botPenalty: number;
  
  // Fluffy followers bonus
  fluffyFollowersBonus: number; // 0.1 = 10% per block of 10 followers
  fluffyFollowersBlockSize: number;
}

interface TweetMetrics {
  likes: number;
  retweets: number;
  replies: number;
  quotes: number;
  impressions?: number;
}

interface AccountMetrics {
  followersCount: number;
  followingCount: number;
  tweetsCount: number;
  accountAge: number; // days
  verified: boolean;
  hasProfileImage: boolean;
  fluffyFollowers: number;
  botScore: number;
}

interface ScoreComponents {
  typeMultiplier: number;
  engagementScore: number;
  reachFactor: number;
  originalityBonus: number;
  rawScore: number;
  decayFactor: number;
  decayedScore: number;
  bonusMultiplier: number;
  botPenalty: number;
  finalScore: number;
  ageDays: number;
}

export class FluffyshareScoringEngine {
  private config: ScoringConfig;

  constructor(customConfig?: Partial<ScoringConfig>) {
    this.config = {
      // Type base multipliers
      typeMultipliers: {
        original: 1.0,
        quote: 0.9,
        retweet: 0.4,
        reply: 0.7,
      },
      
      // Engagement weights (logarithmic scaling)
      engagementWeights: {
        likes: 1.0,
        retweets: 1.2,
        replies: 1.5,
        quotes: 1.0,
      },
      
      // Other weights
      reachFactorWeight: 0.2,
      originalityBonus: 1.0,
      
      // Decay (meia-vida ≈ 13.9 dias)
      decayLambda: 0.05,
      
      // Limits
      dailyCapPerAccount: 500,
      maxBonusMultiplier: 2.0,
      
      // Bot detection
      botScoreThreshold: 0.7,
      botPenalty: 0.5,
      
      // Fluffy followers bonus
      fluffyFollowersBonus: 0.1,
      fluffyFollowersBlockSize: 10,
      
      ...customConfig,
    };
  }

  /**
   * Calculate comprehensive score for a tweet
   */
  calculateTweetScore(
    tweetMetrics: TweetMetrics,
    accountMetrics: AccountMetrics,
    tweetType: 'original' | 'quote' | 'retweet' | 'reply',
    tweetAge: number, // days since tweet creation
    hasOriginalityFeatures: boolean = false
  ): ScoreComponents {
    // 1. Type multiplier
    const typeMultiplier = this.config.typeMultipliers[tweetType];

    // 2. Engagement score (logarithmic to prevent gaming)
    const engagementScore = 
      this.config.engagementWeights.likes * Math.log(tweetMetrics.likes + 1) +
      this.config.engagementWeights.retweets * Math.log(tweetMetrics.retweets + 1) +
      this.config.engagementWeights.replies * Math.log(tweetMetrics.replies + 1) +
      this.config.engagementWeights.quotes * Math.log(tweetMetrics.quotes + 1);

    // 3. Reach factor
    const reachFactor = Math.log(accountMetrics.followersCount + 1);

    // 4. Originality bonus
    const originalityBonus = hasOriginalityFeatures ? this.config.originalityBonus : 0;

    // 5. Raw score calculation
    const rawScore = 
      typeMultiplier + 
      engagementScore + 
      this.config.reachFactorWeight * reachFactor + 
      originalityBonus;

    // 6. Decay factor (exponential decay)
    const decayFactor = Math.exp(-this.config.decayLambda * tweetAge);
    const decayedScore = rawScore * decayFactor;

    // 7. Fluffy followers bonus
    const bonusMultiplier = Math.min(
      1 + this.config.fluffyFollowersBonus * Math.floor(accountMetrics.fluffyFollowers / this.config.fluffyFollowersBlockSize),
      this.config.maxBonusMultiplier
    );

    // 8. Bot penalty
    const botPenalty = accountMetrics.botScore > this.config.botScoreThreshold ? 
      this.config.botPenalty : 1.0;

    // 9. Final score
    const finalScore = decayedScore * bonusMultiplier * botPenalty;

    return {
      typeMultiplier,
      engagementScore,
      reachFactor,
      originalityBonus,
      rawScore,
      decayFactor,
      decayedScore,
      bonusMultiplier,
      botPenalty,
      finalScore,
      ageDays: tweetAge,
    };
  }

  /**
   * Calculate bot score heuristic
   */
  calculateBotScore(accountMetrics: AccountMetrics): number {
    let score = 0;

    // Account age penalty (newer = higher bot risk)
    if (accountMetrics.accountAge < 30) {
      score += 0.3;
    } else if (accountMetrics.accountAge < 90) {
      score += 0.1;
    }

    // Follower/following ratio (follow-back farms)
    const followerRatio = accountMetrics.followersCount / Math.max(accountMetrics.followingCount, 1);
    if (followerRatio < 0.1) {
      score += 0.3; // Following many, few followers
    } else if (followerRatio < 0.5) {
      score += 0.1;
    }

    // No profile image
    if (!accountMetrics.hasProfileImage) {
      score += 0.2;
    }

    // Tweet frequency (too high might indicate automation)
    const tweetsPerDay = accountMetrics.tweetsCount / Math.max(accountMetrics.accountAge, 1);
    if (tweetsPerDay > 50) {
      score += 0.3;
    } else if (tweetsPerDay > 20) {
      score += 0.1;
    }

    // Verified accounts get reduced bot score
    if (accountMetrics.verified) {
      score *= 0.5;
    }

    return Math.min(score, 1.0);
  }

  /**
   * Check if tweet has originality features
   */
  hasOriginalityFeatures(
    tweetText: string,
    hasMedia: boolean = false,
    hasLinks: boolean = false,
    isThread: boolean = false
  ): boolean {
    // Contains link
    if (hasLinks) return true;

    // Is thread root
    if (isThread) return true;

    // Has ≥100 original characters (excluding mentions and links)
    const cleanText = tweetText
      .replace(/@\w+/g, '') // Remove mentions
      .replace(/https?:\/\/\S+/g, '') // Remove URLs
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    if (cleanText.length >= 100) return true;

    // Has media attachment
    if (hasMedia) return true;

    return false;
  }

  /**
   * Apply daily cap to user scores
   */
  applyDailyCap(userScores: number[]): number[] {
    const totalScore = userScores.reduce((sum, score) => sum + score, 0);
    
    if (totalScore <= this.config.dailyCapPerAccount) {
      return userScores;
    }

    // Proportionally reduce scores to fit within cap
    const scalingFactor = this.config.dailyCapPerAccount / totalScore;
    return userScores.map(score => score * scalingFactor);
  }

  /**
   * Calculate leaderboard scores for a time window
   */
  calculateLeaderboardScores(
    userScores: Array<{
      userId: string;
      username: string;
      scores: ScoreComponents[];
      accountMetrics: AccountMetrics;
    }>,
    windowDays: number = 30
  ): Array<{
    userId: string;
    username: string;
    totalScore: number;
    tweetCount: number;
    avgScore: number;
    fluffyFollowers: number;
    bonusMultiplier: number;
    botScore: number;
  }> {
    const leaderboard = userScores.map(user => {
      // Filter scores within window
      const recentScores = user.scores.filter(score => score.ageDays <= windowDays);
      
      // Calculate totals
      const totalScore = recentScores.reduce((sum, score) => sum + score.finalScore, 0);
      const tweetCount = recentScores.length;
      const avgScore = tweetCount > 0 ? totalScore / tweetCount : 0;

      return {
        userId: user.userId,
        username: user.username,
        totalScore,
        tweetCount,
        avgScore,
        fluffyFollowers: user.accountMetrics.fluffyFollowers,
        bonusMultiplier: Math.min(
          1 + this.config.fluffyFollowersBonus * Math.floor(user.accountMetrics.fluffyFollowers / this.config.fluffyFollowersBlockSize),
          this.config.maxBonusMultiplier
        ),
        botScore: user.accountMetrics.botScore,
      };
    });

    // Sort by total score descending
    return leaderboard.sort((a, b) => b.totalScore - a.totalScore);
  }

  /**
   * Get current configuration
   */
  getConfig(): ScoringConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<ScoringConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Calculate age in days from date
   */
  static calculateAge(date: Date): number {
    return (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
  }

  /**
   * Estimate tweet reach if impressions not available
   */
  static estimateReach(metrics: TweetMetrics, followerCount: number): number {
    // Organic reach estimate (1-5% of followers)
    const organicReach = followerCount * 0.03;
    
    // Viral component (retweets extend reach)
    const viralReach = metrics.retweets * 25; // Estimate 25 additional views per RT
    
    // Engagement indicates minimum reach
    const engagementReach = (metrics.likes + metrics.retweets + metrics.replies) * 5;
    
    return Math.max(organicReach + viralReach, engagementReach);
  }
}

// Export singleton instance
export const fluffyshareScoringEngine = new FluffyshareScoringEngine();