'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Package, Truck, Star } from 'lucide-react'

export function PhysicalProductsSection() {

  return (
    <section id="physical-products" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Produtos Físicos</h2>
          <p className="text-muted-foreground">Conectando o digital ao mundo real</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-pink-500" />
              Nossa Linha de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Cada Fluffy Bear NFT dá acesso exclusivo à nossa loja de produtos físicos premium. 
              Os produtos são produzidos com materiais de alta qualidade e seguem os mesmos 
              designs dos NFTs, criando uma conexão única entre o digital e o físico.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Premium</div>
                <div className="text-sm text-muted-foreground">Qualidade Garantida</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">10%</div>
                <div className="text-sm text-muted-foreground">Desconto Holders</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Global</div>
                <div className="text-sm text-muted-foreground">Entrega Mundial</div>
              </div>
            </div>
          </CardContent>
        </Card>


        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Benefícios para Holders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  10% de desconto em todos os produtos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Acesso a produtos exclusivos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Pelúcias gratuitas para rarities Epic+
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Personalização do seu NFT em produtos
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-500" />
                Logística e Distribuição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Fabricação própria
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Controle de qualidade rigoroso
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Entrega rápida
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Garantia de satisfação
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20">
          <CardHeader>
            <CardTitle>Impacto nos Lucros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Com margens entre 40-80% e demanda garantida da comunidade, os produtos físicos 
              representam uma fonte significativa de receita para o reforço das pools:
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">$50K+</div>
                <div className="text-sm text-muted-foreground">Receita mensal projetada</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">4-10 ETH</div>
                <div className="text-sm text-muted-foreground">Lucro líquido mensal</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">75%</div>
                <div className="text-sm text-muted-foreground">Reinvestido nas pools</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}