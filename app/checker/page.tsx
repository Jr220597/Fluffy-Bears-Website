'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import Image from 'next/image';
import Header from '../components/Header';

export default function CheckerPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    lxpBalance: string;
    lamBalance: string;
    allocation: string;
    isEligible: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Contract addresses
  const LXP_ADDRESS = '0xd83af4fbD77f3AB65C3B1Dc4B38D7e67AEcf599A';
  const LAM_ADDRESS = '0xE158CaCCe6f5713f5739A7d7AF0dB60116187687';

  // ERC20 ABI for balanceOf function
  const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)"
  ];

  const checkAllocation = useCallback(async () => {
    if (!walletAddress) {
      setError('Please enter a wallet address');
      return;
    }

    // Validate wallet address format
    if (!ethers.isAddress(walletAddress)) {
      setError('Please enter a valid wallet address');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Connect to Linea Mainnet
      const provider = new ethers.JsonRpcProvider('https://rpc.linea.build');

      // Create contract instances
      const lxpContract = new ethers.Contract(LXP_ADDRESS, ERC20_ABI, provider);
      const lamContract = new ethers.Contract(LAM_ADDRESS, ERC20_ABI, provider);

      // Get balances
      const [lxpBalance, lamBalance] = await Promise.all([
        lxpContract.balanceOf(walletAddress),
        lamContract.balanceOf(walletAddress)
      ]);

      // Convert to readable format (assuming 18 decimals)
      const lxpFormatted = ethers.formatEther(lxpBalance);
      const lamFormatted = ethers.formatEther(lamBalance);

      // Check if user has both tokens
      const hasLXP = parseFloat(lxpFormatted) > 0;
      const hasLAM = parseFloat(lamFormatted) > 0;
      const isEligible = hasLXP && hasLAM;

      let allocation = '0';
      if (isEligible) {
        // Calculate allocation: LXP * LAM * 1,000,000,000
        const lxpNum = parseFloat(lxpFormatted);
        const lamNum = parseFloat(lamFormatted);
        const allocationNum = lxpNum * lamNum * 1000000000;
        allocation = allocationNum.toLocaleString('en-US', { 
          maximumFractionDigits: 2,
          minimumFractionDigits: 0 
        });
      }

      setResult({
        lxpBalance: parseFloat(lxpFormatted).toLocaleString('en-US', { 
          maximumFractionDigits: 4,
          minimumFractionDigits: 0 
        }),
        lamBalance: lamFormatted, // Show full precision for LAM
        allocation,
        isEligible
      });

    } catch (err) {
      console.error('Error checking allocation:', err);
      setError('Failed to check allocation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
    setError(null);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      <Header />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200/20 rounded-full"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Unofficial Linea Checker
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Check your potential Linea token allocation based on your LXP and LAM holdings
          </p>
        </motion.div>

        {/* Main checker card */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Input Section */}
          <div className="mb-8">
            <label htmlFor="wallet-input" className="block text-lg font-semibold text-gray-700 mb-4">
              Enter Your Wallet Address:
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="wallet-input"
                type="text"
                value={walletAddress}
                onChange={handleInputChange}
                placeholder="0x..."
                className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={checkAllocation}
                disabled={isLoading || !walletAddress}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
              >
                {isLoading ? 'Checking...' : 'Check Allocation'}
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Results Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {result.isEligible ? (
                <div className="space-y-6">
                  {/* Eligible Result */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">✅ Eligible for Allocation!</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600 mb-1">LXP Balance</div>
                        <div className="text-xl font-bold text-blue-600">{result.lxpBalance}</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600 mb-1">LAM Balance</div>
                        <div className="text-xl font-bold text-purple-600">{result.lamBalance}</div>
                      </div>
                    </div>

                    {/* Highlighted Estimated Allocation */}
                    <motion.div 
                      className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-1 rounded-2xl mb-6"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(34, 197, 94, 0.4)",
                          "0 0 40px rgba(59, 130, 246, 0.6)",
                          "0 0 20px rgba(147, 51, 234, 0.4)",
                          "0 0 20px rgba(34, 197, 94, 0.4)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="bg-white rounded-xl p-6 text-center relative overflow-hidden">
                        {/* Background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-60" />
                        
                        {/* Floating particles */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`
                            }}
                            animate={{
                              y: [0, -20, 0],
                              scale: [0.5, 1.5, 0.5],
                              opacity: [0.2, 0.6, 0.2]
                            }}
                            transition={{
                              duration: 3 + i * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.3
                            }}
                          />
                        ))}

                        <div className="relative z-10">
                          <motion.div
                            className="text-lg font-semibold text-gray-700 mb-3 flex items-center justify-center gap-3"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            ✨ Estimated Allocation ✨
                          </motion.div>
                          
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <motion.div 
                              className="w-12 h-12 rounded-full overflow-hidden border-3 border-white shadow-lg"
                              animate={{ 
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                              }}
                            >
                              <Image
                                src="/Images/linea.png"
                                alt="Linea Token"
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            </motion.div>
                            
                            <motion.div 
                              className="text-3xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
                              animate={{ 
                                scale: [1, 1.05, 1],
                                filter: [
                                  "drop-shadow(0 0 10px rgba(34, 197, 94, 0.3))",
                                  "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
                                  "drop-shadow(0 0 10px rgba(147, 51, 234, 0.3))"
                                ]
                              }}
                              transition={{ 
                                duration: 2.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                              }}
                            >
                              {result.allocation}
                            </motion.div>
                          </div>
                          
                          <motion.div 
                            className="text-sm font-medium text-gray-600 flex items-center justify-center gap-2"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <span>LINEA Tokens</span>
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              🚀
                            </motion.span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-sm text-blue-800">
                        <strong>Calculation:</strong> LXP × LAM × 1,000,000,000
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-yellow-800 mb-4">⚠️ Not Eligible</h3>
                  <p className="text-yellow-700 mb-4">
                    You need both LXP and LAM tokens to be eligible for the allocation.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-600 mb-1">LXP Balance</div>
                      <div className={`text-xl font-bold ${parseFloat(result.lxpBalance) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.lxpBalance}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-600 mb-1">LAM Balance</div>
                      <div className={`text-xl font-bold ${parseFloat(result.lamBalance) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.lamBalance}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="text-lg font-bold text-red-800 mb-3">⚠️ Important Disclaimer</h4>
            <div className="text-red-700 space-y-2 text-sm">
              <p>• <strong>This is NOT an official Linea checker</strong> - it's an unofficial estimation tool</p>
              <p>• The official checker will only come from Linea's official channels</p>
              <p>• Never connect your wallet to unknown or suspicious websites</p>
              <p>• Always verify the URL and authenticity before interacting with any dApp</p>
              <p>• This tool only reads public blockchain data and does not require wallet connection</p>
              <p>• Results are estimates and may not reflect the final official allocation</p>
            </div>
          </div>

          {/* Contract Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h5 className="font-semibold text-gray-800 mb-2">Contract Addresses:</h5>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>LXP:</strong> {LXP_ADDRESS}</div>
              <div><strong>LAM:</strong> {LAM_ADDRESS}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}