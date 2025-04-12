
import React, { useState } from 'react';
import MicrophoneButton from './MicrophoneButton';
import ResultDisplay from './ResultDisplay';
import VoiceAnalysisChart from './VoiceAnalysisChart';
import FrequencyChart from './FrequencyChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon } from 'lucide-react';

type ResultType = 'human' | 'ai' | 'inconclusive' | null;

// Mock function to simulate voice analysis (in a real app, this would call an API)
const analyzeVoice = (audioBlob: Blob): Promise<{
  result: ResultType;
  confidence: number;
  humanScore: number;
  aiScore: number;
  frequencyData: Array<{ frequency: number; human: number; ai: number }>;
}> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Generate random result for demo purposes
      const random = Math.random();
      let result: ResultType;
      let confidence: number;
      let humanScore: number;
      let aiScore: number;
      
      if (random < 0.4) {
        // Human
        humanScore = Math.floor(Math.random() * 20) + 70; // 70-90
        aiScore = 100 - humanScore;
        result = 'human';
        confidence = humanScore;
      } else if (random < 0.8) {
        // AI
        aiScore = Math.floor(Math.random() * 25) + 65; // 65-90
        humanScore = 100 - aiScore;
        result = 'ai';
        confidence = aiScore;
      } else {
        // Inconclusive
        humanScore = Math.floor(Math.random() * 15) + 40; // 40-55
        aiScore = 100 - humanScore;
        result = 'inconclusive';
        confidence = Math.max(humanScore, aiScore);
      }
      
      // Generate mock frequency data
      const frequencyData = [];
      const frequencies = [100, 200, 500, 1000, 2000, 3000, 5000, 7000, 10000];
      
      for (let freq of frequencies) {
        frequencyData.push({
          frequency: freq,
          human: Math.floor(Math.random() * 100),
          ai: Math.floor(Math.random() * 100)
        });
      }
      
      resolve({
        result,
        confidence,
        humanScore,
        aiScore,
        frequencyData
      });
    }, 1500);
  });
};

const VoiceAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ResultType>(null);
  const [confidence, setConfidence] = useState(0);
  const [humanScore, setHumanScore] = useState(50);
  const [aiScore, setAiScore] = useState(50);
  const [frequencyData, setFrequencyData] = useState<Array<{ frequency: number; human: number; ai: number }>>([]);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsAnalyzing(true);
    
    try {
      // In a real app, you would send this blob to your backend
      const analysisResult = await analyzeVoice(audioBlob);
      
      setResult(analysisResult.result);
      setConfidence(analysisResult.confidence);
      setHumanScore(analysisResult.humanScore);
      setAiScore(analysisResult.aiScore);
      setFrequencyData(analysisResult.frequencyData);
    } catch (error) {
      console.error('Error analyzing voice:', error);
      setResult('inconclusive');
      setConfidence(50);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-orbitron font-bold mb-4 text-gradient">
            Voice Fraud Detector
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Verify if a voice is human or AI-generated. Hold the button to speak, 
            release to analyze the audio and detect voice manipulation.
          </p>
        </div>
        
        <div className="cyber-card mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue/0 via-cyber-blue to-cyber-blue/0"></div>
          <div className="flex flex-col items-center">
            <MicrophoneButton onRecordingComplete={handleRecordingComplete} />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground font-jetbrains">
                {isAnalyzing ? 'Analyzing voice pattern...' : 'Hold to record your voice sample'}
              </p>
            </div>
          </div>
        </div>

        {(result || isAnalyzing) && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-cyber-card border-[#2a325a]/50 shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-orbitron">Analysis Result</CardTitle>
                  <InfoIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Voice authenticity confidence score</CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="py-8 flex justify-center">
                    <div className="h-8 w-8 rounded-full border-4 border-t-cyber-blue border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <ResultDisplay result={result} confidence={confidence} />
                    <div className="mt-4">
                      <VoiceAnalysisChart 
                        humanScore={humanScore} 
                        aiScore={aiScore} 
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-card border-[#2a325a]/50 shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-orbitron">Spectral Analysis</CardTitle>
                <CardDescription>Frequency distribution comparison</CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="py-8 flex justify-center">
                    <div className="h-8 w-8 rounded-full border-4 border-t-cyber-blue border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  </div>
                ) : (
                  <FrequencyChart data={frequencyData} />
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAnalyzer;
