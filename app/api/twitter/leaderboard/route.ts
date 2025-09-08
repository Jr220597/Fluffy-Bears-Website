import { NextRequest, NextResponse } from 'next/server';
import { TwitterDataService } from '@/app/lib/twitter-data-service';
import { TwitterPointsCalculator } from '@/app/lib/twitter-points';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7'; // days
    const limit = parseInt(searchParams.get('limit') || '50');

    // Load all tweets from XLSX and filter by period if needed
    const tweets = parseInt(period) < 365 ? 
      await TwitterDataService.getRecentTweets(parseInt(period) * 24) : 
      await TwitterDataService.loadData();

    const userActivity = TwitterPointsCalculator.calculateUserActivity(tweets);
    const leaderboard = TwitterPointsCalculator.generateLeaderboard(userActivity);

    const enhancedLeaderboard = leaderboard.slice(0, limit).map((user, index) => ({
      ...user,
      rank: index + 1,
      badges: [],
      achievements: {
        mostEngagedTweet: user.bestTweet,
        avgEngagementRate: user.avgEngagement,
        consistencyScore: Math.min(100, (user.tweets / parseInt(period)) * 10)
      }
    }));

    return NextResponse.json({
      success: true,
      data: {
        leaderboard: enhancedLeaderboard,
        period: `${period} days`,
        totalParticipants: Object.keys(userActivity).length,
        totalTweets: tweets.length,
        totalPoints: enhancedLeaderboard.reduce((sum, user) => sum + user.totalPoints, 0)
      }
    });

  } catch (error) {
    console.error('Error generating leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to generate leaderboard' },
      { status: 500 }
    );
  }
}