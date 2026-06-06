# cli-MATE — Design Profile

A reference profile of the visual design system used on the cli-MATE landing page. Source of truth: [landing/css/tokens.css](landing/css/tokens.css), [landing/css/base.css](landing/css/base.css), [landing/css/landing.css](landing/css/landing.css), and [landing/index.html](landing/index.html).

---

## 1. Brand Personality

**cli-MATE** is a friendly urban-sustainability app — "City living, made greener." The landing page reads as **eco-forward, warm, and playful-but-trustworthy**.

Two stated influences drive the look:
- **Starbucks** — deep, genuine "eco" greens; warm cream canvas; soft layered elevation.
- **Too Good To Go (TGTG)** — dark-green dominance, full-bleed photography, chunky all-caps display type, a running marquee, curved section dividers, scroll-pinned steps, and a giant wordmark.

The net effect is confident and editorial, while the rounded geometry and emoji micro-touches (🔥) keep it approachable rather than corporate.

---

## 2. Color

### Brand greens
| Token | Hex | Role |
|---|---|---|
| `--starbucks-green` | `#006241` | Dominant brand signal; H1s, big numbers |
| `--green-accent` | `#00754a` | Primary filled CTA, active accents, marquee bg |
| `--house-green` | `#1e3932` | Feature band + footer background |
| `--green-uplift` | `#2b5148` | Decorative mid-dark accent, footer wordmark |
| `--green-light` | `#d4e9e2` | Pale mint utility tint (eyebrows, fills, hovers) |

### Canvas & surfaces
| Token | Hex | Role |
|---|---|---|
| `--cream` | `#f2f0eb` | Primary page canvas (warm, not white) |
| `--ceramic` | `#edebe9` | Zone separator wash, inactive tracks/dots |
| `--white` | `#ffffff` | Cards |

### Text
| Token | Value | Role |
|---|---|---|
| `--text` | `rgba(0,0,0,0.87)` | Body text on light |
| `--text-soft` | `rgba(0,0,0,0.58)` | Secondary text, paragraphs |
| `--text-on-dark` | `#ffffff` | Text on dark green |
| `--text-on-dark-soft` | `rgba(255,255,255,0.72)` | Secondary text on dark |

### Ceremony accent
| Token | Hex | Role |
|---|---|---|
| `--gold` | `#cba258` | **Reserved** — streak/tier milestones only (tier ladder gradient, current-tier dot) |

**Principle:** green carries brand and action; cream/ceramic carry calm; gold is a rare ceremony color — never decorative filler.

---

## 3. Typography

### Families
- **Sans (body/UI):** `Manrope`, fallback Inter / Helvetica Neue. Weights 400–800.
- **Display (shouted headlines):** `Anton` — a chunky condensed grotesque, always **UPPERCASE**, weight 400. Applied via `.display` and to `.hero h1`, `.brand-name`, big stat numbers, marquee, footer wordmark.

Loaded from Google Fonts (`Anton` + `Manrope:400,500,600,700,800`).

### Rem anchor
`html { font-size: 62.5% }` → **1rem = 10px**. The whole scale is built on this; it's load-bearing.

### Type scale (fluid via `clamp`)
| Token | Size | Use |
|---|---|---|
| `--fs-display` | `clamp(4.2rem, 6vw, 6.4rem)` | Display headings |
| `--fs-h2` | `clamp(2.8rem, 3.6vw, 4rem)` | Section H2 |
| `--fs-h3` | `clamp(2.2rem, 2.6vw, 2.8rem)` | H3 |
| `--fs-h4` | `1.9rem` | H4 / card titles |
| `--fs-lead` | `clamp(1.7rem, 1.9vw, 2rem)` | Lead paragraphs |
| `--fs-body` | `1.6rem` | Body |
| `--fs-small` | `1.4rem` | Small / nav / buttons |
| `--fs-micro` | `1.3rem` | Eyebrows, captions |

Hero H1 scales larger still: `clamp(5rem, 9vw, 9.5rem)`.

### Letter-spacing
- Body/headings: `--tracking: -0.01em` (headings tightened to `-0.02em`).
- Anton all-caps: `--tracking-caps: 0.015em` (positive air, since condensed caps crowd).
- Eyebrows: `0.12em` for spaced-out labels.

### Treatments
- **`.eyebrow`** — uppercase micro pill: green text on `--green-light`, pill radius. On dark bands: light-green text on `rgba(255,255,255,0.12)`.
- **Headings** default to `--starbucks-green`, weight 800, line-height ~1.08. On dark bands they flip to white.

---

## 4. Spacing, Geometry & Elevation

### Spacing scale (rem)
`--space-1 … --space-9` → `0.4 / 0.8 / 1.6 / 2.4 / 3.2 / 4.0 / 4.8 / 5.6 / 6.4 rem`. Bands use generous vertical rhythm: `padding: clamp(7rem, 10vw, 13rem) 0`.

