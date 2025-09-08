'use client';

import { useState, useEffect } from 'react';
import { WagmiProvider, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import '@rainbow-me/rainbowkit/styles.css';

// Definindo a Linea Mainnet como uma chain customizada
const lineaMainnet = {
  id: 59144,
  name: 'Linea Mainnet',
  network: 'linea-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.linea.build'] },
    default: { http: ['https://rpc.linea.build'] },
  },
  blockExplorers: {
    default: { 
      name: 'Linea Mainnet Explorer', 
      url: 'https://lineascan.build' 
    },
  },
};

// Using the new configuration API for RainbowKit v2 + wagmi v2
const config = getDefaultConfig({
  appName: 'Fluffy Bears Presale',
  projectId: '1a30dfc4c6c266ac3709f2f3f6c9a395',
  chains: [lineaMainnet],
  transports: {
    [lineaMainnet.id]: http('https://rpc.linea.build')
  },
});

// Query client para o React Query
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Suprimir erros específicos de extensões
    const handleError = (event: ErrorEvent) => {
      if (event.filename?.includes('chrome-extension://') ||
          event.message?.includes('chrome.runtime.sendMessage')) {
        event.preventDefault();
        return false;
      }
    };
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes('chrome.runtime.sendMessage')) {
        event.preventDefault();
        return false;
      }
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-amber-800">Loading...</div>
      </div>
    );
  }

  return (
    <SessionProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider 
            locale="en-US"
            modalSize="compact"
          >
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
} 