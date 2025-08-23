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
      description: "zkEVM com provas SNARK que garantem finalidade instantânea, diferente dos rollups otimistas com 7 dias de espera.",
      metrics: "6,200 TPS • Finalidade Instant ânea"
    },
    {
      icon: <Coins className="h-6 w-6 text-green-500" />,
      title: "Native ETH Staking",
      description: "Primeira L2 com staking nativo de ETH. Ganha rewards de staking da Ethereum + yields DeFi simultaneamente.",
      metrics: "Duplo Yield • Outubro 2025"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      title: "DeFi Yields Superiores",
      description: "TVL cresceu 499% para $412M. Etherex DEX oferece 100% das fees para stakers e rewards líquidos sem vesting.",
      metrics: "499% Growth • 100% Fee Share"
    },
    {
      icon: <Network className="h-6 w-6 text-orange-500" />,
      title: "Integração MetaMask",
      description: "Única L2 integrada nativamente no MetaMask. Acesso direto a 30M+ usuários sem configuração manual.",
      metrics: "30M+ Usuários • Native Support"
    }
  ]

  const ecosystem = [
    {
      name: "ConsenSys",
      role: "Desenvolvedor Principal",
      description: "Empresa do co-fundador da Ethereum, Joseph Lubin, com experiência institucional (Mastercard, Visa, JP Morgan)",
      highlight: "Decade+ Experience"
    },
    {
      name: "MetaMask",
      role: "Wallet Nativo",
      description: "Carteira mais usada do mundo com integração built-in da Linea e portfolio multichain",
      highlight: "30M+ Monthly Users"
    },
    {
      name: "Etherex",
      role: "DEX Principal",
      description: "DEX revolucionário baseado em Ramses v3 com 100% das fees para usuários e anti-bot protection",
      highlight: "$203M Market Cap"
    },
    {
      name: "SharpLink",
      role: "Parceiro Institucional", 
      description: "Empresa Nasdaq com 728,804 ETH (~$2.6B) totalmente stakados, alimentando o ecossistema Linea",
      highlight: "728K ETH Holdings"
    }
  ]

  const technicalFeatures = [
    "Type-1 zkEVM com compatibilidade 100% Ethereum",
    "Custos 25-30x menores que mainnet Ethereum",
    "Primeira L2 que queima ETH (20% das fees)",
    "Sistema de provas lattice-based resistente a quantum",
    "350+ aplicações no ecossistema",
    "317,000 usuários ativos diários"
  ]

  const competitiveAdvantages = [
    {
      category: "vs Optimistic Rollups",
      advantage: "Finalidade instantânea vs 7 dias de challenge period",
      impact: "Trading e rewards imediatos"
    },
    {
      category: "vs Outras zkEVMs", 
      advantage: "Integração nativa MetaMask vs configuração manual",
      impact: "Onboarding sem fricção"
    },
    {
      category: "vs Todas L2s",
      advantage: "Única com native ETH staking + ETH burning",
      impact: "Duplo yield + deflação"
    },
    {
      category: "vs Mainnet Ethereum",
      advantage: "25-30x custos menores com mesma segurança",
      impact: "Viabiliza micro-transações"
    }
  ]

  return (
    <section id="porque-linea" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Zap className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">15. Porque Linea?</h2>
          <p className="text-muted-foreground">A blockchain que redefine yields sustentáveis</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Overview Card */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              A Escolha Estratégica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Linea não é apenas mais uma Layer 2. É a única blockchain que combina <strong>segurança zkEVM</strong>, 
              <strong> staking nativo de ETH</strong>, <strong>yields DeFi superiores</strong> e <strong>integração 
              MetaMask nativa</strong> em um ecossistema sustentável que realmente fortalece a Ethereum.
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
                <div className="text-sm text-purple-600">Menor Custo</div>
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
              Ecossistema Institucional
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
              Vantagens Técnicas
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
              Vantagem Competitiva
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
              Revolutionary: Native ETH Staking (Outubro 2025)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Linea será a <strong>primeira L2</strong> a oferecer staking nativo de ETH, onde todo ETH 
              bridgeado automaticamente entra em staking na mainnet Ethereum, gerando rewards que são 
              reinvestidos no ecossistema DeFi da Linea.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
                <Coins className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h5 className="font-semibold mb-1">Duplo Yield</h5>
                <p className="text-xs text-muted-foreground">ETH Staking + DeFi Rewards</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
                <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h5 className="font-semibold mb-1">Deflacionário</h5>
                <p className="text-xs text-muted-foreground">20% das fees queimam ETH</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
                <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h5 className="font-semibold mb-1">Segurança Máxima</h5>
                <p className="text-xs text-muted-foreground">Validadores Ethereum</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Perfect for Fluffy Bears */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-center text-xl">Perfeito para os Fluffy Bears</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center leading-relaxed opacity-90">
              A combinação única da Linea torna nosso modelo de yield sustentável não apenas possível, 
              mas otimizado para crescimento exponencial e rewards consistentes.
            </p>
            
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <DollarSign className="h-5 w-5" />
                <div>
                  <h5 className="font-semibold text-sm">Yields Máximos</h5>
                  <p className="text-xs opacity-80">Native staking + Etherex + Pools DeFi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <Users className="h-5 w-5" />
                <div>
                  <h5 className="font-semibold text-sm">Acesso Fácil</h5>
                  <p className="text-xs opacity-80">30M+ usuários MetaMask nativos</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <Shield className="h-5 w-5" />
                <div>
                  <h5 className="font-semibold text-sm">Segurança Total</h5>
                  <p className="text-xs opacity-80">zkEVM + ConsenSys backing</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                <Target className="h-5 w-5" />
                <div>
                  <h5 className="font-semibold text-sm">Future-Proof</h5>
                  <p className="text-xs opacity-80">Primeira L2 com ETH burning</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-sm font-medium">
                Linea + Fluffy Bears = O futuro dos NFTs sustentáveis
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}