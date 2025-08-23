'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Coins, 
  Users, 
  Network,
  CheckCircle,
  ArrowRight,
  Target,
  Lock,
  Layers,
  DollarSign
} from 'lucide-react'

export function PorqueLineaSection() {
  const advantages = [
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Zero Knowledge Security",
      description: "zkEVM with SNARK proofs that guarantee instant finality, unlike optimistic rollups with 7-day waiting periods.",
      metrics: "6,200 TPS • Instant Finality"
    },
    {
      icon: <Coins className="h-6 w-6 text-green-500" />,
      title: "Native ETH Staking",
      description: "First L2 with native ETH staking. Earn Ethereum staking rewards + DeFi yields simultaneously.",
      metrics: "Dual Yield • October 2025"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      title: "DeFi Yields Superiores",
      description: "TVL grew 499% to $412M. Etherex DEX offers 100% of fees to stakers and liquid rewards without vesting.",
      metrics: "499% Growth • 100% Fee Share"
    },
    {
      icon: <Network className="h-6 w-6 text-orange-500" />,
      title: "MetaMask Integration",
      description: "Only L2 natively integrated in MetaMask. Direct access to 30M+ users without manual configuration.",
      metrics: "30M+ Users • Native Support"
    }
  ]

  const ecosystem = [
    {
      name: "ConsenSys",
      role: "Lead Developer",
      description: "Company of Ethereum co-founder Joseph Lubin, with institutional experience (Mastercard, Visa, JP Morgan)",
      highlight: "Decade+ Experience"
    },
    {
      name: "MetaMask",
      role: "Native Wallet",
      description: "World's most used wallet with built-in Linea integration and multichain portfolio",
      highlight: "30M+ Monthly Users"
    },
    {
      name: "Etherex",
      role: "Main DEX",
      description: "Revolutionary DEX based on Ramses v3 with 100% fees to users and anti-bot protection",
      highlight: "$203M Market Cap"
    },
    {
      name: "SharpLink",
      role: "Institutional Partner", 
      description: "Nasdaq company with 728,804 ETH (~$2.6B) fully staked, powering the Linea ecosystem",
      highlight: "728K ETH Holdings"
    }
  ]

  const technicalFeatures = [
    "Type-1 zkEVM with 100% Ethereum compatibility",
    "25-30x lower costs than Ethereum mainnet",
    "First L2 that burns ETH (20% of fees)",
    "Quantum-resistant lattice-based proof system",
    "350+ ecosystem applications",
    "317,000 daily active users"
  ]

  const competitiveAdvantages = [
    {
      category: "vs Optimistic Rollups",
      advantage: "Instant finality vs 7-day challenge period",
      impact: "Immediate trading and rewards"
    },
    {
      category: "vs Other zkEVMs", 
      advantage: "Native MetaMask integration vs manual configuration",
      impact: "Frictionless onboarding"
    },
    {
      category: "vs All L2s",
      advantage: "Only one with native ETH staking + ETH burning",
      impact: "Dual yield + deflation"
    },
    {
      category: "vs Mainnet Ethereum",
      advantage: "25-30x lower costs with same security",
      impact: "Enables micro-transactions"
    }
  ]

  return (
    <section id="porque-linea" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Zap className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">15. Why Linea?</h2>
          <p className="text-muted-foreground">The blockchain that redefines sustainable yields</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Overview Card */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              The Strategic Choice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Linea isn't just another Layer 2. It's the only blockchain that combines <strong>zkEVM security</strong>, 
              <strong> native ETH staking</strong>, <strong>superior DeFi yields</strong> and <strong>native 
              MetaMask integration</strong> in a sustainable ecosystem that truly strengthens Ethereum.
            </p>
            
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <div className="text-2xl font-bold text-blue-600">$412M</div>
                <div className="text-sm text-blue-600">TVL (+499%)</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-100 dark:bg-green-900/20">
                <div className="text-2xl font-bold text-green-600">6,200</div>
                <div className="text-sm text-green-600">TPS</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <div className="text-2xl font-bold text-purple-600">25-30x</div>
                <div className="text-sm text-purple-600">Lower Cost</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <div className="text-2xl font-bold text-orange-600">30M+</div>
                <div className="text-sm text-orange-600">Users MetaMask</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Advantages */}
        <div className="grid gap-6 md:grid-cols-2">
          {advantages.map((advantage, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {advantage.icon}
                  {advantage.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
                <Badge variant="secondary" className="text-xs font-medium">
                  {advantage.metrics}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ecosystem Partners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Institutional Ecosystem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {ecosystem.map((partner, index) => (
                <div key={index} className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{partner.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {partner.highlight}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{partner.role}</p>
                  <p className="text-sm leading-relaxed">{partner.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              Technical Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {technicalFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competitive Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-primary" />
              Competitive Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitiveAdvantages.map((comp, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className="text-xs whitespace-nowrap">
                      {comp.category}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{comp.advantage}</p>
                    <p className="text-xs text-muted-foreground">{comp.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Native ETH Staking Highlight */}
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-500" />
              Revolutionary: Native ETH Staking (October 2025)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Linea will be the <strong>first L2</strong> to offer native ETH staking, where all 
              bridged ETH automatically enters staking on Ethereum mainnet, generating rewards that are 
              reinvested in Linea's DeFi ecosystem.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
                <Coins className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h5 className="font-semibold mb-1">Dual Yield</h5>
                <p className="text-xs text-muted-foreground">ETH Staking + DeFi Rewards</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
                <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h5 className="font-semibold mb-1">Deflationary</h5>
                <p className="text-xs text-muted-foreground">20% of fees burn ETH</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
                <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h5 className="font-semibold mb-1">Maximum Security</h5>
                <p className="text-xs text-muted-foreground">Ethereum Validators</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Perfect for Fluffy Bears */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-center text-xl">Perfect for Fluffy Bears</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center leading-relaxed opacity-90">
              Linea's unique combination makes our sustainable yield model not only possible, 
              but optimized for exponential growth and consistent rewards.
            </p>
            
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <DollarSign className="h-5 w-5" />
                <div>
                  <h5 className="font-semibold text-sm">Maximum Yields</h5>
                  <p className="text-xs opacity-80">Native staking + Etherex + DeFi Pools</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <Users className="h-5 w-5" />
                <div>
                  <h5 className="font-semibold text-sm">Easy Access</h5>
                  <p className="text-xs opacity-80">30M+ native MetaMask users</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <Shield className="h-5 w-5" />
                <div>
                  <h5 className="font-semibold text-sm">Total Security</h5>
                  <p className="text-xs opacity-80">zkEVM + ConsenSys backing</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <Target className="h-5 w-5" />
                <div>
                  <h5 className="font-semibold text-sm">Future-Proof</h5>
                  <p className="text-xs opacity-80">First L2 with ETH burning</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-sm font-medium">
                Linea + Fluffy Bears = The future of sustainable NFTs
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}