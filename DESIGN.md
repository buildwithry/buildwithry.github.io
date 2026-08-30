# DESIGN.md — Portfolio Redesign

Reference: [Linear design system](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1) (styles.refero.design)

## Mood & Philosophy

"Midnight precision instrument." Darkness as substrate, not theme: near-black surfaces, crisp white/grey type, one electric accent color used sparingly, only for the single primary action per view. Hairline borders do all elevation work — no drop shadows for card-to-canvas separation.

## Color Tokens

**Primary Accent:**
- Acid Lime: `#e4f222` — primary action, active nav, sole chromatic UI element

**Supporting Accents** (sparing use — tags, dividers, decorative icons only):
- Pulse Green: `#27a644`
- Coral Red: `#eb5757`
- Signal Teal: `#02b8cc`
- Iris Violet: `#6366f1`
- Lavender: `#8b5cf6`

**Neutrals (surface hierarchy, darkest to lightest):**
| Name | Hex | Use |
|---|---|---|
| Void | `#08090a` | canvas, full-bleed background |
| Carbon | `#0f1011` | card surfaces, nav bar |
| Obsidian | `#161718` | elevated panels |
| Graphite | `#23252a` | subtle borders, dividers |
| Smoke | `#383b3f` | hairline borders, separators |
| Ash | `#62666d` | muted body text, inactive icons |
| Fog | `#8a8f98` | tertiary text, placeholders |
| Mist | `#d0d6e0` | secondary headings, button text |
| Bone | `#e5e5e6` | near-white fills, high-contrast text |
| Paper | `#ffffff` | primary headings, max-contrast emphasis |

## Typography

- Primary: **Inter Variable** (weights 300, 400, 510, 590 only — no bold 700+)
- Code/mono: **Berkeley Mono** (or JetBrains Mono substitute) — reserved for technical metadata only
- OpenType features: `cv01, ss03, zero` enabled everywhere

**Type scale** (minor third, 1.2 ratio, 16px base):

| Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| Display | 72px | 510 | 1.0 | -0.022em |
| Heading LG | 64px | 510 | 1.0 | -0.022em |
| Heading | 48px | 510 | 1.0 | -0.022em |
| Heading SM | 32px | 400 | 1.13 | -0.022em |
| Body LG | 20px | 590 | 1.33 | -0.012em |
| Body | 16px | 400 | 1.5 | default |
| Body SM | 15px | 400 | 1.6 | -0.011em |
| Caption | 13px | 400 | 1.2 | default |

## Spacing & Shape

- Base unit: 4px. Scale: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80, 96, 128px
- Border radius (three-radius system, nothing else): 2px (small) / 6px (buttons, inputs) / 12px (cards) / 9999px (pills)
- Layout: max-width 1200px, section gap 96px, card padding 24px, element gap 8px
- Shadows: hairline borders + subtle inset only, no outer drop shadows
  - sm: `rgba(0,0,0,0.4) 0px 2px 4px`
  - xl: `rgba(8,9,10,0.6) 0px 4px 32px`
  - inset subtle: `rgb(35,37,42) 0px 0px 0px 1px inset`

## Component Specs

- **Primary button**: bg `#e4f222`, text `#08090a`, radius 6px, padding 10–16px, Inter 14px/510, tracking -0.011em
- **Ghost/outline button**: transparent bg, 1px border `#23252a`, text `#d0d6e0`, radius 6px
- **Pill button**: bg `rgba(255,255,255,0.05)`, text `#d0d6e0`, radius 9999px
- **Card**: bg `#0f1011`, radius 12px, 1px inset border `#23252a`, padding 24px — hairline inner border defines the edge, no outer shadow
- **Text input**: bg `rgba(255,255,255,0.02)`, border `rgba(255,255,255,0.08)`, radius 6px
- **Badge/tag**: bg `rgba(255,255,255,0.05)`, text `#8a8f98`, radius 4px

## Do's

- Inter Variable with `cv01, ss03, zero` feature settings on
- Reserve `#e4f222` for exactly one primary action per view
- Body text 16px/400, line-height 1.5
- Letter-spacing -0.022em at 48px and above
- Only the three-radius vocabulary: 2px / 6px / 12px / pill
- Hairline borders instead of shadows for elevation
- 8px element gaps, 96px section gaps

## Don'ts

- No bold weights (700+) anywhere
- No decorative gradients on buttons/cards/text (a subtle atmospheric gradient is fine ONLY in the hero background, replacing the old particle effect)
- No second chromatic accent color in UI — acid-lime is the only one
- No card radii above 12px
- No drop shadows for card elevation — hairline borders only
- No chromatic body text — greyscale only (`#d0d6e0` / `#8a8f98` / `#62666d`)
- Mono font reserved for technical labels/metadata, not body copy

## Portfolio-specific notes

- This is a personal brand site (automation specialist), not a dev tool — the single accent color carries warmth Linear's UI otherwise wouldn't need; don't dilute it by adding a second color "for variety."
- Replace `ParticleBackground.tsx` with a subtle atmospheric gradient/mesh in the hero only (the one approved exception to "no gradients").
- Motion: scroll-driven scrub animation is now allowed site-wide (see "Scroll-driven motion" below), not just the hero. Hover states on cards/buttons stay smooth and understated regardless.

### Scroll-driven motion (site-wide)

Motion patterns are ported from the `teardowns/2026-08-30-xenith-design-webflow-io/` teardown of xenith-design.webflow.io — its layout geometry and rhythm, and its GSAP/ScrollTrigger configs as documented in that teardown's `build-analysis.md`. Reusing timing curves, scrub values, and trigger points is fine; its actual photography, copy, and logos are not (REFERENCE-ONLY per that teardown's `ASSETS.md` — use this site's own content only).

- **Scrub-linked reveals** (`scrub: 0.8`-style, tied directly to scroll position) are approved for any section, not just the hero — apply via GSAP + ScrollTrigger, following the configs cited in `build-analysis.md`'s "Animation and Interaction Breakdown".
- **Discrete fire-once reveals** (`SplitHeading` word-stagger, `Reveal` fade+rise) stay as the baseline for headings/cards that don't need a scrub effect.
- The Hero section (`src/components/ui/parallax-scrolling.tsx`, mounted in `src/pages/Index.tsx`) remains the reference implementation for GSAP + ScrollTrigger + Lenis wiring — its scoped styles live in `src/index.css` under the "Parallax scrolling component (Osmo)" block. New scrub effects on other sections should follow the same GSAP/Lenis setup rather than introducing a second animation library.
