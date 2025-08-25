'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'default',
  disabled = false,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { reducedMotion } = useTheme();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || reducedMotion || disabled) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    // Limit magnetic effect
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 50;
    const strength = Math.min(distance / maxDistance, 1) * 0.3;
    
    setPosition({
      x: deltaX * strength,
      y: deltaY * strength,
    });
  };

  const handleMouseLeave = () => {
    if (!reducedMotion) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const baseClasses = cn(
    'relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyber-primary/50 focus:ring-offset-2 focus:ring-offset-cyber-surface',
    {
      'bg-gradient-to-r from-cyber-primary to-cyber-purple text-white hover:shadow-lg hover:shadow-cyber-primary/25': variant === 'default',
      'border-2 border-cyber-primary/50 text-cyber-primary hover:bg-cyber-primary/10': variant === 'outline',
      'text-cyber-primary hover:bg-cyber-primary/5': variant === 'ghost',
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  const content = (
    <motion.div
      ref={ref}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={reducedMotion ? {} : {
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      whileHover={reducedMotion ? {} : {
        scale: 1.02,
        rotateX: position.y * 0.2,
        rotateY: position.x * 0.2,
      }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      style={{ transformStyle: 'preserve-3d' }}
      role={href ? 'link' : 'button'}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {children}
      
      {/* Ripple effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0"
        whileHover={reducedMotion ? {} : {
          opacity: [0, 0.1, 0],
          scale: [0.8, 1.2, 1],
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'radial-gradient(circle, var(--primary-cyan) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}