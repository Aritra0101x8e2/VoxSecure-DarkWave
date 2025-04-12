
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

interface MicrophoneButtonProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Cleanup function to stop recording if component unmounts during recording
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });
      
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        if (audioBlob.size > 0) {
          onRecordingComplete(audioBlob);
        }
        
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Error",
        description: "Please ensure microphone access is granted and try again.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`relative mx-auto mt-4 flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 ${
              isRecording 
                ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-neon' 
                : 'bg-gradient-to-br from-cyber-blue to-blue-600 hover:shadow-cyber'
            }`}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isRecording && (
              <span className="absolute h-full w-full rounded-full bg-white/20 animate-pulse-ring"></span>
            )}
            {isRecording ? (
              <MicOff className="h-12 w-12 text-white" />
            ) : (
              <Mic className={`h-12 w-12 text-white ${isHovering ? 'animate-pulse' : ''}`} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-jetbrains text-xs">
            {isRecording ? "Release to analyze" : "Hold to speak"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MicrophoneButton;
