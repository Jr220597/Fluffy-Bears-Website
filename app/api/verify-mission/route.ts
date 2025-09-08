import { NextRequest, NextResponse } from 'next/server';

interface TwitterAPIResponse {
  data?: {
    liked?: boolean;
    retweeted?: boolean;
  };
  error?: string;
}

interface VerifyMissionRequest {
  twitterUsername: string;
  walletAddress: string;
  postId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { twitterUsername, walletAddress, postId }: VerifyMissionRequest = await request.json();
    
    if (!twitterUsername || !walletAddress || !postId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Required data missing' 
      }, { status: 400 });
    }

    const twitterApiKey = process.env.TWITTER_API_KEY;
    
    if (!twitterApiKey) {
      console.error('TWITTER_API_KEY not configured');
      return NextResponse.json({ 
        success: false, 
        message: 'Twitter API configuration not found' 
      }, { status: 500 });
    }

    // Remover @ do username se existir
    const cleanUsername = twitterUsername.replace('@', '');
    
    // Verificar apenas o retweet, que é verificável de forma confiável
    const retweeted = await verifyRetweet(cleanUsername, postId, twitterApiKey);
    
    if (retweeted) {
      return NextResponse.json({
        success: true,
        verified: true,
        message: 'Verification completed successfully! Retweet confirmed! 🎉'
      });
    } else {
      return NextResponse.json({
        success: true,
        verified: false,
        message: 'Verification failed: Please like and retweet the special Fluffy Bears post to complete the mission.',
        details: { liked: 'not_checked', retweeted: false }
      });
    }
    
  } catch (error) {
    console.error('Error in mission verification:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error when verifying mission' 
    }, { status: 500 });
  }
}

async function verifyLike(username: string, postId: string, apiKey: string): Promise<boolean> {
  try {
    // Infelizmente, a API twitterapi.io não tem endpoint específico para "liking_users"
    // Vamos verificar se o usuário existe e se o tweet existe como indicador básico
    
    const userResponse = await fetch(`https://api.twitterapi.io/twitter/user/info?userName=${username}`, {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      console.error('Erro ao buscar usuário para like:', userResponse.status, await userResponse.text());
      return false;
    }

    const userData = await userResponse.json();
    console.log('Dados do usuário encontrado:', userData);
    
    if (!userData?.data?.id) {
      console.error('ID do usuário não encontrado');
      return false;
    }

    // Verificar se o tweet existe
    const tweetResponse = await fetch(`https://api.twitterapi.io/twitter/tweets?ids=${postId}`, {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!tweetResponse.ok) {
      console.error('Erro ao buscar tweet:', tweetResponse.status, await tweetResponse.text());
      return false;
    }

    const tweetData = await tweetResponse.json();
    console.log('Dados do tweet encontrado:', tweetData);

    // Se chegamos até aqui, usuário e tweet existem
    // Para esta demo, vamos assumir true (a API não oferece verificação específica de likes)
    return true;
  } catch (error) {
    console.error('Erro ao verificar like:', error);
    return false;
  }
}

// Cache simples para evitar múltiplas chamadas
let retweetersCache: { [key: string]: any } = {};
let cacheTime: { [key: string]: number } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

async function verifyRetweet(username: string, postId: string, apiKey: string): Promise<boolean> {
  try {
    // Verificar cache primeiro
    const cacheKey = `retweeters_${postId}`;
    const now = Date.now();
    
    if (retweetersCache[cacheKey] && cacheTime[cacheKey] && (now - cacheTime[cacheKey] < CACHE_DURATION)) {
      console.log('Usando dados do cache para retweeters');
      const cachedData = retweetersCache[cacheKey];
      
      if (cachedData?.users && Array.isArray(cachedData.users)) {
        const userRetweeted = cachedData.users.some((user: any) => 
          user.userName?.toLowerCase() === username.toLowerCase() ||
          user.screen_name?.toLowerCase() === username.toLowerCase()
        );
        return userRetweeted;
      }
      return false;
    }

    // Buscar da API
    console.log(`Buscando retweeters para ${postId} da API...`);
    const retweetersResponse = await fetch(`https://api.twitterapi.io/twitter/tweet/retweeters?tweetId=${postId}`, {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      // Adicionar timeout
      signal: AbortSignal.timeout(10000) // 10 segundos
    });

    if (!retweetersResponse.ok) {
      const errorText = await retweetersResponse.text();
      console.error('Erro ao buscar retweeters:', retweetersResponse.status, errorText);
      return false;
    }

    const retweetersData = await retweetersResponse.json();
    
    // Armazenar no cache
    retweetersCache[cacheKey] = retweetersData;
    cacheTime[cacheKey] = now;
    
    console.log(`Encontrados ${retweetersData?.users?.length || 0} retweeters`);

    // Verificar se o usuário está na lista de retweeters
    if (retweetersData?.users && Array.isArray(retweetersData.users)) {
      const userRetweeted = retweetersData.users.some((user: any) => 
        user.userName?.toLowerCase() === username.toLowerCase() ||
        user.screen_name?.toLowerCase() === username.toLowerCase()
      );

      if (userRetweeted) {
        console.log(`✅ Usuário ${username} encontrado nos retweeters!`);
        return true;
      } else {
        console.log(`❌ Usuário ${username} NÃO encontrado nos retweeters.`);
        console.log('Primeiros 5 retweeters:', retweetersData.users.slice(0, 5).map((u: any) => u.userName || u.screen_name));
        return false;
      }
    }

    console.log('Lista de retweeters está vazia ou não encontrada');
    return false;
  } catch (error) {
    console.error('Erro ao verificar retweet:', error);
    return false;
  }
}