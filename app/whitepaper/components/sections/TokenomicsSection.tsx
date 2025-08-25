'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Coins, PieChart, TrendingUp, Shield, Wallet } from 'lucide-react'

export function TokenomicsSection() {
  const distribution = [
    {
      category: "Liquidity Pools",
      percentage: "75%",
      color: "bg-blue-500",
      description: "Primary investment in DeFi pools for yield generation"
    },
    {
      category: "Physical Production",
      percentage: "10%",
      color: "bg-green-500",
      description: "Manufacturing and global distribution of physical products"
    },
    {
      category: "Marketing & Expansion",
      percentage: "10%",
      color: "bg-purple-500", 
      description: "Brand growth and new holder acquisition"
    },
    {
      category: "Development",
      percentage: "5%",
      color: "bg-orange-500",
      description: "Continuous platform improvement and new products"
    }
  ]

  const revenueStreams = [
    {
      name: "Pool Yields",
      estimated: "70-250% APY",
      status: "Active",
      description: "Automatic profits from DeFi investments"
    },
    {
      name: "Product Sales", 
      estimated: "20-30% margin",
      status: "Planned",
      description: "Physical products with proven demand"
    },
    {
      name: "YouTube Channel",
      estimated: "$500-2000/month",
      status: "Development", 
      description: "Advertising revenue from children's content"
    },
    {
      name: "NFT Royalties",
      estimated: "5% per sale",
      status: "Active",
      description: "Commission from secondary market sales"
    }
  ]

  return (
    <section id="tokenomics" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Coins className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Fluffynomics</h2>
          <p className="text-muted-foreground">Project distribution and economics</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Price and Supply */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-500" />
              Mint Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">0.01 ETH</div>
                <div className="text-sm text-muted-foreground">Mint Price</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Limited</div>
                <div className="text-sm text-muted-foreground">Total Supply</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">5%</div>
                <div className="text-sm text-muted-foreground">Royalty</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fund Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-500" />
              Fund Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Each ETH raised will be strategically allocated to maximize holder returns:
            </p>
            
            <div className="space-y-3">
              {distribution.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className={`w-4 h-4 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{item.category}</h4>
                      <Badge variant="secondary">{item.percentage}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold mb-2 text-primary">Total Transparency</h4>
              <p className="text-sm">
                All transactions will be public and traceable on the blockchain. 
                Monthly reports will detail fund usage and results achieved.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Streams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Revenue Streams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Multiple revenue sources ensure sustainability and continuous growth:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {revenueStreams.map((stream, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{stream.name}</h4>
                      <Badge 
                        variant={stream.status === 'Active' ? 'default' : stream.status === 'Planned' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {stream.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{stream.description}</p>
                    <div className="text-sm font-medium text-green-600">
                      Estimate: {stream.estimated}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Value Proposition */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Value Proposition for Holders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              Unlike speculative projects, Fluffy Bears offers real and sustainable value:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold text-primary">Immediate Benefits</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Unique and collectible NFT
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Access to staking system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Exclusive community
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Discount on physical products
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-primary">Long-term Benefits</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Distribution of sales profits
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Intrinsic value growth
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Participation in future expansions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Exclusive physical products
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">Conservative Projection</h5>
              <p className="text-sm text-muted-foreground">
                Based on our financial models, we expect each holder to receive 
                between 100-250% of invested value annually through staking rewards, 
                in addition to natural NFT appreciation due to real utilities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}