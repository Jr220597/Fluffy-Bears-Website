'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Gift, Calculator } from 'lucide-react'

export function StakingSection() {

  return (
    <section id="staking" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          <Star className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Staking</h2>
          <p className="text-muted-foreground">Ganhe rewards passivos com seus NFTs</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-yellow-500" />
              Como Funciona o Staking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Faça staking dos seus Fluffy Bears e receba recompensas mensais baseadas nos 
              lucros reais do ecossistema. Quanto mais tempo em staking maiores suas recompensas.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">45 dias</div>
                <div className="text-sm text-muted-foreground">Ciclo de recompensa</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">7 dias</div>
                <div className="text-sm text-muted-foreground">Tempo mínimo de stake</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">0 Taxas</div>
                <div className="text-sm text-muted-foreground">Para entrar/sair</div>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Benefícios do Staking de Longo Prazo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Quanto mais tempo seus NFTs ficarem em staking, maiores são os benefícios:</p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h5 className="font-semibold">Staking 1-3 Meses</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Multiplicador base: 1x</li>
                  <li>• Recompensas regulares</li>
                  <li>• Benefícios básicos no ecossistema</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold">Staking 3+ Meses</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Multiplicador: 1.5x</li>
                  <li>• Bônus de fidelidade</li>
                  <li>• Benefícios Premium</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-accent/20 border border-accent">
              <h6 className="font-semibold mb-2">🎯 Dica Pro:</h6>
              <p className="text-sm text-muted-foreground">
                Holders que mantêm seus NFTs em staking por períodos mais longos recebem 
                benefícios especiais e multiplicadores progressivos nas recompensas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}