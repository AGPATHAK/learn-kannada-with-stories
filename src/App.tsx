import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Loader2, Play, GraduationCap, Info, Plus, Trash2, Library, History } from 'lucide-react';
import { Story, generateStory } from './lib/gemini';
import { getStories, saveStory, deleteStory, clearStories } from './lib/storage';
import StoryPlayer from './components/StoryPlayer';
import VocabularyView from './components/VocabularyView';

const SEED_TOPICS = [
  'The Hare and the Tortoise',
  'The Lion and the Mouse',
  'The Thirsty Crow',
  'The Monkey and the Crocodile',
];

type AppState = 'library' | 'loading' | 'playing' | 'vocabulary';

export default function App() {
  const [state, setState] = useState<AppState>('library');
  const [library, setLibrary] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('Preparing your story...');
  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = async () => {
    const stories = await getStories();
    setLibrary(stories.sort((a, b) => b.createdAt - a.createdAt));
  };

  const addNewStory = async (topic: string) => {
    setState('loading');
    setLoadingMessage(`Creating "${topic}"...`);
    setLoadingProgress({ current: 0, total: 0 });
    
    try {
      const story = await generateStory(topic, (current, total) => {
        setLoadingProgress({ current, total });
        setLoadingMessage(`Generating audio for part ${current} of ${total}...`);
      });
      story.isCustom = true;
      await saveStory(story);
      await loadLibrary();
      setCurrentStory(story);
      setState('playing');
    } catch (error: any) {
      console.error("Failed to create story:", error);
      const isRateLimit = error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED' || (typeof error === 'string' && error.includes('429'));
      
      if (isRateLimit) {
        setLoadingMessage("Rate limit reached. Please wait a minute before trying again.");
        setTimeout(() => setState('library'), 3000);
      } else {
        setState('library');
      }
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // confirm() often fails in iframes, so we'll delete directly for now 
    // or we could implement a custom modal later.
    await deleteStory(id);
    await loadLibrary();
  };

  const handleClearAll = async () => {
    if (library.length === 0) return;
    await clearStories();
    await loadLibrary();
  };

  const selectStory = (story: Story) => {
    setCurrentStory(story);
    setState('playing');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setState('library')}>
          <div className="bg-brand-600 p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-slate-800">Kannada Kali</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Learn Kannada with Stories</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {library.length > 0 && (
            <button 
              onClick={() => setState('library')}
              className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors"
            >
              <Library className="w-4 h-4" />
              Library
            </button>
          )}
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {state === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto w-full p-6 py-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="flex flex-col gap-2">
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Your Story Library</h2>
                  <div className="flex items-center gap-4">
                    <p className="text-slate-500">Choose a story to start learning or add a new one.</p>
                    {library.length > 0 && (
                      <button 
                        onClick={handleClearAll}
                        className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex gap-2 w-full md:w-auto">
                  <input 
                    type="text" 
                    placeholder="Topic for new story..."
                    className="flex-1 md:w-64 px-4 py-2 bg-slate-50 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addNewStory((e.target as HTMLInputElement).value);
                    }}
                  />
                  <button 
                    onClick={(e) => {
                      const input = (e.currentTarget.previousSibling as HTMLInputElement);
                      if (input.value) addNewStory(input.value);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {library.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Your library is empty</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Start by adding one of these classic stories or create your own custom story above.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {SEED_TOPICS.map((topic) => (
                      <button 
                        key={topic}
                        onClick={() => addNewStory(topic)}
                        className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 transition-all group"
                      >
                        <span className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4 text-brand-400 group-hover:text-brand-600" />
                          {topic}
                        </span>
                        <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {library.map((story) => (
                    <motion.div
                      key={story.id}
                      whileHover={{ y: -4 }}
                      onClick={() => selectStory(story)}
                      className="group relative bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-brand-200 hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-brand-50 rounded-2xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <button 
                          onClick={(e) => handleDelete(e, story.id)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-bold text-xl text-slate-800 mb-2 leading-tight">{story.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <History className="w-3 h-3" />
                          {new Date(story.createdAt).toLocaleDateString()}
                        </span>
                        <span>{story.segments.length} segments</span>
                      </div>
                      
                      <div className="mt-6 flex items-center gap-2 text-brand-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 fill-current" />
                        Start Learning
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {state === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="relative">
                <div className="w-24 h-24 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-brand-600" />
                </div>
              </div>
              <h3 className="mt-8 text-2xl font-bold text-slate-800 max-w-md">{loadingMessage}</h3>
              {loadingProgress.total > 0 && (
                <div className="mt-6 w-full max-w-xs bg-slate-200 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-brand-600 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(loadingProgress.current / loadingProgress.total) * 100}%` }}
                  />
                </div>
              )}
              <p className="mt-4 text-slate-400">This ensures smooth playback without any delays later.</p>
            </motion.div>
          )}

          {state === 'playing' && currentStory && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 p-4 md:p-8"
            >
              <StoryPlayer 
                story={currentStory} 
                onComplete={() => setState('vocabulary')} 
              />
            </motion.div>
          )}

          {state === 'vocabulary' && currentStory && (
            <motion.div
              key="vocabulary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1"
            >
              <VocabularyView 
                vocabulary={currentStory.vocabulary} 
                onFinish={() => setState('library')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 text-center text-slate-400 text-xs border-t border-slate-100 bg-white">
        <p>© 2026 Kannada Kali • Offline-ready Story Learning</p>
      </footer>
    </div>
  );
}
