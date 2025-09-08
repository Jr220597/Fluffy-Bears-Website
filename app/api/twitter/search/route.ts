import { NextRequest, NextResponse } from 'next/server';
import { TwitterDataService } from '@/app/lib/twitter-data-service';
import { TwitterPointsCalculator } from '@/app/lib/twitter-points';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keywords, maxTweets = 100, includeReplies = false } = body;

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: 'Keywords array is required' },
        { status: 400 }
      );
    }

    // Search through all loaded tweets using the keywords
    let tweets = await TwitterDataService.loadData();
    
    // Filter tweets by keywords
    if (keywords.length > 0) {
      tweets = tweets.filter(tweet => {
        const tweetText = tweet.text.toLowerCase();
        return keywords.some(keyword => 
          tweetText.includes(keyword.toLowerCase())
        );
      });
    }

    // Apply maxTweets limit
    if (maxTweets && maxTweets > 0) {
      tweets = tweets.slice(0, maxTweets);
    }

    // Filter replies if not included
    if (!includeReplies) {
      tweets = tweets.filter(tweet => !tweet.isReply);
    }

    const tweetsWithPoints = tweets.map(tweet => ({
      ...tweet,
      points: TwitterPointsCalculator.calculateTweetPoints(tweet)
    }));

    return NextResponse.json({
      success: true,
      data: {
        tweets: tweetsWithPoints,
        totalTweets: tweetsWithPoints.length,
        totalPoints: tweetsWithPoints.reduce((sum, tweet) => sum + tweet.points.totalPoints, 0)
      }
    });

  } catch (error) {
    console.error('Error searching tweets:', error);
    return NextResponse.json(
      { error: 'Failed to search tweets' },
      { status: 500 }
    );
  }
}