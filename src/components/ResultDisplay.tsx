
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ResultType = 'human' | 'ai' | 'inconclusive' | null;

interface ResultDisplayProps {
  result: ResultType;
  confidence: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, confidence }) => {
  if (result === null) {
    return null;
  }

  const getResultData = () => {
    switch (result) {
      case 'human':
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          label: 'Likely Real Human',
          color: 'from-green-500/20 to-green-600/20 border-green-500/30',
          textColor: 'text-green-500'
        };
      case 'ai':
        return {
          icon: <XCircle className="h-6 w-6 text-destructive" />,
          label: 'Likely AI-generated',
          color: 'from-red-500/20 to-red-600/20 border-red-500/30',
          textColor: 'text-destructive'
        };
      case 'inconclusive':
        return {
          icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
          label: 'Inconclusive',
          color: 'from-amber-500/20 to-amber-600/20 border-amber-500/30',
          textColor: 'text-amber-500'
        };
      default:
        return {
          icon: null,
          label: '',
          color: '',
          textColor: ''
        };
    }
  };

  const { icon, label, color, textColor } = getResultData();

  return (
    <div className={cn(
      "rounded-xl p-4 border bg-gradient-to-b animate-in",
      color
    )}>
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex flex-col">
          <h3 className={cn("font-semibold", textColor)}>{label}</h3>
          <p className="text-sm text-muted-foreground">
            Confidence: {confidence}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
