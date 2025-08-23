'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, RefreshCw, DollarSign, BarChart3 } from 'lucide-react'

export function ConstantBoostSection() {
  return (
    <section id="constant-boost" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Reforço Constante</h2>
          <p className="text-muted-foreground">Como os lucros alimentam o crescimento</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-green-500" />
              Reinvestimento Automático
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              75% de todos os lucros obtidos com vendas de produtos físicos e receitas do 
              canal são automaticamente reinvestidos nas pools de liquidez, criando um 
              crescimento exponencial dos rewards para todos os holders.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">75%</div>
                <div className="text-sm text-muted-foreground">Lucros Reinvestidos</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">25%</div>
                <div className="text-sm text-muted-foreground">Reserva/Expansão</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Ciclo Sustentável</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Fontes de Receita
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">Venda de Pelúcias</span>
                  <Badge variant="secondary">30-50% margem</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">Canal YouTube</span>
                  <Badge variant="secondary">$500-2000/mês</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">Royalties NFT</span>
                  <Badge variant="secondary">5% por venda</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">Licenciamento</span>
                  <Badge variant="secondary">Futuro</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Projeção de Crescimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <span className="font-medium">Mês 1-3</span>
                  <span className="text-blue-600 font-bold">+10% pools</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <span className="font-medium">Mês 4-6</span>
                  <span className="text-green-600 font-bold">+25% pools</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <span className="font-medium">Mês 7-12</span>
                  <span className="text-purple-600 font-bold">+50% pools</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <span className="font-medium">Ano 2+</span>
                  <span className="text-yellow-600 font-bold">+100% pools</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle>Exemplo Prático do Reforço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold text-green-600">Cenário Inicial</h5>
                <ul className="space-y-2 text-sm">
                  <li>• 75% da arrecadação em Pools (70-250% APY)</li>
                  <li>• Recompensa distribuída entre stakers</li>
                  <li>• Royalties de venda incrementam as pools</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-blue-600">Após 1 Ano de Reforços</h5>
                <ul className="space-y-2 text-sm">
                  <li>• OG stakers tem bônus de 1.5x</li>
                  <li>• Novas fontes para incremento das pools</li>
                  <li>• Monetização de canal, vendas físicas e Royalties</li>
                  <li>• Pools com mais de 100% de aumento</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2 text-primary">Resultado: Crescimento periódico das pools</h5>
              <p className="text-sm text-muted-foreground">
                Este é apenas um exemplo conservador. Com o sucesso dos produtos e canal, 
                o crescimento pode ser ainda maior, beneficiando todos os holders proporcionalmente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}