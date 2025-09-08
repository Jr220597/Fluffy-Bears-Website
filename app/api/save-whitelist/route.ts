import { NextRequest, NextResponse } from 'next/server';
// Prisma disabled for Vercel deployment - using file-based storage
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

interface SaveWhitelistRequest {
  twitterUsername: string;
  walletAddress: string;
}

export async function POST(request: NextRequest) {
  try {
    const { twitterUsername, walletAddress }: SaveWhitelistRequest = await request.json();
    
    if (!twitterUsername || !walletAddress) {
      return NextResponse.json({ 
        success: false, 
        message: 'Twitter username and wallet address are required' 
      }, { status: 400 });
    }

    // Limpar o username (remover @)
    const cleanUsername = twitterUsername.replace('@', '');
    
    // Validar endereço da wallet
    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid wallet address' 
      }, { status: 400 });
    }

    // Temporary response for Vercel deployment - database functionality disabled
    return NextResponse.json({
      success: false,
      message: 'Whitelist functionality temporarily unavailable during deployment'
    }, { status: 503 });

  } catch (error) {
    console.error('Erro ao salvar na whitelist:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error when saving data' 
    }, { status: 500 });
  }
}