# Learn Kannada With Stories

`learn-kannada-with-stories` is a curated reading and comprehension app for Kannada learners. Instead of generating stories live, it presents familiar stories as polished mini-lessons with:

- a story library built from well-known tales
- narrated Kannada playback with timed highlighting
- segment-by-segment pacing for deliberate beginner study
- inline word support during playback
- English support text for comprehension
- a vocabulary review after each lesson
- a comprehension check at the end of each lesson

The current repo is now strong enough for a small 2-story alpha: you can open the app, work through both current lessons end to end, and test narration, glossary support, vocabulary review, and comprehension in one flow.

The long-term direction is to make stories part of a broader Kannada learning loop: read, understand, review vocabulary, and revisit words later through spaced practice.

## Product Direction

This repo is structured for pre-authored content rather than live AI story generation. Lessons are now authored through external JSON manifests plus audio assets and lesson metadata.

Narration is planned as attached audio per segment, with AI-generated Kannada narration as the practical default baseline and human narration as an optional quality upgrade later.

The intended workflow is:

1. Curate a story
2. Author a lesson manifest with Kannada lines, English support text, glossary data, and comprehension questions
3. Add word timings and beginner pronunciation support
4. Attach narration audio per segment
5. Review vocabulary and comprehension at the end

See [ROADMAP.md](/Users/ardhendupathak/Documents/GitHub/learn-kannada-with-stories/ROADMAP.md) for the phased project plan.

## Run Locally

Prerequisite: Node.js

1. Load your Node environment if you use `nvm`: `source ~/.nvm/nvm.sh`
2. Install dependencies with `npm install`
3. Start the dev server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Current Lesson Flow

The current guided lesson flow is:

1. Choose a story from the library
2. Listen to one narrated segment at a time
3. Follow timed Kannada highlighting
4. See inline meaning support for highlighted glossary words
5. Pause and tap words for more detail when needed
6. Continue to vocabulary review
7. Finish with comprehension questions

## Current Content Model

Each manifest-backed lesson contains:

- story metadata
- content type, source type, and lesson mode metadata
- segments
- timed tokens per segment
- optional `audioSrc` for real narration files
- inline glossary entries
- vocabulary items with meaning and pronunciation
- comprehension questions

If audio is not attached yet, the player falls back to a built-in timed reading preview so the UI can still be tested.

## Narration Generation

This repo currently includes generated Kannada narration for the two starter stories using the local macOS Kannada voice `Soumya`.

To regenerate the current lesson audio:

```bash
source ~/.nvm/nvm.sh
node scripts/generate-story-audio.mjs
```

Generated files are written under [public/audio](/Users/ardhendupathak/Documents/GitHub/learn-kannada-with-stories/public/audio).

## What Is Next

The current implementation is now a testable alpha rather than just a prototype. Likely next areas of work include:

- polishing narration pacing and playback feel
- improving glossary coverage and lesson ergonomics based on testing
- expanding to additional curated content types such as poems
- vocabulary export into a broader review system
