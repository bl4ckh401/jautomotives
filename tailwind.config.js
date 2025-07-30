/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Jaba Motors Brand Colors - Enhanced with better contrast
        'jaba-gold': {
          DEFAULT: '#FFD700',
          dark: '#E6C200',
          light: '#FFF700',
          50: '#FFFEF0',
          100: '#FFFC80',
          200: '#FFF940',
          300: '#FFD700',
          400: '#E6C200',
          500: '#CCB000',
          600: '#B39900',
          700: '#998200',
          800: '#806B00',
          900: '#665400',
        },
        'jaba-red': {
          DEFAULT: '#C8102E',
          dark: '#B22222',
          light: '#DC143C',
          50: '#FDF2F4',
          100: '#FBE5E8',
          200: '#F7CCD1',
          300: '#F0A8B0',
          400: '#E67A88',
          500: '#DC143C',
          600: '#C8102E',
          700: '#B22222',
          800: '#A01F1F',
          900: '#8F1F1F',
        },
        'jaba-silver': {
          DEFAULT: '#858585', // Darker for better contrast
          dark: '#6B6B6B',
          light: '#A3A3A3',
          50: '#F8F8F8',
          100: '#F0F0F0',
          200: '#E8E8E8',
          300: '#D3D3D3',
          400: '#A3A3A3',
          500: '#858585',
          600: '#6B6B6B',
          700: '#525252',
          800: '#404040',
          900: '#262626',
        },
        // Modern theme colors for better semantic usage
        'modern': {
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
        },
        // Legacy colors (keeping for backward compatibility during transition)
        alice_blue: { 
          DEFAULT: '#e1f2fe', 
          100: '#03375d', 
          200: '#066fba', 
          300: '#27a1f8', 
          400: '#84cafb', 
          500: '#e1f2fe', 
          600: '#e7f5fe', 
          700: '#edf7fe', 
          800: '#f3faff', 
          900: '#f9fcff' 
        }, 
        night: { 
          DEFAULT: '#071108', 
          100: '#010402', 
          200: '#030703', 
          300: '#040b05', 
          400: '#060e07', 
          500: '#071108', 
          600: '#235729', 
          700: '#409c49', 
          800: '#75c77e', 
          900: '#bae3be' 
        }, 
        cherry_blossom_pink: { 
          DEFAULT: '#edafb8', 
          100: '#430f17', 
          200: '#871f2e', 
          300: '#ca2e45', 
          400: '#de6d7e', 
          500: '#edafb8', 
          600: '#f1c0c7', 
          700: '#f4d0d5', 
          800: '#f8dfe3', 
          900: '#fbeff1' 
        }, 
        pistachio: { 
          DEFAULT: '#b1cc74', 
          100: '#262f11', 
          200: '#4c5e23', 
          300: '#728d34', 
          400: '#98bb46', 
          500: '#b1cc74', 
          600: '#c1d691', 
          700: '#d1e0ac', 
          800: '#e0ebc8', 
          900: '#f0f5e3' 
        }, 
        flax: { 
          DEFAULT: '#e7e08b', 
          100: '#3e3a0d', 
          200: '#7c7319', 
          300: '#b9ad26', 
          400: '#dbcf4f', 
          500: '#e7e08b', 
          600: '#ece6a4', 
          700: '#f1ecba', 
          800: '#f6f3d1', 
          900: '#faf9e8' 
        },
        // Dark mode custom palette
        rich_black: { 
          DEFAULT: '#080214', 
          100: '#010004', 
          200: '#030107', 
          300: '#04010b', 
          400: '#06010f', 
          500: '#080214', 
          600: '#2b0b6c', 
          700: '#4f13c5', 
          800: '#824ded', 
          900: '#c1a6f6' 
        },
        davys_gray: { 
          DEFAULT: '#5e5d5c', 
          100: '#131212', 
          200: '#252524', 
          300: '#383737', 
          400: '#4a4949', 
          500: '#5e5d5c', 
          600: '#7e7c7b', 
          700: '#9e9d9c', 
          800: '#bebebd', 
          900: '#dfdede' 
        },
        cambridge_blue: { 
          DEFAULT: '#8daa91', 
          100: '#1a241c', 
          200: '#354837', 
          300: '#4f6b53', 
          400: '#6a8f6f', 
          500: '#8daa91', 
          600: '#a4bba7', 
          700: '#baccbd', 
          800: '#d1ddd3', 
          900: '#e8eee9' 
        },
        pale_purple: { 
          DEFAULT: '#e3d8f1', 
          100: '#2b1843', 
          200: '#563187', 
          300: '#8253c1', 
          400: '#b396d9', 
          500: '#e3d8f1', 
          600: '#e9e1f4', 
          700: '#efe9f7', 
          800: '#f4f0fa', 
          900: '#faf8fc' 
        },
        space_cadet: { 
          DEFAULT: '#24204a', 
          100: '#07060f', 
          200: '#0f0d1e', 
          300: '#16132d', 
          400: '#1d1a3c', 
          500: '#24204a', 
          600: '#403883', 
          700: '#5f56b6', 
          800: '#958ecf', 
          900: '#cac7e7' 
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

