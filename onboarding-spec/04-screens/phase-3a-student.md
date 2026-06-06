# Phase 3A — Student (K–12) Transport Branch

User reaches this branch when `answers.lifeStage == 'student'`. 2–3 screens depending on whether the user walks/bikes (skips distance).

---

## Screen: Phase3A.Mode

**Route:** `/transport/student/mode`
**Phase:** 3 — Daily Transport (Student branch)
**Progress bar step:** 5 of 13

### Layout

Standard frame. Header + 5 option buttons + Continue.

### Copy

- H1: `How do you get to school?`
- Subhead: `Pick the way you usually go on a school day.`
- Options:
  - 🚌  `School bus` → `schoolBus`
  - 🚗  `Parent drop-off` → `parentDropoff`
  - 🚶  `Walk` → `walk`
  - 🚲  `Bike or scooter` → `bike`
  - 🚇  `Public transit` → `publicTransit`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.transportMode = <value>`

### Next screen

- If `transportMode in ['walk','bike']` → Phase3A.Days (skip distance).
- Else → Phase3A.Distance.

---

## Screen: Phase3A.Distance

**Route:** `/transport/student/distance`
**Phase:** 3 — Daily Transport (Student branch)
**Progress bar step:** 6 of 13

### Layout

Standard frame.

### Copy

- H1: `How far is your school?`
- Subhead: `A rough idea is fine.`
- Options:
  - 📍  `Under 1 mile` → `under1`
  - 📍  `1 to 5 miles` → `1to5`
  - 📍  `5 to 15 miles` → `5to15`
  - 📍  `Over 15 miles` → `over30`  *(students rarely commute >30; we collapse the top bucket)*
- CTA: `Continue`

### Validation

Required.

### State write

`answers.distanceBucket = <value>`

### Next screen

Phase3A.Days.

---

## Screen: Phase3A.Days

**Route:** `/transport/student/days`
**Phase:** 3 — Daily Transport (Student branch)
**Progress bar step:** 7 of 13 (or 6 if Distance was skipped)

### Layout

Standard frame.

### Copy

- H1: `How many days a week do you go to school?`
- Subhead: `Count only days you actually travel.`
- Options:
  - `3 days` → `3`
  - `4 days` → `4`
  - `5 days` → `5`
  - `Home school or hybrid` → `homeschool`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.daysPerWeek = <value>`

### Next screen

Weekend (`/transport/weekend`).
