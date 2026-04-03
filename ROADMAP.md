# Project Roadmap

## Purpose

`learn-kannada-with-stories` is evolving into a curated Kannada learning app built around familiar stories, timed reading support, and lightweight vocabulary review. The immediate goal is to turn the current prototype into a repeatable lesson platform that can support a growing content library and real narration.

This roadmap is based on the current repository state and the product direction already documented in the codebase.

## Current State

The project already includes:

- a story library UI with two beginner stories
- a lesson player with timed token highlighting
- a fallback preview mode when narration audio is missing
- a vocabulary review screen at the end of each lesson
- local completion tracking in the browser
- a clean TypeScript and Vite codebase structured around curated content

The main gaps are:

- no real narration assets wired into lessons yet
- content still authored directly in TypeScript rather than a scalable content pipeline
- no testing coverage for lesson playback, progress, or content integrity
- no learner accounts, syncing, analytics, or spaced repetition features
- no clear editorial workflow for adding stories consistently

## Product Goals

### Goal 1: Deliver a polished beginner learning experience

Make the current reading flow feel dependable, understandable, and rewarding for first-time Kannada learners.

### Goal 2: Build a scalable content system

Reduce the cost of adding new stories by introducing a repeatable authoring, review, and publishing workflow.

### Goal 3: Prepare the app for richer learning features

Lay the foundation for narration quality, learner progress, revision loops, and future personalization.

## Phased Roadmap

### Phase 1: Stabilize the Core Lesson Experience

Target outcome: make the current prototype feel release-ready for a small alpha.

Workstreams:

- add basic QA coverage for story data, token timing validity, and completion flow
- improve playback controls and edge-case handling around pause, replay, and segment navigation
- add clearer lesson states for narration loading, preview mode, and lesson completion
- verify responsive behavior and readability across mobile and desktop
- add lightweight error handling for missing or malformed story content

Suggested deliverables:

- alpha-ready lesson flow
- smoke tests or type-level content validation
- documented expectations for story segment timing and vocabulary entries

### Phase 2: Introduce Real Audio and Content Standards

Target outcome: turn the prototype into a true narrated lesson experience.

Workstreams:

- attach real audio files for the existing stories
- define a naming convention for audio assets and per-segment narration
- add validation to ensure `audioSrc`, token timings, and segment durations stay aligned
- create a story authoring checklist covering Kannada text, English support text, timings, and vocabulary
- refine the player so audio-backed lessons and preview-backed lessons behave consistently

Suggested deliverables:

- two fully narrated launch stories
- editorial checklist for new lessons
- content validation utilities for story completeness

### Phase 3: Expand the Story Library

Target outcome: grow from a prototype into a small but credible beginner curriculum.

Workstreams:

- add 8 to 12 additional familiar stories across beginner and early reader levels
- organize content by level, theme, or grammar focus
- diversify vocabulary selection to cover verbs, connectors, adjectives, and everyday nouns
- add metadata for difficulty, grammar focus, and lesson tags
- create a release cadence for publishing and reviewing new stories

Suggested deliverables:

- starter library of 10 to 14 polished lessons
- visible progression path for beginners
- content inventory with status tracking for draft, review, recorded, and published

### Phase 4: Move to a Scalable Content Pipeline

Target outcome: make lesson creation easier without coupling every story to app code changes.

Workstreams:

- move story definitions from TypeScript modules into JSON or structured content manifests
- build import or validation scripts for stories and audio metadata
- separate editorial content from presentation logic
- document the end-to-end content workflow from story selection to release
- prepare for non-developer contribution to lesson authoring

Suggested deliverables:

- manifest-based content system
- content linting or validation script
- contributor documentation for lesson creation

### Phase 5: Add Learning Loops and Progress Depth

Target outcome: make the app useful for repeat practice, not just one-time reading.

Workstreams:

- track lesson history beyond simple completion
- add saved vocabulary review or revisit queues
- introduce spaced repetition or “practice again” recommendations
- add listening-only, read-along, and vocabulary-first modes
- consider learner goals such as daily practice streaks or lesson targets

Suggested deliverables:

- richer local learner progress model
- vocabulary revision loop
- repeat-engagement features for retention

## Supporting Tracks

### Content Operations

- define editorial standards for natural Kannada, beginner readability, and translation style
- create pronunciation guidelines so transliteration stays consistent
- establish a review pass for vocabulary usefulness and duplicate coverage
- decide how many new words each lesson should introduce

### Quality and Testing

- add tests for progress storage and lesson state transitions
- validate that token timings are monotonic and fit inside segment duration
- test lesson navigation for first segment, last segment, and replay flows
- add a simple pre-release checklist for new stories

### Distribution and Readiness

- define what an MVP release means: number of stories, narration coverage, and supported devices
- add basic analytics only after the core learning loop is stable
- prepare app metadata, branding, and documentation for public sharing

## Recommended Near-Term Priorities

If we want the highest leverage next steps, the order should be:

1. stabilize the current lesson player and add content validation
2. fully narrate the two existing stories
3. define the story authoring standard and checklist
4. expand the story library to a meaningful beginner set
5. move content into a more scalable manifest-based format

## Success Metrics

Early signals of progress:

- number of fully polished stories available
- percentage of stories with real narration
- lesson completion rate in internal testing
- average number of vocabulary items reviewed per lesson
- time required to add a new story from draft to published lesson

## Risks and Watchouts

- content quality may become the bottleneck before engineering does
- storing stories in code will slow down expansion if the library grows quickly
- narration and token timing can drift unless validation is built in early
- a larger library without clear level progression may feel scattered to learners
- progress tracking will feel shallow unless replay and revision loops are added

## Suggested Definition of MVP

The project can be considered MVP-ready when it has:

- at least 10 beginner-friendly lessons
- real narration for the full starter library
- reliable lesson playback on mobile and desktop
- validated story data with minimal manual QA friction
- vocabulary review and progress tracking that encourage repeat use

## Assumptions

- the product direction remains focused on curated lessons rather than live story generation
- the first audience is beginner Kannada learners
- audio-backed story lessons are a core part of the intended experience
- the current app is still pre-release and can prioritize fundamentals over growth features
