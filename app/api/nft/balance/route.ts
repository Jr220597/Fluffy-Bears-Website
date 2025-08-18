import { NextRequest, NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/publicClient';
import { NFT_ABI, NFT_CONTRACT_ADDRESS } from '@/app/components/StakingContracts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const contractAddress = searchParams.get('contractAddress') || NFT_CONTRACT_ADDRESS;

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  console.log("Tentando obter balance de NFTs para:", address, "no contrato:", contractAddress);

  try {
    const balance = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: NFT_ABI,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    });

    console.log("Balance retornado:", balance);
    return NextResponse.json({ balance: Number(balance) });
  } catch (error) {
    console.error('Error fetching NFT balance:', error);
    
    // Em caso de erro, não retornar status 500 pois queremos usar os mocks
    return NextResponse.json({ error: 'Failed to fetch NFT balance', balance: 0 });
  }
} 