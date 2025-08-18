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
    const timeUntilUnstake = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'timeUntilUnstakeAllowed',
      args: [BigInt(tokenId)],
    });

    return NextResponse.json({ timeUntilUnstake: Number(timeUntilUnstake) });
  } catch (error) {
    console.error('Error fetching time until unstake:', error);
    return NextResponse.json({ error: 'Failed to fetch time until unstake', timeUntilUnstake: 0 }, { status: 500 });
  }
} 