'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Coins, PieChart, TrendingUp, Shield, Wallet } from 'lucide-react'

export function TokenomicsSection() {
  const distribution = [
    {
      category: "Pools de Liquidez",
      percentage: "75%",
      color: "bg-blue-500",
      description: "Investimento principal em pools DeFi para geração de rendimento"
    },
    {
      category: "Produção Física",
      percentage: "10%",
      color: "bg-green-500",
      description: "Fabricação e distribuição de produtos físicos globalmente"
    },
    {
      category: "Marketing & Expansão",
      percentage: "10%",
      color: "bg-purple-500", 
      description: "Crescimento da marca e aquisição de novos holders"
    },
    {
      category: "Desenvolvimento",
      percentage: "5%",
      color: "bg-orange-500",
      description: "Melhoria contínua da plataforma e novos produtos"
    }
  ]

  const revenueStreams = [
    {
      name: "Rendimento das Pools",
      estimated: "70-250% APY",
      status: "Ativo",
      description: "Lucros automáticos dos investimentos DeFi"
    },
    {
      name: "Venda de Produtos", 
      estimated: "20-30% margem",
      status: "Planejado",
      description: "Produtos físicos com demanda comprovada"
    },
    {
      name: "Canal YouTube",
      estimated: "$500-2000/mês",
      status: "Desenvolvimento", 
      description: "Receita publicitária do conteúdo infantil"
    },
    {
      name: "Royalties NFT",
      estimated: "5% por venda",
      status: "Ativo",
      description: "Comissão das vendas no mercado secundário"
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
          <p className="text-muted-foreground">Distribuição e economia do projeto</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Price and Supply */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-500" />
              Informações de Mint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">0.025 ETH</div>
                <div className="text-sm text-muted-foreground">Preço de Mint</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Limited</div>
                <div className="text-sm text-muted-foreground">Supply Total</div>
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
              Distribuição dos Fundos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Cada ETH arrecadado será estrategicamente alocado para maximizar o retorno dos holders:
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
              <h4 className="font-semibold mb-2 text-primary">Transparência Total</h4>
              <p className="text-sm">
                Todas as transações serão públicas e rastreáveis no blockchain. 
                Relatórios mensais detalharão o uso dos fundos e os resultados obtidos.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Streams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Fluxos de Receita
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Múltiplas fontes de receita garantem sustentabilidade e crescimento contínuo:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {revenueStreams.map((stream, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{stream.name}</h4>
                      <Badge 
                        variant={stream.status === 'Ativo' ? 'default' : stream.status === 'Planejado' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {stream.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{stream.description}</p>
                    <div className="text-sm font-medium text-green-600">
                      Estimativa: {stream.estimated}
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
              Proposta de Valor para Holders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              Diferentemente de projetos especulativos, os Fluffy Bears oferecem valor real e sustentável:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold text-primary">Benefícios Imediatos</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    NFT único e colecionável
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Acesso ao sistema de staking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Comunidade exclusiva
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Desconto em produtos físicos
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-primary">Benefícios de Longo Prazo</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Distribuição de lucros das vendas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Crescimento do valor intrínseco
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Participação em futuras expansões
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Produtos físicos exclusivos
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">Projeção Conservadora</h5>
              <p className="text-sm text-muted-foreground">
                Com base em nossos modelos financeiros, esperamos que cada holder receba 
                entre 100-250% do valor investido anualmente através de staking rewards, 
                além da apreciação natural do NFT devido às utilidades reais.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}