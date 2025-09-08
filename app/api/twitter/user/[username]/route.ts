import { NextRequest, NextResponse } from 'next/server';
import { TwitterDataService } from '@/app/lib/twitter-data-service';
import { TwitterPointsCalculator } from '@/app/lib/twitter-points';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const { searchParams } = new URL(request.url);
    const maxTweets = parseInt(searchParams.get('maxTweets') || '100');

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Get user tweets from XLSX data
    let userTweets = await TwitterDataService.getUserTweets(username);
    
    // Apply maxTweets limit
    if (maxTweets && maxTweets > 0) {
      userTweets = userTweets.slice(0, maxTweets);
    }
    
    // Filter Fluffy Bears related tweets
    const fluffyBearsTweets = userTweets.filter(tweet => {
      const textLower = tweet.text.toLowerCase();
      return textLower.includes('fluffy bears') ||
             textLower.includes('fluffybears') ||
             textLower.includes('#fluffybears') ||
             textLower.includes('@fluffy_bearss') ||
             textLower.includes('fluffy_bearss') ||
             tweet.mentions.some(mention => mention.toLowerCase().includes('fluffy_bearss'));
    });

    const userActivity = TwitterPointsCalculator.calculateUserActivity(fluffyBearsTweets);
    const userStats = userActivity[username];

    if (!userStats) {
      return NextResponse.json({
        success: true,
        data: {
          username,
          totalPoints: 0,
          totalTweets: 0,
          fluffyBearsTweets: 0,
          avgEngagement: 0,
          bestTweet: null,
          recentTweets: [],
          rankingPosition: null
        }
      });
    }

    const tweetsWithPoints = fluffyBearsTweets.map(tweet => ({
      ...tweet,
      points: TwitterPointsCalculator.calculateTweetPoints(tweet),
      engagementRate: TwitterPointsCalculator.calculateEngagementRate(tweet)
    }));

    return NextResponse.json({
      success: true,
      data: {
        username,
        totalPoints: userStats.totalPoints,
        totalTweets: userTweets.length,
        fluffyBearsTweets: fluffyBearsTweets.length,
        avgEngagement: userStats.avgEngagement,
        bestTweet: userStats.bestTweet,
        pointsPerTweet: Math.floor(userStats.totalPoints / userStats.tweets),
        recentTweets: tweetsWithPoints.slice(0, 10),
        breakdown: userStats.breakdown
      }
    });

  } catch (error) {
    console.error(`Error getting user stats for ${params.username}:`, error);
    return NextResponse.json(
      { error: 'Failed to get user stats' },
      { status: 500 }
    );
  }
}