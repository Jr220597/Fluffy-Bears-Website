# Fluffyshare Data Processor

Local processing application that generates daily Fluffyshare mindshare rankings and exports data for the main Vercel site.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```
   
   Required environment variables:
   - `TWITTER_API_KEY`: Your TwitterAPI.io key

3. **Database Setup**
   ```bash
   # Initialize database
   npx prisma migrate dev --name init
   
   # Generate Prisma client
   npx prisma generate
   ```

## Daily Workflow

### Automated Complete Workflow
Run the complete processing and sync workflow:
```bash
node run-and-sync.js
```

This will:
1. Process Twitter data and update rankings
2. Export JSON files to `../public/data/fluffyshare/`
3. Display deployment instructions

### Manual Steps

1. **Process Data**
   ```bash
   node index.js
   ```

2. **Sync Files** 
   ```bash
   node sync-data.js
   ```

## Generated Files

The processor creates these files in `../public/data/fluffyshare/`:

- `leaderboard.json` - Top 100 ranked users with scores and tweet data
- `stats.json` - Global statistics (total users, tweets, processing time)
- `last-updated.json` - Timestamp and basic counts
- `metadata.json` - Configuration and processing metadata

## Deployment to Vercel

After running the processor and sync:

1. **Navigate to main site**
   ```bash
   cd ..
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Verify deployment**
   Visit: `https://your-site.vercel.app/twitter-game`

## Configuration Options

Environment variables for fine-tuning (optional):

```env
FLUFFYSHARE_DECAY_LAMBDA=0.05          # Decay rate (13.9 day half-life)
FLUFFYSHARE_DAILY_CAP=500              # Max daily score per user
FLUFFYSHARE_MAX_BONUS=2.0              # Maximum Fluffy Followers bonus
FLUFFYSHARE_WINDOW_DAYS=30             # Data collection window
FLUFFYSHARE_MAX_TWEETS=2000            # Max tweets per batch
FLUFFYSHARE_RETENTION_DAYS=60          # Data retention period
```

## Scoring Algorithm

- **Base Score**: Logarithmic engagement (likes + retweets + replies)
- **Exponential Decay**: Recent tweets weighted more heavily
- **Fluffy Followers Bonus**: +10% per 10 followers of @Fluffy_Bearss
- **Anti-Gaming**: Bot detection and daily caps prevent abuse

## Database Schema

- `FluffyTweet`: Individual tweet records with engagement data
- `FluffyAccount`: User profiles with follower counts and verification
- `FluffyScore`: Daily calculated scores with decay factors
- `FluffyProcessingLog`: Processing history and error tracking
- `FluffyConfig`: System configuration parameters

## Troubleshooting

**Rate Limiting**: The system uses exponential backoff for Twitter API calls. If you hit rate limits, processing will slow down but continue.

**Database Issues**: Use `npx prisma db push` to sync schema changes or `npx prisma migrate reset` to start fresh.

**Missing Data**: Check that your `TWITTER_API_KEY` is valid and has sufficient quota.

## Architecture

This hybrid approach solves Vercel's limitations:

- **Local Processing**: Handles heavy computation, database operations, and API calls
- **Static Export**: Generates JSON files that Vercel can serve efficiently  
- **Serverless Frontend**: Vercel site consumes static data with fast response times

The main site's API routes in `/app/api/fluffyshare/` read from these static JSON files instead of doing live database queries.