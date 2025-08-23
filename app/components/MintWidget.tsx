'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Wallet, ExternalLink, Star, Sparkles } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Contracts on Linea Mainnet
const NFT_CONTRACT = '0x4fAE020922b41481108002BAd45299B076B22abD';
const SALE_CONTRACT = '0xE67C03109B36BAdf098db753204305E00B7Df971';
const LINEA_MAINNET_CHAIN_ID = 59144;

// Minimal ABIs
const saleAbi = [
  {
    name: 'mintPremium',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'qty', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'mintStarter',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'qty', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'saleActive',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'PREMIUM_PRICE',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'STARTER_PRICE',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'mintedPerAddress',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'uint8' }
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

const nftAbi = [
  {
    name: 'remainingPremium',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'remainingStarter',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

const MintWidget = () => {
  const [mounted, setMounted] = useState(false);
  
  // UI States
  const [quantity, setQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState<'premium' | 'starter'>('premium');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Refetch contract data when wallet connects or chain changes
  useEffect(() => {
    if (isConnected && chain?.id === LINEA_MAINNET_CHAIN_ID) {
      refetchSaleActive();
      refetchRemainingPremium();
      refetchRemainingStarter();
    }
  }, [isConnected, chain?.id, refetchSaleActive, refetchRemainingPremium, refetchRemainingStarter]);

  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });

  // Contract reads
  const { data: saleActive, refetch: refetchSaleActive } = useReadContract({
    address: SALE_CONTRACT,
    abi: saleAbi,
    functionName: 'saleActive',
    query: {
      refetchInterval: 5000, // Refetch every 5 seconds
      staleTime: 0, // Always consider data stale
    }
  });

  const { data: premiumPrice } = useReadContract({
    address: SALE_CONTRACT,
    abi: saleAbi,
    functionName: 'PREMIUM_PRICE',
  });

  const { data: starterPrice } = useReadContract({
    address: SALE_CONTRACT,
    abi: saleAbi,
    functionName: 'STARTER_PRICE',
  });

  const { data: remainingPremium, refetch: refetchRemainingPremium } = useReadContract({
    address: NFT_CONTRACT,
    abi: nftAbi,
    functionName: 'remainingPremium',
    query: {
      refetchInterval: 10000, // Refetch every 10 seconds
      staleTime: 0,
    }
  });

  const { data: remainingStarter, refetch: refetchRemainingStarter } = useReadContract({
    address: NFT_CONTRACT,
    abi: nftAbi,
    functionName: 'remainingStarter',
    query: {
      refetchInterval: 10000, // Refetch every 10 seconds
      staleTime: 0,
    }
  });

  const { data: premiumMinted } = useReadContract({
    address: SALE_CONTRACT,
    abi: saleAbi,
    functionName: 'mintedPerAddress',
    args: address ? [address, 1] : undefined,
  });

  const { data: starterMinted } = useReadContract({
    address: SALE_CONTRACT,
    abi: saleAbi,
    functionName: 'mintedPerAddress',
    args: address ? [address, 2] : undefined,
  });

  // Contract writes
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Bundles config
  const bundles = {
    premium: {
      name: 'Premium Bundle',
      nfts: 10,
      price: premiumPrice ? formatEther(premiumPrice) : '0',
      available: remainingPremium ? Number(remainingPremium) : 0,
      minted: premiumMinted ? Number(premiumMinted) : 0,
      maxPerWallet: 10,
      rewards: ['Exclusive Discord Role', 'Early Access to Future Drops', '3D Action Figure Fluffy Bear', '2 Free Mint Spots on Launch Day', '20% Mint Discount', 'Special Allocation for Future Fluffy Bears Token Launch']
    },
    starter: {
      name: 'Starter Bundle',
      nfts: 5,
      price: starterPrice ? formatEther(starterPrice) : '0',
      available: remainingStarter ? Number(remainingStarter) : 0,
      minted: starterMinted ? Number(starterMinted) : 0,
      maxPerWallet: 10,
      rewards: ['Exclusive Discord Role', '1 Free Mint Spot on Launch Day', '10% Mint Discount', '50% Off 1 Action Figure in Fluffy Bears Store', 'Special Allocation for Future Fluffy Bears Token Launch']
    }
  };

  const currentBundle = bundles[selectedBundle];

  // Functions
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    const maxAllowed = Math.min(currentBundle.maxPerWallet - currentBundle.minted, currentBundle.available);
    if (newQuantity >= 1 && newQuantity <= maxAllowed) {
      setQuantity(newQuantity);
    }
  };

  const handleMint = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    if (chain?.id !== LINEA_MAINNET_CHAIN_ID) {
      setError('Switch to Linea Mainnet in MetaMask');
      return;
    }

    if (!saleActive) {
      setError('Sale is not active');
      return;
    }

    try {
      setError('');
      setSuccess('');

      const price = selectedBundle === 'premium' ? premiumPrice : starterPrice;
      if (!price) {
        setError('Error getting price');
        return;
      }

      const totalCost = price * BigInt(quantity);

      // Validations
      if (currentBundle.minted + quantity > currentBundle.maxPerWallet) {
        setError(`Limit exceeded. You have already minted ${currentBundle.minted} and the maximum is ${currentBundle.maxPerWallet} per wallet.`);
        return;
      }

      if (currentBundle.available < quantity) {
        setError(`Insufficient supply. Only ${currentBundle.available} NFTs remaining.`);
        return;
      }

      // Execute mint
      if (selectedBundle === 'premium') {
        writeContract({
          address: SALE_CONTRACT,
          abi: saleAbi,
          functionName: 'mintPremium',
          args: [BigInt(quantity)],
          value: totalCost,
        });
      } else {
        writeContract({
          address: SALE_CONTRACT,
          abi: saleAbi,
          functionName: 'mintStarter',
          args: [BigInt(quantity)],
          value: totalCost,
        });
      }

    } catch (err: any) {
      let errorMsg = 'Mint error: ';
      
      if (err.message?.includes('insufficient funds')) {
        errorMsg += 'Insufficient ETH';
      } else if (err.message?.includes('user rejected')) {
        errorMsg += 'Transaction cancelled by user';
      } else {
        errorMsg += err.message || 'Unknown error';
      }
      
      setError(errorMsg);
    }
  };

  // Effects to show transaction status
  useEffect(() => {
    if (hash) {
      setSuccess(`Transaction sent! Hash: ${hash}`);
    }
  }, [hash]);

  useEffect(() => {
    if (isConfirmed) {
      setSuccess(`Mint successful!`);
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (writeError) {
      setError(writeError.message || 'Transaction error');
    }
  }, [writeError]);

  // Calculate total price
  const calculateTotal = () => {
    const price = selectedBundle === 'premium' ? premiumPrice : starterPrice;
    if (!price) return '0';
    
    const total = price * BigInt(quantity);
    return formatEther(total);
  };

  // Check if can mint
  const canMint = () => {
    if (!isConnected || !saleActive || isPending || isConfirming) return false;
    if (chain?.id !== LINEA_MAINNET_CHAIN_ID) return false;
    
    const maxAllowed = Math.min(currentBundle.maxPerWallet - currentBundle.minted, currentBundle.available);
    return maxAllowed >= quantity;
  };

  // Wait for component mount to avoid SSR issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-amber-800 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pt-24 pb-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-yellow-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-200/25 rounded-full blur-2xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-sm font-medium mb-6"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(245, 158, 11, 0.2)',
                '0 0 30px rgba(245, 158, 11, 0.4)', 
                '0 0 20px rgba(245, 158, 11, 0.2)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Fluffy Bears Presale - Linea Mainnet</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
            Mint NFTs
          </h1>
        </motion.div>

        {/* Wallet Connection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-200 mb-8">
          <div className="flex flex-col items-center gap-4 mb-6">
            <ConnectButton />
            
            {isConnected && address && (
              <div className="text-center">
                <p className="text-amber-700">
                  <strong>Balance:</strong> {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : '0'} ETH
                </p>
                <p className="text-sm text-amber-600">
                  <strong>Network:</strong> {chain?.id === LINEA_MAINNET_CHAIN_ID ? '✅ Linea Mainnet' : '❌ Wrong network'}
                </p>
              </div>
            )}
          </div>

          {/* Wrong network warning */}
          {isConnected && chain?.id !== LINEA_MAINNET_CHAIN_ID && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-6">
              <p className="text-yellow-800 text-center">
                <strong>⚠️ Wrong network!</strong> Switch to Linea Mainnet in MetaMask
              </p>
            </div>
          )}

          {/* Sale Status */}
          {isConnected && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-amber-900">Sale Status</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      refetchSaleActive();
                      refetchRemainingPremium();
                      refetchRemainingStarter();
                    }}
                    className="text-xs"
                  >
                    🔄 Refresh
                  </Button>
                </div>
                <p><strong>Sale Active:</strong> {saleActive === undefined ? '⏳ Loading...' : (saleActive ? '✅ Yes' : '❌ No')}</p>
                <p><strong>Premium Remaining:</strong> {remainingPremium?.toString() || '0'}</p>
                <p><strong>Starter Remaining:</strong> {remainingStarter?.toString() || '0'}</p>
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-2 pt-2 border-t border-amber-200 text-xs text-amber-600">
                    <p>Debug: saleActive = {String(saleActive)}</p>
                    <p>Contract: {SALE_CONTRACT.slice(0, 6)}...{SALE_CONTRACT.slice(-4)}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-3">Your NFTs</h3>
                <p><strong>Premium Minted:</strong> {premiumMinted?.toString() || '0'}/10</p>
                <p><strong>Starter Minted:</strong> {starterMinted?.toString() || '0'}/10</p>
              </div>
            </div>
          )}

          {/* Bundle Selection */}
          {isConnected && chain?.id === LINEA_MAINNET_CHAIN_ID && (
            <div>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {(Object.entries(bundles) as [keyof typeof bundles, typeof bundles[keyof typeof bundles]][]).map(([key, bundle]) => {
                  const isSelected = selectedBundle === key;
                  return (
                    <motion.div
                      key={key}
                      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'border-amber-400 bg-amber-50 shadow-lg' 
                          : 'border-amber-200 bg-white/60 hover:border-amber-300'
                      }`}
                      onClick={() => {
                        setSelectedBundle(key);
                        setQuantity(1);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSelected && (
                        <motion.div
                          className="absolute top-4 right-4 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.3 }}
                        >
                          <span className="text-white text-sm font-bold">✓</span>
                        </motion.div>
                      )}
                      
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-amber-900 mb-2">{bundle.name}</h3>
                        <div className="text-3xl font-black text-amber-800 mb-2">{bundle.nfts} NFTs</div>
                        <div className="text-lg font-semibold text-amber-700 mb-2">{bundle.price} ETH</div>
                        <div className="text-sm text-amber-600">
                          Available: {bundle.available} | Yours: {bundle.minted}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mint Controls */}
              <div className="bg-white rounded-2xl p-6 border border-amber-200">
                <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">
                  {currentBundle.name}
                </h3>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-amber-800 mb-4 text-center">
                    Quantity (Max {Math.min(currentBundle.maxPerWallet - currentBundle.minted, currentBundle.available)})
                  </label>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-12 h-12 rounded-full border-amber-300 hover:border-amber-400 hover:bg-amber-50"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <div className="w-20 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-amber-800">{quantity}</span>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= Math.min(currentBundle.maxPerWallet - currentBundle.minted, currentBundle.available)}
                      className="w-12 h-12 rounded-full border-amber-300 hover:border-amber-400 hover:bg-amber-50"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-bold text-amber-800 mb-2">
                      Total: {calculateTotal()} ETH
                    </p>
                    <p className="text-sm text-amber-600">
                      You will receive {currentBundle.nfts * quantity} NFTs
                    </p>
                  </div>
                </div>

                {/* Mint Button */}
                <Button
                  onClick={handleMint}
                  disabled={!canMint()}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending || isConfirming ? (
                    <motion.div
                      className="flex items-center"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      {isPending ? 'Sending...' : 'Confirming...'}
                    </motion.div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Mint {quantity} {selectedBundle === 'premium' ? 'Premium' : 'Starter'}
                    </>
                  )}
                </Button>

                {/* Status Messages */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                    {success}
                  </div>
                )}

                {hash && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-blue-700 mb-2"><strong>Transaction Hash:</strong></p>
                    <a 
                      href={`https://lineascan.build/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline break-all text-sm"
                    >
                      {hash}
                    </a>
                  </div>
                )}

                {/* Bundle Rewards */}
                <div className="mt-8 pt-6 border-t border-amber-200">
                  <h4 className="text-lg font-bold text-amber-900 mb-4 text-center">Exclusive Rewards</h4>
                  <div className="space-y-2">
                    {currentBundle.rewards.map((reward, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-sm text-amber-800 font-medium">{reward}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MintWidget;