
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FrequencyChartProps {
  data: Array<{ frequency: number; human: number; ai: number }>;
}

const FrequencyChart: React.FC<FrequencyChartProps> = ({ data }) => {
  return (
    <div className="h-[250px] w-full mt-4">
      <h3 className="text-sm font-orbitron mb-2 text-white/70">Voice Frequency Analysis</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a325a" />
          <XAxis 
            dataKey="frequency" 
            label={{ value: 'Frequency (Hz)', position: 'insideBottomRight', offset: 0, fill: '#aaa', fontSize: 12 }}
            stroke="#aaa"
            tick={{ fill: '#aaa', fontSize: 10 }}
          />
          <YAxis 
            label={{ value: 'Amplitude', angle: -90, position: 'insideLeft', fill: '#aaa', fontSize: 12 }}
            stroke="#aaa"
            tick={{ fill: '#aaa', fontSize: 10 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#111631', 
              borderColor: '#2a325a',
              borderRadius: '0.5rem',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          />
          <Area 
            type="monotone" 
            dataKey="human" 
            name="Human Pattern" 
            stroke="#22c55e" 
            fillOpacity={1}
            fill="url(#colorHuman)" 
            animationDuration={1500}
          />
          <Area 
            type="monotone" 
            dataKey="ai" 
            name="AI Pattern" 
            stroke="#ef4444" 
            fillOpacity={1}
            fill="url(#colorAi)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyChart;
