import './globals.css';
import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Inter, Orbitron } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CYB4X - Advanced Cyber Security Solutions',
    template: '%s | CYB4X',
  },
  description: 'Enterprise-grade cybersecurity solutions powered by AI. Protect your digital assets with advanced threat detection, incident response, and compliance services.',
  keywords: ['cybersecurity', 'threat detection', 'incident response', 'compliance', 'AI security', 'enterprise security'],
  authors: [{ name: 'CYB4X' }],
  creator: 'CYB4X',
  metadataBase: new URL('https://cyb4x.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cyb4x.com',
    siteName: 'CYB4X',
    title: 'CYB4X - Advanced Cyber Security Solutions',
    description: 'Enterprise-grade cybersecurity solutions powered by AI. Protect your digital assets with advanced threat detection and response.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CYB4X Cybersecurity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CYB4X - Advanced Cyber Security Solutions',
    description: 'Enterprise-grade cybersecurity solutions powered by AI.',
    images: ['/og-image.jpg'],
    creator: '@cyb4x',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('cyb4x-theme') || 'dark';
                  const reducedMotion = localStorage.getItem('cyb4x-reduced-motion') === 'true';
                  const reducedNeon = localStorage.getItem('cyb4x-reduced-neon') === 'true';
                  
                  document.documentElement.classList.add('theme-' + theme);
                  
                  if (reducedMotion) {
                    document.documentElement.style.setProperty('--motion-enabled', '0');
                  }
                  
                  if (reducedNeon) {
                    document.documentElement.classList.add('theme-reduced-neon');
                  }
                } catch (e) {
                  document.documentElement.classList.add('theme-dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${orbitron.variable} antialiased`}>
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}