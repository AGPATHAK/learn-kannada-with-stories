# Project Roadmap

## Purpose

`learn-kannada-with-stories` is a curated Kannada reading app for beginners. The product direction is not live story generation. The product direction is a small, carefully-authored lesson library built around familiar stories, guided reading support, comprehension checks, and vocabulary that can later feed a broader Kannada learning system.

This roadmap is based on the current repository state and adjusted to reflect the most important execution risks: narration sourcing, content schema timing, beginner pronunciation scaffolding, and integration with the broader learning loop.

## Core Principles

- pedagogy is the product; agentic behavior is the control layer around it
- prefer curated, inspectable lesson structures over opaque generation
- establish a deterministic baseline before introducing LLM judgment
- instrument the reading loop before optimizing it
- evaluate interventions before trusting them in the live learner experience
- prefer replayable, reviewable systems over clever but hard-to-debug automation
- support multiple curated content types before adding dynamic agentic sources

## Current State

The project already includes:

- a story library UI with two beginner stories
- a lesson player with narrated segment-by-segment playback and timed token highlighting
- inline glossary support during playback
- an end-of-story vocabulary review screen
- a comprehension screen after each lesson
- local completion tracking in the browser
- manifest-backed lesson content with shared validation
- generated local narration for the two starter stories
- a clean TypeScript and Vite codebase for curated lesson content

The main gaps are:

- narration quality and pacing still need user testing and polish
- glossary coverage is improved but still selective rather than exhaustive
- no bridge from story vocabulary into the existing spaced-repetition ecosystem
- no testing coverage for lesson playback, progress, or content integrity

## Product Goals

### Goal 1: Deliver a strong beginner reading experience

Make each lesson readable, understandable, and useful for a learner who cannot yet read Kannada confidently without support.

### Goal 2: Build a content system that scales

Reduce the cost of adding and reviewing stories by moving early to a schema-driven lesson format.

### Goal 3: Connect stories to long-term retention

Use story reading as an input into comprehension practice, vocabulary review, and spaced repetition.

### Goal 4: Prepare for agentic, real-world Kannada input

Extend the app beyond static stories over time so it can surface fresh, high-value reading material such as simplified news headlines and short current-affairs summaries.

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

### Curated-first, agentic-later

The first job of the product is to make the curated lesson loop strong. Agentic features should be added later, once the schema, glossary behavior, comprehension flow, and retention loop are stable.

When agentic features do arrive, they should complement the curated library rather than replace it. The most promising early use case is fetching recent news headlines or short source texts, simplifying them into learner-friendly Kannada, attaching vocabulary support, and turning them into optional practice material.

This sequencing should be treated as deliberate product policy: curated multiple content types first, dynamic agentic sources later.

### Agent as control system, not content identity

The agentic layer should decide what to fetch, how to simplify it, how to adapt it to the learner, and when to surface it. It should not erase the distinction between trusted curated lessons and dynamic practice material.

## Phased Roadmap

### Phase 1: Stabilize the Core Lesson Experience and Lock the Content Schema

Target outcome: make the current prototype dependable while preventing future content expansion from getting trapped in code-authored lessons.

Workstreams:

- improve playback controls and edge-case handling around pause, replay, and segment navigation
- add clearer lesson states for narration loading, preview mode, and lesson completion
- verify responsive behavior and readability across mobile and desktop
- add lightweight error handling for missing or malformed story content
- define a minimal external story schema before adding many more lessons
- include fields for `contentType`, Kannada text, English support text, token timing, optional audio, Devanagari pronunciation scaffold, vocabulary items, and comprehension questions
- define planned `contentType` values such as `story`, `poem`, `headline`, `news-brief`, and `dialogue`
- separate source type from lesson mode in the schema documentation
- distinguish between source metadata such as `curated`, `agentic`, `news`, or `literary` and lesson mode metadata such as `read-along`, `listening`, `gloss-first`, or `comprehension`
- add validation for token timing monotonicity, segment duration consistency, and required lesson fields

