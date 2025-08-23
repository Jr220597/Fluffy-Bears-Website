'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, ArrowRight, Zap, Shield, Globe, Coins } from 'lucide-react'

export function OverviewSection() {
  const features = [
    {
      icon: Zap,
      title: "Staking with Rewards",
      description: "Staking system that distributes real profits from physical products",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Liquidity Pools",
      description: "Safe investments with constant profit reinforcement",
      color: "text-blue-500"
    },
    {
      icon: Globe,
      title: "Physical Products",
      description: "High-quality products sold globally",
      color: "text-green-500"
    },
    {
      icon: Coins,
      title: "Kids Channel",
      description: "Children's content that generates advertising revenue",
      color: "text-purple-500"
    }
  ]

  return (
    <section id="overview" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Eye className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Overview</h2>
          <p className="text-muted-foreground">How the Fluffy Bears ecosystem works</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle>The Complete Ecosystem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              The Fluffy Bears project operates as an <strong>integrated ecosystem</strong> where each component 
              feeds and strengthens the others. Our unique approach combines NFTs, DeFi, physical products 
              and digital content in a sustainable economic cycle.
            </p>
            
            <div className="bg-muted p-6 rounded-lg">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Ecosystem Flow
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <span>NFT mint generates initial capital</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                  <span>Capital is invested in liquidity pools</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                  <span>Profits fund physical product production</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                  <span>Sales generate additional revenue</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">5</div>
                  <span>Revenue constantly reinforces the pools</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">6</div>
                  <span>Holders receive rewards via staking</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${feature.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Financial Sustainability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                Unlike projects that depend only on secondary sales, 
                our model generates continuous revenue through:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Physical product sales</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Channel advertising revenue</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">DeFi pool yields</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Secondary sales royalties</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Transparency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                All financial aspects of the project are transparent and verifiable:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Public wallets on blockchain</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Monthly revenue reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Automatic distribution via smart contract</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Regular external audit</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Result: Sustainable Growth</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This unique model ensures that NFT value grows organically through 
                real utilities and diversified revenue streams, creating a solid investment 
                for all holders.
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="outline">Recurring Revenue</Badge>
                <Badge variant="outline">Intrinsic Value</Badge>
                <Badge variant="outline">Organic Growth</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}