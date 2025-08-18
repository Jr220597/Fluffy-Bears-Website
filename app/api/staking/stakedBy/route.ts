import { NextRequest, NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/publicClient';
import { STAKING_ABI, STAKING_CONTRACT_ADDRESS } from '@/app/components/StakingContracts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tokenId = searchParams.get('tokenId');
  const contractAddress = searchParams.get('contractAddress') || STAKING_CONTRACT_ADDRESS;

  if (!tokenId) {
    return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
  }

  try {
    // First check if the token is staked using getStakedTokens
    const stakedTokens = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'getStakedTokens',
      args: [], // Remove the contract address argument
    });

    // Check if the token is in the staked tokens array
    const isStaked = Array.isArray(stakedTokens) && stakedTokens.includes(BigInt(tokenId));

    if (isStaked) {
      // For stakedAt, we'll use a fixed timestamp for testing (1 day ago)
      // In a real implementation, we would need to get the actual staking timestamp
      const stakedAt = Math.floor(Date.now() / 1000) - 86400; // 1 day ago
      const now = Math.floor(Date.now() / 1000);
      const stakingDuration = now - stakedAt;
      
      return NextResponse.json({ 
        staker: contractAddress,
        stakedAt,
        points: stakingDuration
      });
    }

    return NextResponse.json({ 
      staker: '0x0000000000000000000000000000000000000000',
      stakedAt: 0,
      points: 0
    });
  } catch (error) {
    console.error('Error checking if token is staked:', error);
    return NextResponse.json({ error: 'Failed to check if token is staked' }, { status: 500 });
  }
} 