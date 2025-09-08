import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const windowDays = parseInt(searchParams.get('window') || '30');
    const userId = params.userId;

    // Validate parameters
    if (![7, 30, 90].includes(windowDays)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid time window. Must be 7, 30, or 90 days'
      }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User ID is required'
      }, { status: 400 });
    }

    // Read static data files
    const dataPath = path.join(process.cwd(), 'public', 'data', 'fluffyshare', 'leaderboard.json');
    
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({
        success: false,
        error: 'User data not available. Please run the processor first.'
      }, { status: 404 });
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // Find user in leaderboard data
    const windowKey = `${windowDays}d`;
    const leaderboard = data.timeWindows[windowKey] || [];
    const user = leaderboard.find((u: any) => u.user_id === userId);

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found in current leaderboard'
      }, { status: 404 });
    }

    // Mock user details structure (in production, you'd have more detailed data)
    const userDetails = {
      account: {
        username: user.username,
        displayName: user.display_name,
        verified: user.verified === 1,
        followersCount: user.followers_count || 0,
        fluffyFollowers: user.fluffy_followers,
        bonusMultiplier: user.bonus_multiplier,
        botScore: 0, // Would be in detailed data
        profileImage: user.profile_image,
      },
      totalScore: parseFloat(user.total_score),
      tweetCount: parseInt(user.tweet_count),
      avgScore: parseFloat(user.avg_score),
      scores: [] // Would contain tweet breakdown in production
    };

    return NextResponse.json({
      success: true,
      user: userDetails,
      timeWindow: windowDays
    });

  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({
      success: false,
      error: 'Error reading user data'
    }, { status: 500 });
  }
}