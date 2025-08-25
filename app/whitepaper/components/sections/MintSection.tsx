'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Hammer, Calendar, Users, Zap, Gift, Shield } from 'lucide-react'

export function MintSection() {
  const phases = [
    {
      name: "Free Mint GTD",
      description: "Guaranteed free mint for special members",
      status: "Coming Soon",
      color: "bg-green-500"
    },
    {
      name: "Free Mint FCFS",
      description: "First come, first served free mint",
      status: "Coming Soon",
      color: "bg-blue-500"
    },
    {
      name: "Whitelist",
      description: "Early access for whitelist members",
      status: "Coming Soon",
      color: "bg-purple-500"
    },
    {
      name: "Public",
      description: "Public mint open to everyone",
      status: "Coming Soon",
      color: "bg-orange-500"
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Immediate Staking",
      description: "Start earning rewards right after mint"
    },
    {
      icon: Gift,
      title: "Physical Products",
      description: "Exclusive discounts at the product store"
    },
    {
      icon: Users,
      title: "VIP Community",
      description: "Exclusive Discord for holders"
    },
    {
      icon: Shield,
      title: "Value Guarantee",
      description: "Real utilities that sustain the price"
    }
  ]

  return (
    <section id="mint" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Hammer className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Mint</h2>
          <p className="text-muted-foreground">How to acquire your Fluffy Bear NFT</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Current Status */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              Current Mint Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-semibold text-orange-600">Mint Coming Soon</span>
              </div>
              <p className="text-muted-foreground">
                The Fluffy Bears mint will be announced soon. Follow our social media to stay updated!
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-2xl font-bold text-primary animate-pulse">...</div>
                  <div className="text-sm text-muted-foreground">Available NFTs</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-2xl font-bold text-primary">0.01 ETH</div>
                  <div className="text-sm text-muted-foreground">Mint Price</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mint Phases */}
        <Card>
          <CardHeader>
            <CardTitle>Mint Phases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">
              The mint has been structured in phases to reward early supporters:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {phases.map((phase, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className={`w-4 h-4 rounded-full ${phase.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{phase.name}</h4>
                      <Badge variant="outline">
                        {phase.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits for Holders */}
        <Card>
          <CardHeader>
            <CardTitle>Immediate Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              By minting a Fluffy Bear, you gain immediate access to:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* How to Mint */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle>How to Mint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold">Prerequisites</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    MetaMask wallet connected
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Sufficient ETH for mint + gas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Connect to Linea network
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold">Process</h5>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                    Access the mint page
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                    Connect your wallet
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                    Select the quantity
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                    Confirm the transaction
                  </li>
                </ol>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">⚠️ Important</h5>
              <p className="text-sm text-muted-foreground">
                Always verify you're on the official website before connecting your wallet. 
                Never share your seed phrase and always review gas fees before confirming.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}