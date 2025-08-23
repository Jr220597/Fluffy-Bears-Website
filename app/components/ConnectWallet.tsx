'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const ConnectWallet = () => {
  const { isConnected, address } = useAccount();

  return (
    <div className="flex items-center space-x-4">
      <ConnectButton 
        showBalance={false}
        chainStatus="icon"
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
        label="Connect Wallet"
      />

      {isConnected && (
        <div className="hidden md:flex items-center text-amber-800 bg-amber-100 rounded-full px-3 py-1 text-sm">
          <span className="ml-1">Linea Mainnet</span>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet; 