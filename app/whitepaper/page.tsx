'use client'

import { useState, useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen,
  Eye,
  Palette,
  Coins,
  Hammer,
  Droplets,
  Star,
  TrendingUp,
  ShoppingBag,
  Baby,
  RotateCcw,
  Map,
  CheckCircle,
  List,
  Menu,
  X,
  Zap
} from 'lucide-react'
import { WhitepaperSidebar } from './components/WhitepaperSidebar'
import { IntroductionSection } from './components/sections/IntroductionSection'
import { OverviewSection } from './components/sections/OverviewSection'
import { NFTCollectionSection } from './components/sections/NFTCollectionSection'
import { TokenomicsSection } from './components/sections/TokenomicsSection'
import { MintSection } from './components/sections/MintSection'
import { LiquidityPoolsSection } from './components/sections/LiquidityPoolsSection'
import { StakingSection } from './components/sections/StakingSection'
import { ConstantBoostSection } from './components/sections/ConstantBoostSection'
import { PhysicalProductsSection } from './components/sections/PhysicalProductsSection'
import { KidsChannelSection } from './components/sections/KidsChannelSection'
import { EconomicCycleSection } from './components/sections/EconomicCycleSection'
import { RoadmapSection } from './components/sections/RoadmapSection'
import { ConclusionSection } from './components/sections/ConclusionSection'
import { DifferentialsSection } from './components/sections/DifferentialsSection'
import { PorqueLineaSection } from './components/sections/PorqueLineaSection'
import { ThemeProvider } from './components/ThemeProvider'

const sectionConfig = [
  { id: 'introduction', title: 'Introduction', icon: BookOpen },
  { id: 'overview', title: 'Overview', icon: Eye },
  { id: 'nft-collection', title: 'NFT Collection', icon: Palette },
  { id: 'tokenomics', title: 'Fluffynomics', icon: Coins },
  { id: 'mint', title: 'Mint', icon: Hammer },
  { id: 'liquidity-pools', title: 'Liquidity Pools', icon: Droplets },
  { id: 'staking', title: 'Staking', icon: Star },
  { id: 'constant-boost', title: 'Constant Boost', icon: TrendingUp },
  { id: 'physical-products', title: 'Physical Products', icon: ShoppingBag },
  { id: 'kids-channel', title: 'Kids Channel', icon: Baby },
  { id: 'economic-cycle', title: 'Economic Cycle', icon: RotateCcw },
  { id: 'roadmap', title: 'Roadmap', icon: Map },
  { id: 'conclusion', title: 'Conclusion', icon: CheckCircle },
  { id: 'differentials', title: 'Key Differentials', icon: List },
  { id: 'porque-linea', title: 'Why Linea?', icon: Zap },
]

