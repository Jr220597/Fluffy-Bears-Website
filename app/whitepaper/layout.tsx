import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fluffy Bears Whitepaper - The Ultimate NFT Ecosystem',
  description: 'Discover the revolutionary Fluffy Bears NFT project that combines digital art, DeFi investments, physical products, and educational content in a sustainable ecosystem.',
  keywords: [
    'Fluffy Bears',
    'NFT',
    'Whitepaper',
    'DeFi',
    'Staking',
    'Physical Products',
    'Educational Content',
    'Sustainable NFT',
    'Ethereum',
    'Blockchain',
    'Digital Art',
    'Investment'
  ].join(', '),
  authors: [{ name: 'Fluffy Bears Team' }],
  creator: 'Fluffy Bears',
  publisher: 'Fluffy Bears',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    url: 'https://fluffybears.io/whitepaper',
    title: 'Fluffy Bears Whitepaper - The Ultimate NFT Ecosystem',
    description: 'Discover the revolutionary Fluffy Bears NFT project that combines digital art, DeFi investments, physical products, and educational content.',
    siteName: 'Fluffy Bears',
    images: [
      {
        url: '/Images/CapaFluffy.png',
        width: 1200,
        height: 630,
        alt: 'Fluffy Bears NFT Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fluffy Bears Whitepaper - The Ultimate NFT Ecosystem',
    description: 'Revolutionary NFT project with real utility and sustainable value',
    images: ['/Images/CapaFluffy.png'],
    creator: '@fluffybearnft',
  },
  category: 'technology',
  classification: 'NFT Project',
  other: {
    'theme-color': '#fbbf24',
    'color-scheme': 'dark light',
  },
}

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}