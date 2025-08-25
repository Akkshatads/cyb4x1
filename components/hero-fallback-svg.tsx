'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/providers/theme-provider';

export function HeroFallbackSVG() {
  const { reducedMotion } = useTheme();

  return (
    <div className="relative w-full h-full min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-bg-900 via-cyber-bg-800 to-cyber-bg-700" />
      
      {/* Animated SVG tunnel effect */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Cyb4x cyber security visualization"
      >
        <defs>
          <radialGradient id="cyberGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary-cyan)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--electric-purple)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent-magenta)" stopOpacity="0.1" />
          </radialGradient>
          
          <radialGradient id="tunnelGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="70%" stopColor="var(--primary-cyan)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--primary-cyan)" stopOpacity="0.3" />
          </radialGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Tunnel rings */}
        {[...Array(8)].map((_, i) => {
          const size = 100 + i * 80;
          const opacity = 0.8 - i * 0.1;
          
          return (
            <motion.circle
              key={i}
              cx="400"
              cy="300"
              r={size}
              fill="none"
              stroke="url(#cyberGradient)"
              strokeWidth="2"
              strokeOpacity={opacity}
              filter="url(#glow)"
              initial={{ r: size - 20, strokeOpacity: 0 }}
              animate={reducedMotion ? {} : {
                r: [size - 20, size, size + 20, size],
                strokeOpacity: [0, opacity, opacity * 0.5, opacity],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          );
        })}
        
        {/* Central core */}
        <motion.circle
          cx="400"
          cy="300"
          r="30"
          fill="url(#cyberGradient)"
          filter="url(#glow)"
          animate={reducedMotion ? {} : {
            r: [25, 35, 25],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => {
          const x = 200 + Math.random() * 400;
          const y = 150 + Math.random() * 300;
          
          return (
            <motion.circle
              key={`particle-${i}`}
              r="2"
              fill="var(--primary-cyan)"
              filter="url(#glow)"
              initial={{ cx: x, cy: y, opacity: 0 }}
              animate={reducedMotion ? { opacity: 0.6 } : {
                cx: [x, x + (Math.random() - 0.5) * 100],
                cy: [y, y + (Math.random() - 0.5) * 100],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          );
        })}
        
        {/* Grid lines */}
        <g stroke="var(--primary-cyan)" strokeWidth="1" strokeOpacity="0.2">
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={`grid-h-${i}`}
              x1="0"
              y1={i * 30}
              x2="800"
              y2={i * 30}
              initial={{ pathLength: 0 }}
              animate={reducedMotion ? { pathLength: 1 } : {
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {[...Array(27)].map((_, i) => (
            <motion.line
              key={`grid-v-${i}`}
              x1={i * 30}
              y1="0"
              x2={i * 30}
              y2="600"
              initial={{ pathLength: 0 }}
              animate={reducedMotion ? { pathLength: 1 } : {
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      </svg>
      
      {/* Overlay content */}
      <div className="relative z-10 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-fluid-hero font-bold cyber-text-glow">
            <span className="cyber-gradient bg-clip-text text-transparent">
              CYB4X
            </span>
          </h1>
          <p className="text-fluid-lg text-cyber-muted mt-4">
            Advanced Cyber Security Solutions
          </p>
        </motion.div>
      </div>
    </div>
  );
}