'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, ArrowRight, Zap, Shield, Globe, Coins } from 'lucide-react'

export function OverviewSection() {
  const features = [
    {
      icon: Zap,
      title: "Staking com Rewards",
      description: "Sistema de staking que distribui lucros reais dos produtos físicos",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Pools de Liquidez",
      description: "Investimentos seguros com reforço constante dos lucros",
      color: "text-blue-500"
    },
    {
      icon: Globe,
      title: "Produtos Físicos",
      description: "Produtos de alta qualidade vendidos globalmente",
      color: "text-green-500"
    },
    {
      icon: Coins,
      title: "Canal Infantil",
      description: "Conteúdo infantil que gera receita publicitária",
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
          <h2 className="text-3xl font-bold">Visão Geral</h2>
          <p className="text-muted-foreground">Como funciona o ecossistema Fluffy Bears</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle>O Ecossistema Completo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              O projeto Fluffy Bears opera como um <strong>ecossistema integrado</strong> onde cada componente 
              alimenta e fortalece os demais. Nossa abordagem única combina NFTs, DeFi, produtos físicos 
              e conteúdo digital em um ciclo econômico sustentável.
            </p>
            
            <div className="bg-muted p-6 rounded-lg">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Fluxo do Ecossistema
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <span>Mint de NFTs gera capital inicial</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                  <span>Capital é investido em pools de liquidez</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                  <span>Lucros financiam produção de produtos físicos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                  <span>Vendas geram receita adicional</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">5</div>
                  <span>Receitas reforçam as pools constantemente</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">6</div>
                  <span>Holders recebem rewards via staking</span>
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
              <CardTitle>Sustentabilidade Financeira</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                Diferentemente de projetos que dependem apenas de vendas secundárias, 
                nosso modelo gera receita contínua através de:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Venda de produtos físicos</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Receita publicitária do canal</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Rendimentos das pools DeFi</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Royalties das vendas secundárias</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transparência Total</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                Todos os aspectos financeiros do projeto são transparentes e verificáveis:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Carteiras públicas no blockchain</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Relatórios mensais de receita</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Distribuição automática via smart contract</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Auditoria externa regular</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Resultado: Crescimento Sustentável</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Este modelo único garante que o valor dos NFTs cresça organicamente através de 
                utilidades reais e fluxos de receita diversificados, criando um investimento 
                sólido para todos os holders.
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="outline">Receita Recorrente</Badge>
                <Badge variant="outline">Valor Intrínseco</Badge>
                <Badge variant="outline">Crescimento Orgânico</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}