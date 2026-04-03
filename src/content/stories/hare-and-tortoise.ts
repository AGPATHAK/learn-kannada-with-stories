import { Story } from '../../types/story';
import { buildSegment } from '../story-helpers';

export const hareAndTortoiseStory: Story = {
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
};
