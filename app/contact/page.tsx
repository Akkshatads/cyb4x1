'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  company: yup.string().required('Company is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  urgency: yup.string().oneOf(['low', 'medium', 'high', 'critical']).required('Please select urgency level'),
});

type FormData = yup.InferType<typeof schema>;

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@cyb4x.com',
    href: 'mailto:info@cyb4x.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: 'https://maps.google.com',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-fluid-4xl font-heading font-bold cyber-gradient bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-fluid-lg text-cyber-muted max-w-3xl mx-auto">
            Ready to secure your digital assets? Contact our cybersecurity experts for a consultation
            and discover how we can protect your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-cyber-text mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-cyber-text mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className="w-full px-4 py-3 bg-cyber-bg-800/50 border border-cyber-primary/20 rounded-lg text-cyber-text placeholder-cyber-muted focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-cyber-text mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="w-full px-4 py-3 bg-cyber-bg-800/50 border border-cyber-primary/20 rounded-lg text-cyber-text placeholder-cyber-muted focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-colors"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-cyber-text mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    {...register('company')}
                    className="w-full px-4 py-3 bg-cyber-bg-800/50 border border-cyber-primary/20 rounded-lg text-cyber-text placeholder-cyber-muted focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-colors"
                    placeholder="Your company"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-400" role="alert">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-cyber-text mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject')}
                      className="w-full px-4 py-3 bg-cyber-bg-800/50 border border-cyber-primary/20 rounded-lg text-cyber-text placeholder-cyber-muted focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-colors"
                      placeholder="Subject"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400" role="alert">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-cyber-text mb-2">
                      Urgency *
                    </label>
                    <select
                      id="urgency"
                      {...register('urgency')}
                      className="w-full px-4 py-3 bg-cyber-bg-800/50 border border-cyber-primary/20 rounded-lg text-cyber-text focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-colors"
                    >
                      <option value="">Select urgency</option>
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Need response soon</option>
                      <option value="high">High - Important matter</option>
                      <option value="critical">Critical - Urgent security issue</option>
                    </select>
                    {errors.urgency && (
                      <p className="mt-1 text-sm text-red-400" role="alert">
                        {errors.urgency.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-cyber-text mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    className="w-full px-4 py-3 bg-cyber-bg-800/50 border border-cyber-primary/20 rounded-lg text-cyber-text placeholder-cyber-muted focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-colors resize-vertical"
                    placeholder="Tell us about your security needs..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please try again later.</span>
                  </motion.div>
                )}

                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyber-primary to-cyber-purple text-white font-semibold disabled:opacity-50"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </span>
                </MagneticButton>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-cyber-text mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-start space-x-4 p-4 glass-card rounded-lg hover:border-cyber-primary/40 transition-colors group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="p-2 rounded-lg bg-cyber-primary/10 group-hover:bg-cyber-primary/20 transition-colors">
                      <info.icon className="w-5 h-5 text-cyber-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-cyber-text">{info.label}</h3>
                      <p className="text-cyber-muted group-hover:text-cyber-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-cyber-text mb-4">
                Response Time
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-cyber-muted">General Inquiries:</span>
                  <span className="text-cyber-text font-medium">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-muted">Sales Inquiries:</span>
                  <span className="text-cyber-text font-medium">4-8 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-muted">Critical Security Issues:</span>
                  <span className="text-cyber-primary font-medium">Immediate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}