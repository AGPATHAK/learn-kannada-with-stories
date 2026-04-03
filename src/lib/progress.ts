const COMPLETED_STORIES_KEY = 'learn-kannada-with-stories.completed';

export function getCompletedStoryIds(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const value = window.localStorage.getItem(COMPLETED_STORIES_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function markStoryCompleted(storyId: string): string[] {
  const completedIds = new Set(getCompletedStoryIds());
  completedIds.add(storyId);
  const next = Array.from(completedIds);
  window.localStorage.setItem(COMPLETED_STORIES_KEY, JSON.stringify(next));
  return next;
}
