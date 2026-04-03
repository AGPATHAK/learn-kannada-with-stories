# Project Roadmap

## Purpose

`learn-kannada-with-stories` is a curated Kannada reading app for beginners. The product direction is not live story generation. The product direction is a small, carefully-authored lesson library built around familiar stories, guided reading support, comprehension checks, and vocabulary that can later feed a broader Kannada learning system.

This roadmap is based on the current repository state and adjusted to reflect the most important execution risks: narration sourcing, content schema timing, beginner pronunciation scaffolding, and integration with the broader learning loop.

## Current State

The project already includes:

- a story library UI with two beginner stories
- a lesson player with timed token highlighting
- a fallback preview mode when narration audio is missing
- an end-of-story vocabulary review screen
- local completion tracking in the browser
- a clean TypeScript and Vite codebase for curated lesson content

The main gaps are:

- no explicit narration strategy
- story content still authored directly in TypeScript
- no Devanagari pronunciation scaffold in the lesson data model
- no comprehension questions in the lesson flow
- no inline word help while reading
- no bridge from story vocabulary into the existing spaced-repetition ecosystem
- no testing coverage for lesson playback, progress, or content integrity

## Product Goals

### Goal 1: Deliver a strong beginner reading experience

Make each lesson readable, understandable, and useful for a learner who cannot yet read Kannada confidently without support.

### Goal 2: Build a content system that scales

Reduce the cost of adding and reviewing stories by moving early to a schema-driven lesson format.

### Goal 3: Connect stories to long-term retention

Use story reading as an input into comprehension practice, vocabulary review, and spaced repetition.

## Guiding Decisions

### Narration strategy

The default near-term narration path should be AI-generated Kannada speech, with human narration as an optional quality upgrade later.

Reasoning:

- it is the fastest way to make the existing stories fully narrated
- it removes a major content production bottleneck for a solo developer
- it keeps the roadmap from stalling on recording logistics

This decision should be revisited only if high-quality human narration becomes easy to source. Until then, the roadmap assumes TTS-first narration, with alignment checks for segment audio and token timing.

### Pronunciation scaffold

Devanagari pronunciation support should be treated as a first-class beginner aid, consistent with the rest of the Kannada learning ecosystem. It should live in the lesson content model, not as an afterthought in UI copy.

### Comprehension is a core feature

This app is not just a read-along player. Every lesson should eventually include lightweight comprehension checks so “reading and comprehension” is reflected in the actual lesson loop.

## Phased Roadmap

### Phase 1: Stabilize the Core Lesson Experience and Lock the Content Schema

Target outcome: make the current prototype dependable while preventing future content expansion from getting trapped in code-authored lessons.

Workstreams:

- improve playback controls and edge-case handling around pause, replay, and segment navigation
- add clearer lesson states for narration loading, preview mode, and lesson completion
- verify responsive behavior and readability across mobile and desktop
- add lightweight error handling for missing or malformed story content
- define a minimal external story schema before adding many more lessons
- include fields for Kannada text, English support text, token timing, optional audio, Devanagari pronunciation scaffold, vocabulary items, and comprehension questions
- add validation for token timing monotonicity, segment duration consistency, and required lesson fields

Suggested deliverables:

- alpha-ready lesson flow
- minimal JSON or manifest-based lesson schema
- validation utilities for story data integrity
- documented requirements for lesson fields and timing expectations

### Phase 2: Add Narrated Lessons, Devanagari Support, Inline Glossing, and Comprehension

Target outcome: turn the prototype into a real beginner lesson experience rather than a timing demo.

Workstreams:

- implement the chosen narration pipeline using Kannada TTS as the default baseline
- define an audio generation and storage convention for per-segment narration
- ensure `audioSrc`, token timings, and segment durations stay aligned through validation
- add Devanagari pronunciation support to vocabulary items and, where helpful, story tokens or segments
- add tap-to-gloss or equivalent inline word help during reading
- add 2 to 3 comprehension questions per story after the reading flow
- create a story authoring checklist covering Kannada quality, English support text, pronunciation scaffold, narration, vocabulary, and comprehension

Suggested deliverables:

- two fully narrated launch stories
- inline glossary support during reading
- comprehension review at the end of each lesson
- editorial checklist for lesson creation and QA

### Phase 3: Expand the Library with a Defined Corpus Strategy

Target outcome: grow into a small but coherent beginner curriculum instead of an arbitrary set of stories.

Workstreams:

