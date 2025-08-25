import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about CYB4X and our mission to provide advanced cybersecurity solutions powered by AI.',
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-fluid-4xl font-heading font-bold cyber-gradient bg-clip-text text-transparent mb-8">
          About CYB4X
        </h1>
        <p className="text-fluid-lg text-cyber-muted leading-relaxed">
          We are a leading cybersecurity company focused on protecting organizations from advanced threats. 
          Our team of experts combines cutting-edge technology with deep security expertise to deliver 
          comprehensive protection for your digital assets.
        </p>
      </div>
    </div>
  );
}