Suggested deliverables:

- alpha-ready lesson flow
- minimal JSON or manifest-based lesson schema
- validation utilities for story data integrity
- documented requirements for lesson fields and timing expectations

Exit criteria:

- the external schema is defined, `contentType` is first-class, and source-versus-mode semantics are documented clearly enough to author new lesson types without changing the model

Status note:

- effectively complete for the current two-story alpha

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

Exit criteria:

- at least two narrated lessons run end-to-end with glossary support and comprehension using the shared schema

Status note:

- substantially reached for the current two-story alpha, with further polish now driven by hands-on testing rather than missing core features

### Phase 3: Expand the Library with a Defined Corpus Strategy

Target outcome: grow into a small but coherent beginner curriculum instead of an arbitrary set of stories.

Workstreams:

- define what “familiar stories” means for this product
- document a corpus rationale based on vocabulary frequency, grammar usefulness, sentence length, and learner accessibility
- prioritize sources such as Panchatantra, Aesop, and other widely-recognized stories with simple narrative structure
- add short poems as an explicit curated content type, with separate authoring guidance for line structure, pacing, repetition, and recitation
- note where poem playback differs from story playback, especially around segmenting, highlighting cadence, and comprehension expectations
- add 8 to 12 additional lessons across beginner and early reader levels using the external schema
- organize lessons by level, theme, or grammar focus
- diversify vocabulary coverage across verbs, connectors, adjectives, and everyday nouns

Suggested deliverables:

- starter library of 10 to 14 polished lessons
- at least one poem-ready lesson pattern
- written corpus selection criteria
- visible progression path for beginners
- content inventory with draft, review, narrated, and published states

Exit criteria:

- the library includes multiple curated content types, including stories and at least one poem pattern, all authored through the same schema

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

Exit criteria:

- new curated lessons can be authored, validated, and exported into the broader review system without editing application code

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

Exit criteria:

- the app can measure repeat use and feed lesson vocabulary into a working review loop with learner-visible retention signals

### Phase 6A: Build a Deterministic Agentic Content Baseline

Target outcome: add real-world reading content in a bounded, inspectable way before introducing open-ended model judgment.

Workstreams:

- define a source model for dynamic reading content such as headlines, short summaries, and public-interest blurbs
- build a deterministic ingestion path for source items and cache them locally
- define a structured transformation contract from source item to learner-facing reading item
- support manually curated or rule-based simplification as the first baseline
- map dynamic items into the existing lesson schema with vocabulary, pronunciation support, and comprehension fields
- log every generated or transformed reading item so it can be reviewed later

Suggested deliverables:

- bounded daily reading feed with inspectable transformation history
- deterministic or manual-first simplification baseline
- cached dynamic items represented in the lesson schema

Exit criteria:

- dynamic source items can be ingested, simplified through a deterministic baseline, and stored as inspectable learner-facing items without requiring LLM output

### Phase 6B: Add a Reflective LLM Layer for Simplification and Explanation

Target outcome: introduce LLM assistance as a bounded reflective layer that helps with simplification, explanation, and vocabulary support without becoming an opaque controller.

Workstreams:

- add LLM-assisted simplification for source items after the deterministic baseline exists
- use the model to propose learner-friendly Kannada rewrites, explanation notes, and vocabulary support
- keep outputs structured and compatible with the lesson schema
- preserve source attribution and source links so dynamic content remains traceable
- keep a reviewable record of source text, simplified text, extracted vocabulary, and comprehension prompts
- allow manual acceptance, rejection, or editing of generated items while quality is still being established

Suggested deliverables:

- reflective simplification layer with inspectable prompts and outputs
- agent-generated practice lessons mapped into the existing schema
- source-aware metadata and quality-review rules

Exit criteria:

- LLM-assisted simplification is bounded, reviewable, and measurably compared against the deterministic baseline before wider use

