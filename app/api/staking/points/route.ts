import { NextRequest, NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/publicClient';
import { STAKING_ABI, STAKING_CONTRACT_ADDRESS } from '@/app/components/StakingContracts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tokenId = searchParams.get('tokenId');
  const walletAddress = searchParams.get('wallet');
  const contractAddress = searchParams.get('contractAddress') || STAKING_CONTRACT_ADDRESS;

  if (!tokenId) {
    return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
  }

  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }
  
  // Garantir que tokenId seja um número - remover qualquer formatação ou caracteres extras
  const cleanTokenId = Number(tokenId.toString().replace(/[^\d]/g, ''));
  console.log(`Getting points for token ID: ${cleanTokenId} from wallet: ${walletAddress}`);

  try {
    // Check if the token is staked using stakedBy
    const stakedBy = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'stakedBy',
      args: [BigInt(cleanTokenId)],
    }) as string;
    
    console.log(`Staked by for token ${cleanTokenId}:`, stakedBy);

    // Check if the token is staked by the user
    const isStaked = stakedBy.toLowerCase() === walletAddress.toLowerCase();
    console.log(`Token ${cleanTokenId} staked status:`, isStaked);

    if (!isStaked) {
      return NextResponse.json({ points: 0 });
    }

    // If the token is staked, try to get points using getPointsOfToken
    try {
      console.log(`Calling getPointsOfToken for token ID: ${cleanTokenId}`);
      const points = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: STAKING_ABI,
        functionName: 'getPointsOfToken',
        args: [BigInt(cleanTokenId)],
      });
      
      const pointsNumber = Number(points);
      console.log(`Points for token ${cleanTokenId}: ${points} (${typeof points}), converted to: ${pointsNumber} (${typeof pointsNumber})`);
      
      return NextResponse.json({ points: pointsNumber });
    } catch (error) {
      console.error('Error fetching points for token:', error);
      
      // If getPointsOfToken fails, try using getStakeInfo to calculate
      try {
        console.log(`Trying fallback with getStakeInfo for token ID: ${cleanTokenId}`);
        const stakeInfo = await publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: STAKING_ABI,
          functionName: 'getStakeInfo',
          args: [BigInt(cleanTokenId)],
        }) as [string, bigint];

        const stakedAt = Number(stakeInfo[1]);
        const now = Math.floor(Date.now() / 1000);
        const stakingDuration = now - stakedAt;
        
        console.log(`Stake info for token ${cleanTokenId}: staked at ${stakedAt}, duration ${stakingDuration} seconds`);

        // Points are 1 point per second in the basic calculation
        return NextResponse.json({ points: stakingDuration });
      } catch (fallbackError) {
        console.error('Error fetching stake info:', fallbackError);
        return NextResponse.json({ error: 'Failed to get points information', points: 0 }, { status: 500 });
      }
    }
  } catch (error) {
    console.error('Error checking if token is staked:', error);
    return NextResponse.json({ error: 'Failed to check if token is staked', points: 0 }, { status: 500 });
  }
} 