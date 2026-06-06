# 5Locks Reference 04 — "2,190 hours this year" stat reveal

The single most important reference for cliMATE's **interstitial reveal screens** (the 3 mid-flow dramatic stat moments). Mirror this layout closely.

---

## What's on screen

- Dark green canvas, the entire viewport (no chrome at top — no progress bar, no nav).
- Top ~30% of viewport: empty.
- Centered vertical block:
  - Small white sentence: *"You'll spend"*
  - Very large gold number: `2,190` followed by smaller gold word `hours` (display weight serif, ~80px on the number).
  - Below the gold row, a centered white sentence: *"on your phone this year"*.
- Bottom ~25% of viewport: empty.
- White pill CTA at the bottom: "Continue".

## Layout proportions

- The big number occupies roughly 1/8 of viewport height.
- Equal empty space above and below the stat block.
- The supporting sentence is one short line, centered, in body-size sans-serif.

## Typography

- Pre-stat line: ~20px, weight 600, white.
- Big number: ~80px, weight 700, gold (`#E9C66B` in 5Locks; we use cliMATE gold `#cba258`).
- Unit/word next to big number: ~36px, weight 600, same gold tone.
- Post-stat line: ~20px, weight 600, white.

## What to borrow for cliMATE — copy this layout exactly

This is the model for our 3 interstitial reveal screens. cliMATE adaptation:

- Canvas: `--cream` (`#f2f0eb`), not dark green.
- Big number color: `--gold` (`#cba258`).
- Text colors: `--text` (`rgba(0,0,0,0.87)`) and `--text-soft` (`rgba(0,0,0,0.52)`).
- Pre-stat eyebrow uses `meta` style caps (e.g. `YOUR TRANSPORT SO FAR`).
- Post-stat sentence uses `body` style, centered, max-width 320px.
- The CTA is `primary-white` (white pill, dark text) since the canvas is light.
- The big-number scale-in animation (5Locks has none, but cliMATE animates the gold number with a subtle scale 0.92 → 1.0 fade over 600ms on mount) — this is one of the few motion moments in the app. See `02-design-system.md` → Motion.

## What to *not* borrow

- Dark canvas (we use cream).
- Serif font (we use Manrope sans-serif).

This is the screen that defines the "wow" moment of cliMATE onboarding. Get this right and the rest of the flow lands.
