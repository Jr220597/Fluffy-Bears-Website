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
    const stakeInfo = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'getStakeInfo',
      args: [BigInt(tokenId)],
    }) as [string, bigint];

    return NextResponse.json({ 
      staker: stakeInfo[0],
      stakedAt: Number(stakeInfo[1])
    });
  } catch (error) {
    console.error('Error fetching stake info:', error);
    return NextResponse.json({ error: 'Failed to fetch stake info' }, { status: 500 });
  }
} 