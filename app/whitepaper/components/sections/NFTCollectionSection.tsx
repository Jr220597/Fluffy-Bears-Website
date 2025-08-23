'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Palette, Star, Gem, Crown, Sparkles } from 'lucide-react'

export function NFTCollectionSection() {
  const rarityTiers = [
    {
      name: "Common",
      percentage: "70%",
      count: "7,000",
      color: "bg-gray-500",
      features: ["Design base", "Acesso ao staking", "Produtos físicos com desconto"]
    },
    {
      name: "Uncommon", 
      percentage: "20%",
      count: "2,000",
      color: "bg-green-500",
      features: ["Traits especiais", "Bonus no staking +25%", "Produtos físicos gratuitos"]
    },
    {
      name: "Rare",
      percentage: "8%", 
      count: "800",
      color: "bg-blue-500",
      features: ["Animações únicas", "Bonus no staking +50%", "Acesso VIP", "NFT físico exclusivo"]
    },
    {
      name: "Epic",
      percentage: "1.8%",
      count: "180",
      color: "bg-purple-500", 
      features: ["Design 3D", "Bonus no staking +100%", "Participação em decisões", "Produtos personalizados"]
    },
    {
      name: "Legendary",
      percentage: "0.2%",
      count: "20",
      color: "bg-yellow-500",
      features: ["Arte exclusiva do artista", "Bonus no staking +200%", "Acesso direto ao time", "Lucros adicionais", "Produtos únicos"]
    }
  ]

  const traits = [
    { name: "Background", variants: 15 },
    { name: "Body Color", variants: 15 },
    { name: "Eyes", variants: 25 },
    { name: "Clothing", variants: 25 },
    { name: "Head", variants: 25 }
  ]

  return (
    <section id="nft-collection" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Palette className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Coleção NFT</h2>
          <p className="text-muted-foreground">Fluffy Bears únicos com utilidades reais</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Conceito Artístico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Cada Fluffy Bear é uma obra de arte digital única, criada com amor e atenção aos detalhes. 
              Nossa coleção combina a fofura dos ursinhos de pelúcia com elementos modernos e futuristas, 
              criando personagens carismáticos que conectam o mundo físico ao digital.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Exclusivos</div>
                <div className="text-sm text-muted-foreground">NFTs Únicos</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Traits Diferentes</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Níveis de Raridade</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits */}
        <Card>
          <CardHeader>
            <CardTitle>Traits e Características</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Cada Fluffy Bear possui uma combinação única de traits que determinam sua aparência e raridade:
            </p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {traits.map((trait, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="font-medium">{trait.name}</span>
                  <Badge variant="secondary">{trait.variants} variações</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Utility Features */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle>Utilidades dos NFTs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Cada Fluffy Bear NFT oferece múltiplas utilidades reais dentro do ecossistema:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Benefícios Financeiros
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Acesso ao sistema de staking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Participação nos lucros das pools
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Desconto em produtos físicos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Airdrops de tokens futuros
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold flex items-center gap-2">
                  <Gem className="h-4 w-4 text-purple-500" />
                  Benefícios Exclusivos
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    Acesso VIP à comunidade
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    Produtos físicos exclusivos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    Participação em decisões do projeto
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    Eventos exclusivos para holders
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}