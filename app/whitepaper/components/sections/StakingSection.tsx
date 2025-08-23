'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Gift, Calculator } from 'lucide-react'

export function StakingSection() {

  return (
    <section id="staking" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Star className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Staking</h2>
          <p className="text-muted-foreground">Earn passive rewards with your NFTs</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-yellow-500" />
              How Staking Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Stake your Fluffy Bears and receive monthly rewards based on the 
              ecosystem's real profits. The longer you stake, the greater your rewards.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">45 days</div>
                <div className="text-sm text-muted-foreground">Reward cycle</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">7 days</div>
                <div className="text-sm text-muted-foreground">Minimum stake time</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">0 Fees</div>
                <div className="text-sm text-muted-foreground">To enter/exit</div>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Long-Term Staking Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>The longer your NFTs remain staked, the greater the benefits:</p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold">Staking 1-3 Months</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Base multiplier: 1x</li>
                  <li>• Regular rewards</li>
                  <li>• Basic ecosystem benefits</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold">Staking 3+ Months</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Multiplier: 1.5x</li>
                  <li>• Loyalty bonus</li>
                  <li>• Premium benefits</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-accent/20 border border-accent">
              <h6 className="font-semibold mb-2">🎯 Pro Tip:</h6>
              <p className="text-sm text-muted-foreground">
                Holders who keep their NFTs staked for longer periods receive 
                special benefits and progressive multipliers on rewards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}