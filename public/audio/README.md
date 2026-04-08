Narrated story audio files live here.

Current structure:

- `public/audio/hare-and-tortoise/segment-01.m4a`
- `public/audio/hare-and-tortoise/segment-02.m4a`
- `public/audio/lion-and-mouse/segment-01.m4a`

Then point each segment's `audioSrc` to a public path like:

- `/audio/hare-and-tortoise/segment-01.m4a`

The current two starter stories can be regenerated locally with:

```bash
source ~/.nvm/nvm.sh
node scripts/generate-story-audio.mjs
```

The generation script currently uses the local macOS Kannada voice `Soumya`.
