'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc3 } from 'lucide-react';

interface MusicPlayerProps {
  audioUrl: string;
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ audioUrl, autoPlayTrigger = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && autoPlayTrigger) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Autoplay prevented by browser:', err);
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.error(e));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      <button
        onClick={togglePlay}
        aria-label="Toggle Background Music"
        className={`relative w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border ${
          isPlaying
            ? 'bg-rose-600 text-white border-rose-400 scale-105'
            : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
        }`}
      >
        {isPlaying ? (
          <Disc3 className="w-6 h-6 animate-spin text-white" />
        ) : (
          <VolumeX className="w-5 h-5 text-slate-500" />
        )}

        {/* Pulse ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-30" />
        )}
      </button>
    </div>
  );
}
