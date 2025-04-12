
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyber-blue to-blue-700 flex items-center justify-center">
          <span className="text-white font-orbitron font-bold text-lg">VS</span>
        </div>
        <h1 className="text-2xl font-orbitron font-bold text-gradient">VoxSecure - DarkWave Security</h1>
      </div>
      <div className="text-sm text-muted-foreground hidden md:block">
        <span className="font-jetbrains">AI Voice Fraud Detection System</span>
      </div>
    </header>
  );
};

export default Header;
