import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    // Remove IP and User-Agent collection for privacy compliance

    try {
      // Tentar criar o registro (upsert para evitar duplicatas)
      const user = await prisma.fluffyMissionUser.upsert({
        where: { twitterUsername: cleanUsername },
        update: {
          walletAddress: walletAddress,
        },
        create: {
          twitterUsername: cleanUsername,
          walletAddress: walletAddress,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Successfully saved to whitelist!',
        userId: user.id
      });

    } catch (prismaError: any) {
      console.error('Erro do Prisma:', prismaError);
      
      // Verificar se é erro de constraint único
      if (prismaError.code === 'P2002') {
        const constraint = prismaError.meta?.target;
        if (constraint?.includes('walletAddress')) {
          return NextResponse.json({ 
            success: false, 
            message: 'This wallet is already registered in the whitelist' 
          }, { status: 400 });
        } else if (constraint?.includes('twitterUsername')) {
          return NextResponse.json({ 
            success: false, 
            message: 'This Twitter username is already registered in the whitelist' 
          }, { status: 400 });
        }
      }
      
      throw prismaError;
    }
    
  } catch (error) {
    console.error('Erro ao salvar na whitelist:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error when saving data' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}