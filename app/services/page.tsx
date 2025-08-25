import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive cybersecurity services including threat detection, incident response, compliance, and consulting.',
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-fluid-4xl font-heading font-bold cyber-gradient bg-clip-text text-transparent mb-8">
          Our Services
        </h1>
        <p className="text-fluid-lg text-cyber-muted leading-relaxed">
          We offer a comprehensive suite of cybersecurity services designed to protect your organization 
          from evolving threats. Our solutions are tailored to meet your specific security needs.
        </p>
      </div>
    </div>
  );
}