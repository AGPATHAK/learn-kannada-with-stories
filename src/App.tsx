import { useEffect, useState } from 'react';
import { GraduationCap, Info, Library } from 'lucide-react';
import LibraryView from './components/LibraryView';
import StoryPlayer from './components/StoryPlayer';
import VocabularyView from './components/VocabularyView';
import { stories } from './content/stories';
import { getCompletedStoryIds, markStoryCompleted } from './lib/progress';
import { Story } from './types/story';

type AppState = 'library' | 'story' | 'vocabulary';

export default function App() {
  const [state, setState] = useState<AppState>('library');
  const [selectedStory, setSelectedStory] = useState<Story>(stories[0]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setCompletedIds(getCompletedStoryIds());
  }, []);

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setState('story');
  };

  const handleCompleteStory = () => {
    setCompletedIds(markStoryCompleted(selectedStory.id));
    setState('vocabulary');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f8fafc_45%,#edf4f0_100%)] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            type="button"
            onClick={() => setState('library')}
            className="flex items-center gap-4 text-left"
          >
            <div className="rounded-[1.35rem] bg-emerald-600 p-4 text-white shadow-[0_24px_60px_-32px_rgba(22,163,74,0.75)]">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Kannada Kali</h1>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 sm:text-sm">Learn Kannada with Stories</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setState('library')}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <Library className="h-4 w-4" />
              Library
            </button>
            <button
              type="button"
              onClick={() => setShowInfo((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="How to use the app"
            >
              <Info className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {showInfo && (
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4 text-sm leading-7 text-slate-600">
            Pick a familiar story, press play, follow the highlighted Kannada words as the narration moves, and finish with a short vocabulary review.
            This version is built for curated story content, so each lesson can be carefully edited and timed instead of generated live.
          </div>
        </div>
      )}

      <main className="flex min-h-[calc(100vh-96px)] flex-col">
        {state === 'library' && (
          <LibraryView
            stories={stories}
            completedIds={completedIds}
            onSelectStory={handleSelectStory}
          />
        )}

        {state === 'story' && (
          <StoryPlayer
            story={selectedStory}
            onExit={() => setState('library')}
            onComplete={handleCompleteStory}
          />
        )}

        {state === 'vocabulary' && (
          <VocabularyView
            story={selectedStory}
            onRestart={() => setState('story')}
            onBackToLibrary={() => setState('library')}
          />
        )}
      </main>
    </div>
  );
}