- define what “familiar stories” means for this product
- document a corpus rationale based on vocabulary frequency, grammar usefulness, sentence length, and learner accessibility
- prioritize sources such as Panchatantra, Aesop, and other widely-recognized stories with simple narrative structure
- add 8 to 12 additional lessons across beginner and early reader levels using the external schema
- organize lessons by level, theme, or grammar focus
- diversify vocabulary coverage across verbs, connectors, adjectives, and everyday nouns

Suggested deliverables:

- starter library of 10 to 14 polished lessons
- written corpus selection criteria
- visible progression path for beginners
- content inventory with draft, review, narrated, and published states

### Phase 4: Strengthen the Content Pipeline and Cross-App Vocabulary Flow

Target outcome: make lesson creation sustainable and make story vocabulary reusable outside this app.

Workstreams:

- build import and validation scripts for lesson manifests and audio metadata
- separate editorial content from presentation logic completely
- document the end-to-end workflow from story selection to publication
- prepare for non-developer lesson contribution
- design a vocabulary export format compatible with the existing word trainer or Leitner-style review system
- support exporting newly introduced story words into a shared review deck format

Suggested deliverables:

- contributor-friendly manifest pipeline
- content linting or validation script
- documented vocabulary export format
- workflow documentation for lesson publishing

### Phase 5: Add Richer Retention Loops and Learning Analytics

Target outcome: make the app useful for repeated learning, not just one-time lesson completion.

Workstreams:

- track lesson history beyond simple completion
- track vocabulary exposure across stories
- add saved review queues or “practice again” recommendations
- introduce spaced repetition or revisit scheduling for story-derived vocabulary
- add listening-only, read-along, and vocabulary-first practice modes
- log simple learning signals locally, such as comprehension accuracy and delayed recall performance

Suggested deliverables:

- richer learner progress model
- story-to-review retention loop
- basic learning analytics stored locally
- repeat-engagement features for vocabulary retention

## Supporting Tracks

### Content Operations

- define editorial standards for natural Kannada, beginner readability, and translation style
- define how Devanagari support should be written and when it appears
- document pronunciation consistency rules across lessons
- decide how many new words each lesson should introduce
- establish a review pass for vocabulary usefulness, duplicate coverage, and comprehension difficulty
- maintain a simple corpus rationale so story selection stays intentional

### Quality and Testing

- add tests for progress storage and lesson state transitions
- validate that token timings are monotonic and fit inside segment duration
- test lesson navigation for first segment, last segment, replay, and narration-backed flows
- add a pre-release checklist for new lessons
- validate glossary, pronunciation, and comprehension fields in lesson manifests

### Distribution and Readiness

- define what MVP means in terms of story count, narration coverage, and supported devices
- keep analytics lightweight until the lesson loop is stable
- align public-facing metadata and descriptions with the curated-content product direction

## Recommended Near-Term Priorities

If we want the highest-leverage next steps, the order should be:

1. define the minimal external lesson schema and validation rules
2. stabilize the current lesson player around that schema
3. commit to a narration strategy, with Kannada TTS as the default baseline
4. add Devanagari support, inline glossing, and comprehension to the lesson model
5. fully narrate the two existing stories
6. expand the story library using the schema rather than adding more TypeScript-authored lessons

## Success Metrics

Output and product readiness metrics:

- number of fully polished lessons available
- percentage of lessons with narration
- time required to add a new lesson from draft to published
- completion rate in internal testing

Learning effectiveness metrics:

- vocabulary items seen across multiple stories
- comprehension question accuracy by lesson
- vocabulary recall after 48 hours for reviewed words
- repeat usage of finished lessons and review queues

## Risks and Watchouts

- narration quality and narration workflow can become the largest bottleneck if not decided early
- storing stories in code will slow down content growth and make review harder
- token timing, glossary entries, and pronunciation scaffolds can drift unless validation is built in early
- a larger library without clear corpus criteria may feel random instead of curricular
- a read-along experience without comprehension checks will undershoot the product’s stated goal
- story vocabulary may become siloed unless it is designed to flow into the broader review system

## Suggested Definition of MVP

The project can be considered MVP-ready when it has:

- at least 10 beginner-friendly lessons built from a defined corpus strategy
- narration for the full starter library
- reliable lesson playback on mobile and desktop
- Devanagari support for beginner pronunciation help
- inline word help during reading
- short comprehension checks in each lesson
- validated lesson data with low manual QA friction
- a basic path from story vocabulary into repeat review

## Assumptions

- the product remains focused on curated lessons rather than live AI story generation
- the first audience is beginner Kannada learners
- narration is a core part of the intended experience
- AI TTS is an acceptable near-term narration baseline
- this project is part of a broader Kannada learning ecosystem rather than a completely isolated app
