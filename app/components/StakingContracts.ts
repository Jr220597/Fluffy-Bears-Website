// Endereços dos contratos
export const NFT_CONTRACT_ADDRESS = '0x1f77a59613Dcd133E448F936566ac74c7Cd5df2c';
export const STAKING_CONTRACT_ADDRESS = '0x2590D595ae814dA5B480eF896C3f668bE5c9B698';

// ERC-721 ABI mínimo para interação básica
export const NFT_ABI = [
  // balanceOf
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // ownerOf
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  // tokenURI
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  // isApprovedForAll
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  // setApprovalForAll
  {
    inputs: [
      { name: 'operator', type: 'address' },
      { name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// ABI do contrato de staking
export const STAKING_ABI = [
  // stake
  {
    inputs: [{ name: 'tokenIds', type: 'uint256[]' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // unstake
  {
    inputs: [{ name: 'tokenIds', type: 'uint256[]' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // claimRewards
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // stakedTokens
  {
    inputs: [{ name: 'staker', type: 'address' }],
    name: 'stakedTokens',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  // getTotalPointsOfWallet
  {
    inputs: [{ name: 'staker', type: 'address' }],
    name: 'getTotalPointsOfWallet',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // getPointsForToken
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getPointsOfToken',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // getPendingRewards
  {
    inputs: [{ name: 'staker', type: 'address' }],
    name: 'getPendingRewards',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // timeUntilUnstakeAllowed
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'timeUntilUnstakeAllowed',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // getStakeInfo
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getStakeInfo',
    outputs: [
      { name: 'staker', type: 'address' },
      { name: 'stakedAt', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  // stakedBy
  {
    inputs: [{ name: '', type: 'uint256' }],
    name: 'stakedBy',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]; 