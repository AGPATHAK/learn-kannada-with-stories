import { Story } from '../../types/story';
import { buildSegment } from '../story-helpers';

export const lionAndMouseStory: Story = {
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
};
