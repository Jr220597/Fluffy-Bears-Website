'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from './ThemeProvider'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    console.log('Current theme:', theme)
    
    let nextTheme: 'light' | 'dark' | 'system'
    
    if (theme === 'light') {
      nextTheme = 'dark'
    } else {
      nextTheme = 'light'
    }
    
    console.log('Switching to theme:', nextTheme)
    setTheme(nextTheme)
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4 transition-all" />
      case 'dark':
        return <Moon className="h-4 w-4 transition-all" />
      default:
        return <Sun className="h-4 w-4 transition-all" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode'
      case 'dark':
        return 'Switch to light mode'
      default:
        return 'Switch theme'
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9"
        disabled
      >
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      title={getLabel()}
      className="w-9 h-9 hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </Button>
  )
}