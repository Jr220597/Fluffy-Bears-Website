import { NextRequest, NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/publicClient';
import { NFT_ABI, NFT_CONTRACT_ADDRESS } from '@/app/components/StakingContracts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tokenId = searchParams.get('tokenId');
  const contractAddress = searchParams.get('contractAddress') || NFT_CONTRACT_ADDRESS;

  if (!tokenId) {
    return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
  }

  try {
    console.log(`Checking owner of token ID: ${tokenId}`);
    
    // Convert tokenId to a number and then to BigInt
    const tokenIdNumber = Number(tokenId);
    
    // Call ownerOf function on the NFT contract
    const owner = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: NFT_ABI,
      functionName: 'ownerOf',
      args: [BigInt(tokenIdNumber)],
    });
    
    console.log(`Owner of token ${tokenId}: ${owner}`);
    
    return NextResponse.json({ owner: String(owner) });
  } catch (error) {
    console.error(`Error checking owner of token ${tokenId}:`, error);
    return NextResponse.json({ error: 'Failed to check token owner' }, { status: 500 });
  }
} 