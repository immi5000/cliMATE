# Phase 4 — Diet (2 screens)

Diet is the second-largest CO2 lever after transport. Two screens: type and frequency of eating out.

---

## Screen: Diet

**Route:** `/diet/type`
**Phase:** 4 — Diet
**Progress bar step:** 10 of [branch total] *(approximate; depends on branch)*

### Layout

Standard frame.

### Copy

- H1: `How would you describe what you eat?`
- Subhead: `Pick the closest fit. We won't judge.`
- Options:
  - 🌱  `Vegan` sublabel `No animal products` → `vegan`
  - 🥗  `Vegetarian` sublabel `Dairy and eggs, no meat` → `vegetarian`
  - 🐟  `Pescatarian` sublabel `Fish, no meat` → `pescatarian`
  - 🍗  `Flexitarian` sublabel `Meat a few times a week` → `flexitarian`
  - 🥩  `Meat with most meals` → `meatMost`
  - 🥩🥩  `Heavy meat — red meat daily` → `heavyMeat`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.diet = <value>`

### Next screen

EatingOut.

---

## Screen: EatingOut

**Route:** `/diet/eating-out`
**Phase:** 4 — Diet
**Progress bar step:** 11 of [branch total]

### Layout

Standard frame.

### Copy

- H1: `How often do you eat out or order delivery?`
- Subhead: `Restaurants, takeout, delivery apps — anything you didn't cook.`
- Options:
  - 🍳  `Rarely — I mostly cook at home` → `rarely`
  - 🍜  `A few times a week` → `fewTimes`
  - 🍔  `Most of my meals are out or delivered` → `mostMeals`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.eatingOut = <value>`

### Next screen

Reveal2 — Diet Impact (`/reveal/diet`).
