import { NextRequest, NextResponse } from 'next/server';
import { FluffyBearsTracker } from '@/app/lib/fluffy-bears-tracker';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const maxTweets = parseInt(searchParams.get('maxTweets') || '50');

    const [profileActivity, engagementAnalytics] = await Promise.all([
      FluffyBearsTracker.getOfficialProfileActivity(maxTweets),
      FluffyBearsTracker.getProfileEngagementAnalytics()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        recentActivity: profileActivity.slice(0, 10),
        analytics: engagementAnalytics,
        profile: {
          username: 'Fluffy_Bearss',
          name: 'Fluffy Bears',
          verified: profileActivity[0]?.author.verified || false,
          followers: profileActivity[0]?.author.followers || 0
        }
      }
    });

  } catch (error) {
    console.error('Error getting Fluffy Bears profile data:', error);
    return NextResponse.json(
      { error: 'Failed to get profile data' },
      { status: 500 }
    );
  }
}