export interface StoryToken {
  text: string;
  startMs: number;
  endMs: number;
}

export interface StorySegment {
  id: string;
  kannada: string;
  english: string;
  tokens: StoryToken[];
  totalDurationMs: number;
  audioSrc?: string;
}

export interface VocabularyWord {
  word: string;
  meaning: string;
  pronunciation: string;
  note?: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  sourceTitle: string;
  sourceLabel: string;
  level: 'Beginner' | 'Early Reader' | 'Intermediate';
  estimatedMinutes: number;
  summary: string;
  segments: StorySegment[];
  vocabulary: VocabularyWord[];
}
