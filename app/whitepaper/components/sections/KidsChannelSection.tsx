'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Baby, Play, BookOpen, DollarSign } from 'lucide-react'

export function KidsChannelSection() {
  const contentTypes = [
    {
      type: "Músicas Infantis",
      description: "Canções alegres com os personagens Fluffy Bears",
      duration: "3-5 min",
      frequency: "2x/semana"
    },
    {
      type: "Animações Divertidas",
      description: "Episódios de aventuras e brincadeiras",
      duration: "5-10 min",
      frequency: "2x/semana"
    },
    {
      type: "Histórias Encantadas",
      description: "Contos mágicos e aventuras fantásticas",
      duration: "10-15 min",
      frequency: "1x/mês"
    }
  ]

  return (
    <section id="kids-channel" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Baby className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Canal Infantil</h2>
          <p className="text-muted-foreground">Educação e entretenimento de qualidade</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-blue-500" />
              Canal YouTube Infantil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Nosso canal no YouTube traz entretenimento infantil de alta qualidade, com 
              músicas cativantes, animações coloridas e histórias divertidas que capturam 
              a imaginação das crianças com os personagens Fluffy Bears.
            </p>
            
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Vídeos/semana</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">5-15min</div>
                <div className="text-sm text-muted-foreground">Duração</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">0-12</div>
                <div className="text-sm text-muted-foreground">Faixa etária</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">$5K-10K+</div>
                <div className="text-sm text-muted-foreground">Receita/mês proj.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {contentTypes.map((content, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{content.type}</h4>
                  <Badge variant="secondary">{content.frequency}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{content.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span><strong>Duração:</strong> {content.duration}</span>
                  <span><strong>Frequência:</strong> {content.frequency}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-green-500" />
                Impacto do Entretenimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Desenvolve criatividade e imaginação
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Músicas que estimulam coordenação motora
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Conteúdo seguro e apropriado
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Personagens cativantes e memoráveis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Experiência alegre e positiva
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                Monetização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Receita publicitária do YouTube
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Patrocinadores alinhados com valores
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Merchandise exclusivo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Licenciamento de conteúdo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Parcerias com influenciadores infantis
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle>Projeção de Crescimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Com entretenimento de qualidade e frequência consistente, projetamos um crescimento 
              orgânico que pode gerar receita significativa:
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">10K</div>
                <div className="text-sm text-muted-foreground">Inscritos em 6 meses</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">100K</div>
                <div className="text-sm text-muted-foreground">Visualizações/mês</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">$1-3K</div>
                <div className="text-sm text-muted-foreground">Receita mensal inicial</div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">Benefício para o Ecossistema</h5>
              <p className="text-sm text-muted-foreground">
                75% da receita líquida do canal é reinvestida nas pools de liquidez, 
                aumentando os rewards para todos os holders enquanto oferece entretenimento de qualidade.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}