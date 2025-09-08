#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { TwitterApiClient } from './twitter-api.js';
import { ScoringEngine } from './scoring.js';
import { FluffyDatabase } from './database.js';
import { config, validateConfig } from './config.js';

class FluffyshareProcessor {
  constructor() {
    this.twitterApi = new TwitterApiClient(config.twitter.apiKey);
    this.scoringEngine = new ScoringEngine(config);
    this.database = new FluffyDatabase(config.database.path);
    this.apiCallsUsed = 0;
  }

  /**
   * Main processing function
   */
  async process() {
    console.log('🍯 Starting Fluffyshare processing...');
    console.log('📅 Started at:', new Date().toISOString());
    
    const startTime = Date.now();

    try {
      // Validate configuration
      const configErrors = validateConfig();
      if (configErrors.length > 0) {
        throw new Error(`Configuration errors: ${configErrors.join(', ')}`);
      }

      // Initialize database
      await this.database.initialize();

      // Step 1: Fetch tweets
      console.log('\n📥 Step 1: Fetching @Fluffy_Bearss mentions...');
      const tweets = await this.fetchFluffyMentions();
      console.log(`✅ Found ${tweets.length} tweets`);

      // Step 2: Process accounts
      console.log('\n👥 Step 2: Processing user accounts...');
      const uniqueAuthorIds = [...new Set(tweets.map(t => t.authorId))];
      await this.processAccounts(uniqueAuthorIds);
      console.log(`✅ Processed ${uniqueAuthorIds.length} accounts`);

      // Step 3: Update Fluffy followers
      console.log('\n🍯 Step 3: Updating Fluffy followers...');
      await this.updateFluffyFollowers(uniqueAuthorIds);
      console.log('✅ Fluffy followers updated');

      // Step 4: Calculate scores
      console.log('\n🔢 Step 4: Calculating scores...');
      const scoresComputed = await this.calculateScores(tweets);
      console.log(`✅ Computed ${scoresComputed} scores`);

      // Step 5: Generate output files
      console.log('\n📄 Step 5: Generating output files...');
      await this.generateOutputFiles();
      console.log('✅ Output files generated');

      // Step 6: Clean old data
      console.log('\n🧹 Step 6: Cleaning old data...');
      await this.database.cleanOldData(config.processing.retentionDays);
      console.log('✅ Old data cleaned');

      const duration = Date.now() - startTime;
      
      console.log('\n🎉 Processing completed successfully!');
      console.log(`⏱️  Duration: ${(duration / 1000).toFixed(1)}s`);
      console.log(`📊 Tweets processed: ${tweets.length}`);
      console.log(`👥 Accounts updated: ${uniqueAuthorIds.length}`);
      console.log(`🔢 Scores computed: ${scoresComputed}`);
      console.log(`🌐 API calls used: ${this.apiCallsUsed}`);
      console.log(`📅 Completed at: ${new Date().toISOString()}`);

    } catch (error) {
      console.error('\n❌ Processing failed:', error);
      process.exit(1);
    } finally {
      await this.database.close();
    }
  }

  /**
   * Fetch tweets mentioning @Fluffy_Bearss
   */
  async fetchFluffyMentions() {
    const tweets = [];
    let nextToken = null;
    const cutoffDate = new Date(Date.now() - config.processing.windowHours * 60 * 60 * 1000);
    const maxTweets = config.processing.maxTweetsPerBatch;

    do {
      this.apiCallsUsed++;
      console.log(`  📡 API call ${this.apiCallsUsed}: Fetching tweets...`);
      
      const response = await this.twitterApi.searchMentions(
        config.processing.targetAccount,
        Math.min(100, maxTweets - tweets.length),
        nextToken
      );

      if (!response.data || response.data.length === 0) {
        console.log('  ℹ️  No more tweets found');
        break;
      }

      // Process tweets
      for (const tweet of response.data) {
        const tweetDate = new Date(tweet.created_at);
        
        // Skip if too old
        if (tweetDate < cutoffDate) continue;
        
        // Skip if doesn't mention target
        if (!this.twitterApi.mentionsTarget(tweet, config.processing.targetAccount)) continue;

        // Determine tweet type
        const type = this.twitterApi.classifyTweetType(tweet);
        
        const tweetData = {
          id: `fluffy_${tweet.id}`,
          tweetId: tweet.id,
          authorId: tweet.author_id,
          authorUsername: '', // Will be filled later
          text: tweet.text,
          createdAt: tweetDate.toISOString(),
          type,
          retweetCount: tweet.public_metrics.retweet_count,
          replyCount: tweet.public_metrics.reply_count,
          likeCount: tweet.public_metrics.like_count,
          quoteCount: tweet.public_metrics.quote_count,
          impressions: tweet.public_metrics.impression_count,
          processed: false,
        };

        tweets.push(tweetData);
        
        // Store in database
        await this.database.upsertTweet(tweetData);
      }

      console.log(`  📊 Collected ${tweets.length} tweets so far`);
      nextToken = response.meta?.next_token;
      
    } while (nextToken && tweets.length < maxTweets);

    return tweets;
  }

