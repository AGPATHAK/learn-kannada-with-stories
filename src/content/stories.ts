import { Story, StorySegment, StoryToken } from '../types/story';

function buildTokens(parts: string[], baseDurationMs = 520): StoryToken[] {
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

function buildSegment(id: string, kannada: string, english: string, baseDurationMs?: number): StorySegment {
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

export const stories: Story[] = [
  {
    id: 'hare-and-tortoise',
    slug: 'hare-and-tortoise',
    title: 'ಮೊಲ ಮತ್ತು ಆಮೆ',
    sourceTitle: 'The Hare and the Tortoise',
    sourceLabel: 'Aesop • Familiar Story',
    level: 'Beginner',
    estimatedMinutes: 3,
    summary: 'A familiar race story that lets learners follow simple action words, animal names, and pace-related vocabulary.',
    segments: [
      buildSegment('hare-1', 'ಒಂದು ದಿನ ಮೊಲ ಆಮೆಯನ್ನು ನೋಡಿ ನಕ್ಕಿತು.', 'One day the hare laughed at the tortoise.', 500),
      buildSegment('hare-2', 'ನಾನು ತುಂಬ ಬೇಗ ಓಡುತ್ತೇನೆ ಎಂದು ಮೊಲ ಹೆಮ್ಮೆಪಟ್ಟಿತು.', 'The hare boasted that it could run very fast.', 500),
      buildSegment('hare-3', 'ಆಮೆ ಶಾಂತವಾಗಿ ನಾವು ಓಟ ಮಾಡೋಣ ಎಂದು ಹೇಳಿತು.', 'The tortoise calmly said they should have a race.', 520),
      buildSegment('hare-4', 'ಓಟ ಶುರುವಾದ ಕೂಡಲೇ ಮೊಲ ತುಂಬಾ ವೇಗವಾಗಿ ಓಡಿತು.', 'As soon as the race began, the hare ran very quickly.', 500),
      buildSegment('hare-5', 'ಆದರೆ ಆಮೆ ನಿಧಾನವಾಗಿ ನಿಲ್ಲದೆ ಮುಂದೆ ಸಾಗಿತು.', 'But the tortoise kept moving forward slowly without stopping.', 520),
      buildSegment('hare-6', 'ಮೊಲ ಮರದ ಕೆಳಗೆ ಸ್ವಲ್ಪ ನಿದ್ದೆ ಮಾಡಿತು.', 'The hare took a nap under a tree.', 540),
      buildSegment('hare-7', 'ಆಮೆ ಕೊನೆಯಲ್ಲಿ ಗುರಿಯನ್ನು ಮೊದಲು ತಲುಪಿತು.', 'In the end, the tortoise reached the finish line first.', 520),
      buildSegment('hare-8', 'ನಿಧಾನವಾದರೂ ನಿರಂತರ ಪ್ರಯತ್ನ ಗೆಲ್ಲುತ್ತದೆ.', 'Steady effort wins even when it is slow.', 540),
    ],
    vocabulary: [
      { word: 'ಹೆಮ್ಮೆಪಟ್ಟಿತು', meaning: 'boasted', pronunciation: 'hemme-pattitu', note: 'Used when someone speaks proudly about themselves.' },
      { word: 'ಶಾಂತವಾಗಿ', meaning: 'calmly', pronunciation: 'shaantavaagi', note: 'A useful adverb for soft and steady actions.' },
      { word: 'ವೇಗವಾಗಿ', meaning: 'quickly', pronunciation: 'vegavaagi', note: 'Often used with running, speaking, or moving.' },
      { word: 'ನಿಲ್ಲದೆ', meaning: 'without stopping', pronunciation: 'nillade', note: 'A common connector for continuous action.' },
      { word: 'ನಿರಂತರ', meaning: 'steady / continuous', pronunciation: 'nirantara', note: 'Helpful for describing consistency and repetition.' },
    ],
  },
  {
    id: 'lion-and-mouse',
    slug: 'lion-and-mouse',
    title: 'ಸಿಂಹ ಮತ್ತು ಇಲಿ',
    sourceTitle: 'The Lion and the Mouse',
    sourceLabel: 'Aesop • Familiar Story',
    level: 'Beginner',
    estimatedMinutes: 3,
    summary: 'A short story built around kindness, apology, and unexpected help, with simple verbs and concrete imagery.',
    segments: [
      buildSegment('lion-1', 'ಒಂದು ದೊಡ್ಡ ಸಿಂಹ ಕಾಡಿನಲ್ಲಿ ಮಲಗಿತ್ತು.', 'A big lion was sleeping in the forest.', 520),
      buildSegment('lion-2', 'ಚಿಕ್ಕ ಇಲಿ ಅದರ ಮೇಲಿಂದ ಓಡಿತು.', 'A small mouse ran across it.', 520),
      buildSegment('lion-3', 'ಸಿಂಹ ಎಚ್ಚರವಾಗಿ ಇಲಿಯನ್ನು ಹಿಡಿತು.', 'The lion woke up and caught the mouse.', 520),
      buildSegment('lion-4', 'ದಯವಿಟ್ಟು ನನ್ನನ್ನು ಬಿಡಿ ಎಂದು ಇಲಿ ಬೇಡಿಕೊಂಡಿತು.', 'The mouse begged, “Please let me go.”', 520),
      buildSegment('lion-5', 'ಒಂದು ದಿನ ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಹುದು ಎಂದು ಅದು ಹೇಳಿತು.', 'It said that one day it might help the lion.', 520),
      buildSegment('lion-6', 'ನಂತರ ಸಿಂಹ ಬಲೆಗೆ ಸಿಕ್ಕಿತು ಮತ್ತು ಗರ್ಜಿಸಿತು.', 'Later the lion was trapped in a net and roared.', 540),
      buildSegment('lion-7', 'ಇಲಿ ಬಂದು ಕಗ್ಗಂಟನ್ನು ಕಚ್ಚಿ ಸಿಂಹವನ್ನು ಬಿಡಿಸಿತು.', 'The mouse came, gnawed the ropes, and freed the lion.', 540),
      buildSegment('lion-8', 'ಚಿಕ್ಕವನಾದರೂ ಒಳ್ಳೆಯ ಸ್ನೇಹಿತ ಸಹಾಯ ಮಾಡಬಹುದು.', 'Even someone small can be a good friend and help.', 540),
    ],
    vocabulary: [
      { word: 'ಎಚ್ಚರವಾಗಿ', meaning: 'woke up / became alert', pronunciation: 'eccharavaagi', note: 'Useful for transition from sleep to attention.' },
      { word: 'ಬೇಡಿಕೊಂಡಿತು', meaning: 'begged', pronunciation: 'bedikonditu', note: 'Common in polite or desperate requests.' },
      { word: 'ಬಲೆ', meaning: 'net / trap', pronunciation: 'bale', note: 'A concrete noun that appears in many folk stories.' },
      { word: 'ಕಗ್ಗಂಟು', meaning: 'rope knot / binding', pronunciation: 'kaggantu', note: 'Helpful for stories involving tying or trapping.' },
      { word: 'ಬಿಡಿಸಿತು', meaning: 'set free', pronunciation: 'bidisitu', note: 'A high-value verb for rescue situations.' },
    ],
  },
];
