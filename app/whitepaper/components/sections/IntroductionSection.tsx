'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Sparkles, Target, Users } from 'lucide-react'

export function IntroductionSection() {
  return (
    <section id="introduction" className="scroll-mt-20 pt-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Introdução</h2>
          <p className="text-muted-foreground">Bem-vindos ao universo Fluffy Bears</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              O que são os Fluffy Bears?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Os <strong>Fluffy Bears</strong> representam uma revolução no espaço NFT, combinando arte digital exclusiva 
              com utilidade real e um ecossistema econômico sustentável. Nossa coleção vai muito além de simples 
              tokens digitais - ela é o portal de entrada para um universo completo de produtos, experiências 
              e oportunidades de investimento.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Exclusivos</div>
                <div className="text-sm text-muted-foreground">NFTs Únicos</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Multiple</div>
                <div className="text-sm text-muted-foreground">Utilidades Reais</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Forever</div>
                <div className="text-sm text-muted-foreground">Valor Sustentável</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Nossa Missão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              Criar um ecossistema NFT sustentável que conecta o mundo digital ao físico, 
              oferecendo valor real através de produtos tangíveis, experiências únicas e 
              oportunidades de crescimento financeiro para nossa comunidade.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Sustentabilidade</Badge>
              <Badge variant="secondary">Utilidade Real</Badge>
              <Badge variant="secondary">Comunidade</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Nossa Visão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              Ser a primeira coleção NFT a estabelecer um ciclo econômico completo e autossustentável, 
              onde cada holder se beneficia do crescimento contínuo do ecossistema através de 
              produtos físicos, conteúdo educativo e oportunidades de investimento.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Inovação</Badge>
              <Badge variant="secondary">Crescimento</Badge>
              <Badge variant="secondary">Transparência</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Por que os Fluffy Bears são diferentes?</h4>
              <p className="text-muted-foreground">
                Diferentemente de outros projetos NFT que prometem utilidades futuras, os Fluffy Bears já 
                possuem um plano de negócios completo e implementado, com produtos físicos reais, 
                parcerias estabelecidas e um sistema de geração de receita que beneficia diretamente 
                todos os holders da coleção desde o dia 1.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}