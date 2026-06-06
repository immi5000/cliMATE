# 5Locks Reference 05 — "Understanding your routine" 99% circle

Reference for screens that display a **percentile or single-stat circle** rather than a number alone. The closest cliMATE equivalent is the *Results Card 4 "Where you rank"* moment.

---

## What's on screen

- Dark green canvas.
- Top: tiny status row with `App Store` back link.
- Centered headline serif white over three lines: *"Understanding your current all 5 prayers/day routine"*.
- Centered below: a large open-ring circle (gold stroke ~6px, ~50% of viewport width) with `99%` inside, weight 700, gold.
- Bottom half: empty.

## What to borrow for cliMATE

- **Big stat inside a ring**: useful pattern for Results Card 4. cliMATE adaptation: a circular ring `--green-accent` stroke at 4px, with the percentile number inside (`display-lg`, weight 800, `--house-green`).
- **Headline above the visual, declarative.** "You're in the top 30% of Boston" reads better than a vague compliment.
- **Generous empty space around the visual.** Don't crowd it.

## Implementation note for Card 4

The 5Locks 99% framing is positive ("you're already great"). cliMATE's framing must match the user's actual placement — see `04-screens/results.md` → Card 4 percentile lookup table. Do not invent flattering percentiles; the static distribution is calibrated to EPA data.

## What to *not* borrow

- Dark canvas, serif type — same overall translation rules as the other 5Locks references.
- The 99% number itself — that's content specific to 5Locks' product.
