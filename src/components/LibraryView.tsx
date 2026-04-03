import { BookOpen, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Story } from '../types/story';

interface LibraryViewProps {
  stories: Story[];
  completedIds: string[];
  onSelectStory: (story: Story) => void;
}

export default function LibraryView({ stories, completedIds, onSelectStory }: LibraryViewProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,#eefbf3_0%,#f7fafc_55%,#ffffff_100%)] p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Sparkles className="h-4 w-4" />
            Curated Kannada story lessons
          </div>
          <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Start with stories you already know, then grow your Kannada vocabulary naturally.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Each lesson pairs a familiar story with guided narration, word-by-word highlighting, and a short vocabulary review at the end.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {stories.map((story) => {
          const isCompleted = completedIds.includes(story.id);

          return (
            <button
              key={story.id}
              type="button"
              onClick={() => onSelectStory(story)}
              className="group rounded-[2rem] border border-slate-200 bg-white p-7 text-left shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)] transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_24px_80px_-48px_rgba(15,23,42,0.55)]"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">{story.sourceLabel}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{story.title}</h3>
                    <p className="text-sm font-medium text-slate-500">{story.sourceTitle}</p>
                  </div>
                </div>
                {isCompleted && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Completed
                  </span>
                )}
              </div>

              <p className="mb-6 text-sm leading-7 text-slate-600">{story.summary}</p>

              <div className="mb-6 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1.5">{story.level}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5">{story.segments.length} segments</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5">{story.estimatedMinutes} min lesson</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5">{story.vocabulary.length} focus words</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="text-sm font-bold text-emerald-700">{isCompleted ? 'Read Again' : 'Start Lesson'}</span>
                <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
