'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Map, CheckCircle, Clock, Calendar, Target } from 'lucide-react'

export function RoadmapSection() {
  const roadmapPhases = [
    {
      phase: "Q3 2025",
      title: "Foundation",
      status: "in-progress",
      items: [
        "Art and concept development",
        "Smart contract creation",
        "Security audit", 
        "Website and social media launch",
        "Whitelist opening",
        "Discord community opening",
        "Public NFT mint",
        "Secondary market listing"
      ]
    },
    {
      phase: "Q4 2025", 
      title: "Launch",
      status: "planned",
      items: [
        "Staking system launch",
        "First DeFi pool investments",
        "3D product planning",
        "Plushie design and prototyping",
        "Kids channel script creation",
        "Educational content development",
        "Own production start",
        "First profit distribution"
      ]
    },
    {
      phase: "Q1 2026",
      title: "Expansion",
      status: "planned", 
      items: [
        "First plushie production",
        "Online store launch",
        "Educational YouTube channel start",
        "Physical store partnerships",
        "NFT project partnerships",
        "Third-party product development",
        "Other project product sales in store"
      ]
    },
    {
      phase: "2026+",
      title: "Growth and Consolidation",
      status: "planned",
      items: [
        "International sales expansion",
        "New Fluffy Bears product line",
        "Holder affiliate program",
        "Metaverse integrations",
        "Utility token launch",
        "DAO governance program",
        "Other blockchain expansion",
        "Global Fluffy Bears brand",
        "Virtual theme park",
        "Complete children's product line",
        "Financial education academy"
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-500'
      case 'in-progress': return 'text-blue-500 bg-blue-500'
      case 'planned': return 'text-yellow-500 bg-yellow-500'
      case 'vision': return 'text-purple-500 bg-purple-500'
      default: return 'text-gray-500 bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'in-progress': return <Clock className="h-4 w-4" />
      case 'planned': return <Calendar className="h-4 w-4" />
      case 'vision': return <Target className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '80% Complete'
      case 'in-progress': return 'In Progress'
      case 'planned': return 'Planned'
      case 'vision': return 'Vision'
      default: return 'Pending'
    }
  }

  return (
    <section id="roadmap" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Map className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Roadmap</h2>
          <p className="text-muted-foreground">Our journey of growth and expansion</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Progress Overview */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle>Current Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <div className="text-2xl font-bold text-blue-600">Q3 2025</div>
                <div className="text-sm text-blue-600">80% Complete</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-muted-foreground">Q4 2025</div>
                <div className="text-sm text-muted-foreground">Planned</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-muted-foreground">Q1 2026</div>
                <div className="text-sm text-muted-foreground">Next</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-muted-foreground">2026+</div>
                <div className="text-sm text-muted-foreground">Future</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => {
              const statusColor = getStatusColor(phase.status)
              const statusIcon = getStatusIcon(phase.status)
              const statusLabel = getStatusLabel(phase.status)
              
              return (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${statusColor.split(' ')[1]}/20 border-4 ${statusColor.split(' ')[1]}/50`}>
                    <div className={`w-8 h-8 rounded-full ${statusColor.split(' ')[1]} flex items-center justify-center text-white`}>
                      {statusIcon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            {phase.phase}
                            <span className="text-lg">•</span>
                            {phase.title}
                          </CardTitle>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${statusColor.split(' ')[0]} border-current`}
                        >
                          {statusLabel}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                              phase.status === 'completed' ? 'bg-green-500' :
                              phase.status === 'in-progress' ? 'bg-blue-500' :
                              'bg-muted-foreground'
                            }`} />
                            <span className={
                              phase.status === 'completed' ? 'text-green-700 dark:text-green-300' :
                              phase.status === 'in-progress' ? 'text-blue-700 dark:text-blue-300' :
                              'text-muted-foreground'
                            }>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Key Milestones */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle>Key Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold text-primary">Short Term (2025-2026)</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>100% of NFTs minted</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Active staking system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                    <span>First physical products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                    <span>Educational channel launched</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-primary">Long Term (2026+)</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span>Established global brand</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span>Utility token launched</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted border">
              <h5 className="font-semibold mb-2">Transparency and Accountability</h5>
              <p className="text-sm text-muted-foreground">
                Our roadmap is reviewed monthly and adjusted as needed. 
                All holders receive detailed progress reports and can 
                participate in decisions through community governance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}