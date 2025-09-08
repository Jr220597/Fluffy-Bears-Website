import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // In the static file approach, processing happens offline
    // This endpoint just checks if data exists and when it was last updated
    
    const dataPath = path.join(process.cwd(), 'public', 'data', 'fluffyshare', 'last-updated.json');
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'fluffyshare', 'metadata.json');
    
    let lastUpdated = null;
    let metadata = null;
    
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath, 'utf8');
      lastUpdated = JSON.parse(rawData);
    }
    
    if (fs.existsSync(metadataPath)) {
      const rawMetadata = fs.readFileSync(metadataPath, 'utf8');
      metadata = JSON.parse(rawMetadata);
    }

    return NextResponse.json({
      success: true,
      message: 'Processing is handled by the local processor app',
      lastUpdated: lastUpdated?.lastUpdated || null,
      dataAvailable: fs.existsSync(path.join(process.cwd(), 'public', 'data', 'fluffyshare', 'leaderboard.json')),
      metadata,
      instructions: {
        step1: 'Run the local processor: cd fluffyshare-processor && npm start',
        step2: 'Copy generated files from fluffyshare-processor/../public/data/fluffyshare/ to your public/data/fluffyshare/',
        step3: 'Deploy to Vercel'
      }
    });

  } catch (error) {
    console.error('Error checking processing status:', error);
    return NextResponse.json({
      success: false,
      error: 'Error checking data status'
    }, { status: 500 });
  }
}