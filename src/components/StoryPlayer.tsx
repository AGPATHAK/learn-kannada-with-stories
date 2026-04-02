import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, BookOpen, Volume2, Languages } from 'lucide-react';
import { Story, generateSpeech } from '../lib/gemini';

interface StoryPlayerProps {
  story: Story;
  onComplete: () => void;
}

export default function StoryPlayer({ story, onComplete }: StoryPlayerProps) {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [audioError, setAudioError] = useState<string | null>(null);

  const currentSegment = story.segments[currentSegmentIndex];
  const words = currentSegment.kannada.split(/\s+/);

  useEffect(() => {
    // Reset when story changes
    setCurrentSegmentIndex(0);
    setIsPlaying(false);
    setAudioUrl(null);
    setCurrentTime(0);
    setDuration(0);
    setAudioError(null);
  }, [story]);

  useEffect(() => {
    // Reset time when segment changes
    setCurrentTime(0);
    setDuration(0);
    setAudioError(null);
    
    if (currentSegment.audioData) {
      setAudioUrl(currentSegment.audioData);
    } else {
      setAudioUrl(null);
    }
  }, [currentSegmentIndex, currentSegment.audioData]);

  useEffect(() => {
    if (isPlaying && audioUrl && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.error("Playback failed", e);
        setAudioError("Playback failed. Please try again.");
      });
    }
  }, [audioUrl, isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Estimate which word is being spoken based on linear progress
  const activeWordIndex = duration > 0 
    ? Math.min(Math.floor((currentTime / duration) * words.length), words.length - 1)
    : -1;

  const handleNext = () => {
    if (currentSegmentIndex < story.segments.length - 1) {
      setCurrentSegmentIndex(prev => prev + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSegmentIndex > 0) {
      setCurrentSegmentIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const onAudioEnded = () => {
    // Auto-advance after a short delay? Or just stop.
    // Let's auto-advance for a smoother experience.
    setTimeout(() => {
      if (isPlaying) handleNext();
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Top Part: Visual/Context */}
      <div className="flex-1 bg-brand-50 p-8 flex flex-col items-center justify-center text-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSegmentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl"
          >
            <div className="mb-6 inline-flex p-4 bg-white rounded-2xl shadow-sm">
              <BookOpen className="w-12 h-12 text-brand-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{story.title}</h2>
            <p className="text-xl text-slate-600 italic leading-relaxed">
              "{currentSegment.english}"
            </p>
          </motion.div>
        </AnimatePresence>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200">
          <motion.div 
            className="h-full bg-brand-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSegmentIndex + 1) / story.segments.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Bottom Part: Kannada Script & Controls */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSegmentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="text-center mb-12"
          >
            <div className="kannada-text text-4xl md:text-5xl font-bold leading-tight mb-4 flex flex-wrap justify-center gap-x-3 gap-y-2">
              {words.map((word, idx) => (
                <motion.span
                  key={idx}
                  animate={{ 
                    color: idx === activeWordIndex ? '#15803d' : '#334155',
                    scale: idx === activeWordIndex ? 1.1 : 1,
                    backgroundColor: idx === activeWordIndex ? '#dcfce7' : 'transparent'
                  }}
                  className="px-2 rounded-lg transition-colors duration-200"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            {isLoadingAudio && (
              <div className="flex items-center justify-center gap-2 text-brand-500 animate-pulse">
                <Volume2 className="w-5 h-5" />
                <span className="text-sm font-medium">Preparing audio...</span>
              </div>
            )}
            {audioError && (
              <div className="flex flex-col items-center gap-2 text-red-500">
                <span className="text-sm font-medium">{audioError}</span>
                <button 
                  onClick={() => {
                    setAudioError(null);
                    setIsPlaying(true);
                  }}
                  className="text-xs bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Retry
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-6">
          <button
            onClick={handlePrev}
            disabled={currentSegmentIndex === 0}
            className="p-4 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handlePlayPause}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700 hover:scale-105 transition-all"
          >
            {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
          </button>

          <button
            onClick={handleNext}
            className="p-4 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-8 flex items-center gap-2 text-slate-400 text-sm">
          <span>Segment {currentSegmentIndex + 1} of {story.segments.length}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl || ''}
        onEnded={onAudioEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay={isPlaying}
        hidden
      />
    </div>
  );
}
