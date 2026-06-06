# 5Locks Reference 03 — "How much time do you spend on your phone?" slider

A reference screenshot for **single-question screens with a numeric input**. cliMATE doesn't use a slider in the core flow (every question is multi-choice), but the layout principles apply to every standard screen.

---

## What's on screen

- Top: thin progress bar — gold/yellow fill on the left (~10%), dim track on the right. Then the `5LOCKS` eyebrow tag.
- Centered illustration: a stylized circular dot-pattern (concentric rings of small dots, teal-tinted, with a brighter dot in the center implying "you").
- Headline left-aligned across three lines, large serif white: *"How much time do you spend on your phone?"*
- Below headline, centered:
  - Big numeral: `6` (display, white, weight 700).
  - Small subhead below: `hours`.
- Below the numeral: a slider track with discrete tick marks. The fill from left to the current position is gold; the thumb is a glowing yellow circle.
- Bottom: white pill button "Continue".

## What to borrow for cliMATE

- **Progress bar at the very top of the viewport, hairline thin, with a gold/green active fill.** cliMATE uses a 4px track with `--green-accent` fill — same idea.
- **Eyebrow tag (`CLIMATE`) directly below the progress bar.** Optional — cliMATE primarily relies on the progress bar for orientation, but the tag works as a brand reminder on certain screens (Welcome, Results).
- **Headline left-aligned, large, weight-heavy.** cliMATE uses Manrope 800 at 28px for screen questions.
- **The big-number-with-small-unit-below pattern**: useful for the *interstitial reveal* screens (the gold stat number with " kg CO2" caption underneath).
- **The CTA as a clean white pill, full width inside margins, near the bottom**.

## What to *not* borrow

- The slider — cliMATE uses only multi-choice option buttons in the core flow.
- The dotted circle illustration — overly intricate for what cliMATE needs.
