# Phase 5 — Home & Energy (2 screens)

Household size splits home emissions fairly. Energy source applies a multiplier.

---

## Screen: Household

**Route:** `/home/household`
**Phase:** 5 — Home & Energy

### Layout

Standard frame.

### Copy

- H1: `How many people share your home?`
- Subhead: `We split home energy emissions fairly between household members.`
- Options:
  - 👤  `Just me` → `1`
  - 👥  `2 people` → `2`
  - 👨‍👩‍👧  `3 to 4 people` → `3to4`
  - 👨‍👩‍👧‍👦  `5 or more` → `5plus`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.householdSize = <value>`

### Next screen

Energy.

---

## Screen: Energy

**Route:** `/home/energy`
**Phase:** 5 — Home & Energy

### Layout

Standard frame.

### Copy

- H1: `How is your home powered or heated?`
- Subhead: `Pick the closest. If you're not sure, that's fine.`
- Options:
  - ⚡  `Standard grid` sublabel `Electricity and gas heat` → `standardGrid`
  - ⚡  `All electric` sublabel `No gas appliances` → `allElectric`
  - ☀️  `Solar panels on roof` → `solar`
  - 🌿  `Renewable plan or green tariff` → `renewable`
  - 🔥  `Oil or propane heat` → `oilPropane`
  - ❓  `Not sure` → `notSure`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.homeEnergy = <value>`

### Next screen

Flights (Phase 6 begins).
