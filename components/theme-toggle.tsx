'use client';

import { useState } from 'react';
import { Moon, Sun, Palette, Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme, reducedMotion, setReducedMotion, reducedNeon, setReducedNeon } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(false);

  const themes = [
    { value: 'dark', label: 'Dark Cyber', icon: Moon },
    { value: 'light', label: 'Light Mode', icon: Sun },
    { value: 'high-contrast', label: 'High Contrast', icon: Palette },
    { value: 'auto', label: 'System Auto', icon: Palette },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 w-9 px-0 hover:bg-cyber-primary/10 hover:text-cyber-primary focus:bg-cyber-primary/10 focus:text-cyber-primary"
          aria-label="Toggle theme and accessibility settings"
        >
          <div className="cyber-glow rounded-md">
            {theme === 'dark' && <Moon className="h-4 w-4" />}
            {theme === 'light' && <Sun className="h-4 w-4" />}
            {(theme === 'high-contrast' || theme === 'auto') && <Palette className="h-4 w-4" />}
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 glass-card border-cyber-primary/30"
        sideOffset={8}
      >
        <div className="px-2 py-2">
          <p className="text-sm font-medium text-cyber-text">Theme</p>
        </div>
        
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value as any)}
              className="cursor-pointer hover:bg-cyber-primary/10 hover:text-cyber-primary focus:bg-cyber-primary/10 focus:text-cyber-primary"
              aria-pressed={theme === themeOption.value}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{themeOption.label}</span>
              {theme === themeOption.value && (
                <div className="ml-auto h-2 w-2 rounded-full bg-cyber-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator className="bg-cyber-primary/20" />
        
        <div className="px-2 py-2">
          <p className="text-sm font-medium text-cyber-text">Accessibility</p>
        </div>
        
        <DropdownMenuItem
          onClick={() => setReducedMotion(!reducedMotion)}
          className="cursor-pointer hover:bg-cyber-primary/10 hover:text-cyber-primary focus:bg-cyber-primary/10 focus:text-cyber-primary"
          aria-pressed={reducedMotion}
        >
          {reducedMotion ? (
            <EyeOff className="mr-2 h-4 w-4" />
          ) : (
            <Eye className="mr-2 h-4 w-4" />
          )}
          <span>{reducedMotion ? 'Enable' : 'Reduce'} Motion</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setReducedNeon(!reducedNeon)}
          className="cursor-pointer hover:bg-cyber-primary/10 hover:text-cyber-primary focus:bg-cyber-primary/10 focus:text-cyber-primary"
          aria-pressed={reducedNeon}
        >
          {reducedNeon ? (
            <Palette className="mr-2 h-4 w-4" />
          ) : (
            <Palette className="mr-2 h-4 w-4 opacity-50" />
          )}
          <span>{reducedNeon ? 'Enable' : 'Reduce'} Neon</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="cursor-pointer hover:bg-cyber-primary/10 hover:text-cyber-primary focus:bg-cyber-primary/10 focus:text-cyber-primary"
          aria-pressed={soundEnabled}
        >
          {soundEnabled ? (
            <Volume2 className="mr-2 h-4 w-4" />
          ) : (
            <VolumeX className="mr-2 h-4 w-4" />
          )}
          <span>{soundEnabled ? 'Mute' : 'Enable'} Sound</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}