'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Target, Heart, Rocket } from 'lucide-react'

export function ConclusionSection() {
  return (
    <section id="conclusion" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <CheckCircle className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Conclusão</h2>
          <p className="text-muted-foreground">O futuro dos NFTs é aqui</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Uma Nova Era para NFTs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Os Fluffy Bears representam uma evolução natural do espaço NFT, onde arte digital 
              e utilidade real se encontram para criar valor sustentável. Não somos apenas 
              mais uma coleção - somos um novo modelo de negócio que redefine o que significa 
              possuir um NFT.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-primary">Sustentável</div>
                <div className="text-sm text-muted-foreground">Modelo de negócio sólido</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-primary">Inovador</div>
                <div className="text-sm text-muted-foreground">Primeira abordagem integrada</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-primary">Rentável</div>
                <div className="text-sm text-muted-foreground">ROI consistente e crescente</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Por que Investir nos Fluffy Bears?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Arte única e cativante
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Utilidades reais implementadas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Fluxos de receita diversificados
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Crescimento exponencial programático
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Comunidade engajada e ativa
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Equipe experiente e transparente
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-blue-500" />
                Nossa Visão de Futuro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Ecossistema NFT auto-sustentável
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Marca global reconhecida
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Ecossistema de produtos completo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Plataforma educacional líder
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Padrão para futuros projetos NFT
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Impacto positivo na sociedade
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Junte-se à Revolução</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg opacity-90">
              Os Fluffy Bears não são apenas NFTs - são seu passaporte para um futuro onde 
              blockchain, arte e negócios se unem para criar valor real e duradouro.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap pt-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Sustentabilidade
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Inovação
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Comunidade
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Prosperidade
              </Badge>
            </div>

            <div className="pt-6 border-t border-white/20">
              <h4 className="font-semibold mb-2">Próximos Passos</h4>
              <div className="grid gap-2 md:grid-cols-3 text-sm">
                <div>1. Faça o mint do seu Fluffy Bear</div>
                <div>2. Junte-se à nossa comunidade</div>
                <div>3. Comece a ganhar rewards</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}