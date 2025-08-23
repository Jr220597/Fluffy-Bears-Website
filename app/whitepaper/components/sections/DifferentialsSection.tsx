'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { List, Star, Shield, TrendingUp, Globe, Users, Zap } from 'lucide-react'

export function DifferentialsSection() {
  const differentials = [
    {
      icon: TrendingUp,
      title: "Receita Real e Sustentável",
      description: "Múltiplos fluxos de receita ativos que geram lucros constantes para reinvestimento",
      highlights: ["Pools DeFi", "Produtos físicos", "Canal educativo", "Royalties"]
    },
    {
      icon: Shield,
      title: "Modelo de Negócio Comprovado",
      description: "Estratégia baseada em princípios financeiros sólidos e não em especulação",
      highlights: ["Investimentos conservadores", "Margem de segurança", "Auditoria externa", "Transparencia total"]
    },
    {
      icon: Globe,
      title: "Ecossistema Integrado",
      description: "Cada componente alimenta e fortalece os demais, criando sinergia única",
      highlights: ["NFTs + DeFi", "Digital + Físico", "Arte + Utilidade", "Entretenimento + Educação"]
    },
    {
      icon: Users,
      title: "Comunidade com Propósito",
      description: "Mais que holders, somos uma família unida por valores e objetivos comuns",
      highlights: ["Educação financeira", "Conteúdo infantil", "Valores familiares", "Crescimento conjunto"]
    },
    {
      icon: Zap,
      title: "Execução Rápida",
      description: "Não prometemos - entregamos. Utilidades já ativas e funcionais",
      highlights: ["Staking ativo", "Produtos em produção", "Pools investidas", "Canal em desenvolvimento"]
    },
    {
      icon: Star,
      title: "Inovação no Espaço NFT",
      description: "Primeira coleção a implementar um ciclo econômico completo e autossustentável",
      highlights: ["Modelo pioneiro", "Referência no mercado", "Tese de investimento única", "Valor intrínseco real"]
    }
  ]

  const comparisons = [
    {
      aspect: "Fonte de Valor",
      fluffyBears: "Utilidades reais + Receita recorrente",
      outros: "Especulação + Hype"
    },
    {
      aspect: "Sustentabilidade",
      fluffyBears: "Modelo de negócio sólido",
      outros: "Dependente de novos investidores"
    },
    {
      aspect: "Produtos",
      fluffyBears: "Físicos + Digitais já disponíveis",
      outros: "Promessas futuras"
    },
    {
      aspect: "Rewards",
      fluffyBears: "Baseados em lucros reais",
      outros: "Tokens sem valor intrínseco"
    },
    {
      aspect: "Transparença",
      fluffyBears: "Carteiras públicas + Relatórios",
      outros: "Promessas vagas"
    }
  ]

  return (
    <section id="differentials" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <List className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Resumo dos Diferenciais</h2>
          <p className="text-muted-foreground">Por que os Fluffy Bears são únicos</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle>O que nos Torna Especiais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">
              Em um mercado saturado de projetos NFT sem fundamento, os Fluffy Bears emergem 
              como uma proposta verdadeiramente revolucionária e sustentável.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {differentials.map((diff, index) => {
                const Icon = diff.icon
                return (
                  <Card key={index} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-sm leading-tight">{diff.title}</h4>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">{diff.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {diff.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fluffy Bears vs. Outros Projetos NFT</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Aspecto</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary">Fluffy Bears</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Outros Projetos</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comp, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4 font-medium">{comp.aspect}</td>
                      <td className="py-3 px-4 text-sm text-green-600">{comp.fluffyBears}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{comp.outros}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-3 comparison-mobile">
              {comparisons.map((comp, index) => (
                <div key={index} className="border border-border rounded-lg p-4 bg-card">
                  <h5 className="font-semibold text-primary mb-3 text-center">{comp.aspect}</h5>
                  <div className="space-y-2">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border-l-4 border-green-500">
                      <div className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Fluffy Bears</div>
                      <div className="text-sm text-green-600 dark:text-green-400">{comp.fluffyBears}</div>
                    </div>
                    <div className="bg-muted p-3 rounded border-l-4 border-muted-foreground">
                      <div className="text-xs font-medium text-muted-foreground mb-1">Outros Projetos</div>
                      <div className="text-sm text-muted-foreground">{comp.outros}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-center">Resumo Executivo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <h5 className="font-semibold mb-2 text-yellow-600">Inovação</h5>
                <p className="text-sm text-muted-foreground">
                  Primeiro projeto a integrar NFTs, DeFi, produtos físicos e conteúdo educativo 
                  em um ecossistema coeso
                </p>
              </div>
              
              <div className="text-center">
                <h5 className="font-semibold mb-2 text-orange-600">Sustentabilidade</h5>
                <p className="text-sm text-muted-foreground">
                  Modelo econômico baseado em receitas reais, não em especulação ou novos 
                  investidores
                </p>
              </div>
              
              <div className="text-center">
                <h5 className="font-semibold mb-2 text-red-600">Impacto</h5>
                <p className="text-sm text-muted-foreground">
                  Além dos lucros, promovemos educação financeira e valores familiares 
                  através do entretenimento
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-muted border text-center">
              <h5 className="font-semibold mb-2">Nossa Promessa</h5>
              <p className="text-sm text-muted-foreground">
                <strong>Fluffy Bears</strong> representa o futuro dos NFTs: onde arte, tecnologia e negócio 
                se unem para criar valor real, sustentável e duradouro para toda a comunidade.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}