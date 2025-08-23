'use client'

import { EconomicCycleDiagram } from '@/components/EconomicCycleDiagram'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'

export default function DiagramPage() {
  // Dados customizados para demonstração
  const customData = {
    mint: {
      description: "Venda inicial de 777 NFTs únicos na blockchain Linea através do nosso site próprio.",
      kpis: { 
        "Supply Total": "777 NFTs", 
        "Preço": "0.07 ETH", 
        "Blockchain": "Linea",
        "Status": "Ativo" 
      }
    },
    products: {
      description: "Produção e venda de pelúcias e colecionáveis 3D dos personagens Fluffy Bears com qualidade premium.",
      kpis: { 
        "Margem de Lucro": "30-50%", 
        "Reinvestimento": "75% → Pools", 
        "Lançamento": "Q2 2024",
        "Parceiros": "3+ fábricas" 
      }
    },
    channel: {
      description: "Canal no YouTube com conteúdo infantil educativo: músicas, animações e histórias com os Fluffy Bears.",
      kpis: { 
        "Meta Inicial": "$1-3K/mês", 
        "Reinvestimento": "75% → Pools", 
        "Frequência": "4 vídeos/semana",
        "Target": "Crianças 0-12 anos" 
      }
    },
    pools: {
      description: "Pools de liquidez na DEX Etherex (Linea) onde os fundos são investidos para gerar yield contínuo.",
      kpis: { 
        "APY Projetado": "70-250%", 
        "DEX": "Etherex", 
        "Blockchain": "Linea",
        "Estratégia": "Multi-pool" 
      }
    },
    stakers: {
      description: "Holders que fazem staking dos NFTs e recebem recompensas periódicas em ETH baseadas no yield das pools.",
      kpis: { 
        "Bônus OG": "1.5x multiplier", 
        "Distribuição": "Semanal", 
        "Token": "ETH",
        "Lock Period": "Flexível" 
      }
    }
  }

  const customLabels = {
    mint: "Mint NFT",
    products: "Produtos Físicos",
    channel: "Canal YouTube", 
    pools: "Pools DeFi",
    stakers: "NFT Stakers",
    inflow: "75% Lucro → Pools",
    outflow: "Recompensas ETH"
  }

  const customPalette = {
    nodeMint: "#3B82F6",
    nodeProducts: "#10B981",
    nodeChannel: "#F59E0B", 
    nodePools: "#8B5CF6",
    nodeStakers: "#EF4444",
    edgeInflow: "#6366F1",
    edgeOutflow: "#EC4899"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/whitepaper"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Whitepaper
          </Link>
        </div>

        <div className="space-y-8">
          {/* Título e descrição */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Diagrama Interativo do Ciclo Econômico
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore visualmente como funciona o ecossistema autossustentável dos Fluffy Bears NFTs,
              desde o mint inicial até as recompensas contínuas para os stakers.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Badge variant="secondary" className="text-sm">
                <Info className="h-3 w-3 mr-1" />
                Passe o mouse sobre os nós para detalhes
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Animações GSAP e Anime.js
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Export SVG/PNG disponível
              </Badge>
            </div>
          </div>

          {/* Diagrama principal */}
          <EconomicCycleDiagram
            className="w-full"
            animationLib="gsap"
            animated={true}
            speed={3000}
            labels={customLabels}
            palette={customPalette}
            data={customData}
          />

          {/* Cards explicativos */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">🎯 Funcionalidades</CardTitle>
                <CardDescription>Recursos interativos do diagrama</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Animações suaves com GSAP/Anime.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Tooltips informativos em cada nó</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Export para SVG e PNG</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Responsivo e acessível</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Dark/Light mode automático</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-lg">⚡ Fluxo de Valor</CardTitle>
                <CardDescription>Como o valor circula no ecossistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Mint → capital inicial nas pools</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Produtos → 75% lucro → pools</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Canal → 75% receita → pools</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Pools → yield → stakers NFT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Crescimento exponencial contínuo</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-lg">📊 Métricas Chave</CardTitle>
                <CardDescription>Indicadores de performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supply NFT:</span>
                  <span className="font-medium">777</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">APY Pools:</span>
                  <span className="font-medium">70-250%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reinvestimento:</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bônus OG:</span>
                  <span className="font-medium">1.5x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blockchain:</span>
                  <span className="font-medium">Linea</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exemplos de uso da API */}
          <Card>
            <CardHeader>
              <CardTitle>🛠️ Configuração do Componente</CardTitle>
              <CardDescription>
                Exemplos de como usar o componente EconomicCycleDiagram com diferentes configurações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Uso básico:</h4>
                <pre className="p-3 bg-muted rounded-md text-xs overflow-x-auto">
{`<EconomicCycleDiagram 
  animated={true}
  animationLib="gsap"
  speed={3000}
/>`}
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Personalização avançada:</h4>
                <pre className="p-3 bg-muted rounded-md text-xs overflow-x-auto">
{`<EconomicCycleDiagram 
  labels={{
    mint: "Mint NFT",
    products: "Produtos Físicos", 
    pools: "Pools DeFi",
    inflow: "75% → Pools"
  }}
  palette={{
    nodeMint: "#3B82F6",
    nodeProducts: "#10B981",
    edgeInflow: "#6366F1"
  }}
  data={{
    mint: {
      description: "Descrição customizada",
      kpis: { "Supply": 777, "Preço": "0.07 ETH" }
    }
  }}
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}