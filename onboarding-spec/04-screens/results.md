# Results — Final Payoff Screen

The emotional and informational climax of onboarding. Five stacked cards. No progress bar. No back button. One button at the bottom that ends the onboarding flow.

**This is the only screen the user will remember.** Treat it accordingly: clean type, generous spacing, factual numbers, one dramatic moment.

---

## Route

`/results`

---

## Computation on mount

When the screen mounts, run the full calc engine from `05-co2-engine.md`:

```js
const breakdown = calculateWeeklyCO2(answers);
// → { transport, diet, home, flights, shopping, total }

const planet = getPlanetaryImpact(breakdown.total);
// → { annualTons, lifetimeTons, treesNeeded, sustainableRatio, globalMultiplier, warmingScenario, warmingDegC }

const whatIfs = generateWhatIfs(answers, breakdown);
// → top 3 swap suggestions, each with { emoji, label, saving, pct }
```

All three functions are fully specified in `05-co2-engine.md`. Do not invent your own.

---

## Layout

Five cards stacked vertically. Each card has 16px outer margin and 24px internal padding. Cream canvas behind them.

```
[Safe-area top inset]
[Soft greeting header — 28px top padding, 20px horizontal]
  [Eyebrow meta: "{name.toUpperCase()}, HERE'S YOUR FOOTPRINT"]
  [H1: "Your weekly CO2"]
[Card 1 — Weekly CO2 Hero (most prominent)]
[Card 2 — Lifetime Projection + 2100 Framing]
[Card 3 — Top 3 What-If Swaps]
[Card 4 — Where You Rank]
[Card 5 — Your First Challenge]
[24px gap]
[Primary green CTA: "I'm in. Start tracking."]
[Tiny print: "You can change anything in Settings later."]
[Safe-area bottom inset]
```

The screen scrolls. Cards 1 and 2 should fit in the initial viewport (above the fold on a typical phone).

---

## Card 1 — Weekly CO2 Hero

White card, 24px radius. Internal layout:

```
[Small icon row: 🌍 + meta tag "WEEKLY ESTIMATE"]
[display-lg --gold "{breakdown.total}"]
[body --text "kg CO2 per week"]
[20px gap]
[Horizontal breakdown bar:]
  [Stacked horizontal bar showing segments for transport / diet / home / flights / shopping]
  [Each segment: solid color, no labels inside]
  [Legend row below: small color dot + category name + "{n} kg" for each of the 5]
```

### Segment colors (from `02-design-system.md`)

| Category | Color |
|---|---|
| Transport | `#00754a` (green-accent) |
| Diet | `#cba258` (gold) |
| Home | `#006241` (starbucks-green) |
| Flights | `#1e3932` (house-green) |
| Shopping | `#d4e9e2` (green-light, with `--text` label) |

### Copy

- Eyebrow tag: `WEEKLY ESTIMATE`
- Big number suffix: ` kg CO2 per week`
- Legend rows: `Transport · {n} kg` / `Diet · {n} kg` / `Home · {n} kg` / `Flights · {n} kg` / `Shopping · {n} kg`

---

## Card 2 — Lifetime Projection + 2100 Framing

White card. The dramatic moment.

```
[Small icon row: 📈 + meta tag "AT THIS RATE"]
[h2 --house-green: "Over your lifetime"]
[display-lg --gold "{planet.lifetimeTons}"]
[body --text "tons of CO2"]
[24px gap]
[Divider hairline]
[24px gap]
[h2 --house-green: "If everyone lived like you"]
[body-lg --text (centered): "we'd hit {planet.warmingDegC}°C of warming by 2100 — IPCC's {planet.warmingScenario} scenario."]
[8px gap]
[body-sm --text-soft (centered, italic): "IPCC AR6 baseline: keep warming under 1.5°C requires 2.3 tons CO2 per person per year."]
```

### Implementation of `warmingScenario` / `warmingDegC`

See `05-co2-engine.md` → `getPlanetaryImpact()`. The output maps to one of the official IPCC AR6 SSP pathways:

| Annual tons/person | Scenario | Warming by 2100 |
|---|---|---|
| ≤ 2.3 | SSP1-1.9 (Paris-aligned) | +1.5°C |
| 2.3 – 4.5 | SSP1-2.6 | +1.8°C |
| 4.5 – 7.0 | SSP2-4.5 | +2.7°C |
| 7.0 – 11 | SSP3-7.0 | +3.6°C |
| > 11 | SSP5-8.5 | +4.4°C |

