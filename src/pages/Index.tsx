
import React from 'react';
import Header from '@/components/Header';
import VoiceAnalyzer from '@/components/VoiceAnalyzer';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <VoiceAnalyzer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
