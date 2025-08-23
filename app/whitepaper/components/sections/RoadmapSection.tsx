'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Map, CheckCircle, Clock, Calendar, Target } from 'lucide-react'

export function RoadmapSection() {
  const roadmapPhases = [
    {
      phase: "Q3 2025",
      title: "Fundação",
      status: "in-progress",
      items: [
        "Desenvolvimento da arte e conceito",
        "Criação dos smart contracts",
        "Auditoria de segurança", 
        "Lançamento do website e redes sociais",
        "Abertura da whitelist",
        "Abertura da comunidade Discord",
        "Mint público dos NFTs",
        "Listagem no mercado secundário"
      ]
    },
    {
      phase: "Q4 2025", 
      title: "Lançamento",
      status: "planned",
      items: [
        "Lançamento do sistema de staking",
        "Primeiros investimentos em pools DeFi",
        "Planejamento dos produtos 3D",
        "Design e prototipagem das pelúcias",
        "Criação do roteiro do canal infantil",
        "Desenvolvimento do conteúdo educativo",
        "Início da produção própria",
        "Primeira distribuição de lucros"
      ]
    },
    {
      phase: "Q1 2026",
      title: "Expansão",
      status: "planned", 
      items: [
        "Produção das primeiras pelúcias",
        "Lançamento da loja online",
        "Início do canal YouTube educativo",
        "Parcerias com lojas físicas",
        "Parcerias com outros projetos NFT",
        "Desenvolvimento de produtos para terceiros",
        "Venda de produtos de outros projetos na loja"
      ]
    },
    {
      phase: "2026+",
      title: "Crescimento e Consolidação",
      status: "planned",
      items: [
        "Expansão internacional das vendas",
        "Novos produtos da linha Fluffy Bears",
        "Programa de afiliados para holders",
        "Integração com metaversos",
        "Lançamento de token utilitário",
        "Programa de governança DAO",
        "Expansão para outros blockchains",
        "Fluffy Bears como marca global",
        "Parque temático virtual",
        "Linha de produtos infantis completa",
        "Academia de educação financeira"
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-500'
      case 'in-progress': return 'text-blue-500 bg-blue-500'
      case 'planned': return 'text-yellow-500 bg-yellow-500'
      case 'vision': return 'text-purple-500 bg-purple-500'
      default: return 'text-gray-500 bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'in-progress': return <Clock className="h-4 w-4" />
      case 'planned': return <Calendar className="h-4 w-4" />
      case 'vision': return <Target className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '80% Concluído'
      case 'in-progress': return 'Em Andamento'
      case 'planned': return 'Planejado'
      case 'vision': return 'Visão'
      default: return 'Pendente'
    }
  }

  return (
    <section id="roadmap" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Map className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Roadmap</h2>
          <p className="text-muted-foreground">Nossa jornada de crescimento e expansão</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Progress Overview */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle>Progresso Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <div className="text-2xl font-bold text-blue-600">Q3 2025</div>
                <div className="text-sm text-blue-600">80% Concluído</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-muted-foreground">Q4 2025</div>
                <div className="text-sm text-muted-foreground">Planejado</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-muted-foreground">Q1 2026</div>
                <div className="text-sm text-muted-foreground">Próximo</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-muted-foreground">2026+</div>
                <div className="text-sm text-muted-foreground">Futuro</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => {
              const statusColor = getStatusColor(phase.status)
              const statusIcon = getStatusIcon(phase.status)
              const statusLabel = getStatusLabel(phase.status)
              
              return (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${statusColor.split(' ')[1]}/20 border-4 ${statusColor.split(' ')[1]}/50`}>
                    <div className={`w-8 h-8 rounded-full ${statusColor.split(' ')[1]} flex items-center justify-center text-white`}>
                      {statusIcon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            {phase.phase}
                            <span className="text-lg">•</span>
                            {phase.title}
                          </CardTitle>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${statusColor.split(' ')[0]} border-current`}
                        >
                          {statusLabel}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                              phase.status === 'completed' ? 'bg-green-500' :
                              phase.status === 'in-progress' ? 'bg-blue-500' :
                              'bg-muted-foreground'
                            }`} />
                            <span className={
                              phase.status === 'completed' ? 'text-green-700 dark:text-green-300' :
                              phase.status === 'in-progress' ? 'text-blue-700 dark:text-blue-300' :
                              'text-muted-foreground'
                            }>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Key Milestones */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle>Marcos Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold text-primary">Curto Prazo (2025-2026)</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>100% dos NFTs mintados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Sistema de staking ativo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                    <span>Primeiros produtos físicos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                    <span>Canal educativo lançado</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-primary">Longo Prazo (2026+)</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span>Marca global estabelecida</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span>Token utilitário lançado</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">Transparência e Prestação de Contas</h5>
              <p className="text-sm text-muted-foreground">
                Nosso roadmap é revisado mensalmente e ajustado conforme necessário. 
                Todos os holders recebem relatórios detalhados do progresso e podem 
                participar das decisões através da governança da comunidade.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}