'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Hammer, Calendar, Users, Zap, Gift, Shield } from 'lucide-react'

export function MintSection() {
  const phases = [
    {
      name: "Free Mint GTD",
      description: "Mint gratuito garantido para membros especiais",
      status: "Em Breve",
      color: "bg-green-500"
    },
    {
      name: "Free Mint FCFS",
      description: "Mint gratuito por ordem de chegada",
      status: "Em Breve",
      color: "bg-blue-500"
    },
    {
      name: "Whitelist",
      description: "Acesso antecipado para membros da whitelist",
      status: "Em Breve",
      color: "bg-purple-500"
    },
    {
      name: "Public",
      description: "Mint público aberto para todos",
      status: "Em Breve",
      color: "bg-orange-500"
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Staking Imediato",
      description: "Comece a ganhar rewards logo após o mint"
    },
    {
      icon: Gift,
      title: "Produtos Físicos",
      description: "Descontos exclusivos à loja de produtos"
    },
    {
      icon: Users,
      title: "Comunidade VIP",
      description: "Discord exclusivo para holders"
    },
    {
      icon: Shield,
      title: "Garantia de Valor",
      description: "Utilidades reais que sustentam o preço"
    }
  ]

  return (
    <section id="mint" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Hammer className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Mint</h2>
          <p className="text-muted-foreground">Como adquirir seu Fluffy Bear NFT</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Current Status */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              Status Atual do Mint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-semibold text-orange-600">Mint em Breve</span>
              </div>
              <p className="text-muted-foreground">
                O mint dos Fluffy Bears será anunciado em breve. Acompanhe nossas redes sociais para não perder!
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-2xl font-bold text-primary animate-pulse">...</div>
                  <div className="text-sm text-muted-foreground">NFTs Disponíveis</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-2xl font-bold text-primary">0.025 ETH</div>
                  <div className="text-sm text-muted-foreground">Preço de Mint</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mint Phases */}
        <Card>
          <CardHeader>
            <CardTitle>Fases do Mint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">
              O mint foi estruturado em fases para recompensar os primeiros apoiadores:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {phases.map((phase, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className={`w-4 h-4 rounded-full ${phase.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{phase.name}</h4>
                      <Badge variant="outline">
                        {phase.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits for Holders */}
        <Card>
          <CardHeader>
            <CardTitle>Benefícios Imediatos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Ao fazer o mint de um Fluffy Bear, você ganha acesso imediato a:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* How to Mint */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle>Como Fazer o Mint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold">Pré-requisitos</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Carteira MetaMask conectada
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    ETH suficiente para mint + gas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Conectar na rede Linea
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold">Processo</h5>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                    Acesse a página de mint
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                    Conecte sua carteira
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                    Selecione a quantidade
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                    Confirme a transação
                  </li>
                </ol>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">⚠️ Importante</h5>
              <p className="text-sm text-muted-foreground">
                Sempre verifique se está no site oficial antes de conectar sua carteira. 
                Nunca compartilhe sua seed phrase e sempre revise as taxas de gas antes de confirmar.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}