### Layout
- `--max-width: 118rem` (1180px), centered `.section` container with `0 var(--space-5)` gutters.
- Grids favor asymmetric splits: hero `1.05fr / 0.95fr`, how-it-works `0.9fr / 1.1fr`, cards `repeat(3, 1fr)`.

### Radius
| Token | Value | Use |
|---|---|---|
| `--radius-pill` | `999px` | Buttons, eyebrows, trends, bars |
| `--radius-card` | `16px` | Cards (intentionally "friendlier than 12px") |
| `--radius-sm` | `10px` | Rows, small surfaces |

### Elevation (whisper-soft, layered, green-tinted shadows)
- `--shadow-card`: `0 1px 2px rgba(15,40,30,.06), 0 8px 24px rgba(15,40,30,.06)`
- `--shadow-lift`: deeper hover/feature shadow
- `--shadow-nav`: subtle sticky-header shadow

Shadows are tinted with green-black (`rgba(15,40,30,…)`) rather than neutral grey — keeps elevation on-brand.

---

## 5. Signature Components & Patterns

- **Integrated transparent nav** — fixed header sits transparent over the hero, then turns to frosted dark glass (`rgba(15,31,26,.92)` + `backdrop-filter: blur(12px) saturate(1.4)`) once scrolled past a sentinel (`.is-stuck`).
- **Full-bleed hero** — green-city Unsplash photo under a diagonal dark scrim (`--overlay-dark`), with a solid green gradient fallback (`--green-fallback`) beneath so a failed image reveals green, never an empty box.
- **Hero demo card** — a preserved `#hero-demo` slot (4:5) showing a conic progress ring "score", streak, and saved-CO₂ pills; built for a future animated demo to drop in.
- **Impact marquee** — green band with an infinite-scrolling Anton all-caps word loop (Streaks · Challenges · CO₂ Saved · Friends…), 32s linear, pauses on hover, halted under reduced-motion.
- **Curved SVG dividers** — `.wave` paths transition between bands instead of hard edges.
- **Scroll-pinned "How it works"** — sticky photo stack cross-fades between four tiles as the matching step scrolls into the viewport center (`IntersectionObserver`, `rootMargin: -45%`).
- **Stat visualizations** — conic-gradient progress rings, day-dot streak grids with a glowing "today" dot, and a gold→green tier ladder bar.
- **Giant footer wordmark** — `min(17vw, 24rem)` Anton "CLI-MATE" in `--green-uplift`, spanning the footer width.

### Bands
Section backgrounds are modular `.band--*` classes: `cream`, `ceramic`, `white`, `accent` (green), `house` (dark green), `uplift`. Dark bands auto-invert heading/paragraph colors.

### Buttons
Pill-shaped, weight 700, `1.5px` border. Variants: `--primary` (filled green), `--secondary` (white), `--ghost` (outline), and on-dark pairs (`--on-dark-fill` white pill, `--on-dark-outline` translucent). Active state scales to `0.96`.

---

## 6. Motion

- **Scroll-reveal** (`.reveal` → `.is-visible`): fade + 2.2rem rise, `0.7s cubic-bezier(0.22, 1, 0.36, 1)` (an ease-out "settle" curve used throughout).
- Ring fill, tier-bar grow, marquee scroll, step cross-fade, card hover lift (`-0.4rem`), button press.
- **Reduced-motion is a first-class citizen:** `prefers-reduced-motion` disables animations/transitions, stops the marquee outright, unpins the scroll-pinned steps, and shows all reveal content immediately.

---

## 7. Accessibility Notes

- `:focus-visible` → 3px green outline with offset on every interactive element.
- Decorative layers marked `aria-hidden`; the hero demo carries a descriptive `aria-label`; images have alt text or empty alt where decorative.
- The dark scrim (`--overlay-dark`) exists specifically to guarantee AA-legible text over any hero photo.
- `.visually-hidden` utility for screen-reader-only content.
- Graceful image fallback: failed photos reveal the on-brand green tile beneath (`js/ui.js`).

---

## 8. Quick Reference — "Make it feel like cli-MATE"

1. Warm **cream** canvas, never plain white backgrounds.
2. **Deep green** for brand and action; **gold only** for milestone ceremony.
3. **Anton uppercase** for anything shouted; **Manrope** for everything else.
4. **Pill** buttons + **16px** rounded cards; soft, **green-tinted** shadows.
5. Alternate light and **dark-green bands**, joined by **curved wave dividers**.
6. Big, fluid type; generous whitespace; asymmetric grids.
7. Playful proof — rings, streaks, marquees, a giant wordmark — but always reduced-motion-safe and AA-legible.
