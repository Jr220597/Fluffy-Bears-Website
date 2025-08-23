'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Coins, 
  Package, 
  Video, 
  Layers, 
  Users,
  Zap,
  ArrowRight
} from 'lucide-react'

interface DiagramData {
  description: string
  kpis: Record<string, string | number>
}

interface DiagramProps {
  className?: string
  data?: {
    mint?: DiagramData
    products?: DiagramData
    channel?: DiagramData
    pools?: DiagramData
    stakers?: DiagramData
  }
}

export function EconomicCycleDiagramNew({ className = "", data }: DiagramProps) {
  // Default data
  const defaultData = {
    mint: {
      description: "Initial sale of NFTs on Linea blockchain.",
      kpis: { "Supply": "Coming Soon", "Price": "0.025 ETH", "Blockchain": "Linea" }
    },
    products: {
      description: "Production and sale of Fluffy Bears 3D plushies.",
      kpis: { "Margin": "30-50%", "Reinvestment": "75%", "Launch": "Q4 2025" }
    },
    channel: {
      description: "YouTube channel with educational children's content.",
      kpis: { "Goal": "$1-3K/month", "Reinvestment": "75%", "Frequency": "4 videos/week" }
    },
    pools: {
      description: "Liquidity pools on Etherex DEX (Linea) to generate yield.",
      kpis: { "APY": "70-250%", "DEX": "Etherex", "Blockchain": "Linea" }
    },
    stakers: {
      description: "Holders who stake NFTs and receive rewards in ETH.",
      kpis: { "Distribution": "Periodic", "Min Stake": "7 days", "Token": "ETH" }
    }
  }

  const finalData = { ...defaultData, ...data }

  return (
    <TooltipProvider delayDuration={200}>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Economic Cycle Diagram
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 1200 400"
              className="w-full h-auto max-w-7xl mx-auto"
              style={{ minHeight: '300px' }}
            >
              {/* Definitions */}
              <defs>
                <marker
                  id="arrowHead"
                  viewBox="0 0 10 6"
                  markerWidth="10"
                  markerHeight="6"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#64748B" />
                </marker>
              </defs>

              {/* Background */}
              <rect width="1200" height="400" fill="hsl(var(--card))" rx="8" />

              {/* HORIZONTAL NODES */}
              
              {/* 1. Mint */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g className="cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" style={{ transformOrigin: '100px 120px' }}>
                    <circle cx="100" cy="120" r="35" fill="#5B8DEF" opacity="0.1" />
                    <circle cx="100" cy="120" r="35" fill="none" stroke="#5B8DEF" strokeWidth="3" />
                    <circle cx="100" cy="120" r="22" fill="#5B8DEF" />
                    <foreignObject x="88" y="108" width="24" height="24">
                      <Coins className="w-6 h-6 text-white" />
                    </foreignObject>
                    <text x="100" y="185" textAnchor="middle" className="fill-foreground text-sm font-semibold">
                      Mint
                    </text>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-medium">NFT Mint</p>
                    <p className="text-sm text-muted-foreground">{finalData.mint.description}</p>
                    <div className="space-y-1">
                      {Object.entries(finalData.mint.kpis).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* 2. 3D Products */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g className="cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" style={{ transformOrigin: '100px 240px' }}>
                    <circle cx="100" cy="240" r="35" fill="#22C55E" opacity="0.1" />
                    <circle cx="100" cy="240" r="35" fill="none" stroke="#22C55E" strokeWidth="3" />
                    <circle cx="100" cy="240" r="22" fill="#22C55E" />
                    <foreignObject x="88" y="228" width="24" height="24">
                      <Package className="w-6 h-6 text-white" />
                    </foreignObject>
                    <text x="100" y="305" textAnchor="middle" className="fill-foreground text-sm font-semibold">
                      3D Products
                    </text>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-medium">3D Products</p>
                    <p className="text-sm text-muted-foreground">{finalData.products.description}</p>
                    <div className="space-y-1">
                      {Object.entries(finalData.products.kpis).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* 3. Kids Channel */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g className="cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" style={{ transformOrigin: '100px 360px' }}>
                    <circle cx="100" cy="360" r="35" fill="#EAB308" opacity="0.1" />
                    <circle cx="100" cy="360" r="35" fill="none" stroke="#EAB308" strokeWidth="3" />
                    <circle cx="100" cy="360" r="22" fill="#EAB308" />
                    <foreignObject x="88" y="348" width="24" height="24">
                      <Video className="w-6 h-6 text-white" />
                    </foreignObject>
                    <text x="100" y="425" textAnchor="middle" className="fill-foreground text-sm font-semibold">
                      Kids Channel
                    </text>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-medium">Kids Channel</p>
                    <p className="text-sm text-muted-foreground">{finalData.channel.description}</p>
                    <div className="space-y-1">
                      {Object.entries(finalData.channel.kpis).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* 4. Pools (center) */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g className="cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" style={{ transformOrigin: '600px 200px' }}>
                    <circle cx="600" cy="200" r="40" fill="#7C3AED" opacity="0.1" />
                    <circle cx="600" cy="200" r="40" fill="none" stroke="#7C3AED" strokeWidth="3" />
                    <circle cx="600" cy="200" r="25" fill="#7C3AED" />
                    <foreignObject x="588" y="188" width="24" height="24">
                      <Layers className="w-6 h-6 text-white" />
                    </foreignObject>
                    <text x="600" y="260" textAnchor="middle" className="fill-foreground text-sm font-semibold">
                      Pools
                    </text>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-medium">DeFi Pools</p>
                    <p className="text-sm text-muted-foreground">{finalData.pools.description}</p>
                    <div className="space-y-1">
                      {Object.entries(finalData.pools.kpis).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* 5. Stakers (right) */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <g className="cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" style={{ transformOrigin: '1100px 200px' }}>
                    <circle cx="1100" cy="200" r="35" fill="#F97316" opacity="0.1" />
                    <circle cx="1100" cy="200" r="35" fill="none" stroke="#F97316" strokeWidth="3" />
                    <circle cx="1100" cy="200" r="22" fill="#F97316" />
                    <foreignObject x="1088" y="188" width="24" height="24">
                      <Users className="w-6 h-6 text-white" />
                    </foreignObject>
                    <text x="1100" y="260" textAnchor="middle" className="fill-foreground text-sm font-semibold">
                      Stakers
                    </text>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-medium">NFT Stakers</p>
                    <p className="text-sm text-muted-foreground">{finalData.stakers.description}</p>
                    <div className="space-y-1">
                      {Object.entries(finalData.stakers.kpis).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* HORIZONTAL LINES */}
              
              {/* 1. Mint → Pools */}
              <line
                x1="135"
                y1="120"
                x2="560"
                y2="180"
                stroke="#64748B"
                strokeWidth="3"
                markerEnd="url(#arrowHead)"
              />

              {/* 2. 3D Products → Pools */}
              <line
                x1="135"
                y1="240"
                x2="560"
                y2="200"
                stroke="#64748B"
                strokeWidth="3"
                markerEnd="url(#arrowHead)"
              />

              {/* 3. Kids Channel → Pools */}
              <line
                x1="135"
                y1="360"
                x2="560"
                y2="220"
                stroke="#64748B"
                strokeWidth="3"
                markerEnd="url(#arrowHead)"
              />

              {/* 4. Pools → Stakers */}
              <line
                x1="640"
                y1="200"
                x2="1065"
                y2="200"
                stroke="#64748B"
                strokeWidth="3"
                markerEnd="url(#arrowHead)"
              />

            </svg>
          </div>

          {/* Legend */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-muted/30 border">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" />
                Input Sources
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#5B8DEF" }}>
                    <Coins className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">NFT Mint</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#22C55E" }}>
                    <Package className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">3D Products</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#EAB308" }}>
                    <Video className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">Kids Channel</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/30 border">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                System Center
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#7C3AED" }}>
                    <Layers className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">DeFi Pools</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Receives all inputs and generates continuous yield
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Beneficiaries
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F97316" }}>
                    <Users className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">NFT Stakers</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Receive periodic rewards in ETH
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}