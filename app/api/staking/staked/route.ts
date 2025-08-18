import { NextRequest, NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/publicClient';
import { STAKING_ABI, STAKING_CONTRACT_ADDRESS } from '@/app/components/StakingContracts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const contractAddress = searchParams.get('contractAddress') || STAKING_CONTRACT_ADDRESS;

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    console.log("Tentando obter tokens staked para:", address);
    
    // Tenta primeiro usar stakedTokens (que retorna array de todos os tokens em stake de uma wallet)
    try {
      console.log("Tentando obter stakedTokens...");
      const stakedTokens = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: STAKING_ABI,
        functionName: 'stakedTokens',
        args: [address as `0x${string}`],
      });
      
      console.log("stakedTokens retornou:", stakedTokens);
      
      if (Array.isArray(stakedTokens) && stakedTokens.length > 0) {
        // Processa o resultado para garantir que temos uma array de números simples
        const stakedTokensArray = stakedTokens.map(token => Number(token));
        console.log("Array processado:", stakedTokensArray);
        return NextResponse.json({ stakedTokens: stakedTokensArray });
      }
    } catch (error) {
      console.log("Erro ao chamar stakedTokens, tentando método alternativo:", error);
      // Se stakedTokens falhar, continuamos com o método de verificação token por token
    }
    
    // Lista de todos os possíveis token IDs (0-21)
    const possibleTokenIds = Array.from({ length: 22 }, (_, i) => i);
    const stakedTokensArray: number[] = [];
    
    // Verificar cada token individualmente
    console.log("Verificando tokens individualmente usando stakedBy...");
    for (const tokenId of possibleTokenIds) {
      try {
        const stakedBy = await publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: STAKING_ABI,
          functionName: 'stakedBy',
          args: [BigInt(tokenId)],
        }) as string;
        
        console.log(`Token ${tokenId} está staked por: ${stakedBy}`);
        
        // Se o token está staked pela wallet do usuário
        if (stakedBy && stakedBy.toLowerCase() === address.toLowerCase()) {
          console.log(`Token ${tokenId} está staked pelo usuário ${address}`);
          stakedTokensArray.push(tokenId);
        }
      } catch (error) {
        // Ignora erros de tokens que não existem ou não estão staked
        console.log(`Erro ao verificar token ${tokenId}:`, error);
      }
    }
    
    console.log("Tokens staked encontrados:", stakedTokensArray);
    return NextResponse.json({ stakedTokens: stakedTokensArray });
  } catch (error) {
    console.error('Error fetching staked tokens:', error);
    return NextResponse.json({ error: 'Failed to fetch staked tokens' }, { status: 500 });
  }
} 