import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const windowDays = parseInt(searchParams.get('window') || '30');
    const limit = parseInt(searchParams.get('limit') || '1000');

    // Validate parameters
    if (!['json', 'csv'].includes(format)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid format. Must be "json" or "csv"'
      }, { status: 400 });
    }

    if (![7, 30, 90].includes(windowDays)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid time window. Must be 7, 30, or 90 days'
      }, { status: 400 });
    }

    // Read static data files
    const dataPath = path.join(process.cwd(), 'public', 'data', 'fluffyshare', 'leaderboard.json');
    
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({
        success: false,
        error: 'Export data not available. Please run the processor first.'
      }, { status: 404 });
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // Get leaderboard for requested time window
    const windowKey = `${windowDays}d`;
    const fullLeaderboard = data.timeWindows[windowKey] || [];
    const leaderboard = fullLeaderboard.slice(0, limit);

    if (format === 'csv') {
      // Generate CSV
      const csvHeader = 'Rank,Username,Display Name,Total Score,Tweet Count,Avg Score,Fluffy Followers,Bonus Multiplier,Verified\\n';
      const csvData = leaderboard.map((user: any, index: number) => 
        `${index + 1},"${user.username}","${user.display_name || ''}",${user.total_score},${user.tweet_count},${parseFloat(user.avg_score).toFixed(2)},${user.fluffy_followers},${parseFloat(user.bonus_multiplier).toFixed(2)},${user.verified === 1}`
      ).join('\\n');

      const csv = csvHeader + csvData;
      const filename = `fluffyshare-leaderboard-${windowDays}d-${new Date().toISOString().split('T')[0]}.csv`;

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`
        }
      });
    }

    // JSON format
    const filename = `fluffyshare-leaderboard-${windowDays}d-${new Date().toISOString().split('T')[0]}.json`;
    
    return new NextResponse(JSON.stringify({
      exportedAt: new Date().toISOString(),
      generatedAt: data.generatedAt,
      timeWindow: windowDays,
      totalUsers: leaderboard.length,
      leaderboard: leaderboard
    }, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });

  } catch (error) {
    console.error('Error exporting Fluffyshare data:', error);
    return NextResponse.json({
      success: false,
      error: 'Error reading export data'
    }, { status: 500 });
  }
}