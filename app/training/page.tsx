import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Training',
  description: 'Professional cybersecurity training programs including security awareness, penetration testing, and compliance training.',
};

export default function TrainingPage() {
  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-fluid-4xl font-heading font-bold cyber-gradient bg-clip-text text-transparent mb-8">
          Cybersecurity Training
        </h1>
        <p className="text-fluid-lg text-cyber-muted leading-relaxed">
          Empower your team with comprehensive cybersecurity training programs. From security awareness 
          to advanced penetration testing, we provide the knowledge and skills needed to defend against threats.
        </p>
      </div>
    </div>
  );
}