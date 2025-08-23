'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, RefreshCw, DollarSign, BarChart3 } from 'lucide-react'

export function ConstantBoostSection() {
  return (
    <section id="constant-boost" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Constant Boost</h2>
          <p className="text-muted-foreground">How profits fuel growth</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-green-500" />
              Automatic Reinvestment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              75% of all profits from physical product sales and channel revenue 
              are automatically reinvested in liquidity pools, creating exponential 
              growth of rewards for all holders.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">75%</div>
                <div className="text-sm text-muted-foreground">Profits Reinvested</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">25%</div>
                <div className="text-sm text-muted-foreground">Reserve/Expansion</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Sustainable Cycle</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Revenue Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">Plushie Sales</span>
                  <Badge variant="secondary">30-50% margin</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">YouTube Channel</span>
                  <Badge variant="secondary">$500-2000/mês</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">NFT Royalties</span>
                  <Badge variant="secondary">5% per sale</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">Licensing</span>
                  <Badge variant="secondary">Future</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Growth Projection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <span className="font-medium">Month 1-3</span>
                  <span className="text-blue-600 font-bold">+10% pools</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <span className="font-medium">Month 4-6</span>
                  <span className="text-green-600 font-bold">+25% pools</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <span className="font-medium">Month 7-12</span>
                  <span className="text-purple-600 font-bold">+50% pools</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <span className="font-medium">Year 2+</span>
                  <span className="text-yellow-600 font-bold">+100% pools</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle>Practical Example of Boost</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold text-green-600">Initial Scenario</h5>
                <ul className="space-y-2 text-sm">
                  <li>• 75% of funds in pools (70-250% APY)</li>
                  <li>• Rewards distributed among stakers</li>
                  <li>• Sales royalties increase the pools</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-blue-600">After 1 Year of Boosts</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Long-term stakers receive 1.5x bonus</li>
                  <li>• New sources to increase pools</li>
                  <li>• Channel monetization, physical sales and royalties</li>
                  <li>• Pools with more than 100% increase</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2 text-primary">Result: Periodic growth of pools</h5>
              <p className="text-sm text-muted-foreground">
                This is just a conservative example. With the success of products and channel, 
                growth can be even greater, benefiting all holders proportionally.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}