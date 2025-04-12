
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface VoiceAnalysisChartProps {
  humanScore: number;
  aiScore: number;
}

const VoiceAnalysisChart: React.FC<VoiceAnalysisChartProps> = ({ humanScore, aiScore }) => {
  const data = [
    { name: 'Human', value: humanScore },
    { name: 'AI', value: aiScore },
  ];

  const COLORS = ['#22c55e', '#ef4444'];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Confidence']}
            contentStyle={{ 
              backgroundColor: '#111631', 
              borderColor: '#2a325a',
              borderRadius: '0.5rem',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            formatter={(value) => <span className="text-sm font-jetbrains">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoiceAnalysisChart;