  /**
   * Process user accounts
   */
  async processAccounts(authorIds) {
    if (authorIds.length === 0) return;

    this.apiCallsUsed++;
    console.log(`  📡 API call ${this.apiCallsUsed}: Fetching user data...`);
    
    const response = await this.twitterApi.getUsersByIds(authorIds);
    
    if (!response.data) return;

    for (const user of response.data) {
      const accountAge = this.scoringEngine.constructor.calculateAge(user.created_at);
      
      // Calculate bot score
      const botScore = this.scoringEngine.calculateBotScore({
        followersCount: user.public_metrics.followers_count,
        followingCount: user.public_metrics.following_count,
        tweetsCount: user.public_metrics.tweet_count,
        accountAge,
        verified: user.verified,
        hasProfileImage: !!user.profile_image_url && !user.profile_image_url.includes('default'),
        fluffyFollowers: 0,
        botScore: 0,
      });

      const botPenalty = botScore > config.scoring.botScoreThreshold ? config.scoring.botPenalty : 1.0;

      const accountData = {
        id: `acc_${user.id}`,
        userId: user.id,
        username: user.username,
        displayName: user.name,
        followersCount: user.public_metrics.followers_count,
        followingCount: user.public_metrics.following_count,
        tweetsCount: user.public_metrics.tweet_count,
        verified: user.verified,
        profileImage: user.profile_image_url,
        createdAt: user.created_at,
        description: user.description,
        botScore,
        botPenalty,
        fluffyFollowers: 0,
        bonusMultiplier: 1.0,
      };

      await this.database.upsertAccount(accountData);

      // Update tweet author usernames
      await this.database.run(
        'UPDATE tweets SET author_username = ? WHERE author_id = ?',
        [user.username, user.id]
      );
    }

    console.log(`  ✅ Updated ${response.data.length} accounts`);
  }

  /**
   * Update Fluffy followers count
   */
  async updateFluffyFollowers(authorIds) {
    // Get Fluffy mission users
    const fluffyUsers = await this.database.getFluffyMissionUsers();
    const fluffyUsernames = new Set(
      fluffyUsers.map(user => user.twitterUsername?.toLowerCase().replace('@', ''))
    );

    console.log(`  📊 Found ${fluffyUsernames.size} Fluffy mission users`);

    // Update accounts with Fluffy followers count
    for (const authorId of authorIds) {
      const account = await this.database.get('SELECT * FROM accounts WHERE user_id = ?', [authorId]);
      if (!account) continue;

      // Simplified calculation - in production you'd check actual follower relationships
      let fluffyFollowers = 0;
      
      // If the account is a Fluffy user, give them some bonus followers
      if (fluffyUsernames.has(account.username.toLowerCase())) {
        fluffyFollowers = Math.max(1, Math.floor(account.followers_count * 0.001)); // 0.1% estimate
      }

      const bonusMultiplier = Math.min(
        1 + config.scoring.fluffyFollowersBonus * Math.floor(fluffyFollowers / config.scoring.fluffyFollowersBlockSize),
        config.scoring.maxBonusMultiplier
      );

      await this.database.run(
        'UPDATE accounts SET fluffy_followers = ?, bonus_multiplier = ? WHERE user_id = ?',
        [fluffyFollowers, bonusMultiplier, authorId]
      );
    }

    console.log(`  ✅ Updated Fluffy followers for ${authorIds.length} accounts`);
  }

