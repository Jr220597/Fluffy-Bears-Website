import { TwloTwitterPost } from './apify-twitter';

export const mockTweets: TwloTwitterPost[] = [
  {
    id: '1234567890123456789',
    url: 'https://twitter.com/user1/status/1234567890123456789',
    text: 'Just minted my @Fluffy_Bearss NFT! 🐻🍯 Love this collection! #FluffyBears #NFT',
    author: {
      id: 'user1_id',
      username: 'cryptouser1',
      name: 'Crypto User',
      followers: 1500,
      verified: false
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    metrics: {
      likes: 45,
      retweets: 12,
      replies: 8,
      quotes: 3,
      views: 890
    },
    media: [
      {
        type: 'image',
        url: 'https://example.com/nft-image.jpg'
      }
    ],
    hashtags: ['#FluffyBears', '#NFT'],
    mentions: ['@Fluffy_Bearss'],
    isRetweet: false
  },
  {
    id: '1234567890123456790',
    url: 'https://twitter.com/user2/status/1234567890123456790',
    text: 'RT @Fluffy_Bearss: New honey-themed collection dropping soon! 🍯✨',
    author: {
      id: 'user2_id',
      username: 'nftcollector',
      name: 'NFT Collector',
      followers: 5200,
      verified: true
    },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    metrics: {
      likes: 23,
      retweets: 0,
      replies: 2,
      quotes: 1,
      views: 450
    },
    media: [],
    hashtags: [],
    mentions: ['@Fluffy_Bearss'],
    isRetweet: true
  },
  {
    id: '1234567890123456791',
    url: 'https://twitter.com/Fluffy_Bearss/status/1234567890123456791',
    text: 'GM Fluffy Bears family! 🐻☀️ Who\'s ready for today\'s mint? Only 100 left! #FluffyBears #FluffyBearsNFT',
    author: {
      id: 'fluffy_bearss_id',
      username: 'Fluffy_Bearss',
      name: 'Fluffy Bears',
      followers: 15600,
      verified: true
    },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    metrics: {
      likes: 234,
      retweets: 67,
      replies: 45,
      quotes: 12,
      views: 5670
    },
    media: [
      {
        type: 'image',
        url: 'https://example.com/gm-bears.jpg'
      }
    ],
    hashtags: ['#FluffyBears', '#FluffyBearsNFT'],
    mentions: [],
    isRetweet: false
  },
  {
    id: '1234567890123456792',
    url: 'https://twitter.com/user3/status/1234567890123456792',
    text: 'The @Fluffy_Bearss community is amazing! Just joined their Discord 🐻💜',
    author: {
      id: 'user3_id',
      username: 'web3explorer',
      name: 'Web3 Explorer',
      followers: 890,
      verified: false
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    metrics: {
      likes: 18,
      retweets: 5,
      replies: 3,
      quotes: 0,
      views: 240
    },
    media: [],
    hashtags: [],
    mentions: ['@Fluffy_Bearss'],
    isRetweet: false
  },
  {
    id: '1234567890123456793',
    url: 'https://twitter.com/user4/status/1234567890123456793',
    text: 'Fluffy Bears floor price looking strong! 📈 #FluffyBears #NFTCommunity',
    author: {
      id: 'user4_id',
      username: 'nfttrader',
      name: 'NFT Trader',
      followers: 3200,
      verified: false
    },
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    metrics: {
      likes: 31,
      retweets: 8,
      replies: 6,
      quotes: 2,
      views: 520
    },
    media: [],
    hashtags: ['#FluffyBears', '#NFTCommunity'],
    mentions: [],
    isRetweet: false
  },
  {
    id: '1234567890123456794',
    url: 'https://twitter.com/user5/status/1234567890123456794',
    text: 'Honey bears are the cutest! 🍯🐻 Thanks @Fluffy_Bearss for this amazing project',
    author: {
      id: 'user5_id',
      username: 'bearslover',
      name: 'Bears Lover',
      followers: 720,
      verified: false
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    metrics: {
      likes: 42,
      retweets: 7,
      replies: 4,
      quotes: 1,
      views: 380
    },
    media: [],
    hashtags: [],
    mentions: ['@Fluffy_Bearss'],
    isRetweet: false
  }
];

export const mockOfficialTweets: TwloTwitterPost[] = [
  {
    id: '1234567890123456791',
    url: 'https://twitter.com/Fluffy_Bearss/status/1234567890123456791',
    text: 'GM Fluffy Bears family! 🐻☀️ Who\'s ready for today\'s mint? Only 100 left! #FluffyBears #FluffyBearsNFT',
    author: {
      id: 'fluffy_bearss_id',
      username: 'Fluffy_Bearss',
      name: 'Fluffy Bears',
      followers: 15600,
      verified: true
    },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    metrics: {
      likes: 234,
      retweets: 67,
      replies: 45,
      quotes: 12,
      views: 5670
    },
    media: [
      {
        type: 'image',
        url: 'https://example.com/gm-bears.jpg'
      }
    ],
    hashtags: ['#FluffyBears', '#FluffyBearsNFT'],
    mentions: [],
    isRetweet: false
  },
  {
    id: '1234567890123456800',
    url: 'https://twitter.com/Fluffy_Bearss/status/1234567890123456800',
    text: 'Sneak peek of our upcoming honey vault feature! 🍯💎 Coming soon to holders',
    author: {
      id: 'fluffy_bearss_id',
      username: 'Fluffy_Bearss',
      name: 'Fluffy Bears',
      followers: 15600,
      verified: true
    },
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    metrics: {
      likes: 189,
      retweets: 45,
      replies: 32,
      quotes: 8,
      views: 3420
    },
    media: [
      {
        type: 'image',
        url: 'https://example.com/honey-vault.jpg'
      }
    ],
    hashtags: [],
    mentions: [],
    isRetweet: false
  }
];