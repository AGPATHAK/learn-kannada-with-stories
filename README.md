# Learn Kannada With Stories

`learn-kannada-with-stories` is a curated reading app for Kannada learners. Instead of generating stories live, it presents familiar stories as polished mini-lessons with:

- a story library built from well-known tales
- timed Kannada text highlighting during playback
- English support text for comprehension
- a short vocabulary review after each lesson

## Product Direction

This repo is now structured for pre-authored content rather than live AI generation. Story content lives in code and can later be moved into JSON manifests plus audio assets.

The intended workflow is:

1. Curate a story
2. Author Kannada lines and English support text
3. Add word timings
4. Attach narration audio when ready
5. Review vocabulary at the end

## Run Locally

Prerequisite: Node.js

1. Install dependencies with `npm install`
2. Start the dev server with `npm run dev`

## Current Content Model

Each story contains:

- story metadata
- segments
- timed tokens per segment
- optional `audioSrc` for real narration files
- vocabulary items with meaning and pronunciation

If audio is not attached yet, the player falls back to a built-in timed reading preview so the UI can still be tested.
