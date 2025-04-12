
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-4 py-6 mt-8 border-t border-[#2a325a]">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <ShieldCheck className="h-5 w-5 text-cyber-blue" />
          <span className="text-sm text-muted-foreground">
            VoxSecure © 2025 - Voice Verification System by DarkWave - Aritra Kundu
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-cyber-blue transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-xs text-muted-foreground hover:text-cyber-blue transition-colors">
            Terms of Use
          </a>
          <a
  href="https://wa.me/qr/7DGKFLHEAXGOB1"
  target="_blank"
  rel="noopener noreferrer"
  className="text-xs text-muted-foreground hover:text-cyber-blue transition-colors"
>
  Contact
</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
