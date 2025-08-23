'use client'

import React, { useRef, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Coins, 
  Package, 
  Video, 
  Layers, 
  Users,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Tipos
type LibChoice = "gsap" | "anime" | "none"
type NodeKey = "mint" | "products" | "channel" | "pools" | "stakers"

interface NodeData {
  description?: string
  kpis?: Record<string, string | number>
}

interface DiagramProps {
  className?: string
  animationLib?: LibChoice
  animated?: boolean
  speed?: number
  palette?: {
    background?: string
    nodeMint?: string
    nodeProducts?: string
    nodeChannel?: string
    nodePools?: string
    nodeStakers?: string
    edgeInflow?: string
    edgeOutflow?: string
  }
  labels?: Partial<Record<NodeKey, string>> & {
    inflow?: string
    outflow?: string
  }
  data?: Partial<Record<NodeKey, NodeData>>
}

// Dados padrão
const defaultLabels = {
  mint: "Mint",
  products: "Produtos 3D", 
  channel: "Canal Infantil",
  pools: "Pools",
  stakers: "Stakers (Holders)",
  inflow: "Lucro → Pools",
  outflow: "Recompensas"
}

const defaultPalette = {
  background: "hsl(var(--card))",
  nodeMint: "#5B8DEF",
  nodeProducts: "#22C55E", 
  nodeChannel: "#EAB308",
  nodePools: "#7C3AED",
  nodeStakers: "#F97316",
  edgeInflow: "#64748B",
  edgeOutflow: "#334155"
}

const defaultData = {
  mint: {
    description: "Venda inicial dos NFTs (site próprio na Linea).",
    kpis: { "Supply Total": 777, "Preço": "0.07 ETH", "Blockchain": "Linea" }
  },
  products: {
    description: "Receita de colecionáveis 3D (produção própria e parcerias).",
    kpis: { "Margem": "30-50%", "Reinvestimento": "75%", "Frequência": "Mensal" }
  },
  channel: {
    description: "Monetização do canal infantil (ads/licenciamento/produtos).",
    kpis: { "Meta Inicial": "$1-3K/mês", "Reinvestimento": "75%", "Conteúdo": "4 vídeos/sem" }
  },
  pools: {
    description: "Pools na DEX Etherex (Linea) que rendem yield.",
    kpis: { "APY": "70-250%", "DEX": "Etherex", "Rede": "Linea" }
  },
  stakers: {
    description: "Holders que fazem staking dos NFTs e recebem recompensas.",
    kpis: { "Bônus OG": "1.5x", "Distribuição": "Periódica", "Tipo": "ETH" }
  }
}

// Componente principal
export function EconomicCycleDiagram({
  className = "",
  animationLib = "gsap",
  animated = true,
  speed = 4000,
  palette = {},
  labels = {},
  data = {}
}: DiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  
  // Mesclar dados padrão com props
  const finalPalette = { ...defaultPalette, ...palette }
  const finalLabels = { ...defaultLabels, ...labels }
  const finalData = { ...defaultData, ...data }

  // Animação simples apenas para entrada dos nós
  useEffect(() => {
    if (!svgRef.current || !animated) return
    
    const nodes = svgRef.current.querySelectorAll('.diagram-node')
    nodes.forEach((node, index) => {
      const element = node as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'scale(0.8)'
      
      setTimeout(() => {
        element.style.transition = 'all 0.6s ease-out'
        element.style.opacity = '1'
        element.style.transform = 'scale(1)'
      }, index * 150)
    })
  }, [animated])

  // Dados dos nós
  const nodes = [
    {
      id: 'mint',
      label: finalLabels.mint!,
      icon: Coins,
      color: finalPalette.nodeMint,
      x: 150,
      y: 100,
      data: finalData.mint
    },
    {
      id: 'products',
      label: finalLabels.products!,
      icon: Package,
      color: finalPalette.nodeProducts,
      x: 400,
      y: 80,
      data: finalData.products
    },
    {
      id: 'channel',
      label: finalLabels.channel!,
      icon: Video,
      color: finalPalette.nodeChannel,
      x: 650,
      y: 100,
      data: finalData.channel
    },
    {
      id: 'pools',
      label: finalLabels.pools!,
      icon: Layers,
      color: finalPalette.nodePools,
      x: 400,
      y: 300,
      data: finalData.pools
    },
    {
      id: 'stakers',
      label: finalLabels.stakers!,
      icon: Users,
      color: finalPalette.nodeStakers,
      x: 400,
      y: 480,
      data: finalData.stakers
    }
  ]

  return (
    <TooltipProvider>
      <Card className={cn("w-full", className)}>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Diagrama do Ciclo Econômico
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <div className="w-full overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 800 600"
              className="w-full h-auto max-w-5xl mx-auto"
              style={{ minHeight: '500px' }}
            >
              {/* Definições para gradientes, markers e animação CSS */}
              <defs>
                {/* Gradientes para as setas */}
                <linearGradient id="inflowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={finalPalette.edgeInflow} />
                  <stop offset="100%" stopColor={finalPalette.nodePools} />
                </linearGradient>

                <linearGradient id="outflowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={finalPalette.nodePools} />
                  <stop offset="100%" stopColor={finalPalette.nodeStakers} />
                </linearGradient>

                {/* Markers corrigidos (viewBox + refX na ponta) */}
                <marker
                  id="arrowhead"
                  viewBox="0 0 12 8"
                  markerWidth="12"
                  markerHeight="8"
                  refX="12"
                  refY="4"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 12 4, 0 8" fill="url(#inflowGradient)" />
                </marker>

                <marker
                  id="arrowhead-outflow"
                  viewBox="0 0 12 8"
                  markerWidth="12"
                  markerHeight="8"
                  refX="12"
                  refY="4"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 12 4, 0 8" fill="url(#outflowGradient)" />
                </marker>

              </defs>

              {/* Background */}
              <rect width="800" height="600" fill={finalPalette.background} rx="8" />

              {/* Setas de entrada para Pools - Mint e Canal (curvas) */}
              {[nodes[0], nodes[2]].map((node, index) => {
                const poolsNode = nodes[3]
                const curveHeight = 80
                const midX = (node.x + poolsNode.x) / 2
                const midY = Math.min(node.y, poolsNode.y) + curveHeight
                const pathData = `M ${node.x} ${node.y + 40} Q ${midX} ${midY} ${poolsNode.x} ${poolsNode.y - 40}`

                return (
                  <g key={`inflow-curve-${index}`}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke="url(#inflowGradient)"
                      strokeWidth="3"
                      markerEnd="url(#arrowhead)"
                      opacity="0.8"
                      strokeLinecap="round"
                    />
                  </g>
                )
              })}

              {/* Labels específicos */}
              {/* Label abaixo de Mint */}
              <g>
                <rect
                  x={nodes[0].x - 30}
                  y={nodes[0].y + 50}
                  width="60"
                  height="16"
                  fill={finalPalette.background}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  rx="8"
                  opacity="0.95"
                />
                <text
                  x={nodes[0].x}
                  y={nodes[0].y + 60}
                  textAnchor="middle"
                  className="fill-muted-foreground text-xs font-medium"
                >
                  ETH inicial
                </text>
              </g>

              {/* Label abaixo de Products */}
              <g>
                <rect
                  x={nodes[1].x - 30}
                  y={nodes[1].y + 50}
                  width="60"
                  height="16"
                  fill={finalPalette.background}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  rx="8"
                  opacity="0.95"
                />
                <text
                  x={nodes[1].x}
                  y={nodes[1].y + 60}
                  textAnchor="middle"
                  className="fill-muted-foreground text-xs font-medium"
                >
                  75% Lucro
                </text>
              </g>

              {/* Label abaixo de Channel */}
              <g>
                <rect
                  x={nodes[2].x - 35}
                  y={nodes[2].y + 50}
                  width="70"
                  height="16"
                  fill={finalPalette.background}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  rx="8"
                  opacity="0.95"
                />
                <text
                  x={nodes[2].x}
                  y={nodes[2].y + 60}
                  textAnchor="middle"
                  className="fill-muted-foreground text-xs font-medium"
                >
                  75% Receita
                </text>
              </g>

              {/* Seta de saída de Pools para Stakers */}
              <g>
                <path
                  d={`M ${nodes[3].x} ${nodes[3].y + 40} L ${nodes[4].x} ${nodes[4].y - 40}`}
                  fill="none"
                  stroke="url(#outflowGradient)"
                  strokeWidth="4"
                  markerEnd="url(#arrowhead-outflow)"
                  opacity="0.9"
                  strokeLinecap="round"
                />
              </g>

              {/* Label abaixo de Pools */}
              <g>
                <rect
                  x={nodes[3].x - 40}
                  y={nodes[3].y + 50}
                  width="80"
                  height="16"
                  fill={finalPalette.background}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  rx="8"
                  opacity="0.95"
                />
                <text
                  x={nodes[3].x}
                  y={nodes[3].y + 60}
                  textAnchor="middle"
                  className="fill-muted-foreground text-xs font-medium"
                >
                  {finalLabels.outflow}
                </text>
              </g>

              {/* Nós */}
              {nodes.map((node) => {
                const IconComponent = node.icon
                return (
                  <Tooltip key={node.id}>
                    <TooltipTrigger asChild>
                      <g 
                        className="diagram-node cursor-pointer hover:scale-105 transition-all duration-200"
                        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                      >
                        {/* Shadow */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="35"
                          fill="rgba(0,0,0,0.15)"
                          transform="translate(3,3)"
                          className="opacity-40"
                        />
                        
                        {/* Background circle */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="35"
                          fill={node.color}
                          opacity="0.1"
                        />
                        
                        {/* Border */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="35"
                          fill="none"
                          stroke={node.color}
                          strokeWidth="3"
                        />
                        
                        {/* Icon background */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="22"
                          fill={node.color}
                        />
                        
                        {/* Icon */}
                        <foreignObject
                          x={node.x - 12}
                          y={node.y - 12}
                          width="24"
                          height="24"
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </foreignObject>
                        
                        {/* Label background */}
                        <rect
                          x={node.x - 40}
                          y={node.y - 65}
                          width="80"
                          height="20"
                          fill={finalPalette.background}
                          stroke="hsl(var(--border))"
                          strokeWidth="1"
                          rx="10"
                          opacity="0.95"
                        />
                        
                        {/* Label */}
                        <text
                          x={node.x}
                          y={node.y - 52}
                          textAnchor="middle"
                          className="fill-foreground text-sm font-semibold"
                        >
                          {node.label}
                        </text>
                      </g>
                    </TooltipTrigger>
                    
                    <TooltipContent side="top" className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-medium">{node.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {node.data?.description}
                        </p>
                        {node.data?.kpis && (
                          <div className="space-y-1">
                            {Object.entries(node.data.kpis).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-xs">
                                <span className="text-muted-foreground">{key}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
              
              {/* Seta Produtos 3D → Pools - VISÍVEL ao lado direito */}
              <g>
                <path
                  d="M 430 115 L 430 265"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="4"
                  markerEnd="url(#arrowhead)"
                  opacity="1.0"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>

          {/* Legenda */}
          <div className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/30 border">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  Fontes de Entrada
                </h4>
                <div className="space-y-2 text-sm">
                  {nodes.slice(0, 3).map((node) => {
                    const IconComponent = node.icon
                    return (
                      <div key={node.id} className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: node.color }}
                        >
                          <IconComponent className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-muted-foreground">{node.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/30 border">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-orange-500"></div>
                  Sistema de Recompensas
                </h4>
                <div className="space-y-2 text-sm">
                  {nodes.slice(3, 5).map((node) => {
                    const IconComponent = node.icon
                    return (
                      <div key={node.id} className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: node.color }}
                        >
                          <IconComponent className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-muted-foreground">{node.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-primary">Fluxo:</strong> Três fontes de entrada alimentam as pools → Pools geram yield → Recompensas distribuídas aos stakers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
