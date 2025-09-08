import { NextRequest, NextResponse } from 'next/server';
import { TwitterCache } from '@/app/lib/twitter-cache';

// Get cache information
export async function GET(request: NextRequest) {
  try {
    const cacheInfo = await TwitterCache.getCacheInfo();
    
    return NextResponse.json({
      success: true,
      data: cacheInfo
    });

  } catch (error) {
    console.error('Error getting cache info:', error);
    return NextResponse.json(
      { error: 'Failed to get cache information' },
      { status: 500 }
    );
  }
}

// Clear cache
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    if (key) {
      await TwitterCache.clear(key);
      return NextResponse.json({
        success: true,
        message: `Cache cleared for key: ${key}`
      });
    } else {
      await TwitterCache.clear();
      return NextResponse.json({
        success: true,
        message: 'All cache cleared'
      });
    }

  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}