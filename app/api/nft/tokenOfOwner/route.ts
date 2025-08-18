import { NextRequest, NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/publicClient';
import { NFT_ABI, NFT_CONTRACT_ADDRESS } from '@/app/components/StakingContracts';

// This is a workaround for contracts that don't support ERC721Enumerable
// This API now returns a list of predefined possible token IDs that can be owned
// This is a temporary solution - in a production app, you'd query blockchain events or indexers

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const indexStr = searchParams.get('index');
  const contractAddress = searchParams.get('contractAddress') || NFT_CONTRACT_ADDRESS;

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  if (!indexStr) {
    return NextResponse.json({ error: 'Index is required' }, { status: 400 });
  }

  const index = parseInt(indexStr);
  
  // Hardcoded list of known token IDs for this collection
  // In production, we would query events, indexers, or a backend cache
  const possibleTokenIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  
  try {
    // Check if the possible tokenId at this index is owned by the user
    if (index >= possibleTokenIds.length) {
      return NextResponse.json({ error: 'Index out of range' }, { status: 400 });
    }
    
    const potentialTokenId = possibleTokenIds[index];
    
    // Try to get the owner of this token
    try {
      const owner = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: NFT_ABI,
        functionName: 'ownerOf',
        args: [BigInt(potentialTokenId)],
      });
      
      const ownerAddress = (owner as string).toLowerCase();
      const requestAddress = address.toLowerCase();
      
      // If this token is owned by the requesting address, return it
      if (ownerAddress === requestAddress) {
        console.log(`Token ${potentialTokenId} is owned by the user ${address}`);
        return NextResponse.json({ tokenId: String(potentialTokenId) });
      } else {
        console.log(`Token ${potentialTokenId} is owned by ${ownerAddress}, not by user ${requestAddress}`);
        // Return a special marker indicating this token isn't owned by the user
        return NextResponse.json({ tokenId: null, notOwned: true });
      }
    } catch (ownerError) {
      console.error(`Error checking ownership of token ${potentialTokenId}:`, ownerError);
      return NextResponse.json({ tokenId: null, notOwned: true });
    }
  } catch (error) {
    console.error('Error in tokenOfOwner API:', error);
    return NextResponse.json({ error: 'Failed to fetch token of owner' }, { status: 500 });
  }
} 