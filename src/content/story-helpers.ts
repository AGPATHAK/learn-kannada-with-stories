import { StorySegment, StoryToken } from '../types/story';

export function buildTokens(parts: string[], baseDurationMs = 520): StoryToken[] {
  let cursor = 0;

  return parts.map((text, index) => {
    const duration = Math.max(420, baseDurationMs + (text.length > 5 ? 120 : 0) + (index % 2 === 0 ? 40 : -20));
    const token = {
      text,
      startMs: cursor,
      endMs: cursor + duration,
    };
    cursor += duration;
    return token;
  });
}

export function buildSegment(id: string, kannada: string, english: string, baseDurationMs?: number): StorySegment {
  const parts = kannada.trim().split(/\s+/);
  const tokens = buildTokens(parts, baseDurationMs);
  const totalDurationMs = tokens[tokens.length - 1]?.endMs ?? 0;

  return {
    id,
    kannada,
    english,
    tokens,
    totalDurationMs,
  };
}
