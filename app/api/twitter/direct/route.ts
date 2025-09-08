import { NextRequest, NextResponse } from 'next/server';
import { ApifyDirectService } from '@/app/lib/apify-direct';
import { TwitterPointsCalculator } from '@/app/lib/twitter-points';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datasetId = searchParams.get('datasetId') || 'e9N7PTX7LRlAiCVMn'; // Dataset ID do Fluffy Bears (106 resultados)
    const hours = parseInt(searchParams.get('hours') || '24');

    const tweets = await ApifyDirectService.monitorFluffyBearsMentions(datasetId);
    
    // Filter recent tweets
    const cutoffTime = Date.now() - hours * 60 * 60 * 1000;
    const recentTweets = tweets.filter(tweet => 
      new Date(tweet.createdAt).getTime() > cutoffTime
    );

    const qualityTweets = TwitterPointsCalculator.filterQualityTweets(recentTweets, 20);
    const userActivity = TwitterPointsCalculator.calculateUserActivity(recentTweets);
    const leaderboard = TwitterPointsCalculator.generateLeaderboard(userActivity);
    const trendingHashtags = TwitterPointsCalculator.getTrendingHashtags(recentTweets);

    // Create leaderboard data format for compatibility
    const leaderboardData = leaderboard.slice(0, 20).map((user, index) => ({
      username: user.username,
      totalPoints: user.totalPoints,
      tweets: user.tweets,
      rank: index + 1,
      pointsPerTweet: user.pointsPerTweet,
      avgEngagement: user.avgEngagement
    }));

    return NextResponse.json({
      success: true,
      data: {
        // Monitor format
        totalTweets: recentTweets.length,
        qualityTweets: qualityTweets.length,
        topUsers: leaderboard.slice(0, 10),
        trendingHashtags,
        recentActivity: recentTweets.slice(0, 20).map(tweet => ({
          ...tweet,
          points: TwitterPointsCalculator.calculateTweetPoints(tweet),
          engagementRate: TwitterPointsCalculator.calculateEngagementRate(tweet)
        })),
        // Leaderboard format
        leaderboard: leaderboardData,
        period: `${hours}h`,
        totalParticipants: Object.keys(userActivity).length,
        totalPoints: leaderboardData.reduce((sum, user) => sum + user.totalPoints, 0)
      }
    });

  } catch (error) {
    console.error('Error with direct Apify access:', error);
    return NextResponse.json(
      { error: 'Failed to get data from Apify' },
      { status: 500 }
    );
  }
}