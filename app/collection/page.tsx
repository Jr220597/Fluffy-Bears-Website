'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import Header from '@/app/components/Header';
import { Button } from "@/components/ui/button";
import { Wallet, Search, AlertCircle } from "lucide-react";
import { useScrollAnimations } from '../hooks/useScrollAnimations';

// ABI for the ERC-721 contract functions we need - reduced to only what's needed
const minimumABI = [
  // balanceOf
  {
    "inputs": [{"name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  // ownerOf
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  // tokenURI
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Berachain Testnet configuration
const networkConfig = {
  chainId: "0x138c5", // 80069 in hex
  chainName: "Berachain Testnet (Bepolia)",
  nativeCurrency: {
    name: "Bera",
    symbol: "BERA",
    decimals: 18
  },
  rpcUrls: ["https://bepolia.rpc.berachain.com"],
  blockExplorerUrls: ["https://bepolia.explorer.berachain.com/"]
};

// Type for ethereum window
declare global {
  interface Window {
    ethereum?: any;
  }
}

// NFT type
interface NFT {
  id: number;
  name: string;
  description?: string;
  image: string;
  attributes?: any[];
}

export default function Collection() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string>('');
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { setupScrollAnimations } = useScrollAnimations();
  
  // Contract details - updated address
  const contractAddress = '0x1f77a59613Dcd133E448F936566ac74c7Cd5df2c';
  
  // Connect wallet function
  const connectWallet = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Check if MetaMask or another EIP-1193 provider is available
      if (!window.ethereum) {
        throw new Error('No Ethereum wallet detected. Please install MetaMask or another wallet.');
      }
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setAccount(account);
      
      // Check if we're on the correct network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== networkConfig.chainId) {
        // Try to switch to Berachain Testnet
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networkConfig.chainId }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [networkConfig],
              });
            } catch (addError) {
              throw new Error('Failed to add Berachain Testnet to your wallet.');
            }
          } else {
            throw new Error('Failed to switch to Berachain Testnet.');
          }
        }
      }
      
      // Create ethers provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      
      const signer = await provider.getSigner();
      setSigner(signer);
      
      setLoading(false);
    } catch (err: any) {
      console.error('Connection error:', err);
      setError(err.message || 'Failed to connect wallet');
      setLoading(false);
    }
  };
  
  // Function to load NFTs - completely rewritten to avoid using tokenOfOwnerByIndex
  const loadNFTs = async () => {
    if (!signer || !provider) {
      setError('Please connect your wallet first');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setNfts([]);
      
      // Create contract instance
      const nftContract = new ethers.Contract(contractAddress, minimumABI, signer);
      
      console.log("Checking NFTs owned by:", account);
      
      // We'll check all possible token IDs (0-21) directly using Promise.all for parallel processing
      const possibleTokenIds = Array.from({ length: 22 }, (_, i) => i); // 0 to 21
      
      // Create array of promises for parallel processing
      const ownershipChecks = possibleTokenIds.map(async (tokenId) => {
        try {
          // Try to check if this token ID is owned by the user
          const owner = await nftContract.ownerOf(tokenId);
          
          // Check if the owner matches the connected account
          if (owner.toLowerCase() === account.toLowerCase()) {
            console.log(`Token ID ${tokenId} is owned by user`);
            return tokenId;
          }
          return null;
        } catch (ownerError) {
          // Token doesn't exist or isn't owned by user
          return null;
        }
      });
      
      // Wait for all ownership checks to complete
      const ownedTokenIds = (await Promise.all(ownershipChecks)).filter(id => id !== null) as number[];
      console.log(`Found ${ownedTokenIds.length} tokens owned by user: ${ownedTokenIds.join(', ')}`);
      
      // Now fetch metadata for all owned tokens in parallel
      const metadataPromises = ownedTokenIds.map(async (tokenId) => {
        try {
          // Get token URI
          const tokenURI = await nftContract.tokenURI(tokenId);
          console.log(`Token URI for ID ${tokenId}: ${tokenURI}`);
          
          // Handle IPFS URI - use Pinata gateway
          let metadataUrl = tokenURI;
          
          if (metadataUrl.startsWith('ipfs://')) {
            // Replace ipfs:// with Pinata gateway URL
            metadataUrl = metadataUrl.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
            
            // Add .json if needed
            if (!metadataUrl.endsWith('.json')) {
              metadataUrl = `${metadataUrl}.json`;
            }
          }
          
          console.log(`Resolved URI (Pinata): ${metadataUrl}`);
          
          // Pre-fetch metadata
          const response = await fetch(metadataUrl);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch metadata: ${response.status}`);
          }
          
          const metadata = await response.json();
          console.log(`Successfully loaded metadata for token ${tokenId}:`, metadata);
          
          // Get image URL directly from metadata and convert to Pinata gateway URL
          let imageUrl = metadata.image || '';
          
          if (imageUrl.startsWith('ipfs://')) {
            imageUrl = imageUrl.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
            console.log(`Resolved image URL (Pinata): ${imageUrl}`);
          }
          
          // Return the NFT data
          return {
            id: Number(tokenId),
            name: metadata.name || `Fluffy Bear #${tokenId}`,
            description: metadata.description || 'A cute bear living on Berachain!',
            image: imageUrl,
            attributes: metadata.attributes || []
          } as NFT;
        } catch (error) {
          console.error(`Error processing token ${tokenId}:`, error);
          
          // Only fall back to local image if absolutely necessary
          const tokenMapping: Record<string, string> = {
            "0": "18", "1": "4", "2": "21", "3": "17", "4": "19", "5": "16",
            "6": "5", "7": "12", "8": "9", "9": "1", "10": "3", "11": "11",
            "12": "20", "13": "6", "14": "10", "15": "8", "16": "2", "17": "14",
            "18": "15", "19": "special", "20": "13", "21": "7"
          };
          
          const imageNumber = tokenMapping[tokenId.toString()] || tokenId.toString();
          return {
            id: Number(tokenId),
            name: `Fluffy Bear #${tokenId}`,
            description: 'A cute bear living on Berachain!',
            image: `/Images/bears/${imageNumber}.png`,
            attributes: []
          } as NFT;
        }
      });
      
      // Wait for all metadata to be fetched
      const ownedNfts = await Promise.all(metadataPromises);
      setNfts(ownedNfts as NFT[]);
      
      if (ownedNfts.length === 0) {
        console.log("No NFTs found after checking all possible IDs");
      } else {
        console.log(`Successfully loaded ${ownedNfts.length} NFTs owned by user`);
      }
      
      setLoading(false);
    } catch (err: any) {
      console.error('Error loading NFTs:', err);
      setError(err.message || 'Failed to load NFTs');
      setLoading(false);
    }
  };
  
  // Setup scroll animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setupScrollAnimations([
        { selector: '.animate-collection-title', preset: 'fadeInUp', threshold: 0.2 },
        { selector: '.animate-collection-wallet', preset: 'scaleIn', threshold: 0.3 },
        { selector: '.animate-collection-nft', preset: 'staggerCards', threshold: 0.1 },
        { selector: '.animate-collection-container', preset: 'fadeInLeft', threshold: 0.1 }
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setupScrollAnimations]);

  // Setup event listeners
  useEffect(() => {
    if (window.ethereum) {
      // Handle account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected all accounts
          setAccount('');
          setSigner(null);
          setNfts([]);
        } else {
          setAccount(accounts[0]);
          // Reset NFTs when account changes
          setNfts([]);
        }
      });
      
      // Handle chain changes
      window.ethereum.on('chainChanged', () => {
        // Reset state and reload the page
        window.location.reload();
      });
    }
    
    // Cleanup
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);
  
  return (
    <main className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="absolute inset-0 bg-[url('/Images/Background.png')] bg-cover opacity-30"></div>
      </div>
      
      {/* Header */}
      <Header />
      
      {/* Content container */}
      <div className="relative z-10 pt-28 pb-12 px-4 container mx-auto">
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-amber-200 animate-collection-container">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-8 animate-collection-title">
            Fluffy Bears Viewer
          </h1>
          
          <div className="flex flex-col items-center justify-center mb-8 animate-collection-wallet">
            {!account ? (
              <Button 
                onClick={connectWallet}
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 text-lg flex items-center"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            ) : (
              <div className="space-y-4 w-full max-w-md">
                <div className="bg-amber-100 rounded-lg p-4 text-center">
                  <p className="text-amber-900 font-medium">Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</p>
                </div>
                <Button 
                  onClick={loadNFTs}
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 text-lg flex items-center justify-center"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Load My NFTs
                </Button>
              </div>
            )}
          </div>
          
          {loading && (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
          
          {!loading && nfts.length === 0 && account && !error && (
            <div className="text-center text-amber-800 my-12">
              <p className="text-xl">No NFTs found from this collection in your wallet.</p>
            </div>
          )}
          
          {nfts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {nfts.map((nft) => (
                <div key={nft.id} className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-amber-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate-collection-nft">
                  <div className="relative h-64 w-full bg-amber-100">
                    <div className="absolute top-0 left-0 z-10 p-1 text-[8px] text-white bg-black bg-opacity-50">
                      ID: {nft.id}
                    </div>
                    <Image 
                      src={nft.image} 
                      alt={nft.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // prevent infinite loops
                        console.error(`Image load error for NFT ${nft.id}: ${nft.image}`);
                        
                        // Try adding Pinata gateway if it's not already using it
                        if (nft.image.startsWith('ipfs://')) {
                          const pinataUrl = nft.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
                          console.log(`Trying Pinata gateway: ${pinataUrl}`);
                          target.src = pinataUrl;
                          return;
                        }
                        
                        // If Pinata fails, try with a cache-busting parameter
                        if (nft.image.includes('gateway.pinata.cloud') && !nft.image.includes('?t=')) {
                          const urlWithTimestamp = `${nft.image}?t=${Date.now()}`;
                          console.log(`Retrying with timestamp: ${urlWithTimestamp}`);
                          target.src = urlWithTimestamp;
                          return;
                        }
                        
                        // Fall back to local image as a last resort
                        const tokenMapping: Record<string, string> = {
                          "0": "18", "1": "4", "2": "21", "3": "17", "4": "19", "5": "16",
                          "6": "5", "7": "12", "8": "9", "9": "1", "10": "3", "11": "11",
                          "12": "20", "13": "6", "14": "10", "15": "8", "16": "2", "17": "14",
                          "18": "15", "19": "special", "20": "13", "21": "7"
                        };
                        
                        const imageNumber = tokenMapping[nft.id.toString()] || nft.id.toString();
                        const fallbackUrl = `/Images/bears/${imageNumber}.png`;
                        console.log(`Using local fallback for NFT ${nft.id}: ${fallbackUrl}`);
                        target.src = fallbackUrl;
                      }}
                      loading="lazy"
                      unoptimized={true}
                      priority={false}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-amber-900 mb-1">{nft.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <style jsx global>{`
        /* Initial state for collection scroll animations */
        .animate-collection-title,
        .animate-collection-wallet,
        .animate-collection-nft,
        .animate-collection-container {
          opacity: 0;
        }
      `}</style>
    </main>
  );
} 