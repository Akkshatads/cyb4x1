import { AnimatedHero } from '@/components/animated-hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Advanced cybersecurity solutions powered by AI. Protect your digital assets with enterprise-grade security.',
};

export default function HomePage() {
  return (
    <>
      <AnimatedHero />
    </>
  );
}