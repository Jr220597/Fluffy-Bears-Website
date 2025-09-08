import { NextRequest, NextResponse } from 'next/server';
// Prisma disabled for Vercel deployment
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export async function GET() {
  try {
    // Return empty data for Vercel deployment
    return NextResponse.json({
      success: true,
      data: {
        users: [],
        stats: {
          totalUsers: 0,
          todayUsers: 0,
          lastRegistration: null
        }
      }
    });

  } catch (error) {
    console.error('Error fetching whitelist data:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// Endpoint para exportar CSV
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'export-csv') {
      // Return empty CSV for Vercel deployment
      const csvHeader = 'ID,Twitter Username,Wallet Address,Completed At\n';
      const csv = csvHeader;

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="fluffy-bears-whitelist.csv"'
        }
      });
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Action not recognized' 
    }, { status: 400 });

  } catch (error) {
    console.error('Error in administration action:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}