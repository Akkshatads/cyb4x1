'use client';

import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { useDeviceQuality } from '@/hooks/use-device-quality';
import { HeroFallbackSVG } from './hero-fallback-svg';
import { MagneticButton } from './magnetic-button';
import { Shield, Zap, Eye } from 'lucide-react';

// Lazy load the R3F component for better performance
const R3FHeroTunnel = lazy(() => 
  import('./r3f-hero-tunnel').then(mod => ({ default: mod.R3FHeroTunnel }))
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 0.84, 0.3, 1],
    },
  },
};

export function AnimatedHero() {
  const { canUseWebGL } = useDeviceQuality();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background 3D or SVG fallback */}
      {canUseWebGL ? (
        <Suspense fallback={<HeroFallbackSVG />}>
          <R3FHeroTunnel />
        </Suspense>
      ) : (
        <HeroFallbackSVG />
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg-900/90 via-transparent to-cyber-bg-900/50" />
      
      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-fluid-hero font-bold leading-tight text-balance">
            <motion.span
              className="block cyber-gradient bg-clip-text text-transparent cyber-text-glow"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              CYB4X
            </motion.span>
            <motion.span 
              className="block text-cyber-text mt-2"
              variants={itemVariants}
            >
              Cyber Security
            </motion.span>
          </h1>
        </motion.div>
        
        <motion.p
          variants={itemVariants}
          className="text-fluid-xl text-cyber-muted max-w-3xl mx-auto mt-6 leading-relaxed text-balance"
        >
          Advanced threat detection and response solutions powered by AI. 
          Protect your digital assets with enterprise-grade cybersecurity.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <MagneticButton
            href="/contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyber-primary to-cyber-purple text-white font-semibold rounded-lg cyber-glow transition-all duration-300 hover:shadow-lg hover:shadow-cyber-primary/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Get Protected
            </span>
          </MagneticButton>
          
          <MagneticButton
            href="/services"
            variant="outline"
            className="group px-8 py-4 border-2 border-cyber-primary/50 text-cyber-primary hover:bg-cyber-primary/10 font-semibold rounded-lg transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              View Services
            </span>
          </MagneticButton>
        </motion.div>
        
        {/* Feature highlights */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: Shield,
              title: "Advanced Threat Protection",
              description: "AI-powered detection and response"
            },
            {
              icon: Zap,
              title: "Real-time Monitoring",
              description: "24/7 security operations center"
            },
            {
              icon: Eye,
              title: "Compliance Ready",
              description: "Meet industry standards"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="glass-card p-6 rounded-xl hover:border-cyber-primary/40 transition-colors duration-300"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyber-primary/10 mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-cyber-primary" />
              </div>
              <h3 className="text-lg font-semibold text-cyber-text mb-2">
                {feature.title}
              </h3>
              <p className="text-cyber-muted text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cyber-primary/50 rounded-full p-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-cyber-primary rounded-full mx-auto"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}