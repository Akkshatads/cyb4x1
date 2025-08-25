'use client';

import { useState, useEffect } from 'react';

export type DeviceQuality = 'low' | 'medium' | 'high';

interface DeviceCapabilities {
  quality: DeviceQuality;
  canUseWebGL: boolean;
  canUseParticles: boolean;
  maxParticles: number;
  canUseComplexAnimations: boolean;
  budget3D: number; // KB
}

export function useDeviceQuality(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    quality: 'medium',
    canUseWebGL: false,
    canUseParticles: true,
    maxParticles: 60,
    canUseComplexAnimations: true,
    budget3D: 400,
  });

  useEffect(() => {
    function detectDeviceQuality(): DeviceCapabilities {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check for save data preference
      const saveData = 'connection' in navigator && 
        (navigator as any).connection?.saveData === true;

      // Check device memory (Chrome only)
      const deviceMemory = 'deviceMemory' in navigator ? 
        (navigator as any).deviceMemory : 4;

      // Check hardware concurrency
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;

      // Check effective connection type
      const effectiveType = 'connection' in navigator ? 
        (navigator as any).connection?.effectiveType : '4g';

      // Check WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const canUseWebGL = !!gl;

      // Determine quality based on capabilities
      let quality: DeviceQuality = 'medium';
      let maxParticles = 60;
      let budget3D = 400;

      if (saveData || prefersReducedMotion || deviceMemory <= 2 || effectiveType === 'slow-2g' || effectiveType === '2g') {
        quality = 'low';
        maxParticles = 15;
        budget3D = 250;
      } else if (deviceMemory >= 8 && hardwareConcurrency >= 8 && effectiveType === '4g' && canUseWebGL) {
        quality = 'high';
        maxParticles = 120;
        budget3D = 700;
      }

      return {
        quality,
        canUseWebGL: canUseWebGL && !saveData && !prefersReducedMotion,
        canUseParticles: !saveData && !prefersReducedMotion,
        maxParticles,
        canUseComplexAnimations: !prefersReducedMotion && !saveData,
        budget3D,
      };
    }

    setCapabilities(detectDeviceQuality());

    // Listen for connection changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const handleConnectionChange = () => {
        setCapabilities(detectDeviceQuality());
      };
      
      connection.addEventListener('change', handleConnectionChange);
      return () => connection.removeEventListener('change', handleConnectionChange);
    }
  }, []);

  return capabilities;
}