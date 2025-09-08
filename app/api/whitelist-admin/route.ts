import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Buscar todos os usuários da whitelist
    const users = await prisma.fluffyMissionUser.findMany({
      orderBy: {
        completedAt: 'desc'
      }
    });

    // Estatísticas
    const totalUsers = users.length;
    const todayUsers = users.filter(user => {
      const today = new Date();
      const userDate = new Date(user.completedAt);
      return userDate.toDateString() === today.toDateString();
    }).length;

    return NextResponse.json({
      success: true,
      data: {
        users,
        stats: {
          totalUsers,
          todayUsers,
          lastRegistration: users[0]?.completedAt || null
        }
      }
    });

  } catch (error) {
    console.error('Error fetching whitelist data:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Endpoint para exportar CSV
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'export-csv') {
      const users = await prisma.fluffyMissionUser.findMany({
        orderBy: {
          completedAt: 'desc'
        }
      });

      // Generate CSV
      const csvHeader = 'ID,Twitter Username,Wallet Address,Completed At\n';
      const csvData = users.map(user => 
        `${user.id},"${user.twitterUsername}","${user.walletAddress}","${user.completedAt.toISOString()}"`
      ).join('\n');

      const csv = csvHeader + csvData;

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
  } finally {
    await prisma.$disconnect();
  }
}