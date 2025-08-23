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
          <h2 className="text-3xl font-bold">Physical Products</h2>
          <p className="text-muted-foreground">Connecting digital to the real world</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-pink-500" />
              Our Product Line
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Each Fluffy Bear NFT gives exclusive access to our premium physical products store. 
              Products are manufactured with high-quality materials and follow the same 
              designs as the NFTs, creating a unique connection between digital and physical.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Premium</div>
                <div className="text-sm text-muted-foreground">Guaranteed Quality</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">10%</div>
                <div className="text-sm text-muted-foreground">Holder Discount</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">Global</div>
                <div className="text-sm text-muted-foreground">Global Delivery</div>
              </div>
            </div>
          </CardContent>
        </Card>


        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Benefits for Holders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  10% discount on all products
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Access to exclusive products
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Free plushies for Epic+ rarities
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Customization of your NFT in products
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-500" />
                Logistics and Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  In-house manufacturing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Rigorous quality control
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Fast delivery
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Satisfaction guarantee
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20">
          <CardHeader>
            <CardTitle>Impact on Profits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              With margins between 40-80% and guaranteed demand from the community, physical products 
              represent a significant revenue source for boosting the pools:
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">$50K+</div>
                <div className="text-sm text-muted-foreground">Projected monthly revenue</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">4-10 ETH</div>
                <div className="text-sm text-muted-foreground">Monthly net profit</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-xl font-bold text-primary">75%</div>
                <div className="text-sm text-muted-foreground">Reinvested in pools</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}