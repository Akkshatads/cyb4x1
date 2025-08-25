import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['var(--font-orbitron)', 'monospace'],
        'body': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // Cyb4x brand colors
        'cyber-bg': {
          900: 'var(--bg-900)',
          800: 'var(--bg-800)',
          700: 'var(--bg-700)',
        },
        'cyber-primary': 'var(--primary-cyan)',
        'cyber-accent': 'var(--accent-magenta)',
        'cyber-purple': 'var(--electric-purple)',
        'cyber-success': 'var(--success)',
        'cyber-muted': 'var(--muted)',
        'cyber-text': 'var(--text-primary)',
        'cyber-surface': 'var(--bg-surface)',
        'cyber-glass': 'var(--glass-bg)',
        // Existing shadcn colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 1.5vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2.2vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 2.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 3vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 3.5vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 4vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 4.5vw, 3rem)',
        'fluid-5xl': 'clamp(2.5rem, 5vw, 3.5rem)',
        'fluid-hero': 'clamp(1.6rem, 3.8vw, 3.6rem)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'magnetic': 'magnetic 0.18s cubic-bezier(0.16, 0.84, 0.3, 1)',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16, 0.84, 0.3, 1)',
        'fade-in-stagger': 'fade-in-up 0.6s cubic-bezier(0.16, 0.84, 0.3, 1) var(--stagger)',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { 'box-shadow': '0 0 20px rgba(0, 230, 255, 0.3)' },
          '100%': { 'box-shadow': '0 0 40px rgba(0, 230, 255, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'magnetic': {
          '0%': { transform: 'scale(1) translateZ(0px)' },
          '100%': { transform: 'scale(1.03) translateZ(6px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backdropBlur: {
        'glass': 'var(--glass-blur)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;