import { NextRequest, NextResponse } from 'next/server';
import { TwitterFileService } from '@/app/lib/twitter-file-service';
import { TwitterPointsCalculator } from '@/app/lib/twitter-points';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hours = parseInt(searchParams.get('hours') || '24');
    const period = searchParams.get('period') || '24h';
    const refresh = searchParams.get('refresh') === 'true';
    
    // Ler tweets do arquivo XLSX
    const allTweets = await TwitterFileService.loadData(refresh);
    
    // Para o dashboard, sempre usar todos os dados
    // Para top users 24h, usar dados filtrados
    const tweetsToProcess = period === 'all' ? allTweets : 
      (hours < 168 ? await TwitterFileService.getRecentTweets(hours) : allTweets);

    // Dados gerais do dashboard (todo o período)
    const allQualityTweets = TwitterPointsCalculator.filterQualityTweets(allTweets, 20);
    const allUserActivity = TwitterPointsCalculator.calculateUserActivity(allTweets);
    const allLeaderboard = TwitterPointsCalculator.generateLeaderboard(allUserActivity);
    const allTrendingHashtags = TwitterPointsCalculator.getTrendingHashtags(allTweets);

    // Top users específico de 24h
    const recentTweets24h = await TwitterFileService.getRecentTweets(24);
    const recentUserActivity24h = TwitterPointsCalculator.calculateUserActivity(recentTweets24h);
    const topUsers24h = TwitterPointsCalculator.generateLeaderboard(recentUserActivity24h);

    // Dados para leaderboard (usar tweetsToProcess baseado no parâmetro period)
    const qualityTweets = TwitterPointsCalculator.filterQualityTweets(tweetsToProcess, 20);
    const userActivity = TwitterPointsCalculator.calculateUserActivity(tweetsToProcess);
    const leaderboard = TwitterPointsCalculator.generateLeaderboard(userActivity);
    const trendingHashtags = TwitterPointsCalculator.getTrendingHashtags(tweetsToProcess);

    // Criar dados do leaderboard para compatibilidade
    const limit = parseInt(searchParams.get('limit') || '20');
    const leaderboardData = leaderboard.slice(0, limit).map((user, index) => ({
      username: user.username,
      totalPoints: user.totalPoints,
      tweets: user.tweets,
      rank: index + 1,
      pointsPerTweet: user.pointsPerTweet,
      avgEngagement: user.avgEngagement
    }));

    // Obter informações do arquivo XLSX
    const fileExists = allTweets.length > 0;
    const lastUpdated = new Date(); // Para XLSX, consideramos sempre atualizado quando carregado

    return NextResponse.json({
      success: true,
      data: {
        // Formato do dashboard (dados gerais de todo o período)
        totalTweets: allTweets.length,
        qualityTweets: allQualityTweets.length,
        topUsers: topUsers24h.slice(0, 10), // Apenas top users são de 24h
        trendingHashtags: allTrendingHashtags,
        recentActivity: allTweets.slice(-20).reverse().map(tweet => ({
          ...tweet,
          points: TwitterPointsCalculator.calculateTweetPoints(tweet),
          engagementRate: TwitterPointsCalculator.calculateEngagementRate(tweet)
        })),
        // Formato do leaderboard (baseado no parâmetro period)
        leaderboard: leaderboardData,
        period: period === 'all' ? 'Todos os tempos' : `${hours}h`,
        totalParticipants: Object.keys(userActivity).length,
        totalPoints: leaderboardData.reduce((sum, user) => sum + user.totalPoints, 0),
        // Informações do arquivo
        fileInfo: {
          lastUpdated: lastUpdated.toISOString(),
          totalTweetsInFile: allTweets.length,
          fileExists: fileExists
        }
      }
    });

  } catch (error) {
    console.error('Erro ao processar arquivo de dados:', error);
    return NextResponse.json(
      { 
        error: 'Falha ao processar dados do arquivo', 
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// Endpoint para obter informações sobre o arquivo XLSX
export async function POST(request: NextRequest) {
  try {
    const allTweets = await TwitterFileService.loadData();
    
    return NextResponse.json({
      success: true,
      fileInfo: {
        exists: allTweets.length > 0,
        lastModified: new Date().toISOString(),
        tweetsCount: allTweets.length
      }
    });

  } catch (error) {
    console.error('Erro ao obter informações do arquivo XLSX:', error);
    return NextResponse.json(
      { error: 'Falha ao obter informações do arquivo XLSX' },
      { status: 500 }
    );
  }
}