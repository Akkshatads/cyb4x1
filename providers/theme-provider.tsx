'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'dark' | 'light' | 'high-contrast' | 'auto';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  reducedNeon: boolean;
  setReducedNeon: (reduced: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [reducedNeon, setReducedNeonState] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('cyb4x-theme') as Theme;
    const savedReducedMotion = localStorage.getItem('cyb4x-reduced-motion') === 'true';
    const savedReducedNeon = localStorage.getItem('cyb4x-reduced-neon') === 'true';
    
    // Check system preference for reduced motion
    const systemReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (savedTheme) {
      setThemeState(savedTheme);
    }
    
    setReducedMotionState(savedReducedMotion || systemReducedMotion);
    setReducedNeonState(savedReducedNeon);
    setMounted(true);
  }, []);

  // Apply theme changes to DOM
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('theme-dark', 'theme-light', 'theme-high-contrast', 'theme-reduced-neon');
    
    // Apply current theme
    if (theme === 'auto') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(`theme-${systemTheme}`);
    } else {
      root.classList.add(`theme-${theme}`);
    }
    
    // Apply accessibility preferences
    if (reducedNeon) {
      root.classList.add('theme-reduced-neon');
    }
    
    if (reducedMotion) {
      root.style.setProperty('--motion-enabled', '0');
    } else {
      root.style.removeProperty('--motion-enabled');
    }
  }, [theme, reducedMotion, reducedNeon, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('cyb4x-theme', newTheme);
  };

  const setReducedMotion = (reduced: boolean) => {
    setReducedMotionState(reduced);
    localStorage.setItem('cyb4x-reduced-motion', String(reduced));
  };

  const setReducedNeon = (reduced: boolean) => {
    setReducedNeonState(reduced);
    localStorage.setItem('cyb4x-reduced-neon', String(reduced));
  };

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = document.documentElement;
      root.classList.remove('theme-dark', 'theme-light');
      root.classList.add(`theme-${mediaQuery.matches ? 'dark' : 'light'}`);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Listen for system reduced motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      if (!localStorage.getItem('cyb4x-reduced-motion')) {
        setReducedMotionState(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        reducedMotion,
        setReducedMotion,
        reducedNeon,
        setReducedNeon,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}