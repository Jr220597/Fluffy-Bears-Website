# 🍯 Fluffyshare - Mindshare Ranking System

A sophisticated mindshare ranking system that tracks and scores Twitter mentions of @Fluffy_Bearss using social engagement metrics, exponential decay, and Fluffy Followers bonuses.

## ✨ Features

- **Real-time Leaderboard**: Dynamic ranking with 7, 30, and 90-day windows
- **Advanced Scoring**: Engagement-based scoring with exponential decay
- **Fluffy Followers Bonus**: Additional multipliers for community members
- **Bot Detection**: Anti-abuse measures and spam filtering
- **Beautiful UI**: Modern, responsive interface inspired by cookie.fun
- **Export Functionality**: CSV/JSON data export capabilities
- **Automated Processing**: Daily batch processing with cron jobs

## 🏗️ System Architecture

### Core Components

1. **Twitter API Integration** (`fluffyshare-twitter-api.ts`)
   - Fetches @Fluffy_Bearss mentions using twitterapi.io
   - Handles rate limiting and exponential backoff
   - Batch user lookups and tweet metrics collection

2. **Scoring Engine** (`fluffyshare-scoring.ts`)
   - Logarithmic engagement scoring
   - Exponential decay (meia-vida ~13.9 days)
   - Type-based multipliers (original, quote, retweet, reply)
   - Bot detection heuristics

3. **Data Processor** (`fluffyshare-processor.ts`)
   - Daily batch processing pipeline
   - Fluffy Followers bonus calculation
   - Data cleaning and deduplication

4. **Leaderboard UI** (`/twitter-game`)
   - Modern, responsive design
   - User search and filtering
   - Detailed user breakdowns
   - Real-time score visualization

## 📊 Scoring Formula

```
engagement_score = α×log(likes+1) + β×log(retweets+1) + γ×log(replies+1) + δ×log(quotes+1)
reach_factor = log(followers+1)
score_raw = type_multiplier + engagement_score + C×reach_factor + originality_bonus

decay_factor = exp(-λ × age_days)
decayed_score = score_raw × decay_factor

fluffy_bonus = 1 + 0.1 × floor(fluffy_followers / 10)
bot_penalty = bot_score > 0.7 ? 0.5 : 1.0

final_score = decayed_score × fluffy_bonus × bot_penalty
```

### Default Parameters

- **Type Multipliers**: Original=1.0, Quote=0.9, Retweet=0.4, Reply=0.7
- **Engagement Weights**: Likes=1.0, Retweets=1.2, Replies=1.5, Quotes=1.0
- **Decay Lambda**: 0.05 (13.9 day half-life)
- **Daily Cap**: 500 points per account
- **Fluffy Bonus**: 10% per 10 Fluffy Followers (max 2.0x)

## 🚀 Setup & Configuration

### Environment Variables

```bash
# Required
TWITTER_API_KEY=your_twitterapi_io_key

# Optional (with defaults)
FLUFFYSHARE_DECAY_LAMBDA=0.05
FLUFFYSHARE_DAILY_CAP=500
FLUFFYSHARE_MAX_BONUS=2.0
FLUFFYSHARE_CRON_SCHEDULE="0 3 * * *"
FLUFFYSHARE_TIMEZONE=UTC
FLUFFYSHARE_WINDOW_DAYS=30
FLUFFYSHARE_MAX_TWEETS=2000
FLUFFYSHARE_RETENTION_DAYS=60
```

### Database Schema

The system uses Prisma with the following models:

- `FluffyTweet`: Tweet data and metrics
- `FluffyAccount`: User account information
- `FluffyScore`: Calculated scores with decay
- `FluffyProcessingLog`: Processing execution logs
- `FluffyConfig`: Configuration storage

### Installation

```bash
# Install dependencies
npm install node-cron @types/node-cron

# Generate Prisma client
npx prisma generate

# Push database schema
DATABASE_URL="file:./dev.db" npx prisma db push
```

