'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, ArrowRight, DollarSign, TrendingUp } from 'lucide-react'
import { EconomicCycleDiagramNew } from '@/components/EconomicCycleDiagramNew'

export function EconomicCycleSection() {
  const cycleSteps = [
    {
      step: 1,
      title: "Mint",
      description: "Holders fazem mint dos NFTs",
      amount: "ETH arrecadado",
      color: "#3B82F6"
    },
    {
      step: 2, 
      title: "Pools",
      description: "Fundos investidos em pools DeFi",
      amount: "ETH movido para pools de liquidez",
      color: "#10B981"
    },
    {
      step: 3,
      title: "Staking",
      description: "Holders fazem staking dos NFTs",
      amount: "Acesso aos rewards",
      color: "#F59E0B"
    },
    {
      step: 4,
      title: "Rewards",
      description: "Distribuição dos rendimentos",
      amount: "Rewards distribuídos periodicámente",
      color: "#06B6D4"
    }
  ]

  const additionalFlows = [
    {
      title: "Produtos",
      description: "Produção e venda de produtos",
      amount: "Lucro reinvestido nas pools",
      color: "#EF4444",
      flowsTo: "Pools"
    },
    {
      title: "Canal",
      description: "Canal infantil no YouTube",
      amount: "Receita constante reinvestida nas pools",
      color: "#9333EA",
      flowsTo: "Pools"
    }
  ]

  return (
    <section id="economic-cycle" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <RotateCcw className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Ciclo Econômico</h2>
          <p className="text-muted-foreground">O motor autossustentável do ecossistema</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Diagrama Novo - Limpo e Funcional */}
        <EconomicCycleDiagramNew
          data={{
            mint: {
              description: "Venda Inicial de NFTs na blockchain Linea.",
              kpis: { "Supply": "Coming Soon", "Preço": "0.025 ETH", "Blockchain": "Linea" }
            },
            products: {
              description: "Produção e venda de pelúcias e colecionáveis 3D dos Fluffy Bears.",
              kpis: { "Margem": "30-50%", "Reinvestimento": "75%", "Lançamento": "Q4 2025" }
            },
            channel: {
              description: "Canal YouTube com conteúdo infantil: músicas, animações e histórias.",
              kpis: { "Meta": "$1-3K/mês", "Reinvestimento": "75%", "Frequência": "4 vídeos/sem" }
            },
            pools: {
              description: "Pools de liquidez na DEX Etherex (Linea) para gerar yield contínuo.",
              kpis: { "APY": "70-250%", "DEX": "Etherex", "Blockchain": "Linea" }
            },
            stakers: {
              description: "Holders que fazem staking dos NFTs e recebem recompensas em ETH.",
              kpis: { "Distribuição": "Periódica", "Stake mínimo": "7 dias", "Token": "ETH" }
            }
          }}
        />


        {/* Detailed Steps */}
        <div className="space-y-6">
          {/* Main Cycle */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Ciclo Principal</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {cycleSteps.map((step, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: step.color }}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.step}
                      </div>
                      <h4 className="font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {step.amount}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Flows */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Fluxos Adicionais</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {additionalFlows.map((flow, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: flow.color }}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: flow.color }}
                      >
                        {flow.title.charAt(0)}
                      </div>
                      <h4 className="font-semibold">{flow.title}</h4>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Lucro → {flow.flowsTo}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{flow.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {flow.amount}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Cycle Benefits */}
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Benefícios do Ciclo Econômico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Crescimento Exponencial
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Cada ciclo aumenta o capital disponível
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Produtos geram receita adicional constante
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Staking rewards crescem automaticamente
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Valor dos NFTs aumenta com utilidades
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  Sustentabilidade
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Independente de novos investidores
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Múltiplas fontes de receita
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Modelo de negócio comprovado
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Reinvestimento automático dos lucros
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">Exemplo Prático</h5>
              <p className="text-sm text-muted-foreground">
                Imagine que o projeto arrecade 100 ETH no mint. Após 1 ano de operação, com 10% de retorno 
                das pools + 50% de margem na venda de produtos, o capital pode crescer para 150+ ETH, 
                aumentando proporcionalmente todos os rewards para os holders.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}