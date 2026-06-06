# Phase 3C — Office Worker Transport Branch

User reaches this branch when `answers.lifeStage == 'office'`. 3–4 screens.

---

## Screen: Phase3C.Mode

**Route:** `/transport/office/mode`
**Phase:** 3 — Daily Transport (Office branch)
**Progress bar step:** 5 of 15

### Copy

- H1: `How do you usually get to work?`
- Subhead: `Pick the way you go most days.`
- Options:
  - 🚶  `Walk` → `walk`
  - 🚲  `Bike or e-bike` → `bike`
  - 🚇  `Public transit` sublabel `Bus, subway, train` → `publicTransit`
  - 🚗  `Drive alone — car or sedan` → `driveSedan`
  - 🚙  `Drive alone — SUV or truck` → `driveSUV`
  - 👥  `Carpool with others` → `carpool`
  - ⚡  `Electric vehicle` → `ev`
  - 🛵  `Motorcycle or moped` → `motorcycle`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.transportMode = <value>`

### Next screen

- If `transportMode in ['driveSedan','driveSUV','carpool','motorcycle','ev']` → Phase3C.Fuel.
- Else → Phase3C.Distance.

*(Note: for EV we still ask "fuel" but only one option, electric. Skip the screen if you prefer — just hardcode `answers.fuelType = 'electric'` when `transportMode == 'ev'`. This matches `MODE_FACTORS` behavior in `05-co2-engine.md`.)*

---

## Screen: Phase3C.Fuel

**Route:** `/transport/office/fuel`
**Phase:** 3 — Daily Transport (Office branch)
**Progress bar step:** 6 of 15

### Copy

- H1: `What powers your vehicle?`
- Subhead: `Helps us estimate emissions accurately.`
- Options:
  - ⛽  `Gas` → `gas`
  - 🔋  `Fully electric` → `electric`
  - 🔀  `Hybrid` → `hybrid`
  - ⛽  `Diesel` → `diesel`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.fuelType = <value>`

### Next screen

Phase3C.Distance.

---

## Screen: Phase3C.Distance

**Route:** `/transport/office/distance`
**Phase:** 3 — Daily Transport (Office branch)
**Progress bar step:** 7 of 15

### Copy

- H1: `How far is your office?`
- Subhead: `One-way distance from home.`
- Options:
  - `Under 1 mile` → `under1`
  - `1 to 5 miles` → `1to5`
  - `5 to 15 miles` → `5to15`
  - `15 to 30 miles` → `15to30`
  - `Over 30 miles` → `over30`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.distanceBucket = <value>`

### Next screen

Phase3C.Days.

---

## Screen: Phase3C.Days

**Route:** `/transport/office/days`
**Phase:** 3 — Daily Transport (Office branch)
**Progress bar step:** 8 of 15

### Copy

- H1: `How many days a week are you in the office?`
- Subhead: `Include any day you commute to the workplace.`
- Options:
  - `1 day` → `1`
  - `2 days` → `2`
  - `3 days` → `3`
  - `4 days` → `4`
  - `5 days, every day` → `5`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.daysPerWeek = <value>`

### Next screen

Weekend.
