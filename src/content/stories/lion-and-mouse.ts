import lionAndMouseManifest from '../manifests/lion-and-mouse.json';
import { loadStoryFromManifest } from '../story-loader';
import { StoryManifest } from '../../types/story';

export const lionAndMouseStory = loadStoryFromManifest(lionAndMouseManifest as StoryManifest);
