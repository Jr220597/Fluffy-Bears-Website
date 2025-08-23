'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Baby, Play, BookOpen, DollarSign } from 'lucide-react'

export function KidsChannelSection() {
  const contentTypes = [
    {
      type: "Children's Songs",
      description: "Cheerful songs with Fluffy Bears characters",
      duration: "3-5 min",
      frequency: "2x/semana"
    },
    {
      type: "Fun Animations",
      description: "Episodes of adventures and games",
      duration: "5-10 min",
      frequency: "2x/semana"
    },
    {
      type: "Enchanted Stories",
      description: "Magical tales and fantastic adventures",
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
          <h2 className="text-3xl font-bold">Kids Channel</h2>
          <p className="text-muted-foreground">Quality education and entertainment</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-blue-500" />
              Kids YouTube Channel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Our YouTube channel brings high-quality children's entertainment, with 
              captivating songs, colorful animations and fun stories that capture 
              children's imagination with Fluffy Bears characters.
            </p>
            
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Videos/week</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">5-15min</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">0-12</div>
                <div className="text-sm text-muted-foreground">Age range</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">$5K-10K+</div>
                <div className="text-sm text-muted-foreground">Revenue/month proj.</div>
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
                  <span><strong>Duration:</strong> {content.duration}</span>
                  <span><strong>Frequency:</strong> {content.frequency}</span>
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
                Entertainment Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Develops creativity and imagination
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Songs that stimulate motor coordination
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Safe and appropriate content
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Captivating and memorable characters
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Joyful and positive experience
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                Monetization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  YouTube advertising revenue
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Sponsors aligned with values
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Exclusive merchandise
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Content licensing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Partnerships with kids influencers
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle>Growth Projection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              With quality entertainment and consistent frequency, we project organic growth 
              that can generate significant revenue:
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">10K</div>
                <div className="text-sm text-muted-foreground">Subscribers in 6 months</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">100K</div>
                <div className="text-sm text-muted-foreground">Views/month</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">$1-3K</div>
                <div className="text-sm text-muted-foreground">Initial monthly revenue</div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">Benefit for the Ecosystem</h5>
              <p className="text-sm text-muted-foreground">
                75% of the channel's net revenue is reinvested in liquidity pools, 
                increasing rewards for all holders while offering quality entertainment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}