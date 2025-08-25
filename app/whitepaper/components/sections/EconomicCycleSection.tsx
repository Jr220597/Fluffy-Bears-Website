'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, ArrowRight, DollarSign, TrendingUp } from 'lucide-react'
import { EconomicCycleDiagramNew } from '@/components/EconomicCycleDiagramNew'

export function EconomicCycleSection() {
  const cycleSteps = [
    {
      step: 1,
      title: "Mint",
      description: "Holders mint the NFTs",
      amount: "ETH collected",
      color: "#3B82F6"
    },
    {
      step: 2, 
      title: "Pools",
      description: "Funds invested in DeFi pools",
      amount: "ETH moved to liquidity pools",
      color: "#10B981"
    },
    {
      step: 3,
      title: "Staking",
      description: "Holders stake their NFTs",
      amount: "Access to rewards",
      color: "#F59E0B"
    },
    {
      step: 4,
      title: "Rewards",
      description: "Distribution of yields",
      amount: "Rewards distributed periodically",
      color: "#06B6D4"
    }
  ]

  const additionalFlows = [
    {
      title: "Products",
      description: "Production and sale of products",
      amount: "Profits reinvested in pools",
      color: "#EF4444",
      flowsTo: "Pools"
    },
    {
      title: "Channel",
      description: "Children's YouTube channel",
      amount: "Constant revenue reinvested in pools",
      color: "#9333EA",
      flowsTo: "Pools"
    }
  ]

  return (
    <section id="economic-cycle" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <RotateCcw className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Economic Cycle</h2>
          <p className="text-muted-foreground">The self-sustaining engine of the ecosystem</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* New Diagram - Clean and Functional */}
        <EconomicCycleDiagramNew
          data={{
            mint: {
              description: "Initial sale of NFTs on Linea blockchain.",
              kpis: { "Supply": "Coming Soon", "Price": "0.01 ETH", "Blockchain": "Linea" }
            },
            products: {
              description: "Production and sale of Fluffy Bears plushies and 3D collectibles.",
              kpis: { "Margin": "30-50%", "Reinvestment": "75%", "Launch": "Q4 2025" }
            },
            channel: {
              description: "YouTube channel with children's content: songs, animations and stories.",
              kpis: { "Goal": "$1-3K/month", "Reinvestment": "75%", "Frequency": "4 videos/week" }
            },
            pools: {
              description: "Liquidity pools on Etherex DEX (Linea) to generate continuous yield.",
              kpis: { "APY": "70-250%", "DEX": "Etherex", "Blockchain": "Linea" }
            },
            stakers: {
              description: "Holders who stake NFTs and receive rewards in ETH.",
              kpis: { "Distribution": "Periodic", "Min Stake": "7 days", "Token": "ETH" }
            }
          }}
        />

        {/* Detailed Steps */}
        <div className="space-y-6">
          {/* Main Cycle */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Main Cycle</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {cycleSteps.map((step, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: step.color }}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.step}
                      </div>
                      <h4 className="font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {step.amount}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Flows */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Additional Flows</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {additionalFlows.map((flow, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: flow.color }}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: flow.color }}
                      >
                        {flow.title.charAt(0)}
                      </div>
                      <h4 className="font-semibold">{flow.title}</h4>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Profit → {flow.flowsTo}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{flow.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {flow.amount}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Cycle Benefits */}
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Economic Cycle Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Exponential Growth
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Each cycle increases available capital
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Products generate constant additional revenue
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Staking rewards grow automatically
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    NFT value increases with utilities
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  Sustainability
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Independent of new investors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Multiple revenue sources
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Proven business model
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Automatic profit reinvestment
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">Practical Example</h5>
              <p className="text-sm text-muted-foreground">
                Imagine the project raises 100 ETH in the mint. After 1 year of operation, with 10% return 
                from pools + 50% margin on product sales, the capital can grow to 150+ ETH, 
                proportionally increasing all rewards for holders.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}