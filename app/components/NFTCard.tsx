'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface NFTCardProps {
  tokenId: number;
  image: string;
  name: string;
  isStaked: boolean;
  timeUntilUnstake?: number; // em segundos
  points?: number; // Novo campo para pontos
  onSelect: (tokenId: number, selected: boolean) => void;
  isSelected: boolean;
}

const NFTCard = ({ 
  tokenId, 
  image, 
  name, 
  isStaked, 
  timeUntilUnstake = 0, 
  points,
  onSelect,
  isSelected
}: NFTCardProps) => {
  const [pointsFromAPI, setPointsFromAPI] = useState<number>(0);
  const [stakedAt, setStakedAt] = useState<number>(0);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  
  // Log para depuração
  useEffect(() => {
    if (isStaked) {
      console.log(`NFTCard ${tokenId} - Props points: ${points}, API points: ${pointsFromAPI}`);
    }
  }, [isStaked, tokenId, points, pointsFromAPI]);
  
  useEffect(() => {
    // Se os pontos já foram passados via props, usamos eles
    if (isStaked && points !== undefined) {
      console.log(`NFTCard ${tokenId} - Usando pontos das props: ${points}`);
      setPointsFromAPI(points);
    }
    // Caso contrário, ainda buscamos no servidor (para compatibilidade)
    else if (isStaked && points === undefined) {
      console.log(`NFTCard ${tokenId} - Buscando pontos via API`);
      fetchStakeInfo();
    }
  }, [isStaked, tokenId, points]);
  
  const fetchStakeInfo = async () => {
    setIsLoadingInfo(true);
    try {
      console.log(`Fetching stake info for token ${tokenId}...`);
      
      // Get the current wallet address from localStorage or session
      const connectedWallet = localStorage.getItem('connectedWallet') || sessionStorage.getItem('connectedWallet') || '';
      
      if (!connectedWallet) {
        console.error('No wallet address found for points query');
        setIsLoadingInfo(false);
        return;
      }
      
      // First get points - now includes wallet address
      console.log(`Requesting points for token ID: ${tokenId} from wallet: ${connectedWallet}`);
      const pointsResponse = await fetch(`/api/staking/points?tokenId=${tokenId}&wallet=${connectedWallet}`);
      if (!pointsResponse.ok) {
        throw new Error(`HTTP error! status: ${pointsResponse.status}`);
      }
      const pointsData = await pointsResponse.json();
      console.log(`Points API response for token ${tokenId}:`, pointsData);
      
      // Define um stakedAt padrão (agora menos 1 dia)
      const defaultStakedAt = Math.floor(Date.now() / 1000) - 86400;
      
      // Definir pontos diretamente sem verificar stakedBy
      if (pointsData && !pointsData.error) {
        setPointsFromAPI(pointsData.points || 0);
        setStakedAt(defaultStakedAt);
        console.log(`Token ${tokenId} has ${pointsData.points} points`);
      } else {
        setPointsFromAPI(0);
        setStakedAt(0);
        console.log(`Token ${tokenId} has no points`);
      }
    } catch (error) {
      console.error(`Error fetching stake info for token ${tokenId}:`, error);
      setStakedAt(0);
      setPointsFromAPI(0);
    } finally {
      setIsLoadingInfo(false);
    }
  };
  
  const formatTimeLeft = (seconds: number) => {
    if (seconds <= 0) return 'Available to unstake';
    
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h until unstake`;
    }
    
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m until unstake`;
    }
    
    return `${minutes}m until unstake`;
  };
  
  const handleSelect = () => {
    onSelect(tokenId, !isSelected);
  };

  return (
    <motion.div 
      className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
        isSelected 
          ? 'border-amber-500 shadow-amber-300/50' 
          : isStaked 
            ? 'border-blue-300' 
            : 'border-amber-200'
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleSelect}
    >
      {/* Debug info - remove in production */}
      <div className="absolute top-0 left-0 z-10 p-1 text-[8px] text-white bg-black bg-opacity-50">
        ID: {tokenId}
      </div>
      
      <div className="relative w-full aspect-square">
        <Image 
          src={image || `/Images/bears/default.png`} 
          alt={name || `Fluffy Bear #${tokenId}`} 
          fill 
          className="object-cover"
          onError={(e) => {
            // Fall back to default image if there's an error loading the image
            const target = e.target as HTMLImageElement;
            target.onerror = null; // prevent infinite error loop
            console.log(`Error loading image for token ${tokenId}, using fallback`);
            
            // Try an alternate IPFS gateway if it looks like an IPFS URL
            if (image.includes('ipfs.io')) {
              console.log(`Trying alternate gateway for NFT ${tokenId}`);
              const altUrl = image.replace('ipfs.io', 'dweb.link');
              target.src = altUrl;
              return;
            }
            
            // If that fails, fall back to local image mapping
            const tokenMapping: Record<string, string> = {
              "0": "18", "1": "4", "2": "21", "3": "17", "4": "19", "5": "16",
              "6": "5", "7": "12", "8": "9", "9": "1", "10": "3", "11": "11",
              "12": "20", "13": "6", "14": "10", "15": "8", "16": "2", "17": "14",
              "18": "15", "19": "special", "20": "13", "21": "7"
            };
            
            const imageNumber = tokenMapping[tokenId.toString()] || (tokenId % 22).toString();
            target.src = `/Images/bears/${imageNumber}.png`;
          }}
          loading="lazy"
        />
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-amber-900 truncate max-w-[70%]">
            {name || `Fluffy Bear #${tokenId}`}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
            #{tokenId}
          </span>
        </div>
        
        {isStaked && (
          <>
            <div className={`mt-2 text-xs rounded-full px-2 py-1 text-center ${
              timeUntilUnstake > 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {formatTimeLeft(timeUntilUnstake)}
            </div>
            
            <div className="mt-2 text-xs rounded-full px-2 py-1 text-center bg-amber-100 text-amber-800">
              {isLoadingInfo ? (
                <span className="animate-pulse">Loading points...</span>
              ) : (
                <>
                  {points !== undefined || pointsFromAPI > 0 ? (
                    <>
                      <span className="font-medium">{(points !== undefined ? points : pointsFromAPI).toLocaleString()}</span>
                      <span className="ml-1">points</span>
                      <div className="text-xs mt-1">
                        ({Math.floor((points !== undefined ? points : pointsFromAPI) / 3600)} hours)
                      </div>
                    </>
                  ) : (
                    <span className="text-amber-600">No points yet</span>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default NFTCard; 