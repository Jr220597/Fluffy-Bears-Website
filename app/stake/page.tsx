'use client';

import React, { useEffect } from 'react';
import Header from '@/app/components/Header';
import Dashboard from '@/app/components/Dashboard';
import ConnectWallet from '@/app/components/ConnectWallet';
import { Providers } from '@/app/providers';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

function StakePageContent() {
  const { setupScrollAnimations } = useScrollAnimations();

  // Setup scroll animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setupScrollAnimations([
        { selector: '.animate-stake-title', preset: 'slideInDown', threshold: 0.2 },
        { selector: '.animate-stake-wallet', preset: 'fadeInRight', threshold: 0.3 },
        { selector: '.animate-stake-dashboard', preset: 'fadeInUp', threshold: 0.1 },
        { selector: '.animate-stake-header', preset: 'fadeInLeft', threshold: 0.1 }
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setupScrollAnimations]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />
      
      <div className="pt-24 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-amber-200 animate-stake-header">
            <div className="animate-stake-title">
              <h1 className="text-3xl font-bold text-amber-800 mb-2">Fluffy Bears Staking</h1>
              <p className="text-amber-600">Stake your bears and earn rewards!</p>
            </div>
            <div className="mt-4 md:mt-0 animate-stake-wallet">
              <ConnectWallet />
            </div>
          </div>
          
          <div className="animate-stake-dashboard">
            <Dashboard />
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        /* Initial state for stake scroll animations */
        .animate-stake-title,
        .animate-stake-wallet,
        .animate-stake-dashboard,
        .animate-stake-header {
          opacity: 0;
        }
      `}</style>
    </main>
  );
}

export default function StakePage() {
  return (
    <Providers>
      <StakePageContent />
    </Providers>
  );
} 