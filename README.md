# Learn Kannada With Stories

`learn-kannada-with-stories` is a curated reading and comprehension app for Kannada learners. Instead of generating stories live, it presents familiar stories as polished mini-lessons with:

- a story library built from well-known tales
- timed Kannada text highlighting during playback
- English support text for comprehension
- a short vocabulary review after each lesson

The long-term direction is to make stories part of a broader Kannada learning loop: read, understand, review vocabulary, and revisit words later through spaced practice.

## Product Direction

This repo is structured for pre-authored content rather than live AI story generation. Story content currently lives in code, but the intended direction is to move lessons into external manifests plus audio assets and lesson metadata.

Narration is planned as attached audio per segment, with AI-generated Kannada narration as the practical default baseline and human narration as an optional quality upgrade later.

The intended workflow is:

1. Curate a story
2. Author Kannada lines, English support text, and beginner pronunciation support
3. Add word timings and inline glossary data
4. Attach narration audio per segment
5. Review vocabulary and comprehension at the end

See [ROADMAP.md](/Users/ardhendupathak/Documents/GitHub/learn-kannada-with-stories/ROADMAP.md) for the phased project plan.

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

The current implementation is still an early prototype. Planned additions to the lesson model include:

- external JSON or manifest-based lesson files
- Devanagari pronunciation support for beginner learners
- inline word glosses during reading
- short comprehension questions after each story
- vocabulary export into a broader review system
