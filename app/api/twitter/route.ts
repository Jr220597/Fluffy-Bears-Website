import { NextRequest, NextResponse } from 'next/server';
import { TwitterDataService } from '@/app/lib/twitter-data-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'stats';

    switch (action) {
      case 'stats':
        const stats = await TwitterDataService.getStatistics();
        return NextResponse.json({
          success: true,
          data: stats
        });

      case 'leaderboard':
        const leaderboard = await TwitterDataService.getLeaderboard();
        return NextResponse.json({
          success: true,
          data: {
            leaderboard: leaderboard.slice(0, 50),
            totalParticipants: leaderboard.length
          }
        });

      case 'recent':
        const hours = parseInt(searchParams.get('hours') || '24');
        const recent = await TwitterDataService.getRecentTweets(hours);
        return NextResponse.json({
          success: true,
          data: {
            tweets: recent,
            count: recent.length,
            period: `${hours} hours`
          }
        });

      case 'high_engagement':
        const minEngagement = parseInt(searchParams.get('min') || '50');
        const highEngagement = await TwitterDataService.getHighEngagementTweets(minEngagement);
        return NextResponse.json({
          success: true,
          data: {
            tweets: highEngagement,
            count: highEngagement.length,
            minEngagement
          }
        });

      case 'refresh':
        await TwitterDataService.refreshData();
        return NextResponse.json({
          success: true,
          message: 'Data refreshed successfully'
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: stats, leaderboard, recent, high_engagement, refresh' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in Twitter API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, query } = body;

    switch (action) {
      case 'search':
        if (!query) {
          return NextResponse.json(
            { error: 'Query is required for search' },
            { status: 400 }
          );
        }
        
        const searchResults = await TwitterDataService.searchTweets(query);
        return NextResponse.json({
          success: true,
          data: {
            tweets: searchResults,
            count: searchResults.length,
            query
          }
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: search' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in Twitter POST API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}