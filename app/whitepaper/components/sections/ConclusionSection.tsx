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
          <h2 className="text-3xl font-bold">Conclusion</h2>
          <p className="text-muted-foreground">The future of NFTs is here</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              A New Era for NFTs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Fluffy Bears represents a natural evolution of the NFT space, where digital art 
              and real utility come together to create sustainable value. We are not just 
              another collection - we are a new business model that redefines what it means 
              to own an NFT.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-primary">Sustainable</div>
                <div className="text-sm text-muted-foreground">Solid business model</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-primary">Innovative</div>
                <div className="text-sm text-muted-foreground">First integrated approach</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-primary">Profitable</div>
                <div className="text-sm text-muted-foreground">Consistent and growing ROI</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Why Invest in Fluffy Bears?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Unique and captivating art
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Real utilities implemented
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Diversified revenue streams
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Programmatic exponential growth
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Engaged and active community
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Experienced and transparent team
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-blue-500" />
                Our Future Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Self-sustaining NFT ecosystem
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Recognized global brand
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Complete product ecosystem
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Leading educational platform
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Standard for future NFT projects
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Positive impact on society
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Join the Revolution</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg opacity-90">
              Fluffy Bears are not just NFTs - they are your passport to a future where 
              blockchain, art and business unite to create real and lasting value.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap pt-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Sustainability
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Innovation
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Community
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Prosperity
              </Badge>
            </div>

            <div className="pt-6 border-t border-white/20">
              <h4 className="font-semibold mb-2">Next Steps</h4>
              <div className="grid gap-2 md:grid-cols-3 text-sm">
                <div>1. Mint your Fluffy Bear</div>
                <div>2. Join our community</div>
                <div>3. Start earning rewards</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}