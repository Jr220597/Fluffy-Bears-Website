import { NextRequest, NextResponse } from 'next/server';
import { ApifyTwitterService } from '@/app/lib/apify-twitter';
import { TwitterPointsCalculator } from '@/app/lib/twitter-points';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hours = parseInt(searchParams.get('hours') || '24');

    const tweets = await ApifyTwitterService.monitorFluffyBearsMentions(hours);
    
    const qualityTweets = TwitterPointsCalculator.filterQualityTweets(tweets, 20);
    const userActivity = TwitterPointsCalculator.calculateUserActivity(tweets);
    const leaderboard = TwitterPointsCalculator.generateLeaderboard(userActivity);
    const trendingHashtags = TwitterPointsCalculator.getTrendingHashtags(tweets);

    return NextResponse.json({
      success: true,
      data: {
        totalTweets: tweets.length,
        qualityTweets: qualityTweets.length,
        topUsers: leaderboard.slice(0, 10),
        trendingHashtags,
        recentActivity: tweets.slice(0, 20).map(tweet => ({
          ...tweet,
          points: TwitterPointsCalculator.calculateTweetPoints(tweet),
          engagementRate: TwitterPointsCalculator.calculateEngagementRate(tweet)
        }))
      }
    });

  } catch (error) {
    console.error('Error monitoring Fluffy Bears mentions:', error);
    return NextResponse.json(
      { error: 'Failed to monitor tweets' },
      { status: 500 }
    );
  }
}