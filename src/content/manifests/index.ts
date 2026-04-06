import hareAndTortoiseManifest from './hare-and-tortoise.json';
import lionAndMouseManifest from './lion-and-mouse.json';
import { StoryManifest } from '../../types/story';
import { getManifestValidationResult, loadStoryFromManifest, ManifestValidationResult } from '../story-loader';

export const storyManifests: StoryManifest[] = [
  hareAndTortoiseManifest as StoryManifest,
  lionAndMouseManifest as StoryManifest,
];

export function validateAllStoryManifests(): ManifestValidationResult[] {
  return storyManifests.map((manifest) => getManifestValidationResult(manifest));
}

export const storiesFromManifests = storyManifests.map((manifest) => loadStoryFromManifest(manifest));
