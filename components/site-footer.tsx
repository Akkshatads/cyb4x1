'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const footerSections = [
  {
    title: 'Services',
    links: [
      { href: '/services/threat-detection', label: 'Threat Detection' },
      { href: '/services/incident-response', label: 'Incident Response' },
      { href: '/services/compliance', label: 'Compliance' },
      { href: '/services/consulting', label: 'Consulting' },
    ],
  },
  {
    title: 'Training',
    links: [
      { href: '/training/security-awareness', label: 'Security Awareness' },
      { href: '/training/penetration-testing', label: 'Penetration Testing' },
      { href: '/training/incident-response', label: 'Incident Response' },
      { href: '/training/compliance', label: 'Compliance Training' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/careers', label: 'Careers' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
];

const socialLinks = [
  { href: '#', icon: Github, label: 'GitHub' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' },
  { href: '#', icon: Twitter, label: 'Twitter' },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyber-primary/10 bg-cyber-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg bg-cyber-primary/10">
                  <Shield className="w-8 h-8 text-cyber-primary" />
                </div>
                <span className="font-heading font-bold text-2xl cyber-gradient bg-clip-text text-transparent">
                  CYB4X
                </span>
              </div>
              
              <p className="text-cyber-muted max-w-md mb-6">
                Advanced cybersecurity solutions powered by AI and machine learning. 
                Protecting your digital assets with enterprise-grade security.
              </p>
              
              <div className="space-y-2 text-sm text-cyber-muted">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@cyb4x.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-cyber-text mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cyber-muted hover:text-cyber-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          className="border-t border-cyber-primary/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-cyber-muted mb-4 sm:mb-0">
            © {currentYear} CYB4X. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-muted hover:text-cyber-primary transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}