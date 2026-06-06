# Phase 6 — Consumption & Travel (2 screens + Reveal 3 between them)

Flights are the highest single-action lever in onboarding. Reveal 3 fires after Flights, before Shopping.

---

## Screen: Flights

**Route:** `/consumption/flights`
**Phase:** 6 — Consumption & Travel

### Layout

Standard frame. Consider showing a small airplane illustration above the header (see `assets/image-prompts.md` → `flights-hero.png`).

### Copy

- H1: `How often do you fly in a typical year?`
- Subhead: `Count round-trips. Skip business travel if your employer covers it for emissions reporting.`
- Options:
  - ✈️  `Never or almost never` → `never`
  - ✈️  `1 to 2 flights` → `1to2`
  - ✈️  `3 to 5 flights` → `3to5`
  - ✈️  `6 or more flights` → `6plus`
- Footnote (below options, body-sm, --text-soft, italic): `One round-trip domestic flight ≈ 1 ton CO2.`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.flightsPerYear = <value>`

### Next screen

Reveal3 — Flight Impact (`/reveal/flights`).

---

## Screen: Shopping

**Route:** `/consumption/shopping`
**Phase:** 6 — Consumption & Travel

### Layout

Standard frame.

### Copy

- H1: `How would you describe your buying habits?`
- Subhead: `Clothes, gadgets, household stuff — not groceries.`
- Options:
  - ♻️  `I buy secondhand whenever possible` → `secondhand`
  - 🛒  `I buy only what I need, mostly new` → `buyWhatINeed`
  - 👜  `Average — sometimes I splurge` → `average`
  - 🛍️  `I shop often and like new things` → `shopOften`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.shopping = <value>`

### Next screen

Goals (`/goals`).