  /**
   * Calculate scores for tweets
   */
  async calculateScores(tweets) {
    let scoresComputed = 0;

    for (const tweet of tweets) {
      const account = await this.database.get('SELECT * FROM accounts WHERE user_id = ?', [tweet.authorId]);
      if (!account) continue;

      const tweetAge = (Date.now() - new Date(tweet.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      
      // Check for originality features
      const hasOriginalityFeatures = this.scoringEngine.hasOriginalityFeatures(
        tweet.text,
        false, // hasMedia
        tweet.text.includes('http'), // hasLinks
        false // isThread
      );

      const scoreComponents = this.scoringEngine.calculateTweetScore(
        {
          likes: tweet.likeCount,
          retweets: tweet.retweetCount,
          replies: tweet.replyCount,
          quotes: tweet.quoteCount,
          impressions: tweet.impressions,
        },
        {
          followersCount: account.followers_count,
          followingCount: account.following_count,
          tweetsCount: account.tweets_count,
          accountAge: this.scoringEngine.constructor.calculateAge(account.created_at),
          verified: account.verified,
          hasProfileImage: !!account.profile_image,
          fluffyFollowers: account.fluffy_followers,
          botScore: account.bot_score,
        },
        tweet.type,
        tweetAge,
        hasOriginalityFeatures
      );

      // Store score
      const scoreData = {
        userId: tweet.authorId,
        tweetId: tweet.tweetId,
        ...scoreComponents
      };

      await this.database.upsertScore(scoreData);
      scoresComputed++;
    }

    return scoresComputed;
  }

  /**
   * Generate output JSON files for the website
   */
  async generateOutputFiles() {
    const outputDir = config.output.dataDir;
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`  📁 Created output directory: ${outputDir}`);
    }

    // Generate leaderboard for different time windows
    const timeWindows = [7, 30, 90];
    const leaderboards = {};

    for (const window of timeWindows) {
      const leaderboard = await this.database.getLeaderboard(window, 1000);
      leaderboards[`${window}d`] = leaderboard;
      console.log(`  📊 Generated ${window}-day leaderboard (${leaderboard.length} users)`);
    }

    // Calculate overall stats
    const totalTweets = await this.database.get('SELECT COUNT(*) as count FROM tweets');
    const totalAccounts = await this.database.get('SELECT COUNT(*) as count FROM accounts');
    const totalScores = await this.database.get('SELECT SUM(final_score) as total FROM scores');
    
    const stats = {
      totalUsers: totalAccounts?.count || 0,
      totalTweets: totalTweets?.count || 0,
      totalScore: totalScores?.total || 0,
      avgScore: leaderboards['30d'].length > 0 ? 
        leaderboards['30d'].reduce((sum, user) => sum + user.total_score, 0) / leaderboards['30d'].length : 0,
      topFluffyFollower: leaderboards['30d'].find(user => user.fluffy_followers > 0) ? {
        username: leaderboards['30d'].find(user => user.fluffy_followers > 0).username,
        fluffyFollowers: leaderboards['30d'].find(user => user.fluffy_followers > 0).fluffy_followers
      } : null,
      processingStatus: {
        lastProcessed: new Date().toISOString(),
        status: 'idle',
        nextRun: null
      }
    };

    // Write files
    const files = {
      [config.output.leaderboardFile]: {
        generatedAt: new Date().toISOString(),
        timeWindows: leaderboards,
        stats
      },
      [config.output.statsFile]: stats,
      [config.output.lastUpdatedFile]: {
        lastUpdated: new Date().toISOString(),
        version: '1.0.0',
        totalUsers: stats.totalUsers,
        totalTweets: stats.totalTweets
      },
      [config.output.metadataFile]: {
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        config: {
          windowDays: config.processing.windowDays,
          decayLambda: config.scoring.decayLambda,
          targetAccount: config.processing.targetAccount
        },
        apiCallsUsed: this.apiCallsUsed
      }
    };

    for (const [filename, data] of Object.entries(files)) {
      const filePath = path.join(outputDir, filename);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`  ✅ Generated: ${filePath}`);
    }

    console.log(`  📊 Output files written to: ${outputDir}`);
  }
}

// Run the processor
async function main() {
  const processor = new FluffyshareProcessor();
  await processor.process();
}

// Handle unhandled errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}