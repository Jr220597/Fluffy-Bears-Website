'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { List, Star, Shield, TrendingUp, Globe, Users, Zap } from 'lucide-react'

export function DifferentialsSection() {
  const differentials = [
    {
      icon: TrendingUp,
      title: "Real and Sustainable Revenue",
      description: "Multiple active revenue streams that generate consistent profits for reinvestment",
      highlights: ["DeFi Pools", "Physical products", "Educational channel", "Royalties"]
    },
    {
      icon: Shield,
      title: "Proven Business Model",
      description: "Strategy based on solid financial principles and not on speculation",
      highlights: ["Conservative investments", "Safety margin", "External audit", "Total transparency"]
    },
    {
      icon: Globe,
      title: "Integrated Ecosystem",
      description: "Each component feeds and strengthens the others, creating unique synergy",
      highlights: ["NFTs + DeFi", "Digital + Physical", "Art + Utility", "Entertainment + Education"]
    },
    {
      icon: Users,
      title: "Community with Purpose",
      description: "More than holders, we are a family united by common values and objectives",
      highlights: ["Financial education", "Children's content", "Family values", "Joint growth"]
    },
    {
      icon: Zap,
      title: "Fast Execution",
      description: "We don't promise - we deliver. Utilities already active and functional",
      highlights: ["Active staking", "Products in production", "Invested pools", "Channel in development"]
    },
    {
      icon: Star,
      title: "Innovation in NFT Space",
      description: "First collection to implement a complete and self-sustaining economic cycle",
      highlights: ["Pioneer model", "Market reference", "Unique investment thesis", "Real intrinsic value"]
    }
  ]

  const comparisons = [
    {
      aspect: "Value Source",
      fluffyBears: "Real utilities + Recurring revenue",
      outros: "Speculation + Hype"
    },
    {
      aspect: "Sustainability",
      fluffyBears: "Solid business model",
      outros: "Dependent on new investors"
    },
    {
      aspect: "Products",
      fluffyBears: "Physical + Digital already available",
      outros: "Future promises"
    },
    {
      aspect: "Rewards",
      fluffyBears: "Based on real profits",
      outros: "Tokens without intrinsic value"
    },
    {
      aspect: "Transparency",
      fluffyBears: "Public wallets + Reports",
      outros: "Vague promises"
    }
  ]

  return (
    <section id="differentials" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <List className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Summary of Differentials</h2>
          <p className="text-muted-foreground">Why Fluffy Bears are unique</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle>What Makes Us Special</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">
              In a market saturated with unfounded NFT projects, Fluffy Bears emerges 
              as a truly revolutionary and sustainable proposition.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {differentials.map((diff, index) => {
                const Icon = diff.icon
                return (
                  <Card key={index} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-sm leading-tight">{diff.title}</h4>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">{diff.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {diff.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fluffy Bears vs. Other NFT Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Aspect</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary">Fluffy Bears</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Outros Projetos</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comp, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4 font-medium">{comp.aspect}</td>
                      <td className="py-3 px-4 text-sm text-green-600">{comp.fluffyBears}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{comp.outros}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-3 comparison-mobile">
              {comparisons.map((comp, index) => (
                <div key={index} className="border border-border rounded-lg p-4 bg-card">
                  <h5 className="font-semibold text-primary mb-3 text-center">{comp.aspect}</h5>
                  <div className="space-y-2">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border-l-4 border-green-500">
                      <div className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Fluffy Bears</div>
                      <div className="text-sm text-green-600 dark:text-green-400">{comp.fluffyBears}</div>
                    </div>
                    <div className="bg-muted p-3 rounded border-l-4 border-muted-foreground">
                      <div className="text-xs font-medium text-muted-foreground mb-1">Other Projects</div>
                      <div className="text-sm text-muted-foreground">{comp.outros}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-center">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <h5 className="font-semibold mb-2 text-yellow-600">Innovation</h5>
                <p className="text-sm text-muted-foreground">
                  First project to integrate NFTs, DeFi, physical products and educational content 
                  in a cohesive ecosystem
                </p>
              </div>
              
              <div className="text-center">
                <h5 className="font-semibold mb-2 text-orange-600">Sustainability</h5>
                <p className="text-sm text-muted-foreground">
                  Economic model based on real revenues, not on speculation or new 
                  investors
                </p>
              </div>
              
              <div className="text-center">
                <h5 className="font-semibold mb-2 text-red-600">Impact</h5>
                <p className="text-sm text-muted-foreground">
                  Beyond profits, we promote financial education and family values 
                  through entertainment
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-muted border text-center">
              <h5 className="font-semibold mb-2">Our Promise</h5>
              <p className="text-sm text-muted-foreground">
                <strong>Fluffy Bears</strong> represents the future of NFTs: where art, technology and business 
                unite to create real, sustainable and lasting value for the entire community.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}