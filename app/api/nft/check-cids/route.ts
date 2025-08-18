import { NextRequest, NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/publicClient';
import { NFT_ABI, NFT_CONTRACT_ADDRESS } from '@/app/components/StakingContracts';

export async function GET(request: NextRequest) {
  const results: Record<string, any> = {};
  
  console.log("Iniciando verificação de todos os CIDs...");
  
  // Verificar tokens de 0 a 21
  for (let i = 0; i <= 21; i++) {
    try {
      // Buscar tokenURI do contrato
      const tokenURI = await publicClient.readContract({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFT_ABI,
        functionName: 'tokenURI',
        args: [BigInt(i)],
      });
      
      // Extrair o CID do URI IPFS
      const ipfsUri = String(tokenURI);
      let cidMatch;
      let cidValue = '';
      
      if (ipfsUri.startsWith('ipfs://')) {
        cidMatch = ipfsUri.match(/ipfs:\/\/([^\/]+)/);
        if (cidMatch && cidMatch[1]) {
          cidValue = cidMatch[1];
        }
      }
      
      // Armazenar os resultados
      results[i] = {
        tokenId: i,
        tokenURI: ipfsUri,
        cid: cidValue,
        fullPath: ipfsUri
      };
      
      console.log(`Token #${i}: ${ipfsUri} [CID: ${cidValue}]`);
      
    } catch (error) {
      console.error(`Erro ao verificar token #${i}:`, error);
      results[i] = {
        tokenId: i,
        error: 'Falha ao buscar tokenURI',
      };
    }
  }
  
  return NextResponse.json({
    message: 'Verificação de CIDs concluída',
    results
  });
} 