"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-10 w-20 rounded-full bg-muted animate-pulse" />
    )
  }

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'Auto' }
  ]

  const currentThemeIndex = themes.findIndex(t => t.name === theme)
  
  const nextTheme = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length
    setTheme(themes[nextIndex].name)
  }

  const currentTheme = themes[currentThemeIndex] || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <div className="flex items-center">
      {/* Modern Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={nextTheme}
        className="relative h-10 w-20 rounded-full bg-muted/50 hover:bg-muted border border-border/50 hover:border-jaba-gold/50 transition-all duration-300 group"
      >
        {/* Background indicator */}
        <div
          className={cn(
            "absolute inset-y-1 w-8 rounded-full bg-gradient-to-r transition-all duration-300 shadow-sm",
            theme === 'light' && "left-1 from-jaba-gold/20 to-jaba-gold/30 border border-jaba-gold/30",
            theme === 'dark' && "left-1/2 -translate-x-1/2 from-blue-500/20 to-purple-500/30 border border-blue-500/30",
            theme === 'system' && "right-1 from-green-500/20 to-emerald-500/30 border border-green-500/30"
          )}
        />
        
        {/* Icons */}
        <div className="relative flex items-center justify-between w-full px-1">
          <Sun className={cn(
            "h-4 w-4 transition-all duration-300 z-10",
            theme === 'light' ? "text-jaba-gold scale-110" : "text-muted-foreground/60 scale-90"
          )} />
          <Moon className={cn(
            "h-4 w-4 transition-all duration-300 z-10",
            theme === 'dark' ? "text-blue-400 scale-110" : "text-muted-foreground/60 scale-90"
          )} />
          <Monitor className={cn(
            "h-4 w-4 transition-all duration-300 z-10",
            theme === 'system' ? "text-green-400 scale-110" : "text-muted-foreground/60 scale-90"
          )} />
        </div>
        
        {/* Tooltip */}
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-popover text-popover-foreground px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border shadow-md">
          {currentTheme.label} mode
        </span>
      </Button>
    </div>
  )
}

// Alternative compact version (you can switch to this if you prefer)
export function CompactThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-full hover:bg-jaba-gold/10 hover:text-jaba-gold border-0 transition-all duration-300 group overflow-hidden"
    >
      {/* Sun icon */}
      <Sun className={cn(
        "h-5 w-5 transition-all duration-500 absolute",
        theme === 'light' 
          ? "rotate-0 scale-100 opacity-100" 
          : "rotate-90 scale-0 opacity-0"
      )} />
      
      {/* Moon icon */}
      <Moon className={cn(
        "h-5 w-5 transition-all duration-500 absolute",
        theme === 'dark' 
          ? "rotate-0 scale-100 opacity-100" 
          : "-rotate-90 scale-0 opacity-0"
      )} />
      
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-full transition-opacity duration-300",
        theme === 'light' 
          ? "bg-gradient-to-r from-gray-400/20 to-gray-600/20 opacity-100" 
          : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-100"
      )} />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

