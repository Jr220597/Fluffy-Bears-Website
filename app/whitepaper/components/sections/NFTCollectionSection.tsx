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
      features: ["Base design", "Staking access", "Discounted physical products"]
    },
    {
      name: "Uncommon", 
      percentage: "20%",
      count: "2,000",
      color: "bg-green-500",
      features: ["Special traits", "Staking bonus +25%", "Free physical products"]
    },
    {
      name: "Rare",
      percentage: "8%", 
      count: "800",
      color: "bg-blue-500",
      features: ["Unique animations", "Staking bonus +50%", "VIP access", "Exclusive physical NFT"]
    },
    {
      name: "Epic",
      percentage: "1.8%",
      count: "180",
      color: "bg-purple-500", 
      features: ["3D design", "Staking bonus +100%", "Decision participation", "Personalized products"]
    },
    {
      name: "Legendary",
      percentage: "0.2%",
      count: "20",
      color: "bg-yellow-500",
      features: ["Exclusive artist artwork", "Staking bonus +200%", "Direct team access", "Additional profits", "Unique products"]
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
          <h2 className="text-3xl font-bold">NFT Collection</h2>
          <p className="text-muted-foreground">Unique Fluffy Bears with real utilities</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Artistic Concept
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Each Fluffy Bear is a unique digital artwork, created with love and attention to detail. 
              Our collection combines the cuteness of teddy bears with modern and futuristic elements, 
              creating charismatic characters that connect the physical world to the digital one.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Exclusivos</div>
                <div className="text-sm text-muted-foreground">Unique NFTs</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Different Traits</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Rarity Levels</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits */}
        <Card>
          <CardHeader>
            <CardTitle>Traits and Characteristics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Each Fluffy Bear has a unique combination of traits that determine its appearance and rarity:
            </p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {traits.map((trait, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="font-medium">{trait.name}</span>
                  <Badge variant="secondary">{trait.variants} variations</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Utility Features */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle>NFT Utilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Each Fluffy Bear NFT offers multiple real utilities within the ecosystem:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Financial Benefits
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Access to staking system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Participation in pool profits
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Discount on physical products
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Future token airdrops
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold flex items-center gap-2">
                  <Gem className="h-4 w-4 text-purple-500" />
                  Exclusive Benefits
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    VIP community access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    Exclusive physical products
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    Participation in project decisions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    Exclusive events for holders
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