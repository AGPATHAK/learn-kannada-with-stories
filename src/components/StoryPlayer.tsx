import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Volume2 } from 'lucide-react';
import { InlineGlossaryEntry, Story } from '../types/story';

interface StoryPlayerProps {
  story: Story;
  onExit: () => void;
  onComplete: () => void;
}

function getSegmentDuration(story: Story, index: number): number {
  return story.segments[index]?.totalDurationMs ?? 0;
}

function normalizeGlossaryToken(value: string): string {
  return value.replace(/[.,!?“”"':;()]/g, '').trim();
}

export default function StoryPlayer({ story, onExit, onComplete }: StoryPlayerProps) {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [audioReady, setAudioReady] = useState(false);
  const [selectedGlossaryEntry, setSelectedGlossaryEntry] = useState<InlineGlossaryEntry | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const segmentStartRef = useRef<number>(0);

  const currentSegment = story.segments[currentSegmentIndex];
  const currentDuration = getSegmentDuration(story, currentSegmentIndex);
  const isSegmentComplete = currentTimeMs >= currentDuration && currentDuration > 0;
  const storyProgress = ((currentSegmentIndex + Math.min(currentTimeMs / Math.max(currentDuration, 1), 1)) / story.segments.length) * 100;

  const activeTokenIndex = useMemo(() => {
    return currentSegment.tokens.findIndex((token) => currentTimeMs >= token.startMs && currentTimeMs < token.endMs);
  }, [currentSegment.tokens, currentTimeMs]);

  const glossaryLookup = useMemo(() => {
    const lookup = new Map<string, InlineGlossaryEntry>();

    story.inlineGlossary.forEach((entry) => {
      const forms = [entry.word, ...entry.surfaceForms];
      forms.forEach((form) => {
        lookup.set(normalizeGlossaryToken(form), entry);
      });
    });

    return lookup;
  }, [story.inlineGlossary]);

  const activeGlossaryEntry = useMemo(() => {
    const activeToken = currentSegment.tokens[activeTokenIndex];
    if (!activeToken) {
      return null;
    }

    return glossaryLookup.get(normalizeGlossaryToken(activeToken.text)) ?? null;
  }, [activeTokenIndex, currentSegment.tokens, glossaryLookup]);

  const handleAdvance = () => {
    if (currentSegmentIndex === story.segments.length - 1) {
      onComplete();
      return;
    }

    setCurrentSegmentIndex((index) => index + 1);
    setCurrentTimeMs(0);
    setIsPlaying(false);
  };

  const handleRetreat = () => {
    if (currentSegmentIndex === 0) {
      setCurrentTimeMs(0);
      setIsPlaying(false);
      return;
    }

    setCurrentSegmentIndex((index) => index - 1);
    setCurrentTimeMs(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    setCurrentSegmentIndex(0);
    setCurrentTimeMs(0);
    setIsPlaying(false);
    setSelectedGlossaryEntry(null);
  }, [story]);

  useEffect(() => {
    setCurrentTimeMs(0);
    setAudioReady(false);
    setSelectedGlossaryEntry(null);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (currentSegment.audioSrc && audioRef.current) {
      audioRef.current.load();
    }
  }, [currentSegment]);

  useEffect(() => {
    if (!activeGlossaryEntry) {
      return;
    }

    setSelectedGlossaryEntry((current) => current ?? activeGlossaryEntry);
  }, [activeGlossaryEntry]);

  useEffect(() => {
    if (!isPlaying) {
      if (currentSegment.audioSrc && audioRef.current) {
        audioRef.current.pause();
      }
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (currentSegment.audioSrc && audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    segmentStartRef.current = Date.now() - currentTimeMs;
    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - segmentStartRef.current;
      if (elapsed >= currentDuration) {
        window.clearInterval(timerRef.current ?? undefined);
        timerRef.current = null;
        setCurrentTimeMs(currentDuration);
        setIsPlaying(false);
        return;
      }

      setCurrentTimeMs(elapsed);
    }, 40);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentDuration, currentSegment.audioSrc, currentSegmentIndex, isPlaying, onComplete, story.segments.length]);

  const handlePlayPause = () => {
    if (!isPlaying && isSegmentComplete) {
      if (currentSegmentIndex === story.segments.length - 1) {
        onComplete();
        return;
      }

      setCurrentSegmentIndex((index) => index + 1);
      setCurrentTimeMs(0);
      setSelectedGlossaryEntry(null);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((value) => !value);
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTimeMs(audioRef.current.currentTime * 1000);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTimeMs(currentDuration);
  };

  const handleAudioCanPlay = () => {
    setAudioReady(true);
    if (audioRef.current?.paused && currentTimeMs > 0) {
      audioRef.current.currentTime = currentTimeMs / 1000;
    }
  };

  const handleGlossaryOpen = (tokenText: string) => {
    const normalized = normalizeGlossaryToken(tokenText);
    const entry = glossaryLookup.get(normalized) ?? null;
    setSelectedGlossaryEntry(entry);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between px-2 pb-4">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-emerald-200 hover:text-emerald-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Library
        </button>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">{story.sourceLabel}</p>
          <p className="text-sm text-slate-500">{story.sourceTitle}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)]">
        <div className="relative flex min-h-[310px] flex-col items-center justify-center bg-[linear-gradient(135deg,#eefbf3_0%,#f8fafc_100%)] px-6 py-12 text-center sm:px-10">
          <div className="mb-6 rounded-[1.75rem] bg-white p-5 shadow-[0_24px_40px_-32px_rgba(15,23,42,0.45)]">
            <Volume2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{story.title}</h2>
          <div className="mb-4 min-h-[4.5rem] max-w-2xl rounded-[1.5rem] border border-emerald-100 bg-white/90 px-5 py-4 shadow-[0_24px_40px_-32px_rgba(21,128,61,0.45)]">
            {activeGlossaryEntry ? (
              <div>
                <p className="kannada-text text-2xl font-bold text-emerald-800">{activeGlossaryEntry.word}</p>
                <p className="mt-1 text-lg font-semibold text-slate-700">{activeGlossaryEntry.meaning}</p>
                {activeGlossaryEntry.pronunciationGuide?.devanagari && (
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {activeGlossaryEntry.pronunciationGuide.devanagari}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm font-medium text-slate-500">
                As each word is highlighted, its quick meaning will appear here when glossary support is available.
              </p>
            )}
          </div>
          <p className="max-w-2xl text-xl italic leading-9 text-slate-500 sm:text-3xl sm:leading-[3rem]">
            "{currentSegment.english}"
          </p>
          <div className="absolute inset-x-0 bottom-0 h-2 bg-slate-200">
            <div
              className="h-full bg-emerald-500 transition-[width] duration-300"
              style={{ width: `${Math.min(storyProgress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex min-h-[360px] flex-col items-center justify-between gap-10 px-6 py-10 sm:px-10">
          <div className="max-w-5xl text-center">
            <div className="kannada-text flex flex-wrap justify-center gap-x-5 gap-y-4 text-[2.6rem] font-extrabold leading-tight tracking-tight text-slate-700 sm:text-[4.5rem]">
              {currentSegment.tokens.map((token, index) => {
                const isActive = index === activeTokenIndex;
                const isPast = index < activeTokenIndex;
                const glossaryEntry = glossaryLookup.get(normalizeGlossaryToken(token.text));
                const isGlossarySelected = selectedGlossaryEntry?.id === glossaryEntry?.id;

                return (
                  <button
                    key={`${currentSegment.id}-${token.text}-${index}`}
                    type="button"
                    onClick={() => handleGlossaryOpen(token.text)}
                    disabled={!glossaryEntry}
                    className={[
                      'rounded-2xl px-3 py-1 transition-all duration-150',
                      glossaryEntry ? 'cursor-pointer hover:bg-slate-100' : 'cursor-default',
                      isActive ? 'bg-emerald-100 text-emerald-700 scale-[1.03]' : '',
                      isPast ? 'text-slate-400' : '',
                      isGlossarySelected ? 'bg-amber-100 text-amber-800' : '',
                    ].join(' ')}
                  >
                    {token.text}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Tap a highlighted Kannada word to see a quick meaning when glossary help is available.
            </p>
            {selectedGlossaryEntry && (
              <div className="mt-6 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/80 p-5 text-left shadow-[0_18px_40px_-32px_rgba(21,128,61,0.55)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="kannada-text text-2xl font-bold text-emerald-800">{selectedGlossaryEntry.word}</p>
                    {selectedGlossaryEntry.pronunciationGuide?.devanagari && (
                      <p className="mt-1 text-sm font-medium text-emerald-700">
                        {selectedGlossaryEntry.pronunciationGuide.devanagari}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedGlossaryEntry(null)}
                    className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                  >
                    Close
                  </button>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-800">{selectedGlossaryEntry.meaning}</p>
                {selectedGlossaryEntry.note && (
                  <p className="mt-2 text-sm leading-7 text-slate-600">{selectedGlossaryEntry.note}</p>
                )}
              </div>
            )}
            <p className="mt-6 text-sm leading-7 text-slate-500">
              {currentSegment.audioSrc
                ? 'This segment will follow your uploaded narration timing.'
                : 'Preview mode is using built-in reading timings. Add an audio file later to sync with real narration.'}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={handleRetreat}
                className="rounded-full bg-slate-100 p-5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={handlePlayPause}
                className="rounded-full bg-emerald-600 p-7 text-white shadow-[0_24px_60px_-32px_rgba(22,163,74,0.65)] transition-all hover:scale-[1.02] hover:bg-emerald-700"
              >
                {isPlaying ? <Pause className="h-10 w-10 fill-current" /> : <Play className="h-10 w-10 fill-current" />}
              </button>
              <button
                type="button"
                onClick={handleAdvance}
                className="rounded-full bg-slate-100 p-5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>
            <div className="text-center text-sm text-slate-500">
              <p className="font-semibold text-slate-700">
                Segment {currentSegmentIndex + 1} of {story.segments.length}
              </p>
              <p>
                {isSegmentComplete
                  ? currentSegmentIndex === story.segments.length - 1
                    ? 'Segment complete. Press play to finish the lesson.'
                    : 'Segment complete. Press play for the next segment.'
                  : audioReady
                    ? 'Narration loaded'
                    : currentSegment.audioSrc
                      ? 'Loading narration...'
                      : 'Timed reading preview'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        src={currentSegment.audioSrc}
        onCanPlay={handleAudioCanPlay}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
        hidden
      />
    </div>
  );
}
