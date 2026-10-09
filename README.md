# Sublevel — Landing Site

A modern landing site for Sublevel, an electronic music venue, built with **Nuxt 4**, **Nuxt UI**, **Tailwind CSS**, and **three.js**. Features an interactive 3D sound system visualization, artist roster, and audio-reactive animations.

## Quick Start

```bash
pnpm install
pnpm dev
```

The site runs on `http://localhost:3000` and auto-reloads during development.

## Features

- **3D Sound System Visualization** — Interactive three.js scene showing the sound system stack with audio-reactive animation
- **Artist Roster** — Browse and filter artists by genre (Techno, Electro & Breaks, Bass, Live Acts)
- **Artist Profiles** — Dedicated pages with audio-reactive visualizer, upcoming dates, booking terms, tech riders, and booking CTA
- **Immersive Landing** — Full-screen hero section with headline, CTAs, and real-time audio preview

## Site Structure

### Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `app/pages/index.vue` | Landing page: hero + stack visualization + roster preview + dates + inquiry |
| `/roster` | `app/pages/roster.vue` | Filterable artist grid (genre tags) |
| `/artists/:slug` | `app/pages/artist-profile.vue` | Artist detail page with visualizer, dates, booking info |

## Adding Artists

1. Add artist data to `app/data/artists.ts`:
   ```ts
   {
     slug: 'artist-name',
     name: 'Artist Name',
     genre: 'Techno', // All | Techno | Electro & breaks | Bass | Live acts
     image: '/artists/artist-name.jpg',
     bio: '...',
     dates: [...],
     bookingTerms: '...',
     techRider: '...',
   }
   ```

2. Drop artist image at `public/artists/artist-name.jpg`

3. Image dimensions: at least 1200px wide (square or portrait preferred)

## Styling & Design

- **Fonts** — Big Shoulders Display (headlines), Instrument Sans (body), JetBrains Mono (mono). Loaded via `@nuxt/fonts` (built into Nuxt UI).
- **Color System** — Dark theme forced; Sublevel palette overrides Nuxt UI `--ui-*` tokens globally so all components inherit brand colors.
- **Accessibility** — Respects `prefers-reduced-motion` (disables cursor parallax and animations).

## Audio Integration

Currently, the preview loop uses a synthetic synth and analyser. To connect real audio:

1. Create a `<audio>` element with your audio source
2. Create a `MediaElementAudioSourceNode` from it
3. Connect to the analyser in `previewLoop.ts`:
   ```ts
   const audioContext = new AudioContext();
   const sourceNode = audioContext.createMediaElementAudioSource(audioElement);
   sourceNode.connect(analyser);
   analyser.connect(audioContext.destination);
   ```

## Development

- **Hot Module Reload** — Edit components and see updates instantly
- **Build** — `pnpm build` → `dist/` (static HTML + JS)
- **Preview Production Build** — `pnpm preview`

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Nuxt 4 |
| UI Components | Nuxt UI v4 |
| Styling | Tailwind CSS v4 |
| 3D Graphics | three.js |
| State | Vue reactivity |
| Audio | Web Audio API |

## Notes

- Dark mode is forced; there is no light mode toggle.
- The stack visualization is client-only (renders only in the browser).
- Audio analysis runs on a synthetic loop by default; hook it to real audio as needed.
- Fonts are loaded optimally via `@nuxt/fonts` and do not block rendering.
