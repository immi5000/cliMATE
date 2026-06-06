# Phase 3B — College / University Transport Branch

User reaches this branch when `answers.lifeStage == 'college'`. 3–4 screens.

---

## Screen: Phase3B.Housing

**Route:** `/transport/college/housing`
**Phase:** 3 — Daily Transport (College branch)
**Progress bar step:** 5 of 14

### Copy

- H1: `Where do you live?`
- Subhead: `Determines how much you actually need to travel.`
- Options:
  - 🏫  `On campus dorm` → `dorm`
  - 🏠  `Off campus — nearby` sublabel `Walking or short bike distance` → `offCampusNear`
  - 🏡  `Off campus — commute required` sublabel `Drive, bus, or train` → `offCampusCommute`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.collegeHousing = <value>`

### Next screen

Phase3B.Mode.

---

## Screen: Phase3B.Mode

**Route:** `/transport/college/mode`
**Phase:** 3 — Daily Transport (College branch)
**Progress bar step:** 6 of 14

### Copy

- H1: `How do you get to campus most days?`
- Subhead: `Pick what you do for the majority of the week.`
- Options:
  - 🚶  `Walk` → `walk`
  - 🚲  `Bike or e-bike` → `bike`
  - 🚇  `Campus shuttle or public transit` → `publicTransit`
  - 🚗  `Drive alone` → `driveAlone`
  - 👥  `Carpool with others` → `carpool`
  - ⚡  `Electric vehicle` → `ev`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.transportMode = <value>`

### Next screen

- If `transportMode in ['driveAlone','carpool']` → Phase3B.Fuel.
- Else → Phase3B.Distance.

---

## Screen: Phase3B.Fuel

**Route:** `/transport/college/fuel`
**Phase:** 3 — Daily Transport (College branch)
**Progress bar step:** 7 of 14

### Copy

- H1: `What powers your car?`
- Subhead: `We'll use this for an accurate emissions estimate.`
- Options:
  - ⛽  `Gas` → `gas`
  - 🔋  `Electric` → `electric`
  - 🔀  `Hybrid` → `hybrid`
  - ⛽  `Diesel` → `diesel`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.fuelType = <value>`

### Next screen

Phase3B.Distance.

---

## Screen: Phase3B.Distance

**Route:** `/transport/college/distance`
**Phase:** 3 — Daily Transport (College branch)
**Progress bar step:** 7 or 8 of 14

### Copy

- H1: `How far is your campus?`
- Subhead: `One-way distance is fine.`
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

`answers.distanceBucket = <value>`. Also set `answers.daysPerWeek = '5'` implicitly (college students attend most weekdays — the MD doesn't ask, so we default it to keep the CO2 calculation balanced).

### Next screen

Weekend.
