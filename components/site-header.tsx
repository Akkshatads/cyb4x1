'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';
import { ThemeToggle } from './theme-toggle';
import { MagneticButton } from './magnetic-button';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/training', label: 'Training' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { reducedMotion } = useTheme();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-cyber-primary/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 0.84, 0.3, 1] }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              className="p-2 rounded-lg bg-cyber-primary/10 group-hover:bg-cyber-primary/20 transition-colors"
              whileHover={reducedMotion ? {} : { scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Shield className="w-6 h-6 text-cyber-primary" />
            </motion.div>
            <span className="font-heading font-bold text-xl cyber-gradient bg-clip-text text-transparent">
              CYB4X
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="text-cyber-muted hover:text-cyber-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <MagneticButton
              href="/contact"
              className="px-4 py-2 text-sm bg-gradient-to-r from-cyber-primary to-cyber-purple text-white"
            >
              Get Started
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-muted hover:text-cyber-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="py-4 space-y-4 border-t border-cyber-primary/10 mt-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="block text-cyber-muted hover:text-cyber-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
              className="pt-4"
            >
              <MagneticButton
                href="/contact"
                className="w-full px-4 py-3 text-sm bg-gradient-to-r from-cyber-primary to-cyber-purple text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}