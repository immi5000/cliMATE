# Phase 3D — Work From Home (also Caregiver / Retired)

User reaches this branch when `answers.lifeStage in ['wfh', 'caregiver', 'retired']`. 1–2 screens.

---

## Screen: Phase3D.Errands

**Route:** `/transport/wfh/errands`
**Phase:** 3 — Daily Transport (WFH branch)
**Progress bar step:** 5 of 12

### Copy

- H1: `Do you leave home for errands most days?`
- Subhead: `Groceries, school runs, appointments — anything regular.`
- Options:
  - 🚗  `Yes — I drive regularly` → `drives`
  - 🚶  `Yes — walk or bike mostly` → `walkBike`
  - 🏠  `Rarely leave home` → `rarely`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.transportMode = <value>` (`drives` | `walkBike` | `rarely`)

Also set distance and frequency defaults so the CO2 engine has values:
- If `drives`: `answers.distanceBucket = '1to5'`, `answers.daysPerWeek = '4'` (typical errand pattern; the CO2 engine treats this as ~3 mi × 2 trips × 4 days = 24 mi/week).
- If `walkBike` or `rarely`: `answers.distanceBucket = 'under1'`, `answers.daysPerWeek = '3'`.

### Next screen

- If `drives` → Phase3D.Vehicle.
- Else → Weekend (skip vehicle question).

---

## Screen: Phase3D.Vehicle

**Route:** `/transport/wfh/vehicle`
**Phase:** 3 — Daily Transport (WFH branch)
**Progress bar step:** 6 of 13

### Copy

- H1: `What do you drive for errands?`
- Subhead: `We'll use this for the emissions estimate.`
- Options:
  - ⛽  `Gas car` → `driveSedan` + `fuelType='gas'`
  - 🔋  `Electric vehicle` → `ev` + `fuelType='electric'`
  - 🚙  `SUV or truck — gas` → `driveSUV` + `fuelType='gas'`
  - 🔀  `Hybrid` → `driveSedan` + `fuelType='hybrid'`
- CTA: `Continue`

### Validation

Required.

### State write

Each option writes **two fields** as shown:
- `answers.transportMode = 'driveSedan' | 'driveSUV' | 'ev'`
- `answers.fuelType = 'gas' | 'electric' | 'hybrid'`

### Next screen

Weekend.
