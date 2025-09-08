import { PrismaClient } from '@prisma/client';
import { fluffyshareTwitterApi } from './fluffyshare-twitter-api';
import { fluffyshareScoringEngine } from './fluffyshare-scoring';

interface ProcessingOptions {
  maxTweets?: number;
  windowHours?: number;
  processType: 'daily_batch' | 'manual_trigger';
}

interface ProcessingResult {
  success: boolean;
  logId: string;
  metrics: {
    tweetsProcessed: number;
    accountsUpdated: number;
    scoresComputed: number;
    apiCallsUsed: number;
    duration: number;
  };
  errors: string[];
}

interface FluffyFollowerCache {
  userId: string;
  username: string;
  isFluffyFollower: boolean;
  checkedAt: Date;
}

export class FluffyshareProcessor {
  private prisma: PrismaClient;
  private apiCallsUsed: number = 0;
  private fluffyFollowerCache: Map<string, FluffyFollowerCache> = new Map();

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Main processing pipeline - run daily
   */
  async processFluffyshareData(options: ProcessingOptions): Promise<ProcessingResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    
    // Create processing log
    const log = await this.prisma.fluffyProcessingLog.create({
      data: {
        processType: options.processType,
        status: 'running',
      },
    });

    try {
      console.log(`🚀 Starting Fluffyshare processing (${options.processType})`);

      // Step 1: Fetch recent mentions
      console.log('📥 Fetching @Fluffy_Bearss mentions...');
      const tweets = await this.fetchFluffyMentions(options.maxTweets || 1000, options.windowHours || 48);
      console.log(`Found ${tweets.length} tweets mentioning @Fluffy_Bearss`);

      // Step 2: Process accounts
      console.log('👥 Processing user accounts...');
      const uniqueAuthorIds = [...new Set(tweets.map(t => t.authorId))];
      await this.processAccounts(uniqueAuthorIds);
      console.log(`Processed ${uniqueAuthorIds.length} unique accounts`);

      // Step 3: Update Fluffy followers
      console.log('🍯 Updating Fluffy followers data...');
      await this.updateFluffyFollowers(uniqueAuthorIds);
      console.log('Fluffy followers data updated');

      // Step 4: Calculate scores
      console.log('🔢 Calculating tweet scores...');
      const scoresComputed = await this.calculateScores(tweets);
      console.log(`Computed ${scoresComputed} scores`);

      // Step 5: Clean old data
      console.log('🧹 Cleaning old data...');
      await this.cleanOldData();
      console.log('Old data cleaned');

      const duration = Date.now() - startTime;

      // Update log with success
      await this.prisma.fluffyProcessingLog.update({
        where: { id: log.id },
        data: {
          status: 'completed',
          completedAt: new Date(),
          tweetsProcessed: tweets.length,
          accountsUpdated: uniqueAuthorIds.length,
          scoresComputed: scoresComputed,
          apiCallsUsed: this.apiCallsUsed,
          summary: JSON.stringify({
            duration: duration,
            tweetsPerSecond: tweets.length / (duration / 1000),
            accountsPerSecond: uniqueAuthorIds.length / (duration / 1000),
          }),
        },
      });

      console.log(`✅ Processing completed in ${duration}ms`);

      return {
        success: true,
        logId: log.id,
        metrics: {
          tweetsProcessed: tweets.length,
          accountsUpdated: uniqueAuthorIds.length,
          scoresComputed: scoresComputed,
          apiCallsUsed: this.apiCallsUsed,
          duration: duration,
        },
        errors: errors,
      };

    } catch (error) {
      console.error('❌ Processing failed:', error);
      errors.push(error instanceof Error ? error.message : String(error));

      // Update log with failure
      await this.prisma.fluffyProcessingLog.update({
        where: { id: log.id },
        data: {
          status: 'failed',
          completedAt: new Date(),
          errors: JSON.stringify(errors),
        },
      });

      return {
        success: false,
        logId: log.id,
        metrics: {
          tweetsProcessed: 0,
          accountsUpdated: 0,
          scoresComputed: 0,
          apiCallsUsed: this.apiCallsUsed,
          duration: Date.now() - startTime,
        },
        errors: errors,
      };
    }
  }

  /**
   * Fetch tweets mentioning @Fluffy_Bearss
   */
  private async fetchFluffyMentions(maxTweets: number, windowHours: number) {
    const tweets = [];
    let nextToken: string | undefined;
    const cutoffDate = new Date(Date.now() - windowHours * 60 * 60 * 1000);

    do {
      this.apiCallsUsed++;
      const response = await fluffyshareTwitterApi.searchMentions(
        '@Fluffy_Bearss',
        Math.min(100, maxTweets - tweets.length),
        nextToken
      );

      if (!response.data || response.data.length === 0) {
        break;
      }

      // Filter and process tweets
      for (const tweet of response.data) {
        const tweetDate = new Date(tweet.created_at);
        
        // Skip if too old
        if (tweetDate < cutoffDate) continue;
        
        // Skip if doesn't actually mention Fluffy_Bearss
        if (!fluffyshareTwitterApi.mentionsFluffyBears(tweet)) continue;

        // Determine tweet type
        const type = fluffyshareTwitterApi.classifyTweetType(tweet);
        
        tweets.push({
          id: `fluffy_${tweet.id}`,
          tweetId: tweet.id,
          authorId: tweet.author_id,
          authorUsername: '', // Will be filled by batch lookup
          text: tweet.text,
          createdAt: tweetDate,
          type,
          retweetCount: tweet.public_metrics.retweet_count,
          replyCount: tweet.public_metrics.reply_count,
          likeCount: tweet.public_metrics.like_count,
          quoteCount: tweet.public_metrics.quote_count,
          impressions: tweet.public_metrics.impression_count,
          processed: false,
        });
      }

      nextToken = response.meta?.next_token;
    } while (nextToken && tweets.length < maxTweets);

    // Store tweets in database
    for (const tweet of tweets) {
      await this.prisma.fluffyTweet.upsert({
        where: { tweetId: tweet.tweetId },
        update: {
          retweetCount: tweet.retweetCount,
          replyCount: tweet.replyCount,
          likeCount: tweet.likeCount,
          quoteCount: tweet.quoteCount,
          impressions: tweet.impressions,
        },
        create: tweet,
      });
    }

    return tweets;
  }

  /**
   * Process user accounts and update their info
   */
  private async processAccounts(authorIds: string[]) {
    if (authorIds.length === 0) return;

    this.apiCallsUsed++;
    const response = await fluffyshareTwitterApi.getUsersByIds(authorIds);
    
    if (!response.data) return;

    for (const user of response.data) {
      const accountAge = (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24);
      
      // Calculate bot score
      const botScore = fluffyshareScoringEngine.calculateBotScore({
        followersCount: user.public_metrics.followers_count,
        followingCount: user.public_metrics.following_count,
        tweetsCount: user.public_metrics.tweet_count,
        accountAge,
        verified: user.verified,
        hasProfileImage: !!user.profile_image_url && !user.profile_image_url.includes('default'),
        fluffyFollowers: 0, // Will be updated separately
        botScore: 0,
      });

      const botPenalty = botScore > 0.7 ? 0.5 : 1.0;

      await this.prisma.fluffyAccount.upsert({
        where: { userId: user.id },
        update: {
          username: user.username,
          displayName: user.name,
          followersCount: user.public_metrics.followers_count,
          followingCount: user.public_metrics.following_count,
          tweetsCount: user.public_metrics.tweet_count,
          verified: user.verified,
          profileImage: user.profile_image_url,
          description: user.description,
          botScore,
          botPenalty,
          lastChecked: new Date(),
        },
        create: {
          userId: user.id,
          username: user.username,
          displayName: user.name,
          followersCount: user.public_metrics.followers_count,
          followingCount: user.public_metrics.following_count,
          tweetsCount: user.public_metrics.tweet_count,
          verified: user.verified,
          profileImage: user.profile_image_url,
          createdAt: new Date(user.created_at),
          description: user.description,
          botScore,
          botPenalty,
        },
      });

      // Update tweet author usernames
      await this.prisma.fluffyTweet.updateMany({
        where: { authorId: user.id },
        data: { authorUsername: user.username },
      });
    }
  }

  /**
   * Update Fluffy followers count for accounts
   */
  private async updateFluffyFollowers(authorIds: string[]) {
    // Get all completed Fluffy mission users
    const fluffyUsers = await this.prisma.fluffyMissionUser.findMany({
      select: { twitterUsername: true },
    });

    const fluffyUsernames = new Set(
      fluffyUsers.map(user => user.twitterUsername.toLowerCase().replace('@', ''))
    );

    // For each account, check how many of their followers are Fluffy followers
    // This is a simplified version - in production, you'd need more sophisticated follower checking
    for (const authorId of authorIds) {
      const account = await this.prisma.fluffyAccount.findUnique({
        where: { userId: authorId },
      });

      if (!account) continue;

      // Simplified calculation: assume some percentage based on account characteristics
      let fluffyFollowers = 0;
      
      // If the account itself is a Fluffy follower, give them at least 1
      if (fluffyUsernames.has(account.username.toLowerCase())) {
        fluffyFollowers = Math.max(1, Math.floor(account.followersCount * 0.001)); // 0.1% of followers
      }

      const bonusMultiplier = Math.min(
        1 + 0.1 * Math.floor(fluffyFollowers / 10),
        2.0
      );

      await this.prisma.fluffyAccount.update({
        where: { userId: authorId },
        data: {
          fluffyFollowers,
          bonusMultiplier,
        },
      });
    }
  }

  /**
   * Calculate scores for all unprocessed tweets
   */
  private async calculateScores(tweets: any[]): Promise<number> {
    let scoresComputed = 0;

    for (const tweet of tweets) {
      const account = await this.prisma.fluffyAccount.findUnique({
        where: { userId: tweet.authorId },
      });

      if (!account) continue;

      const tweetAge = (Date.now() - tweet.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      
      // Check for originality features
      const hasOriginalityFeatures = fluffyshareScoringEngine.hasOriginalityFeatures(
        tweet.text,
        false, // hasMedia - would need to check tweet entities
        tweet.text.includes('http'), // hasLinks
        false // isThread - would need additional logic
      );

      const scoreComponents = fluffyshareScoringEngine.calculateTweetScore(
        {
          likes: tweet.likeCount,
          retweets: tweet.retweetCount,
          replies: tweet.replyCount,
          quotes: tweet.quoteCount,
          impressions: tweet.impressions,
        },
        {
          followersCount: account.followersCount,
          followingCount: account.followingCount,
          tweetsCount: account.tweetsCount,
          accountAge: (Date.now() - account.createdAt.getTime()) / (1000 * 60 * 60 * 24),
          verified: account.verified,
          hasProfileImage: !!account.profileImage,
          fluffyFollowers: account.fluffyFollowers,
          botScore: account.botScore,
        },
        tweet.type as any,
        tweetAge,
        hasOriginalityFeatures
      );

      // Store score
      await this.prisma.fluffyScore.upsert({
        where: {
          userId_tweetId: {
            userId: tweet.authorId,
            tweetId: tweet.tweetId,
          },
        },
        update: {
          rawScore: scoreComponents.rawScore,
          engagementScore: scoreComponents.engagementScore,
          reachFactor: scoreComponents.reachFactor,
          typeMultiplier: scoreComponents.typeMultiplier,
          originalityBonus: scoreComponents.originalityBonus,
          decayFactor: scoreComponents.decayFactor,
          decayedScore: scoreComponents.decayedScore,
          bonusMultiplier: scoreComponents.bonusMultiplier,
          botPenalty: scoreComponents.botPenalty,
          finalScore: scoreComponents.finalScore,
          ageDays: scoreComponents.ageDays,
          computedAt: new Date(),
        },
        create: {
          userId: tweet.authorId,
          tweetId: tweet.tweetId,
          rawScore: scoreComponents.rawScore,
          engagementScore: scoreComponents.engagementScore,
          reachFactor: scoreComponents.reachFactor,
          typeMultiplier: scoreComponents.typeMultiplier,
          originalityBonus: scoreComponents.originalityBonus,
          decayFactor: scoreComponents.decayFactor,
          decayedScore: scoreComponents.decayedScore,
          bonusMultiplier: scoreComponents.bonusMultiplier,
          botPenalty: scoreComponents.botPenalty,
          finalScore: scoreComponents.finalScore,
          ageDays: scoreComponents.ageDays,
        },
      });

      // Mark tweet as processed
      await this.prisma.fluffyTweet.update({
        where: { tweetId: tweet.tweetId },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });

      scoresComputed++;
    }

    return scoresComputed;
  }

  /**
   * Clean old data beyond retention period
   */
  private async cleanOldData() {
    const retentionDays = 60; // Keep data for 60 days
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    // Delete old tweets and their scores
    await this.prisma.fluffyScore.deleteMany({
      where: {
        computedAt: { lt: cutoffDate },
      },
    });

    await this.prisma.fluffyTweet.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
      },
    });

    // Delete old processing logs
    const logRetentionDays = 30;
    const logCutoffDate = new Date(Date.now() - logRetentionDays * 24 * 60 * 60 * 1000);
    
    await this.prisma.fluffyProcessingLog.deleteMany({
      where: {
        startedAt: { lt: logCutoffDate },
      },
    });
  }

  /**
   * Get leaderboard data
   */
  async getLeaderboard(
    windowDays: number = 30,
    limit: number = 100
  ): Promise<Array<{
    userId: string;
    username: string;
    displayName: string | null;
    totalScore: number;
    tweetCount: number;
    avgScore: number;
    fluffyFollowers: number;
    bonusMultiplier: number;
    verified: boolean;
    profileImage: string | null;
    rank: number;
  }>> {
    const windowCutoff = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);

    const results = await this.prisma.fluffyScore.groupBy({
      by: ['userId'],
      where: {
        computedAt: { gte: windowCutoff },
      },
      _sum: {
        finalScore: true,
      },
      _count: {
        tweetId: true,
      },
      _avg: {
        finalScore: true,
      },
      orderBy: {
        _sum: {
          finalScore: 'desc',
        },
      },
      take: limit,
    });

    const leaderboard = [];
    
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const account = await this.prisma.fluffyAccount.findUnique({
        where: { userId: result.userId },
      });

      if (account) {
        leaderboard.push({
          userId: result.userId,
          username: account.username,
          displayName: account.displayName,
          totalScore: result._sum.finalScore || 0,
          tweetCount: result._count.tweetId,
          avgScore: result._avg.finalScore || 0,
          fluffyFollowers: account.fluffyFollowers,
          bonusMultiplier: account.bonusMultiplier,
          verified: account.verified,
          profileImage: account.profileImage,
          rank: i + 1,
        });
      }
    }

    return leaderboard;
  }

  /**
   * Get user details with tweet breakdown
   */
  async getUserDetails(
    userId: string,
    windowDays: number = 30
  ) {
    const windowCutoff = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);

    const account = await this.prisma.fluffyAccount.findUnique({
      where: { userId },
    });

    if (!account) return null;

    const scores = await this.prisma.fluffyScore.findMany({
      where: {
        userId,
        computedAt: { gte: windowCutoff },
      },
      include: {
        tweet: true,
      },
      orderBy: {
        finalScore: 'desc',
      },
    });

    const totalScore = scores.reduce((sum, score) => sum + score.finalScore, 0);

    return {
      account,
      totalScore,
      tweetCount: scores.length,
      avgScore: scores.length > 0 ? totalScore / scores.length : 0,
      scores: scores.map(score => ({
        tweet: score.tweet,
        score: score,
      })),
    };
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}

export const fluffyshareProcessor = new FluffyshareProcessor();