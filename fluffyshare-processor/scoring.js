/**
 * Fluffyshare Scoring Engine
 */
export class ScoringEngine {
  constructor(config) {
    this.config = config.scoring;
  }

  /**
   * Calculate tweet score with all components
   */
  calculateTweetScore(tweetMetrics, accountMetrics, tweetType, tweetAge, hasOriginalityFeatures = false) {
    // 1. Type multiplier
    const typeMultiplier = this.config.typeMultipliers[tweetType] || this.config.typeMultipliers.original;

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
  calculateBotScore(accountMetrics) {
    let score = 0;

    // Account age penalty
    if (accountMetrics.accountAge < 30) {
      score += 0.3;
    } else if (accountMetrics.accountAge < 90) {
      score += 0.1;
    }

    // Follower/following ratio
    const followerRatio = accountMetrics.followersCount / Math.max(accountMetrics.followingCount, 1);
    if (followerRatio < 0.1) {
      score += 0.3;
    } else if (followerRatio < 0.5) {
      score += 0.1;
    }

    // No profile image
    if (!accountMetrics.hasProfileImage) {
      score += 0.2;
    }

    // Tweet frequency
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
   * Check for originality features
   */
  hasOriginalityFeatures(tweetText, hasMedia = false, hasLinks = false, isThread = false) {
    if (hasLinks) return true;
    if (isThread) return true;
    if (hasMedia) return true;

    // Has ≥100 original characters
    const cleanText = tweetText
      .replace(/@\w+/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    return cleanText.length >= 100;
  }

  /**
   * Calculate age in days
   */
  static calculateAge(date) {
    return (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
  }

  /**
   * Apply daily cap to scores
   */
  applyDailyCap(userScores) {
    const totalScore = userScores.reduce((sum, score) => sum + score, 0);
    
    if (totalScore <= this.config.dailyCapPerAccount) {
      return userScores;
    }

    // Proportionally reduce scores
    const scalingFactor = this.config.dailyCapPerAccount / totalScore;
    return userScores.map(score => score * scalingFactor);
  }

  /**
   * Format score for display
   */
  static formatScore(score) {
    if (score >= 1000) return `${(score / 1000).toFixed(1)}k`;
    return score.toFixed(1);
  }
}