export default function WhitepaperPage() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isUserScrolling, setIsUserScrolling] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // Only update if user is not actively clicking/scrolling to a section
        if (!isUserScrolling) {
          let maxVisibility = 0
          let activeId = ''

          entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
              maxVisibility = entry.intersectionRatio
              activeId = (entry.target as HTMLElement).id
            }
          })

          if (activeId) {
            setActiveSection(activeId)
            
            // Auto-scroll sidebar to show active item
            setTimeout(() => {
              const sidebarScrollArea = document.querySelector('.sidebar-scroll-area') as HTMLElement
              const activeButton = document.querySelector(`[data-section="${activeId}"]`) as HTMLElement
              
              if (activeButton && sidebarScrollArea) {
                const buttonRect = activeButton.getBoundingClientRect()
                const sidebarRect = sidebarScrollArea.getBoundingClientRect()
                
                // Check if button is outside visible area
                if (buttonRect.top < sidebarRect.top || buttonRect.bottom > sidebarRect.bottom) {
                  const scrollContainer = sidebarScrollArea.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement
                  if (scrollContainer) {
                    const buttonOffsetTop = activeButton.offsetTop
                    const containerHeight = scrollContainer.clientHeight
                    const buttonHeight = activeButton.clientHeight
                    
                    // Calculate ideal scroll position to center the button
                    const idealScrollTop = buttonOffsetTop - (containerHeight / 2) + (buttonHeight / 2)
                    
                    scrollContainer.scrollTo({
                      top: Math.max(0, idealScrollTop),
                      behavior: 'smooth'
                    })
                  }
                }
              }
            }, 100)
          }
        }
      },
      { 
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
        rootMargin: '-20% 0px -30% 0px' 
      }
    )

    sectionConfig.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [isUserScrolling])

  const scrollToSection = (sectionId: string) => {
    console.log('Clicking section:', sectionId)
    const element = document.getElementById(sectionId)
    
    if (element) {
      console.log('Element found:', element)
      
      // Prevent intersection observer from interfering during programmatic scroll
      setIsUserScrolling(true)
      
      // Set active section immediately for instant feedback
      setActiveSection(sectionId)
      
      // Close mobile sidebar
      setIsSidebarOpen(false)
      
      // Scroll to the section
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      })
      
      console.log('Scroll initiated')
      
      // Re-enable intersection observer after scroll completes
      setTimeout(() => {
        setIsUserScrolling(false)
      }, 1000)
      
      // Ensure the sidebar button is visible
      setTimeout(() => {
        const sidebarScrollArea = document.querySelector('.sidebar-scroll-area') as HTMLElement
        const activeButton = document.querySelector(`[data-section="${sectionId}"]`) as HTMLElement
        
        if (activeButton && sidebarScrollArea) {
          const scrollContainer = sidebarScrollArea.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement
          if (scrollContainer) {
            const buttonOffsetTop = activeButton.offsetTop
            const containerHeight = scrollContainer.clientHeight
            const buttonHeight = activeButton.clientHeight
            
            // Calculate ideal scroll position to center the button
            const idealScrollTop = buttonOffsetTop - (containerHeight / 2) + (buttonHeight / 2)
            
            scrollContainer.scrollTo({
              top: Math.max(0, idealScrollTop),
              behavior: 'smooth'
            })
          }
        }
      }, 150)
    } else {
      console.log('Element not found for ID:', sectionId)
    }
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="fluffy-bears-whitepaper-theme">
      <div className="min-h-screen bg-background text-foreground whitepaper-container" data-whitepaper>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
            <h1 className="text-base sm:text-lg font-semibold truncate">Fluffy Bears Whitepaper</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs hidden xs:block">
              {sectionConfig.findIndex(s => s.id === activeSection) + 1}/{sectionConfig.length}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              {isSidebarOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <WhitepaperSidebar
            sections={sectionConfig}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 sm:w-80 max-w-[85vw] animate-in slide-in-from-left duration-300">
              <WhitepaperSidebar
                sections={sectionConfig}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
                isMobile={true}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* Header */}
            <div className="hidden lg:block mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img 
                  src="/Images/logotransparente.png" 
                  alt="Fluffy Bears Logo" 
                  className="h-16 w-auto"
                />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Fluffy Bears
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                The Ultimate NFT Ecosystem with Real-World Value
              </p>
              <Badge variant="secondary" className="mt-4">
                Version 1.0 - Whitepaper
              </Badge>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden mb-6 sm:mb-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <img 
                  src="/Images/logotransparente.png" 
                  alt="Fluffy Bears Logo" 
                  className="h-10 sm:h-12 w-auto"
                />
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Fluffy Bears
                </h1>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground px-4">
                The Ultimate NFT Ecosystem with Real-World Value
              </p>
              <Badge variant="secondary" className="mt-3 text-xs">
                Version 1.0 - Whitepaper
              </Badge>
            </div>

            {/* Sections */}
            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              <IntroductionSection />
              <OverviewSection />
              <NFTCollectionSection />
              <TokenomicsSection />
              <MintSection />
              <LiquidityPoolsSection />
              <StakingSection />
              <ConstantBoostSection />
              <PhysicalProductsSection />
              <KidsChannelSection />
              <EconomicCycleSection />
              <RoadmapSection />
              <ConclusionSection />
              <DifferentialsSection />
              <PorqueLineaSection />
            </div>

            {/* Footer */}
            <footer className="mt-16 sm:mt-20 lg:mt-24 pt-8 sm:pt-10 lg:pt-12 border-t border-border text-center text-muted-foreground">
              <p className="text-sm sm:text-base">© 2025 Fluffy Bears. All rights reserved.</p>
              <p className="mt-2 text-xs sm:text-sm px-4">
                This whitepaper is for informational purposes only and does not constitute financial advice.
              </p>
            </footer>
          </div>
        </main>
      </div>
      </div>
    </ThemeProvider>
  )
}