### Phase 6C: Add Adaptive Agentic Reading Recommendations

Target outcome: close the loop so the system can select dynamic reading practice based on learner state rather than just publishing a generic feed.

Workstreams:

- explore adaptive content selection based on the learner’s known vocabulary, review history, and comprehension level
- rank candidate dynamic items by difficulty, novelty, and overlap with current review goals
- compare curated and agentic reading outcomes before allowing the adaptive layer to intervene more often
- keep recommendation logic inspectable and evaluable, even if LLM assistance is used in part of the ranking process

Suggested deliverables:

- optional personalized reading recommendations
- first adaptive real-world reading loop
- comparison reports between curated and agentic practice outcomes

Exit criteria:

- adaptive recommendations are logged, inspectable, and supported by outcome comparisons rather than intuition alone

## Supporting Tracks

### Content Operations

- define editorial standards for natural Kannada, beginner readability, and translation style
- define how Devanagari support should be written and when it appears
- document pronunciation consistency rules across lessons
- decide how many new words each lesson should introduce
- establish a review pass for vocabulary usefulness, duplicate coverage, and comprehension difficulty
- maintain a simple corpus rationale so story selection stays intentional
- define quality rules for agentic simplification so dynamic content stays readable and pedagogically useful

### Content Type Registry

- maintain a small registry of supported content types and planned content types
- document, for each type, its source expectations, lesson mode expectations, player behavior differences, and authoring checklist requirements
- start with `story` as the primary type, then add `poem` as the next curated type before later agentic types such as `headline` and `news-brief`

### Quality and Testing

- add tests for progress storage and lesson state transitions
- validate that token timings are monotonic and fit inside segment duration
- test lesson navigation for first segment, last segment, replay, and narration-backed flows
- add a pre-release checklist for new lessons
- validate glossary, pronunciation, and comprehension fields in lesson manifests
- add quality checks for agentic content, including schema validity, source attribution, and simplification sanity
- archive agentic outputs so they can be replayed, compared, and evaluated later

### Distribution and Readiness

- define what MVP means in terms of story count, narration coverage, and supported devices
- keep analytics lightweight until the lesson loop is stable
- align public-facing metadata and descriptions with the curated-content product direction

## Recommended Near-Term Priorities

If we want the highest-leverage next steps, the order should be:

1. test the current two-story alpha and note playback, pacing, glossary, and comprehension friction
2. polish narration pacing and segment ergonomics based on real usage
3. tighten content authoring guidance and glossary coverage standards
4. decide whether the next expansion is more stories or a second curated content type such as poems
5. expand the story library using the schema rather than adding more TypeScript-authored lessons

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

Agentic expansion metrics:

- number of dynamic reading items accepted after generation or review
- learner engagement with simplified news or real-world reading items
- comprehension accuracy on dynamic content versus curated lessons
- percentage of agentic content that can be reused without manual repair
- quality delta between deterministic baseline simplification and LLM-assisted simplification

## Risks and Watchouts

- narration quality and narration workflow can become the largest bottleneck if not decided early
- storing stories in code will slow down content growth and make review harder
- token timing, glossary entries, and pronunciation scaffolds can drift unless validation is built in early
- a larger library without clear corpus criteria may feel random instead of curricular
- a read-along experience without comprehension checks will undershoot the product’s stated goal
- story vocabulary may become siloed unless it is designed to flow into the broader review system
- agentic content can introduce quality drift, simplification errors, or misleading language unless source attribution and review safeguards are built in
- jumping straight to model-driven dynamic content without a deterministic baseline will make the system harder to debug and harder to trust

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
- curated lessons remain the foundation even if agentic reading content is added later
- the first audience is beginner Kannada learners
- narration is a core part of the intended experience
- AI TTS is an acceptable near-term narration baseline
- this project is part of a broader Kannada learning ecosystem rather than a completely isolated app
