import hareAndTortoiseManifest from '../manifests/hare-and-tortoise.json';
import { loadStoryFromManifest } from '../story-loader';
import { StoryManifest } from '../../types/story';

export const hareAndTortoiseStory = loadStoryFromManifest(hareAndTortoiseManifest as StoryManifest);
