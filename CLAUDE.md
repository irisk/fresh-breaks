# Fresh Breaks

## Purpose

Micro-intervention wellness app — delivers positive cognitive shifts in under 60 seconds. Anti-addictive by design: success = quick relief, not time-on-device. Targets the "wellness-curious skeptic" who finds traditional meditation apps too heavy.

## Tech Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (`@theme` block for design tokens)
- Supabase (auth — optional, app works without account)
- Deployed on Vercel (auto-deploy from GitHub)
- PWA-capable (service worker via vite-plugin-pwa)
- GitHub: `github.com/irisk/fresh-breaks` (public; full history incl. the Lovable prototype in the private `fresh-breaks-archive`)

## Project Structure

```
design-handoff/          # v0.1 visual handoff (Direction E) — source of truth for UI
  CLAUDE.md              #   design rulebook + per-screen anatomy
  tokens.css             #   --fb-* CSS variables (inlined into app/src/index.css)
  motion.md              #   breath animation contract
  reference.html         #   rendered designs for all 9 screens
  Icons.tsx              #   icon set (source for app/src/components/Icon.tsx)
  brand/                 #   brand mark, favicon, splash spec
    mark.svg             #     master mark (source for app/public/mark.svg + PNG icons)
    favicon.svg          #     legibility-tuned variant for 16/32px
    mark-on-ocean.svg    #     mark on rounded ocean background
    splash.html          #     splash spec — copied into app/index.html as inline #root markup
docs/
  product-brief.md       # Vision, positioning, target user
  mvp-spec.md            # Current scope and implementation status
  features.md            # Full feature roadmap (beyond MVP)
  design.md              # UX principles, brand voice, a11y + pointer to design-handoff/
  content-strategy.md    # Content modules, tone, sourcing guidelines
  mood-routing-research.md # Research: mental states → intervention mapping
app/src/
  pages/                 # Route pages (Home, BreathingPicker, Breathing, etc.)
  components/            # Icon, ErrorBoundary, layout/ (ScreenLayout, ScreenHeader)
  hooks/                 # useBreathingEngine, useCycleItems
  data/                  # Static content (breathing exercises, questions, reflections)
  lib/                   # API clients (pexels, freesound), supabase, utils
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Time-aware greeting, category cards, express button |
| `/breathing` | BreathingPicker | Exercise selection with purpose hints |
| `/breathing/:id` | Breathing | Active breathing exercise (animated circle, timer, controls) |
| `/reflection` | Reflection | Shuffled prompts with fade transition |
| `/conversation` | ConversationStarter | Daily conversation question |
| `/gratitude` | GratitudeRipples | Appreciation message prompt + native share |
| `/sounds` | SoundScape | Ambient audio (Freesound API) |
| `/video` | NatureVideo | Nature clips (Pexels API) |
| `/done` | Done | Completion screen with soft close |

## Design

**Visual source of truth: `design-handoff/`** — read `design-handoff/CLAUDE.md` first, every session.

Current direction: **v0.1 · Direction E** (May 2026 handoff).

- Ground: **white** `#FFFFFF` (was warm linen — superseded by the v0.1 handoff). No off-white, no grain texture in production.
- Type: **Outfit only**, weights 400/500/700/800. No serif.
- Ink: deep ocean `#040F32` (`--fb-ocean`) — reads as "navy, not black."
- Category accents (each has a `*-soft` card-bg pair):
  - Breathing → sage `--fb-calm` `#6AB8A2`
  - Reflection → electric blue `--fb-reflection` `#3D3FCE`
  - Sound Scape → violet `--fb-sound` `#8B5CF6`
  - Nature & Animals → green `--fb-nature` `#10B981`
  - Conversation Starter → sunglow `--fb-sunglow` `#FFCC00`
  - Gratitude Ripples → sunset `--fb-sunset` `#E65F4B`
- Home splits categories into "By yourself" (solo) and "With someone" (social).
- Express bar: 66px ocean pill on Home, "Pick a break for me" → picks a random ready-to-start destination (3 breathing patterns + reflection + conversation). See `app/src/components/ExpressBar.tsx`. Deviation from the handoff (which specified "route to picker") — button copy + the "speed is a feature" principle won.
- Tokens live as `--fb-*` CSS variables in `app/src/index.css`. Legacy Tailwind `@theme` block was removed in the v0.1 migration; no Tailwind color/font utility classes are used.
- `prefers-reduced-motion` respected globally; see `design-handoff/motion.md` for the breath disc's reduced-motion behavior.

### Brand assets

Brand mark + favicon + splash spec live in `design-handoff/brand/`. PNG fallbacks (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`) are generated from `app/public/mark.svg` via `npm run gen:icons` (requires `sharp` devDep, already installed). Re-run after any change to `mark.svg`. Pre-JS splash is inlined in `app/index.html`; React `<Splash />` (in `app/src/components/Splash.tsx`) bridges the post-mount window with a configurable `MIN_VISIBLE_MS`.

## API Keys (env vars)

- `VITE_PEXELS_API_KEY` — Nature video content
- `VITE_FREESOUND_API_KEY` — Ambient audio content
- `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY` — Optional auth

## Decision-Making Filters (in order)

1. Does it serve the <60s constraint?
2. Is it anti-addictive?
3. Does it respect privacy?
4. Is it accessible in ≤3 taps?
5. Does it pass the skeptic test?

## Key Documentation

Always consult the relevant doc before making changes in that area:

| File | Purpose |
|------|---------|
| `design-handoff/CLAUDE.md` | **Visual rulebook** — per-screen anatomy, component names, what to avoid |
| `design-handoff/reference.html` | Rendered reference for all 9 screens (open in a browser while building) |
| `design-handoff/motion.md` | Breath animation contract |
| `docs/product-brief.md` | Vision, positioning, decisions log |
| `docs/mvp-spec.md` | Current scope, what's built, what's not |
| `docs/features.md` | Full feature roadmap (aspirational, beyond MVP) |
| `docs/design.md` | UX principles, brand voice, accessibility (+ pointer to design-handoff/) |
| `docs/content-strategy.md` | Content modules, tone, sourcing guidelines |
| `docs/mood-routing-research.md` | Research: mental states → intervention mapping |

## Public repo

This repo is public. Keep personal data out of tracked files: no personal data, real user content or keys in docs, mock data or commits. Personal notes go in an untracked file.

`docs/`, `prototype/` and `design-handoff/` are local only (gitignored): product strategy, research, the design handoff and the early prototype stay private. A snapshot from 3 Nov 2026 is in the private `fresh-breaks-archive` repo.
