# Phase 3E — Trades / Field Work Transport Branch

User reaches this branch when `answers.lifeStage == 'trades'`. 2 screens.

---

## Screen: Phase3E.Mode

**Route:** `/transport/trades/mode`
**Phase:** 3 — Daily Transport (Trades branch)
**Progress bar step:** 5 of 13

### Copy

- H1: `How do you get to your work sites?`
- Subhead: `Pick what you do for the majority of the week.`
- Options:
  - 🚗  `Drive a personal car` → `driveSedan` (also writes `fuelType='gas'`)
  - 🚙  `Drive a work truck or van` → `driveSUV` (also writes `fuelType='gas'`)
  - 🚌  `Company vehicle or carpool` → `companyVehicle`
  - 🚇  `Public transit` → `publicTransit`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.transportMode = <value>`, `answers.fuelType` set for the two driving options as noted. Also set `answers.distanceBucket = '15to30'` as a default (trades workers tend to travel further than typical commuters; this is documented in `05-co2-engine.md`).

### Next screen

Phase3E.Days.

---

## Screen: Phase3E.Days

**Route:** `/transport/trades/days`
**Phase:** 3 — Daily Transport (Trades branch)
**Progress bar step:** 6 of 13

### Copy

- H1: `How many days a week do you travel to sites?`
- Subhead: `Include any day you drive for work.`
- Options:
  - `1 to 2 days` → `1to2`
  - `3 to 4 days` → `3` *(map to "3" for the calc engine — see `05-co2-engine.md` `DAYS_VALUES`)*
  - `5 days` → `5`
  - `Varies` → `varies`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.daysPerWeek = <value>`

### Next screen

Weekend.