Source: IPCC AR6 WG1, Summary for Policymakers, Table SPM.1. https://www.ipcc.ch/report/ar6/wg1/

---

## Card 3 — Top 3 What-If Swaps

White card. Three rows, each a clickable mini-card.

```
[Small icon row: ⚡ + meta tag "BIGGEST LEVERS FOR YOU"]
[h2 --house-green: "Try one of these"]
[For each of 3 what-if entries in whatIfs:]
  [Row card: 12px radius, --ceramic background, 14px padding]
    [Left: emoji in --selected-bg circle, 40px]
    [Middle: body-lg label + body-sm "{saving} kg saved per week · −{pct}%"]
    [Right: small chevron ›]
```

If `whatIfs.length < 3`, show only what's available. Never show placeholder rows.

### Copy

- Eyebrow tag: `BIGGEST LEVERS FOR YOU`
- Card title: `Try one of these`
- Per-row format: `{label}` (line 1, body-lg), `{saving} kg saved per week · −{pct}%` (line 2, body-sm, --text-soft)

---

## Card 4 — Where You Rank

White card.

```
[Small icon row: 🏆 + meta tag "VS YOUR CITY"]
[h2: "You're in the top {percentile}% of {city}"]
[body --text-soft: "Compared to the cliMATE community average for your city. Joining the leaderboard puts you against your friends instead."]
[16px gap]
[Disabled-style pill button: "Coming after onboarding"]
```

### Percentile estimation

Since there's no backend for the onboarding scope, compute percentile **deterministically** from the user's total weekly CO2 using a published distribution. Use this static lookup table:

| Weekly kg | Percentile (top-X% where lower is better) |
|---|---|
| ≤ 80 | top 5% |
| 80 – 120 | top 15% |
| 120 – 160 | top 30% |
| 160 – 200 | top 50% |
| 200 – 280 | top 70% |
| > 280 | top 90% |

If `answers.city` is empty, omit the city name: `You're in the top {percentile}%`.

### Source

Adapted from EPA per-capita emissions distribution data (15.5 tons/year US average ≈ 298 kg/week midpoint).

---

## Card 5 — Your First Challenge

White card. Maps `answers.goal` to a tailored first challenge.

```
[Small icon row: 🎯 + meta tag "YOUR FIRST WEEK"]
[h2: "{challengeTitle}"]
[body --text: "{challengeDescription}"]
[16px gap]
[body-sm --text-soft: "Photo upload later verifies the change. Friends will see your streak start."]
```

### Goal → Challenge mapping

| `answers.goal` | Challenge title | Description |
|---|---|---|
| `transport` | Two transit days this week | Pick two days you'd normally drive and take transit, walk, or bike instead. |
| `diet` | One meatless day | Go fully vegetarian for one day this week. Doesn't have to be Monday. |
| `energy` | The phantom load hunt | Unplug everything you're not using before bed for one full week. |
| `shopping` | One-week shopping pause | No non-essential purchases for 7 days. Coffee and groceries don't count. |
| `all` | Pick one small swap | Look at your three biggest levers above and try one of them this week. |

---

## CTA

- Label: `I'm in. Start tracking.`
- Variant: `primary-green`.
- Tap behavior: ends the onboarding flow. **Out of scope** what happens next — Base44 should navigate to a placeholder route or call `onComplete()` if a callback is provided. Do not build a main app.
- Tiny print below button (body-sm --text-soft, centered): `You can change anything in Settings later.`

---

## Edge cases

- **Missing data** — if the user somehow reaches Results with required answers missing (shouldn't happen since all screens are required), substitute the sensible default from `05-co2-engine.md` and quietly log a warning. Do not show an error UI.
- **`total == 0`** — if every answer maps to zero CO2 (theoretically possible if walk + vegan + tiny + solar + never fly + secondhand), show `< 10 kg per week` instead of `0` and add the note: `That's lower than 99% of users — are these answers accurate? You can retake the quiz from Settings.`
- **Photo on screen** — if `answers.photo` is set, show a 32px circular thumbnail in the greeting header at top. Otherwise show no photo.
