/**
 * Modern Jaba Motors Color Utilities
 * 
 * This file provides utility functions and constants for working with the modern color scheme.
 * Use these helpers to maintain consistency across your application.
 */

// Brand color constants for use in JavaScript/TypeScript
export const JABA_COLORS = {
  // Primary brand colors
  gold: {
    DEFAULT: '#FFD700',
    dark: '#E6C200',
    light: '#FFF700',
  },
  red: {
    DEFAULT: '#C8102E',
    dark: '#B22222',
    light: '#DC143C',
  },
  silver: {
    DEFAULT: '#A9A9A9',
    dark: '#808080',
    light: '#C0C0C0',
  },
  
  // Light mode palette
  light: {
    background: '#F5F5F5',
    card: '#E8E8E8',
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    border: '#D3D3D3',
    accent: '#FFD700',
    featured: '#C8102E',
    silver: '#A9A9A9',
  },
  
  // Dark mode palette
  dark: {
    background: '#1A1A1A',
    card: '#2A2A2A',
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    border: '#3A3A3A',
    accent: '#FFD700',
    featured: '#C8102E',
    silver: '#A9A9A9',
  },
} as const

// Utility functions for color manipulation
export const colorUtils = {
  /**
   * Get a color with opacity
   * @param color - The color value
   * @param opacity - Opacity value between 0 and 1
   */
  withOpacity: (color: string, opacity: number): string => {
    if (color.startsWith('#')) {
      const hex = color.slice(1)
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
    return color
  },

  /**
   * Get the appropriate text color for a given background
   * @param backgroundColor - The background color
   */
  getContrastText: (backgroundColor: string): string => {
    const darkBackgrounds = [
      JABA_COLORS.dark.background,
      JABA_COLORS.dark.card,
      JABA_COLORS.red.DEFAULT,
      JABA_COLORS.red.dark,
    ]
    
    return darkBackgrounds.includes(backgroundColor) 
      ? JABA_COLORS.dark.text.primary 
      : JABA_COLORS.light.text.primary
  },

  /**
   * Check if current theme is dark mode
   */
  isDarkMode: (): boolean => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  },

  /**
   * Get theme-appropriate colors
   */
  getThemeColors: () => {
    const isDark = colorUtils.isDarkMode()
    return isDark ? JABA_COLORS.dark : JABA_COLORS.light
  },
}

// Pre-defined color combinations for common use cases
export const COLOR_COMBINATIONS = {
  // Primary action button
  primaryButton: {
    background: 'bg-jaba-gold',
    text: 'text-black',
    hover: 'hover:bg-jaba-gold-dark',
    border: 'border-jaba-gold',
  },
  
  // Secondary action button
  secondaryButton: {
    background: 'bg-transparent',
    text: 'text-jaba-gold',
    hover: 'hover:bg-jaba-gold hover:text-black',
    border: 'border-jaba-gold border-2',
  },
  
  // Featured badge
  featuredBadge: {
    background: 'bg-jaba-red',
    text: 'text-white',
    border: 'border-jaba-red',
  },
  
  // Card styling
  modernCard: {
    background: 'bg-card',
    text: 'text-card-foreground',
    border: 'border-border',
    shadow: 'shadow-sm hover:shadow-md',
  },
  
  // Navigation items
  navItem: {
    text: 'text-foreground hover:text-jaba-gold',
    background: 'hover:bg-jaba-gold/10',
    border: 'border-transparent hover:border-jaba-gold/20',
  },
} as const

// CSS class generators
export const generateClasses = {
  /**
   * Generate primary button classes
   */
  primaryButton: (size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5',
      lg: 'px-8 py-3 text-lg',
    }
    
    return [
      'bg-gradient-to-r from-jaba-gold to-jaba-gold-light',
      'text-black hover:from-jaba-gold-dark hover:to-jaba-gold',
      'font-semibold shadow-lg hover:shadow-xl',
      'rounded-xl transition-all duration-200',
      'transform hover:scale-105',
      sizeClasses[size],
    ].join(' ')
  },

  /**
   * Generate card classes
   */
  modernCard: (variant: 'default' | 'featured' | 'premium' = 'default') => {
    const baseClasses = [
      'bg-card border border-border rounded-xl',
      'shadow-sm hover:shadow-md',
      'transition-all duration-200 p-6',
    ]

    const variantClasses = {
      default: [],
      featured: ['border-l-4 border-l-jaba-gold'],
      premium: ['bg-gradient-to-br from-jaba-gold/5 to-jaba-gold/10 border-jaba-gold/20'],
    }

    return [...baseClasses, ...variantClasses[variant]].join(' ')
  },

  /**
   * Generate navigation item classes
   */
  navItem: (active = false) => {
    const baseClasses = [
      'flex items-center px-4 py-2.5 text-sm font-medium',
      'rounded-xl transition-all duration-200',
      'border border-transparent',
    ]

    const stateClasses = active
      ? ['text-jaba-gold bg-jaba-gold/10 border-jaba-gold/20']
      : ['text-foreground hover:text-jaba-gold hover:bg-jaba-gold/10 hover:border-jaba-gold/20']

    return [...baseClasses, ...stateClasses].join(' ')
  },
}

// Accessibility helpers
export const a11y = {
  /**
   * Check if color combination meets WCAG contrast requirements
   */
  checkContrast: (foreground: string, background: string): boolean => {
    // This is a simplified version - in production, use a proper contrast checking library
    const highContrastCombinations = [
      [JABA_COLORS.light.text.primary, JABA_COLORS.light.background],
      [JABA_COLORS.dark.text.primary, JABA_COLORS.dark.background],
      ['#FFFFFF', JABA_COLORS.red.DEFAULT],
      ['#000000', JABA_COLORS.gold.DEFAULT],
    ]
    
    return highContrastCombinations.some(
      ([fg, bg]) => fg === foreground && bg === background
    )
  },

  /**
   * Get accessible color pairs
   */
  getAccessiblePair: (preferredBackground: string) => {
    const pairs = {
      [JABA_COLORS.light.background]: JABA_COLORS.light.text.primary,
      [JABA_COLORS.dark.background]: JABA_COLORS.dark.text.primary,
      [JABA_COLORS.red.DEFAULT]: '#FFFFFF',
      [JABA_COLORS.gold.DEFAULT]: '#000000',
    }
    
    return {
      background: preferredBackground,
      text: pairs[preferredBackground as keyof typeof pairs] || JABA_COLORS.light.text.primary,
    }
  },
}

export default {
  JABA_COLORS,
  colorUtils,
  COLOR_COMBINATIONS,
  generateClasses,
  a11y,
}
