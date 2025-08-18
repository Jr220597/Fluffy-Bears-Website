import { createPublicClient, http } from 'viem';
import { berachainTestnet } from 'viem/chains';

// Creating a public client for Berachain Testnet
export const publicClient = createPublicClient({
  chain: {
    ...berachainTestnet,
    id: 80069,
    name: 'Berachain Bepolia',
    network: 'berachain-bepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'Bera',
      symbol: 'BERA',
    },
    rpcUrls: {
      public: { http: ['https://bepolia.rpc.berachain.com'] },
      default: { http: ['https://bepolia.rpc.berachain.com'] },
    },
    blockExplorers: {
      default: { 
        name: 'Berachain Explorer', 
        url: 'https://bepolia.beratrail.io' 
      },
    },
  },
  transport: http('https://bepolia.rpc.berachain.com')
}); 