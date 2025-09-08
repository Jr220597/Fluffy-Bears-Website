import { NextRequest, NextResponse } from 'next/server';
import { FluffyBearsTracker } from '@/app/lib/fluffy-bears-tracker';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hours = parseInt(searchParams.get('hours') || '24');

    const [interactions, communityPosts, topMembers, trending] = await Promise.all([
      FluffyBearsTracker.getFluffyBearsInteractions(hours),
      FluffyBearsTracker.getCommunityPosts(hours),
      FluffyBearsTracker.getTopCommunityMembers(hours),
      FluffyBearsTracker.getTrendingContent(hours)
    ]);

    const totalInteractions = interactions.mentions.length + 
                             interactions.replies.length + 
                             interactions.retweets.length + 
                             interactions.quotes.length;

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalInteractions,
          mentions: interactions.mentions.length,
          replies: interactions.replies.length,
          retweets: interactions.retweets.length,
          quotes: interactions.quotes.length,
          communityPosts: communityPosts.length,
          activeCommunityMembers: topMembers.length
        },
        interactions: {
          mentions: interactions.mentions.slice(0, 10),
          replies: interactions.replies.slice(0, 10),
          retweets: interactions.retweets.slice(0, 5),
          quotes: interactions.quotes.slice(0, 5)
        },
        community: {
          posts: communityPosts.slice(0, 15),
          topMembers: topMembers.slice(0, 10)
        },
        trending
      }
    });

  } catch (error) {
    console.error('Error getting Fluffy Bears interactions:', error);
    return NextResponse.json(
      { error: 'Failed to get interactions data' },
      { status: 500 }
    );
  }
}