'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ExternalLink, Home } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

interface SidebarSection {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
}

interface WhitepaperSidebarProps {
  sections: SidebarSection[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
  isMobile?: boolean
}

export function WhitepaperSidebar({ sections, activeSection, onSectionClick, isMobile = false }: WhitepaperSidebarProps) {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen bg-card border-r border-border",
      isMobile ? "w-full" : "w-80"
    )}>
      <ScrollArea className="h-full sidebar-scroll-area">
        <div className={cn(
          isMobile ? "p-4 sm:p-5" : "p-6"
        )}>
          {/* Header */}
          <div className={cn(
            "flex items-center justify-between",
            isMobile ? "mb-4 sm:mb-5" : "mb-6"
          )}>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img 
                src="/Images/logotransparente.png" 
                alt="Fluffy Bears Logo" 
                className={cn(
                  "w-auto flex-shrink-0",
                  isMobile ? "h-8 sm:h-9" : "h-10"
                )}
              />
              <div className="min-w-0">
                <h2 className={cn(
                  "font-semibold truncate",
                  isMobile ? "text-base sm:text-lg" : "text-lg"
                )}>Fluffy Bears</h2>
                <p className={cn(
                  "text-muted-foreground",
                  isMobile ? "text-xs sm:text-sm" : "text-xs"
                )}>Whitepaper</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* Navigation */}
          <div className={cn(
            "space-y-1",
            isMobile ? "mb-4 sm:mb-5" : "mb-6"
          )}>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
                  isMobile ? "py-2.5 px-3 text-sm" : ""
                )}
              >
                <Home className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Back to Home</span>
              </Button>
            </Link>
          </div>

          <Separator className={cn(isMobile ? "mb-4 sm:mb-5" : "mb-6")} />

          {/* Table of Contents */}
          <div className={cn(
            "space-y-1",
            isMobile ? "space-y-0.5" : ""
          )}>
            <div className={cn(
              "flex items-center gap-2",
              isMobile ? "mb-2 sm:mb-3" : "mb-3"
            )}>
              <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
              <h3 className={cn(
                "font-medium",
                isMobile ? "text-sm sm:text-base" : "text-sm"
              )}>Table of Contents</h3>
            </div>
            
            {sections.map((section, index) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              
              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => onSectionClick(section.id)}
                  data-section={section.id}
                  className={cn(
                    "w-full justify-start gap-2 sm:gap-3 h-auto relative",
                    "hover:bg-accent hover:text-accent-foreground",
                    "transition-all duration-300 ease-in-out",
                    isMobile ? "py-2.5 px-2 sm:px-3 min-h-[44px]" : "py-2 px-3",
                    isActive && "bg-primary/10 text-primary font-semibold shadow-sm border-l-4 border-primary"
                  )}
                >
                  <div className={cn(
                    "flex items-center min-w-0",
                    isMobile ? "gap-2 sm:gap-3" : "gap-3"
                  )}>
                    <div className={cn(
                      "flex-shrink-0 rounded-sm flex items-center justify-center",
                      isMobile ? "w-4 h-4 sm:w-5 sm:h-5" : "w-5 h-5",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    )}>
                      <Icon className={cn(
                        isMobile ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-3 w-3"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className={cn(
                          "font-mono text-muted-foreground flex-shrink-0",
                          isMobile ? "text-xs" : "text-xs",
                          isActive && "text-primary"
                        )}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={cn(
                          "truncate",
                          isMobile ? "text-sm sm:text-base" : "text-sm"
                        )}>{section.title}</span>
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 animate-pulse" />
                  )}
                </Button>
              )
            })}
          </div>

          <Separator className={cn(isMobile ? "my-4 sm:my-5" : "my-6")} />

          {/* Progress */}
          <div className={cn(
            isMobile ? "space-y-2 sm:space-y-3" : "space-y-3"
          )}>
            <div className="flex items-center justify-between">
              <span className={cn(
                "font-medium text-muted-foreground",
                isMobile ? "text-xs sm:text-sm" : "text-xs"
              )}>Progress</span>
              <Badge variant="secondary" className={cn(
                isMobile ? "text-xs" : "text-xs"
              )}>
                {sections.findIndex(s => s.id === activeSection) + 1} / {sections.length}
              </Badge>
            </div>
            
            <div className={cn(
              "w-full bg-secondary rounded-full",
              isMobile ? "h-1.5 sm:h-2" : "h-2"
            )}>
              <div 
                className={cn(
                  "bg-primary rounded-full transition-all duration-300",
                  isMobile ? "h-1.5 sm:h-2" : "h-2"
                )}
                style={{ 
                  width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
                }}
              />
            </div>
          </div>

          <Separator className={cn(isMobile ? "my-4 sm:my-5" : "my-6")} />

          {/* Footer Links */}
          <div className={cn(
            isMobile ? "space-y-1 sm:space-y-2" : "space-y-2"
          )}>
            <div className={cn(
              "font-medium text-muted-foreground",
              isMobile ? "text-xs sm:text-sm mb-1 sm:mb-2" : "text-xs mb-2"
            )}>External Links</div>
            
            <Link 
              href="https://x.com/Fluffy_Bearss" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
                  isMobile ? "py-2.5 px-2 sm:px-3 min-h-[44px] text-sm" : ""
                )}
              >
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Twitter/X</span>
              </Button>
            </Link>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}