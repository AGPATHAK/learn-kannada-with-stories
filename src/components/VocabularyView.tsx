import { ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import { Story } from '../types/story';

interface VocabularyViewProps {
  story: Story;
  onRestart: () => void;
  onBackToLibrary: () => void;
}

export default function VocabularyView({ story, onRestart, onBackToLibrary }: VocabularyViewProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
      <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,#eefbf3_0%,#ffffff_100%)] p-8 text-center shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <BookOpen className="h-8 w-8" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Vocabulary Review</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Words to remember from {story.sourceTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          End each story by revisiting a few high-value words. This turns a familiar story into a repeatable reading lesson.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {story.vocabulary.map((item) => (
          <div
            key={item.word}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)]"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <span className="kannada-text text-3xl font-bold text-emerald-700">{item.word}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {item.pronunciation}
              </span>
            </div>
            <p className="text-lg font-semibold text-slate-800">{item.meaning}</p>
            {item.note && <p className="mt-3 text-sm leading-7 text-slate-500">{item.note}</p>}
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-emerald-200 hover:text-emerald-700"
        >
          <RotateCcw className="h-4 w-4" />
          Replay Story
        </button>
        <button
          type="button"
          onClick={onBackToLibrary}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Back to Library
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
