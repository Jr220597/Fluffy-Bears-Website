import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const windowDays = parseInt(searchParams.get('window') || '30');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Validate parameters
    if (![7, 30, 90].includes(windowDays)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid time window. Must be 7, 30, or 90 days'
      }, { status: 400 });
    }

    if (limit < 1 || limit > 1000) {
      return NextResponse.json({
        success: false,
        error: 'Invalid limit. Must be between 1 and 1000'
      }, { status: 400 });
    }

    // Read static data files
    const dataPath = path.join(process.cwd(), 'public', 'data', 'fluffyshare', 'leaderboard.json');
    
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({
        success: false,
        error: 'Leaderboard data not available. Please run the processor first.',
        hint: 'Run the local processor app to generate data files'
      }, { status: 404 });
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // Get leaderboard for requested time window
    const windowKey = `${windowDays}d`;
    const fullLeaderboard = data.timeWindows[windowKey] || [];
    
    // Apply limit
    const leaderboard = fullLeaderboard.slice(0, limit).map((user: any, index: number) => ({
      userId: user.user_id,
      username: user.username,
      displayName: user.display_name,
      totalScore: parseFloat(user.total_score),
      tweetCount: parseInt(user.tweet_count),
      avgScore: parseFloat(user.avg_score),
      fluffyFollowers: parseInt(user.fluffy_followers),
      bonusMultiplier: parseFloat(user.bonus_multiplier),
      verified: user.verified === 1,
      profileImage: user.profile_image,
      rank: index + 1
    }));

    return NextResponse.json({
      success: true,
      leaderboard,
      stats: data.stats,
      timeWindow: windowDays,
      limit: limit,
      generatedAt: data.generatedAt
    });

  } catch (error) {
    console.error('Error fetching Fluffyshare leaderboard:', error);
    return NextResponse.json({
      success: false,
      error: 'Error reading leaderboard data'
    }, { status: 500 });
  }
}