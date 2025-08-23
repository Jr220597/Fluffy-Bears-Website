'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Droplets, Shield, TrendingUp, Zap } from 'lucide-react'

export function LiquidityPoolsSection() {

  return (
    <section id="liquidity-pools" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Droplets className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Liquidity Pools</h2>
          <p className="text-muted-foreground">Safe and profitable investments</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Investment Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              75% of raised funds are invested in carefully selected DeFi liquidity pools, 
              prioritizing security and consistent profitability. Our conservative strategy 
              ensures stable returns for holders. All pools will initially be strategically 
              allocated on Etherex.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">75%</div>
                <div className="text-sm text-muted-foreground">Initial Investment</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">70-250%</div>
                <div className="text-sm text-muted-foreground">Expected APY</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Audited</div>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Pool Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold">Passive Income</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Automatic profits 24/7
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Constant compound interest
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    No need for active management
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold">Security</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Audited and tested protocols
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Risk diversification
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Constant monitoring
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}