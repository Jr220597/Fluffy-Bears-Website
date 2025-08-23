'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { motion } from 'framer-motion';
import NFTCard from './NFTCard';
import PointsDisplay from './PointsDisplay';
import { NFT_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS, NFT_ABI, STAKING_ABI } from './StakingContracts';

// Token ID to image mapping
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

interface NFT {
  tokenId: number;
  image: string;
  name: string;
  isStaked: boolean;
  timeUntilUnstake?: number;
  points?: number;
}

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [stakedNFTs, setStakedNFTs] = useState<NFT[]>([]);
  const [selectedOwnedNFTs, setSelectedOwnedNFTs] = useState<number[]>([]);
  const [selectedStakedNFTs, setSelectedStakedNFTs] = useState<number[]>([]);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);
  const [activeTab, setActiveTab] = useState('ownedNFTs');
  const [txSuccessMessage, setTxSuccessMessage] = useState('');
  const [txErrorMessage, setTxErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('Using public getter stakedTokens(address) to fetch staked NFTs');
  
  // Helper function to get correct image path
  const getCorrectImagePath = (tokenId: string): string => {
    if (!tokenId || tokenId === "undefined") {
      return "/Images/bears/default.png";
    }
    
    if (tokenId === "19") {
      return "https://ipfs.io/ipfs/bafybeihevn4h4wmb2fwqehzpxpfnwqiynfid2ghymylgs6hhycz4sdt3ra/0.png";
    }
    
    const imageNumber = tokenToImageMapping[tokenId] || tokenId;
    // Check if the image exists, otherwise use default
    return `/Images/bears/${imageNumber}.png`;
  };

  // Wagmi hooks para leitura de contratos
  const { data: totalPoints, isLoading: isLoadingPoints, refetch: refetchPoints } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'getTotalPointsOfWallet',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  const { data: pendingRewards, isLoading: isLoadingRewards, refetch: refetchRewards } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'getPendingRewards',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  const { data: isApprovedForAll, refetch: refetchApproval } = useReadContract({
    address: NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'isApprovedForAll',
    args: [address!, STAKING_CONTRACT_ADDRESS],
    query: {
      enabled: !!address,
    },
  });
  
  // Hooks para escrita de contratos
  const { data: txApprovalHash, error: approvalError, writeContract: writeApprovalContract } = useWriteContract();
  const { data: txStakeHash, error: stakeError, writeContract: writeStakeContract } = useWriteContract();
  const { data: txUnstakeHash, error: unstakeError, writeContract: writeUnstakeContract } = useWriteContract();
  const { data: txClaimHash, error: claimError, writeContract: writeClaimContract } = useWriteContract();
  
  // Hooks para aguardar transações
  const { isSuccess: isApprovalSuccess, isError: isApprovalError } = useWaitForTransactionReceipt({
    hash: txApprovalHash,
    query: {
      enabled: !!txApprovalHash,
    },
  });
  
  const { isSuccess: isStakeSuccess, isError: isStakeError } = useWaitForTransactionReceipt({
    hash: txStakeHash,
    query: {
      enabled: !!txStakeHash,
    },
  });
  
  const { isSuccess: isUnstakeSuccess, isError: isUnstakeError } = useWaitForTransactionReceipt({
    hash: txUnstakeHash,
    query: {
      enabled: !!txUnstakeHash,
    },
  });
  
  const { isSuccess: isClaimSuccess, isError: isClaimError } = useWaitForTransactionReceipt({
    hash: txClaimHash,
    query: {
      enabled: !!txClaimHash,
    },
  });
  
  // Efeito para buscar NFTs do usuário
  useEffect(() => {
    if (isConnected && address) {
      // Store wallet address in localStorage for API calls
      if (address) {
        localStorage.setItem('connectedWallet', address);
      }
      
      fetchNFTs();
    } else {
      setOwnedNFTs([]);
      setStakedNFTs([]);
      
      // Clear wallet from localStorage when disconnected
      localStorage.removeItem('connectedWallet');
    }
  }, [isConnected, address]);
  
  // Efeito para atualizar aprovação
  useEffect(() => {
    if (isApprovedForAll !== undefined) {
      setIsApproved(!!isApprovedForAll);
    }
  }, [isApprovedForAll]);
  
  // Efeitos para tratar resultados das transações
  useEffect(() => {
    if (isApprovalSuccess) {
      console.log("Approval transaction successful");
      setTxSuccessMessage('Approval successful! Now you can stake your NFTs');
      refetchApproval();
    } else if (isApprovalError) {
      console.log("Approval transaction failed");
      setTxErrorMessage('Failed to approve staking contract. Please try again.');
      setTxSuccessMessage(''); // Clear any success message
    }
  }, [isApprovalSuccess, isApprovalError, refetchApproval]);
  
  useEffect(() => {
    if (isStakeSuccess) {
      console.log("Stake transaction successful");
      setTxSuccessMessage('Staking successful!');
      setSelectedOwnedNFTs([]);
      
      // Immediately update NFTs and points
      setTimeout(() => {
        console.log("Updating NFTs after successful stake");
        fetchNFTs();
        refetchPoints();
        refetchRewards();
      }, 2000); // Pequeno delay para dar tempo à blockchain
    } else if (isStakeError) {
      console.log("Stake transaction failed");
      setTxErrorMessage('Failed to stake NFTs. Please try again.');
      setTxSuccessMessage(''); // Clear any success message
    }
  }, [isStakeSuccess, isStakeError]);
  
  useEffect(() => {
    if (isUnstakeSuccess) {
      console.log("Unstake transaction successful");
      setTxSuccessMessage('Unstaking successful!');
      setSelectedStakedNFTs([]);
      
      // Immediately update NFTs and points
      setTimeout(() => {
        console.log("Updating NFTs after successful unstake");
        fetchNFTs();
        refetchPoints();
        refetchRewards();
      }, 2000); // Pequeno delay para dar tempo à blockchain
    } else if (isUnstakeError) {
      console.log("Unstake transaction failed");
      setTxErrorMessage('Failed to unstake NFTs. Please try again.');
      setTxSuccessMessage(''); // Clear any success message
    }
  }, [isUnstakeSuccess, isUnstakeError]);
  
  useEffect(() => {
    if (isClaimSuccess) {
      console.log("Claim transaction successful");
      setTxSuccessMessage('Rewards claimed successfully!');
      refetchRewards();
    } else if (isClaimError) {
      console.log("Claim transaction failed");
      setTxErrorMessage('Failed to claim rewards. Please try again.');
      setTxSuccessMessage(''); // Clear any success message
    }
  }, [isClaimSuccess, isClaimError, refetchRewards]);
  
  // Limpar mensagens após alguns segundos
  useEffect(() => {
    if (txSuccessMessage) {
      const timer = setTimeout(() => setTxSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [txSuccessMessage]);
  
  useEffect(() => {
    if (txErrorMessage) {
      const timer = setTimeout(() => setTxErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [txErrorMessage]);
  
  // Function to load mock NFTs for testing
  const loadMockNFTs = () => {
    console.log("Loading mock NFTs for testing");
    
    // Mock data for owned NFTs
    const mockOwnedNFTs = [
      { tokenId: 1, image: getCorrectImagePath("1"), name: 'Fluffy Bear #1', isStaked: false },
      { tokenId: 2, image: getCorrectImagePath("2"), name: 'Fluffy Bear #2', isStaked: false },
      { tokenId: 3, image: getCorrectImagePath("3"), name: 'Fluffy Bear #3', isStaked: false },
    ];
    
    // Mock data for staked NFTs
    const mockStakedNFTs = [
      { tokenId: 4, image: getCorrectImagePath("4"), name: 'Fluffy Bear #4', isStaked: true, timeUntilUnstake: 0 },
      { tokenId: 5, image: getCorrectImagePath("5"), name: 'Fluffy Bear #5', isStaked: true, timeUntilUnstake: 86400 },
    ];
    
    setOwnedNFTs(mockOwnedNFTs);
    setStakedNFTs(mockStakedNFTs);
  };
  
  // Função para buscar NFTs
  const fetchNFTs = async () => {
    if (!address) return;
    
    setIsLoadingNFTs(true);
    
    try {
      console.log("Fetching NFTs for address:", address);
      
      // Get balance of NFTs owned by the user
      try {
        const balanceOfRes = await fetch(`/api/nft/balance?address=${address}`);
        const balanceData = await balanceOfRes.json();
        console.log("NFT balance response:", balanceData);
        
        // Check if there was an error with the balance API call
        if (balanceData.error) {
          console.error("Balance API error:", balanceData.error);
          console.log("Setting empty arrays due to API error");
          setOwnedNFTs([]);
          setStakedNFTs([]);
          return;
        }
        
        const balance = balanceData.balance || 0;
        console.log("User has", balance, "NFTs");
        
        // Get NFTs staked by the user
        const stakedTokensRes = await fetch(`/api/staking/staked?address=${address}`);
        const stakedTokensData = await stakedTokensRes.json();
        console.log("Staked tokens response:", stakedTokensData);
        
        // Check if there was an error with the staked tokens API call
        if (stakedTokensData.error) {
          console.error("Staked tokens API error:", stakedTokensData.error);
          console.log("Setting empty arrays due to API error");
          setOwnedNFTs([]);
          setStakedNFTs([]);
          return;
        }
        
        const stakedTokenIds = stakedTokensData.stakedTokens || [];
        console.log("User has", stakedTokenIds.length, "staked NFTs");
        
        // If no NFTs are owned and none are staked, fallback to mock data for testing
        if (balance === 0 && stakedTokenIds.length === 0) {
          console.log("No NFTs found, setting empty arrays");
          setOwnedNFTs([]);
          setStakedNFTs([]);
          return;
        }
        
        // Fetch owned NFTs (not staked)
        const fetchedOwnedNFTs: NFT[] = [];
        
        // Verificar diretamente todos os IDs possíveis (0 a 21)
        // em vez de confiar apenas no balance retornado
        console.log("Verificando diretamente todos os IDs possíveis (0 a 21)...");
        for (let tokenId = 0; tokenId <= 21; tokenId++) {
          try {
            // First, skip if token is staked
            if (stakedTokenIds.includes(tokenId)) {
              console.log(`ID ${tokenId} is staked, ignoring from owned list`);
              continue;
            }
            
            // Verificar se o usuário é dono deste token
            console.log(`Verificando propriedade do token ID ${tokenId}...`);
            const ownerRes = await fetch(`/api/nft/ownerOf?tokenId=${tokenId}`);
            
            if (!ownerRes.ok) {
              console.warn(`Falha ao verificar dono do token ${tokenId}: ${ownerRes.status}`);
              continue;
            }
            
            const ownerData = await ownerRes.json();
            
            // Verificar se o endereço é o dono
            if (!ownerData || ownerData.error || !ownerData.owner || 
                ownerData.owner.toLowerCase() !== address.toLowerCase()) {
              console.log(`Token ${tokenId} não pertence ao usuário ou erro: ${ownerData.error || 'Endereço diferente'}`);
              continue;
            }
            
            console.log(`Token ${tokenId} pertence ao usuário!`);
            
            // Buscar metadados
            const tokenURIRes = await fetch(`/api/nft/metadata?tokenId=${tokenId}`);
            
            if (!tokenURIRes.ok) {
              console.warn(`Falha ao buscar metadados para token ${tokenId}: ${tokenURIRes.status}`);
              continue;
            }
            
            const metadata = await tokenURIRes.json();
            
            if (!metadata || metadata.error) {
              console.warn(`Metadados inválidos para token ${tokenId}:`, metadata);
              continue;
            }
            
            // Verificar e processar a URL da imagem
            let imageUrl = metadata.image || '';
            if (imageUrl.startsWith('ipfs://')) {
              imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
            }
            
            // Adicionar à lista de NFTs do usuário
            fetchedOwnedNFTs.push({
              tokenId: tokenId,
              image: imageUrl || getCorrectImagePath(tokenId.toString()),
              name: metadata.name || `Fluffy Bear #${tokenId}`,
              isStaked: false
            });
            
          } catch (error) {
            console.error(`Erro ao processar token ${tokenId}:`, error);
          }
        }
        
        // Log do resultado final para depuração
        console.log(`Total de NFTs owned encontradas: ${fetchedOwnedNFTs.length}`);
        console.log("IDs das NFTs owned:", fetchedOwnedNFTs.map(nft => nft.tokenId));
        
        // Fetch staked NFTs and their unstake time
        const fetchedStakedNFTs: NFT[] = [];
        
        for (const tokenIdRaw of stakedTokenIds) {
          try {
            // Garantir que o tokenId seja um número único, não um array
            const tokenId = Array.isArray(tokenIdRaw) ? Number(tokenIdRaw[0]) : Number(tokenIdRaw);
            
            console.log(`Processando tokenId em staking: ${tokenId} (original: ${JSON.stringify(tokenIdRaw)})`);
            
            // Get token metadata - use a more robust approach
            console.log(`Fetching metadata for staked token ID ${tokenId}`);
            
            try {
              // First try direct metadata API which uses tokenURI from the contract
              const tokenURIRes = await fetch(`/api/nft/metadata?tokenId=${tokenId}`);
              const metadata = await tokenURIRes.json();
              console.log(`Metadata API response for token ${tokenId}:`, metadata);
              
              // Get unstake time
              const timeUntilUnstakeRes = await fetch(`/api/staking/timeUntilUnstake?tokenId=${tokenId}`);
              const timeData = await timeUntilUnstakeRes.json();
              const timeUntilUnstake = typeof timeData.timeUntilUnstake === 'number' ? timeData.timeUntilUnstake : 0;
              
              // Fetch individual NFT points
              console.log(`Fetching points for token ${tokenId}...`);
              const pointsRes = await fetch(`/api/staking/points?tokenId=${tokenId}&wallet=${address}`);
              const pointsData = await pointsRes.json();
              const points = pointsData.points || 0;
              console.log(`Points for token ${tokenId}: ${points} (${typeof points})`);
              
              // Process the image URL to ensure it's valid
              let imageUrl = metadata.image || '';
              
              // Handle IPFS URLs properly
              if (imageUrl.startsWith('ipfs://')) {
                // Extract CID for more reliable fetching
                const imgMatches = imageUrl.match(/ipfs:\/\/([^\/]+)(\/.*)?/);
                if (imgMatches && imgMatches[1]) {
                  const imageCid = imgMatches[1];
                  const imagePath = imgMatches[2] || '';
                  imageUrl = `https://ipfs.io/ipfs/${imageCid}${imagePath}`;
                  console.log(`Processed IPFS image URL for token ${tokenId}: ${imageUrl}`);
                } else {
                  // Simple replacement fallback
                  imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
                }
              }
              
              // If still no image URL, fall back to local image mapping
              if (!imageUrl || imageUrl === 'undefined') {
                imageUrl = getCorrectImagePath(tokenId.toString());
                console.log(`Using local image fallback for token ${tokenId}: ${imageUrl}`);
              }
              
              // Final points verification before adding
              console.log(`NFT ${tokenId} ready to be added - Points: ${points}`);
              
              fetchedStakedNFTs.push({
                tokenId: Number(tokenId),
                image: imageUrl,
                name: metadata.name || `Fluffy Bear #${tokenId}`,
                isStaked: true,
                timeUntilUnstake,
                points
              });
            } catch (metadataError) {
              console.error(`Error fetching metadata for token ${tokenId}:`, metadataError);
              
              // Try to fetch only points even without metadata
              let points = 0;
              try {
                const pointsRes = await fetch(`/api/staking/points?tokenId=${tokenId}&wallet=${address}`);
                const pointsData = await pointsRes.json();
                points = pointsData.points || 0;
                console.log(`Points for token ${tokenId} (fallback): ${points}`);
              } catch (pointsError) {
                console.error(`Unable to get points for token ${tokenId}:`, pointsError);
              }
              
              // Fallback to using local image mapping
              fetchedStakedNFTs.push({
                tokenId: Number(tokenId),
                image: getCorrectImagePath(tokenId.toString()),
                name: `Fluffy Bear #${tokenId}`,
                isStaked: true,
                timeUntilUnstake: 0,
                points
              });
            }
          } catch (error) {
            console.error(`Error processing staked NFT ${tokenIdRaw}:`, error);
            
            // Mesmo com erro, tente extrair o ID e criar um fallback
            let fallbackId = 0;
            try {
              fallbackId = Array.isArray(tokenIdRaw) ? Number(tokenIdRaw[0]) : Number(tokenIdRaw);
            } catch (e) {
              console.error("Não foi possível extrair o ID:", e);
            }
            
            // Even if there's an error, add a fallback NFT with local image
            fetchedStakedNFTs.push({
              tokenId: fallbackId,
              image: getCorrectImagePath(fallbackId.toString()),
              name: `Fluffy Bear #${fallbackId}`,
              isStaked: true,
              timeUntilUnstake: 0,
              points: 0
            });
          }
        }
        
        console.log("Final owned NFTs:", fetchedOwnedNFTs);
        console.log("Final staked NFTs:", fetchedStakedNFTs);
        
        setOwnedNFTs(fetchedOwnedNFTs);
        setStakedNFTs(fetchedStakedNFTs);
      } catch (apiError) {
        console.error("API Error:", apiError);
        console.log("Setting empty arrays due to API error");
        setOwnedNFTs([]);
        setStakedNFTs([]);
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      setTxErrorMessage('Failed to load NFTs. Please refresh and try again.');
      console.log("Setting empty arrays due to error");
      setOwnedNFTs([]);
      setStakedNFTs([]);
    } finally {
      setIsLoadingNFTs(false);
    }
  };
  
  // Handlers para seleção de NFTs
  const handleSelectOwnedNFT = (tokenId: number, selected: boolean) => {
    if (selected) {
      setSelectedOwnedNFTs(prev => [...prev, tokenId]);
    } else {
      setSelectedOwnedNFTs(prev => prev.filter(id => id !== tokenId));
    }
  };
  
  const handleSelectStakedNFT = (tokenId: number, selected: boolean) => {
    if (selected) {
      setSelectedStakedNFTs(prev => [...prev, tokenId]);
    } else {
      setSelectedStakedNFTs(prev => prev.filter(id => id !== tokenId));
    }
  };
  
  // Funções para interações com contratos
  const handleApprove = async () => {
    setTxErrorMessage('');
    setTxSuccessMessage('');
    try {
      // Display pending message
      setTxSuccessMessage('Approval transaction sent. Waiting for confirmation...');
      
      writeApprovalContract({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFT_ABI,
        functionName: 'setApprovalForAll',
        args: [STAKING_CONTRACT_ADDRESS, true],
      });
      
      console.log("Approval transaction sent");
    } catch (error) {
      console.error("Error approving:", error);
      setTxErrorMessage('Failed to send approval transaction. Please try again.');
      setTxSuccessMessage(''); // Clear any success message
    }
  };
  
  const handleStake = async () => {
    if (selectedOwnedNFTs.length === 0) {
      setTxErrorMessage('Please select NFTs to stake');
      return;
    }
    
    setTxErrorMessage('');
    setTxSuccessMessage('');
    try {
      // Converte cada token ID para BigInt individualmente
      const tokenIds = selectedOwnedNFTs.map(id => BigInt(id));
      
      writeStakeContract({
        address: STAKING_CONTRACT_ADDRESS as `0x${string}`,
        abi: STAKING_ABI,
        functionName: 'stake',
        args: [tokenIds],
      });
    } catch (error) {
      console.error("Error staking:", error);
      setTxErrorMessage('Failed to send stake transaction');
    }
  };
  
  const handleUnstake = async () => {
    if (selectedStakedNFTs.length === 0) {
      setTxErrorMessage('Please select NFTs to unstake');
      return;
    }
    
    setTxErrorMessage('');
    setTxSuccessMessage('');
    try {
      // Converte cada token ID para BigInt individualmente
      const tokenIds = selectedStakedNFTs.map(id => BigInt(id));
      
      writeUnstakeContract({
        address: STAKING_CONTRACT_ADDRESS as `0x${string}`,
        abi: STAKING_ABI,
        functionName: 'unstake',
        args: [tokenIds],
      });
    } catch (error) {
      console.error("Error unstaking:", error);
      setTxErrorMessage('Failed to send unstake transaction');
    }
  };
  
  const handleClaim = async () => {
    setTxErrorMessage('');
    setTxSuccessMessage('');
    try {
      writeClaimContract({
        address: STAKING_CONTRACT_ADDRESS as `0x${string}`,
        abi: STAKING_ABI,
        functionName: 'claimRewards',
      });
    } catch (error) {
      console.error("Error claiming:", error);
      setTxErrorMessage('Failed to send claim transaction');
    }
  };
  
  // Se não estiver conectado, mostrar aviso
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 max-w-lg text-center shadow-md">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Connect Your Wallet</h2>
          <p className="text-amber-700 mb-6">
            Please connect your wallet to stake Fluffy Bears NFTs and earn rewards!
          </p>
          <div className="w-36 h-36 mx-auto mb-6">
            <img src="/Images/logotransparente.png" alt="Fluffy Bears" className="w-full h-full object-contain" />
          </div>
          <p className="text-amber-600 text-sm">
            You'll need a compatible wallet (MetaMask, Rabby) connected to the Linea Mainnet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Mensagens de status */}
      {txSuccessMessage && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 animate-fade-in">
          ✅ {txSuccessMessage}
        </div>
      )}
      
      {txErrorMessage && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fade-in">
          ❌ {txErrorMessage}
        </div>
      )}
      
      {infoMessage && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
          <div>ℹ️ {infoMessage}</div>
          <button 
            onClick={fetchNFTs}
            className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
          >
            Recarregar NFTs
          </button>
        </div>
      )}
      
      {/* Exibição de pontos e recompensas */}
      <PointsDisplay 
        points={totalPoints ? Number(totalPoints) : 0}
        rewards={pendingRewards && typeof pendingRewards === 'bigint' ? formatEther(pendingRewards) : '0.00'}
        isLoading={isLoadingPoints || isLoadingRewards}
      />
      
      {/* Botão de reivindicar recompensas */}
      <div className="mb-10 flex justify-center">
        <motion.button
          className={`px-6 py-3 rounded-xl font-bold text-white shadow-lg 
            ${pendingRewards && Number(pendingRewards) > 0 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
              : 'bg-gray-400 cursor-not-allowed'}`}
          whileHover={pendingRewards && Number(pendingRewards) > 0 ? { scale: 1.05 } : {}}
          whileTap={pendingRewards && Number(pendingRewards) > 0 ? { scale: 0.95 } : {}}
          onClick={handleClaim}
          disabled={!pendingRewards || Number(pendingRewards) <= 0}
        >
          Claim Rewards
        </motion.button>
      </div>
      
      {/* Tabs para alternar entre NFTs detidas e em stake */}
      <div className="flex border-b border-amber-200 mb-8">
        <button
          className={`px-6 py-3 font-medium text-lg transition-colors duration-200 
            ${activeTab === 'ownedNFTs' 
              ? 'border-b-2 border-amber-500 text-amber-800' 
              : 'text-amber-500 hover:text-amber-700'}`}
          onClick={() => setActiveTab('ownedNFTs')}
        >
          Your NFTs ({ownedNFTs.length})
        </button>
        <button
          className={`px-6 py-3 font-medium text-lg transition-colors duration-200 
            ${activeTab === 'stakedNFTs' 
              ? 'border-b-2 border-amber-500 text-amber-800' 
              : 'text-amber-500 hover:text-amber-700'}`}
          onClick={() => setActiveTab('stakedNFTs')}
        >
          Staked NFTs ({stakedNFTs.length})
        </button>
      </div>
      
      {activeTab === 'ownedNFTs' && (
        <div>
          {!isApproved && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-700 mb-3">
                Before staking, you need to approve the Fluffy Bears staking contract to manage your NFTs.
              </p>
              <motion.button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow cursor-not-allowed"
                onClick={handleApprove}
                disabled={true}
              >
                Approve Staking Contract
              </motion.button>
            </div>
          )}
          
          {isLoadingNFTs ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : ownedNFTs.length === 0 ? (
            <div className="text-center p-10 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500">You don't have any Fluffy Bears NFTs in your wallet.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {ownedNFTs.map((nft) => (
                  <NFTCard
                    key={nft.tokenId}
                    tokenId={nft.tokenId}
                    image={nft.image}
                    name={nft.name}
                    isStaked={nft.isStaked}
                    onSelect={handleSelectOwnedNFT}
                    isSelected={selectedOwnedNFTs.includes(nft.tokenId)}
                  />
                ))}
              </div>
              
              {selectedOwnedNFTs.length > 0 && isApproved && (
                <div className="flex justify-center mt-6">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStake}
                  >
                    Stake Selected NFTs ({selectedOwnedNFTs.length})
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {activeTab === 'stakedNFTs' && (
        <div>
          {isLoadingNFTs ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : stakedNFTs.length === 0 ? (
            <div className="text-center p-10 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500">You don't have any staked Fluffy Bears NFTs.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {stakedNFTs.map((nft) => (
                  <NFTCard
                    key={nft.tokenId}
                    tokenId={nft.tokenId}
                    image={nft.image}
                    name={nft.name}
                    isStaked={nft.isStaked}
                    timeUntilUnstake={nft.timeUntilUnstake}
                    onSelect={handleSelectStakedNFT}
                    isSelected={selectedStakedNFTs.includes(nft.tokenId)}
                  />
                ))}
              </div>
              
              {selectedStakedNFTs.length > 0 && (
                <div className="flex justify-center mt-6">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUnstake}
                  >
                    Unstake Selected NFTs ({selectedStakedNFTs.length})
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 