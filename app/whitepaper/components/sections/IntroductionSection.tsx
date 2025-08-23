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
          <h2 className="text-3xl font-bold">Introduction</h2>
          <p className="text-muted-foreground">Welcome to the Fluffy Bears universe</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              What are Fluffy Bears?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              <strong>Fluffy Bears</strong> represents a revolution in the NFT space, combining exclusive digital art 
              with real utility and a sustainable economic ecosystem. Our collection goes far beyond simple 
              digital tokens - it is the gateway to a complete universe of products, experiences 
              and investment opportunities.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Exclusivos</div>
                <div className="text-sm text-muted-foreground">Unique NFTs</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Multiple</div>
                <div className="text-sm text-muted-foreground">Real Utilities</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Forever</div>
                <div className="text-sm text-muted-foreground">Sustainable Value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              To create a sustainable NFT ecosystem that connects the digital world to the physical one, 
              offering real value through tangible products, unique experiences and 
              financial growth opportunities for our community.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Sustainability</Badge>
              <Badge variant="secondary">Real Utility</Badge>
              <Badge variant="secondary">Community</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              To be the first NFT collection to establish a complete and self-sustaining economic cycle, 
              where each holder benefits from the continuous growth of the ecosystem through 
              physical products, educational content and investment opportunities.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Innovation</Badge>
              <Badge variant="secondary">Growth</Badge>
              <Badge variant="secondary">Transparency</Badge>
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
              <h4 className="font-semibold mb-2">Why are Fluffy Bears different?</h4>
              <p className="text-muted-foreground">
                Unlike other NFT projects that promise future utilities, Fluffy Bears already 
                have a complete and implemented business plan, with real physical products, 
                established partnerships and a revenue generation system that directly benefits 
                all collection holders from day 1.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}