## 🔄 Daily Processing Pipeline

1. **Fetch Mentions**: Search for @Fluffy_Bearss mentions (last 48h)
2. **Process Accounts**: Update user metrics and bot scores
3. **Update Fluffy Followers**: Calculate bonus multipliers
4. **Calculate Scores**: Apply scoring formula with decay
5. **Clean Old Data**: Remove data beyond retention period

### Manual Processing

```bash
# Trigger via API
POST /api/fluffyshare/process
{
  "type": "manual_trigger",
  "maxTweets": 1000,
  "windowHours": 24
}
```

## 📈 API Endpoints

### GET `/api/fluffyshare/leaderboard`
```
Query params: window=30, limit=100
Returns: leaderboard data with stats
```

### GET `/api/fluffyshare/user/[userId]`
```
Query params: window=30
Returns: user details with tweet breakdown
```

### POST `/api/fluffyshare/process`
```
Body: { type: "manual_trigger", maxTweets: 1000 }
Returns: processing result and metrics
```

### GET `/api/fluffyshare/export`
```
Query params: format=csv, window=30, limit=1000
Returns: CSV or JSON export
```

## 🛡️ Anti-Abuse Measures

### Bot Detection Heuristics

- Account age (< 30 days = penalty)
- Follower/following ratio (< 0.1 = penalty)
- Missing profile image = penalty
- High tweet frequency (> 50/day = penalty)
- Verified accounts get reduced bot scores

### Rate Limiting

- Exponential backoff on API failures
- Respect Twitter API rate limits
- Daily caps per account
- Processing frequency limits

## 🎨 UI Features

### Leaderboard View
- **Podium Display**: Top 3 users with special styling
- **Search & Filter**: Real-time user search
- **Time Windows**: 7, 30, 90-day periods
- **Score Breakdown**: Detailed scoring components
- **User Modals**: Click-through user details

### Stats Dashboard
- Total users and tweets
- Score distributions
- Processing status
- Top Fluffy Followers

### Processing Panel
- Manual trigger controls
- Processing history
- System health metrics
- Configuration overview

## 🔧 Configuration

### Scoring Parameters
```typescript
// Adjust in fluffyshare-config.ts
scoring: {
  decayLambda: 0.05,        // Decay rate
  dailyCapPerAccount: 500,   // Max points per user per day
  maxBonusMultiplier: 2.0,   // Max Fluffy bonus
  botScoreThreshold: 0.7,    // Bot detection threshold
}
```

### Processing Settings
```typescript
processing: {
  cronSchedule: '0 3 * * *', // Daily at 3 AM UTC
  windowDays: 30,            // Default leaderboard window
  maxTweetsPerBatch: 2000,   // Max tweets per processing run
  retentionDays: 60,         // Data retention period
}
```

## 📊 Performance Metrics

### Expected Throughput
- **Tweets**: ~2000 per daily batch
- **Users**: ~500 unique accounts
- **Processing Time**: ~5-10 minutes per batch
- **API Calls**: ~50-100 per batch

### Database Size Estimates
- **Tweets**: ~60k records (30 days)
- **Accounts**: ~5k records
- **Scores**: ~60k records (30 days)
- **Total Storage**: ~100-200MB

## 🚨 Monitoring & Alerts

### Key Metrics to Monitor
- Processing success rate
- API error rates
- Score calculation accuracy
- Bot detection effectiveness
- Data freshness

### Log Locations
- Processing logs: `FluffyProcessingLog` table
- API errors: Console logs
- Cron status: Application logs

## 🔄 Maintenance

### Weekly Tasks
- Review bot detection accuracy
- Check API quota usage
- Monitor score distributions
- Validate data quality

### Monthly Tasks
- Analyze scoring effectiveness
- Review parameter tuning
- Update bot detection rules
- Performance optimization

## 📄 License

This Fluffyshare system is part of the Fluffy Bears project. All rights reserved.