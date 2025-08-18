import { NextRequest, NextResponse } from 'next/server';
import { publicClient } from '@/app/lib/publicClient';
import { NFT_ABI, NFT_CONTRACT_ADDRESS } from '@/app/components/StakingContracts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tokenId = searchParams.get('tokenId');
  const contractAddress = searchParams.get('contractAddress') || NFT_CONTRACT_ADDRESS;

  if (!tokenId) {
    return NextResponse.json({ 
      error: 'Token ID is required',
      name: 'Unknown NFT',
      description: 'No token ID provided',
      image: '/Images/bears/default.png' 
    }, { status: 400 });
  }

  console.log(`Buscando metadata para tokenId: ${tokenId}`);
  
  // Mapeamento completo de token IDs para números de imagem no IPFS
  const tokenToImageMapping: Record<string, string> = {
    "0": "18", 
    "1": "4",
    "2": "21",
    "3": "17",
    "4": "19",
    "5": "16",
    "6": "5",
    "7": "12",
    "8": "9",
    "9": "1",
    "10": "3",
    "11": "11",
    "12": "20",
    "13": "6",
    "14": "10",
    "15": "8",
    "16": "2",
    "17": "14",
    "18": "15",
    "19": "special", // Caso especial com CID diferente
    "20": "13",
    "21": "7"
  };

  // Preparar resposta padrão com imagens locais (fallback seguro)
  const imageNumber = tokenToImageMapping[tokenId] || tokenId;
  const fallbackResponse = {
    name: `Fluffy Bear #${tokenId}`,
    description: "A fluffy bear NFT on Berachain Bepolia Testnet",
    image: `/Images/bears/${imageNumber}.png`,
    attributes: [
      {
        "trait_type": "Collection",
        "value": "Fluffy Bears"
      },
      {
        "trait_type": "Network",
        "value": "Berachain Testnet"
      }
    ]
  };

  try {
    // Verificar se o tokenId é um número válido antes de converter para BigInt
    if (!/^\d+$/.test(tokenId)) {
      console.error(`Invalid token ID format: ${tokenId}`);
      return NextResponse.json(fallbackResponse);
    }

    // Buscar tokenURI do contrato
    const tokenURI = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: NFT_ABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    });
    
    console.log(`TokenURI para #${tokenId}:`, tokenURI);
    
    // Converter o tokenURI para um URL HTTPS
    const ipfsUri = String(tokenURI);
    let metadataUrl = ipfsUri;
    
    // Handle IPFS URI with proper CID extraction
    if (ipfsUri.startsWith('ipfs://')) {
      // Extract the CID - everything after ipfs:// and before any path separator
      const matches = ipfsUri.match(/ipfs:\/\/([^\/]+)(\/.*)?/);
      let cid = '';
      let path = '';
      
      if (matches && matches[1]) {
        cid = matches[1];
        path = matches[2] || '';
        console.log(`Token #${tokenId} CID extraído: ${cid}, path: ${path}`);
        
        // Format URLs with multiple gateways for redundancy
        const urls = [
          `https://ipfs.io/ipfs/${cid}${path}`,
          `https://dweb.link/ipfs/${cid}${path}`,
          `https://gateway.pinata.cloud/ipfs/${cid}${path}`
        ];
        
        metadataUrl = urls[0]; // Use the first gateway as default
        console.log(`URLs para buscar metadata:`, urls);
      } else {
        // Simple replacement as fallback if regex fails
        metadataUrl = ipfsUri.replace('ipfs://', 'https://ipfs.io/ipfs/');
      }
    }
    
    // Adicionar .json ao final do URI se não estiver presente
    if (!metadataUrl.endsWith('.json')) {
      metadataUrl = `${metadataUrl}.json`;
    }
    
    // Buscar o JSON de metadata diretamente do IPFS com timeout aumentado
    try {
      // Criar uma requisição com timeout usando AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased to 10 seconds timeout
      
      console.log(`Fetching metadata from: ${metadataUrl}`);
      const metadataResponse = await fetch(metadataUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Limpar timeout se a requisição completar
      clearTimeout(timeoutId);
      
      if (!metadataResponse.ok) {
        console.log(`Resposta não OK: ${metadataResponse.status} ao buscar metadata do token #${tokenId}`);
        // Retornar resposta de fallback
        return NextResponse.json(fallbackResponse);
      }
      
      const metadata = await metadataResponse.json();
      console.log(`Metadata obtida para token #${tokenId}:`, metadata);
      
      // Extrair o URL da imagem diretamente do JSON
      let imageUrl = metadata.image || '';
      console.log(`URL de imagem original do metadata: ${imageUrl}`);
      
      // Se for um URL IPFS, converter para HTTPS com extração de CID
      if (imageUrl.startsWith('ipfs://')) {
        const imgMatches = imageUrl.match(/ipfs:\/\/([^\/]+)(\/.*)?/);
        if (imgMatches && imgMatches[1]) {
          const imageCid = imgMatches[1];
          const imagePath = imgMatches[2] || '';
          imageUrl = `https://ipfs.io/ipfs/${imageCid}${imagePath}`;
        } else {
          // Simple replacement as fallback
          imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }
        console.log(`URL de imagem convertida: ${imageUrl}`);
      }
      
      // Retornar os metadados com URL da imagem corrigida e garantir que o tokenId esteja incluído
      return NextResponse.json({
        ...metadata,
        tokenId: Number(tokenId),
        image: imageUrl || fallbackResponse.image // Use fallback image if none is provided
      });
      
    } catch (metadataError) {
      console.error(`Erro ao buscar metadata do IPFS para token #${tokenId}:`, metadataError);
      
      // Usar o fallback com imagens locais
      console.log(`Usando imagem local fallback para token #${tokenId}: /Images/bears/${imageNumber}.png`);
      return NextResponse.json(fallbackResponse);
    }
    
  } catch (error) {
    console.error('Error fetching token URI:', error);
    
    // Fallback com imagens locais
    return NextResponse.json(fallbackResponse);
  }
} 