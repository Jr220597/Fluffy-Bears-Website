import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

export class FluffyDatabase {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = null;
  }

  /**
   * Initialize database connection and create tables
   */
  async initialize() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          console.error('❌ Error opening database:', err.message);
          reject(err);
          return;
        }
        
        console.log('📦 Connected to SQLite database');
        this.createTables()
          .then(() => resolve())
          .catch(reject);
      });
    });
  }

  /**
   * Create necessary tables
   */
  async createTables() {
    const createTweetsTable = `
      CREATE TABLE IF NOT EXISTS tweets (
        id TEXT PRIMARY KEY,
        tweet_id TEXT UNIQUE,
        author_id TEXT,
        author_username TEXT,
        text TEXT,
        created_at DATETIME,
        type TEXT,
        retweet_count INTEGER DEFAULT 0,
        reply_count INTEGER DEFAULT 0,
        like_count INTEGER DEFAULT 0,
        quote_count INTEGER DEFAULT 0,
        impressions INTEGER,
        processed BOOLEAN DEFAULT 0,
        processed_at DATETIME
      )
    `;

    const createAccountsTable = `
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        user_id TEXT UNIQUE,
        username TEXT UNIQUE,
        display_name TEXT,
        followers_count INTEGER DEFAULT 0,
        following_count INTEGER DEFAULT 0,
        tweets_count INTEGER DEFAULT 0,
        verified BOOLEAN DEFAULT 0,
        profile_image TEXT,
        created_at DATETIME,
        description TEXT,
        bot_score REAL DEFAULT 0,
        bot_penalty REAL DEFAULT 1.0,
        fluffy_followers INTEGER DEFAULT 0,
        bonus_multiplier REAL DEFAULT 1.0,
        last_checked DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createScoresTable = `
      CREATE TABLE IF NOT EXISTS scores (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        tweet_id TEXT,
        raw_score REAL,
        engagement_score REAL,
        reach_factor REAL,
        type_multiplier REAL,
        originality_bonus REAL DEFAULT 0,
        decay_factor REAL,
        decayed_score REAL,
        bonus_multiplier REAL DEFAULT 1.0,
        bot_penalty REAL DEFAULT 1.0,
        final_score REAL,
        age_days REAL,
        computed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, tweet_id)
      )
    `;

    const createProcessingLogTable = `
      CREATE TABLE IF NOT EXISTS processing_logs (
        id TEXT PRIMARY KEY,
        process_type TEXT,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME,
        status TEXT DEFAULT 'running',
        tweets_processed INTEGER DEFAULT 0,
        accounts_updated INTEGER DEFAULT 0,
        scores_computed INTEGER DEFAULT 0,
        api_calls_used INTEGER DEFAULT 0,
        errors TEXT,
        summary TEXT
      )
    `;

    const tables = [
      createTweetsTable,
      createAccountsTable,
      createScoresTable,
      createProcessingLogTable
    ];

    for (const table of tables) {
      await this.run(table);
    }

    console.log('✅ Database tables created/verified');
  }

  /**
   * Run SQL query
   */
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.error('❌ Database error:', err.message);
          reject(err);
          return;
        }
        resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }

  /**
   * Get single row
   */
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          console.error('❌ Database error:', err.message);
          reject(err);
          return;
        }
        resolve(row);
      });
    });
  }

  /**
   * Get all rows
   */
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('❌ Database error:', err.message);
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  }

  /**
   * Insert or update tweet
   */
  async upsertTweet(tweet) {
    const sql = `
      INSERT OR REPLACE INTO tweets 
      (id, tweet_id, author_id, author_username, text, created_at, type, 
       retweet_count, reply_count, like_count, quote_count, impressions, processed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    return this.run(sql, [
      tweet.id,
      tweet.tweetId,
      tweet.authorId,
      tweet.authorUsername || '',
      tweet.text,
      tweet.createdAt,
      tweet.type,
      tweet.retweetCount,
      tweet.replyCount,
      tweet.likeCount,
      tweet.quoteCount,
      tweet.impressions,
      tweet.processed ? 1 : 0
    ]);
  }

  /**
   * Insert or update account
   */
  async upsertAccount(account) {
    const sql = `
      INSERT OR REPLACE INTO accounts 
      (id, user_id, username, display_name, followers_count, following_count, 
       tweets_count, verified, profile_image, created_at, description, 
       bot_score, bot_penalty, fluffy_followers, bonus_multiplier, last_checked)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    
    return this.run(sql, [
      account.id,
      account.userId,
      account.username,
      account.displayName,
      account.followersCount,
      account.followingCount,
      account.tweetsCount,
      account.verified ? 1 : 0,
      account.profileImage,
      account.createdAt,
      account.description,
      account.botScore,
      account.botPenalty,
      account.fluffyFollowers,
      account.bonusMultiplier
    ]);
  }

  /**
   * Insert or update score
   */
  async upsertScore(score) {
    const sql = `
      INSERT OR REPLACE INTO scores 
      (id, user_id, tweet_id, raw_score, engagement_score, reach_factor, 
       type_multiplier, originality_bonus, decay_factor, decayed_score, 
       bonus_multiplier, bot_penalty, final_score, age_days, computed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    
    const id = `${score.userId}_${score.tweetId}`;
    
    return this.run(sql, [
      id,
      score.userId,
      score.tweetId,
      score.rawScore,
      score.engagementScore,
      score.reachFactor,
      score.typeMultiplier,
      score.originalityBonus,
      score.decayFactor,
      score.decayedScore,
      score.bonusMultiplier,
      score.botPenalty,
      score.finalScore,
      score.ageDays
    ]);
  }

  /**
   * Get leaderboard data
   */
  async getLeaderboard(windowDays = 30, limit = 100) {
    const windowCutoff = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000).toISOString();

    const sql = `
      SELECT 
        s.user_id,
        a.username,
        a.display_name,
        a.verified,
        a.profile_image,
        a.fluffy_followers,
        a.bonus_multiplier,
        SUM(s.final_score) as total_score,
        COUNT(s.tweet_id) as tweet_count,
        AVG(s.final_score) as avg_score,
        ROW_NUMBER() OVER (ORDER BY SUM(s.final_score) DESC) as rank
      FROM scores s
      JOIN accounts a ON a.user_id = s.user_id
      WHERE s.computed_at >= ?
      GROUP BY s.user_id, a.username, a.display_name, a.verified, a.profile_image, 
               a.fluffy_followers, a.bonus_multiplier
      ORDER BY total_score DESC
      LIMIT ?
    `;

    return this.all(sql, [windowCutoff, limit]);
  }

  /**
   * Get user details
   */
  async getUserDetails(userId, windowDays = 30) {
    const windowCutoff = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000).toISOString();

    // Get account info
    const account = await this.get('SELECT * FROM accounts WHERE user_id = ?', [userId]);
    if (!account) return null;

    // Get scores with tweet details
    const scores = await this.all(`
      SELECT s.*, t.text, t.created_at as tweet_created_at, t.type, 
             t.like_count, t.retweet_count, t.reply_count, t.quote_count
      FROM scores s
      JOIN tweets t ON t.tweet_id = s.tweet_id
      WHERE s.user_id = ? AND s.computed_at >= ?
      ORDER BY s.final_score DESC
    `, [userId, windowCutoff]);

    const totalScore = scores.reduce((sum, score) => sum + score.final_score, 0);
    const avgScore = scores.length > 0 ? totalScore / scores.length : 0;

    return {
      account,
      totalScore,
      tweetCount: scores.length,
      avgScore,
      scores
    };
  }

  /**
   * Clean old data
   */
  async cleanOldData(retentionDays = 60) {
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();

    await this.run('DELETE FROM scores WHERE computed_at < ?', [cutoffDate]);
    await this.run('DELETE FROM tweets WHERE created_at < ?', [cutoffDate]);
    
    console.log(`🧹 Cleaned data older than ${retentionDays} days`);
  }

  /**
   * Get Fluffy mission users (mock - would connect to main database in production)
   */
  async getFluffyMissionUsers() {
    // This would normally connect to your main database
    // For now, returning empty array - you can populate this manually or connect to main DB
    return [];
  }

  /**
   * Close database connection
   */
  close() {
    return new Promise((resolve) => {
      if (this.db) {
        this.db.close((err) => {
          if (err) {
            console.error('❌ Error closing database:', err.message);
          } else {
            console.log('📦 Database connection closed');
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}