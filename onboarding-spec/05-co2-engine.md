# 05 — CO2 Calculation Engine

Every constant, every formula, every source URL. Do not invent values. Do not "round for readability." The numbers here are calibrated against the existing cliMATE Expo build's `co2.js` and against published sources.

---

## Inputs

The `answers` object (full schema in `06-data-model.md`). The engine uses these 11 keys:

`transportMode`, `fuelType`, `distanceBucket`, `daysPerWeek`, `weekendTransport`, `diet`, `eatingOut`, `householdSize`, `homeEnergy`, `flightsPerYear`, `shopping`.

---

## Constants

### `MODE_FACTORS` — kg CO2 per mile per transport mode

```js
const MODE_FACTORS = {
  walk:            0.000,
  bike:            0.000,
  schoolBus:       0.045,   // school bus per-pupil avg
  parentDropoff:   0.202,   // round-trip share for one passenger drop-off
  publicTransit:   0.089,   // US transit avg per passenger-mile
  carpool:         0.202,   // gas sedan ÷ 2 passengers
  driveSedan:      0.404,   // EPA passenger car avg
  driveSUV:        0.621,   // EPA light-truck/SUV avg
  ev:              0.100,   // US grid mix, US Energy Information Administration
  motorcycle:      0.181,   // motorcycle gas avg
  companyVehicle:  0.250,   // typical company vehicle (split between solo + small carpool)
  // WFH internal modes (handled via Phase3D defaults — drives maps to driveSedan/driveSUV/ev)
};
```

### `FUEL_OVERRIDES` — override mode factor when fuelType is specified

```js
const FUEL_OVERRIDES = {
  driveSedan: { gas: 0.404, electric: 0.100, hybrid: 0.221, diesel: 0.450 },
  driveSUV:   { gas: 0.621, electric: 0.150, hybrid: 0.390, diesel: 0.680 },
  motorcycle: { gas: 0.181, electric: 0.050 },
};
```

### `DISTANCE_MILES` — bucket → midpoint one-way miles

```js
const DISTANCE_MILES = {
  under1:  0.5,
  '1to5':  3,
  '5to15': 10,
  '15to30': 22,
  over30:  40,
  none:    0,
};
```

### `DAYS_VALUES` — bucket → days/week

```js
const DAYS_VALUES = {
  '1to2':       1.5,
  '3':          3,
  '4':          4,
  '5':          5,
  varies:       3.5,
  homeschool:   0,
  none:         0,
};
```

### `WEEKEND_CO2` — kg CO2 per week from weekend transport

```js
const WEEKEND_CO2 = {
  walkBike:       0,
  publicTransit:  1.8,
  drive:          12,
  mix:            6,
  stayHome:       0.3,
};
```

### `DIET_DAILY_KG` — kg CO2 per day from food

```js
const DIET_DAILY_KG = {
  vegan:        1.5,
  vegetarian:   1.7,
  pescatarian:  2.3,
  flexitarian:  2.5,
  meatMost:     3.3,
  heavyMeat:    7.2,
};
```

### `EATING_OUT_EXTRA` — additional weekly CO2 from restaurants/delivery

```js
const EATING_OUT_EXTRA = {
  rarely:     0,
  fewTimes:   3,
  mostMeals:  7,
};
```

### `HOUSEHOLD_DIVISORS`

```js
const HOUSEHOLD_DIVISORS = {
  '1':    1,
  '2':    2,
  '3to4': 3.5,
  '5plus': 5.5,
};
```

### `ENERGY_MULTIPLIERS` — applied to baseline home energy

```js
const ENERGY_MULTIPLIERS = {
  standardGrid:  1.00,
  allElectric:   0.82,
  solar:         0.28,
  renewable:     0.38,
  oilPropane:    1.18,
  notSure:       1.00,
};

// Baseline US household weekly home energy CO2 (pre-split, pre-multiplier):
const HOME_BASELINE_KG_PER_WEEK = 144;
```

### `FLIGHT_WEEKLY_KG` — kg CO2 per week from flying

```js
const FLIGHT_WEEKLY_KG = {
  never:   0,
  '1to2':  14.4,    // 1.5 round-trips × 1000 kg ÷ 52 weeks
  '3to5':  38.5,    // 4 round-trips × 1000 kg ÷ 52
  '6plus': 76.9,    // 8 round-trips × 1000 kg ÷ 52
};
```

### `SHOPPING_WEEKLY_KG`

```js
const SHOPPING_WEEKLY_KG = {
  secondhand:   1.5,
  buyWhatINeed: 6,
  average:      12,
  shopOften:    22,
};
```

---

## Source citations

Every category traces to a public source. The numbers above are within the published range of these sources; do not substitute newer values without re-running the worked example below.

### Transportation

- **EPA — Greenhouse Gas Emissions from a Typical Passenger Vehicle.**
  Gas-powered passenger car: 404 g CO2/mile. Light-truck/SUV: ~621 g/mile.
  https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle
- **EPA — Fast Facts on Transportation Greenhouse Gas Emissions.**
  Average US passenger vehicle: 22 mpg, 8,887 g CO2/gallon of gasoline.
  https://www.epa.gov/greenvehicles/fast-facts-transportation-greenhouse-gas-emissions
- **US DOT / FTA — Public Transportation's Role in Responding to Climate Change.**
  Bus per-passenger-mile emissions: ~89 g CO2/mile in mixed urban fleets.
  https://www.transit.dot.gov/regulations-and-guidance/environmental-programs/public-transportation-and-climate-change
- **EIA — How much carbon dioxide is produced from US gasoline and diesel?**
  Gasoline: 8,887 g CO2 / gallon. Diesel: 10,180 g CO2 / gallon.
  https://www.eia.gov/tools/faqs/faq.php?id=307
- **DOE Alternative Fuels Data Center — EV emissions.**
  US-average grid EV emissions: ~100 g CO2/mile.
  https://afdc.energy.gov/vehicles/electric-emissions

### Diet

- **Poore & Nemecek 2018 — Reducing food's environmental impacts through producers and consumers, *Science***.
  Per-kg CO2-equivalent for beef ~60 kg, lamb ~25 kg, dairy ~3 kg, plant proteins ~1 kg.
  https://www.science.org/doi/10.1126/science.aaq0216
- **Our World in Data — Food choice vs. eating local.**
  Per-day diet CO2 breakdowns by diet type (vegan 1.5, vegetarian 1.7, omnivore 3.3, heavy meat 7+).
  https://ourworldindata.org/food-choice-vs-eating-local

### Home energy

- **EIA — How much electricity does an American home use?**
  Average US household: ~10,500 kWh/year = ~202 kWh/week.
  https://www.eia.gov/tools/faqs/faq.php?id=97
- **EIA — How much carbon dioxide is produced per kWh of US electricity generation?**
  US grid average: 0.386 kg CO2 / kWh (2022).
  https://www.eia.gov/tools/faqs/faq.php?id=74
- **Baseline math**: 202 kWh × 0.386 kg/kWh = ~78 kg/week from electricity. Adding natural gas heating averages ~144 kg/week per household total CO2 (electricity + heat). This is the `HOME_BASELINE_KG_PER_WEEK = 144`.

### Flights

- **ICAO Carbon Emissions Calculator** — methodology document for per-passenger flight emissions.
  Domestic US round-trip flight average ≈ 1,000 kg CO2 per economy passenger.
  https://www.icao.int/environmental-protection/CarbonOffset/Pages/default.aspx

### Shopping / consumption

- **Our World in Data — Greenhouse gas emissions from food and other consumption.**
  Average per-capita material consumption emissions: ~600 kg CO2/year ≈ 12 kg/week.
  https://ourworldindata.org/emissions-by-sector

### Carbon budget / IPCC framing (used in `getPlanetaryImpact`)

- **IPCC AR6 WG1, Summary for Policymakers (2021).**
  Remaining carbon budget for 1.5°C: ~500 GtCO2 (50% probability). Distributed per capita = ~2.3 tons/person/year for the remaining budget through 2050.
  https://www.ipcc.ch/report/ar6/wg1/
- **IPCC AR6 WG1, Table SPM.1** — SSP scenarios and projected warming by 2100.
  SSP1-1.9: +1.4°C, SSP1-2.6: +1.8°C, SSP2-4.5: +2.7°C, SSP3-7.0: +3.6°C, SSP5-8.5: +4.4°C.
- **US Forest Service — One mature tree absorbs ~21 kg CO2/year.**
  Used in tree-equivalent framing on Reveal 1 and Reveal 3.
  https://www.usda.gov/media/blog/2015/06/03/power-one-tree-very-air-we-breathe

---

## Core formula — `calculateWeeklyCO2(answers)`

```js
function getModeFactor(transportMode, fuelType) {
  if (!transportMode) return 0;
  const overrides = FUEL_OVERRIDES[transportMode];
  if (overrides && fuelType && overrides[fuelType] !== undefined) {
    return overrides[fuelType];
  }
  return MODE_FACTORS[transportMode] ?? 0;
}

function calculateWeeklyCO2(answers) {
  const {
    transportMode, fuelType, distanceBucket, daysPerWeek,
    weekendTransport, diet, eatingOut, householdSize, homeEnergy,
    flightsPerYear, shopping,
  } = answers;

  // --- TRANSPORT ---
  const modeFactor   = getModeFactor(transportMode, fuelType);
  const distMiles    = DISTANCE_MILES[distanceBucket]   ?? 0;
  const days         = DAYS_VALUES[daysPerWeek]         ?? 5;

  const weekdayCO2   = modeFactor * distMiles * 2 * days;  // ×2 for round trip
  const weekendCO2   = WEEKEND_CO2[weekendTransport]    ?? 0;
  const transport    = weekdayCO2 + weekendCO2;

  // --- DIET ---
  const dietBase     = DIET_DAILY_KG[diet]              ?? 3.3;
  const eatingExtra  = EATING_OUT_EXTRA[eatingOut]      ?? 0;
  const dietTotal    = dietBase * 7 + eatingExtra;

  // --- HOME ---
  const householdDiv = HOUSEHOLD_DIVISORS[householdSize] ?? 1;
  const energyMult   = ENERGY_MULTIPLIERS[homeEnergy]    ?? 1.0;
  const homeTotal    = (HOME_BASELINE_KG_PER_WEEK * energyMult) / householdDiv;

  // --- FLIGHTS ---
  const flightsTotal = FLIGHT_WEEKLY_KG[flightsPerYear] ?? 0;

  // --- SHOPPING ---
  const shoppingTotal = SHOPPING_WEEKLY_KG[shopping]    ?? 12;

  const total = transport + dietTotal + homeTotal + flightsTotal + shoppingTotal;

  return {
    transport:  Math.round(transport),
    diet:       Math.round(dietTotal),
    home:       Math.round(homeTotal),
    flights:    Math.round(flightsTotal),
    shopping:   Math.round(shoppingTotal),
    total:      Math.round(total),
  };
}
```

---

## Worked example

**Input** — office worker with a gas SUV commute, meat-heavy diet, average household, standard grid, 3–5 flights/year, average shopping:

```js
const answers = {
  transportMode:   'driveSUV',
  fuelType:        'gas',
  distanceBucket:  '5to15',     // 10 miles one-way
  daysPerWeek:     '5',
  weekendTransport: 'drive',
  diet:            'meatMost',
  eatingOut:       'fewTimes',
  householdSize:   '3to4',
  homeEnergy:      'standardGrid',
  flightsPerYear:  '3to5',
  shopping:        'average',
};
```

**Trace:**

- modeFactor = `FUEL_OVERRIDES.driveSUV.gas` = 0.621
- distMiles = 10
- days = 5
- weekdayCO2 = 0.621 × 10 × 2 × 5 = **62.1 kg**
- weekendCO2 = 12
- transport = 62.1 + 12 = **74.1** → rounded 74

- dietBase = 3.3
- eatingExtra = 3
- dietTotal = 3.3 × 7 + 3 = 23.1 + 3 = **26.1** → rounded 26

- householdDiv = 3.5
- energyMult = 1.00
- homeTotal = (144 × 1.00) / 3.5 = **41.14** → rounded 41

- flightsTotal = 38.5 → rounded **39**

- shoppingTotal = 12

- **total = 74.1 + 26.1 + 41.14 + 38.5 + 12 = 191.84** → rounded **192**

Expected `breakdown`:
```
{ transport: 74, diet: 26, home: 41, flights: 39, shopping: 12, total: 192 }
```

**This is your acceptance test.** If `calculateWeeklyCO2(answers)` returns the same values within ±2 kg, the engine is correct. (See `08-acceptance.md`.)

---

## Planetary impact — `getPlanetaryImpact(weeklyKg)`

Returns the values used on Results Card 2 ("Lifetime Projection + 2100 framing") and the Reveals.

```js
function getPlanetaryImpact(weeklyKg) {
  const annualTons   = (weeklyKg * 52) / 1000;       // tons CO2/year
  const lifetimeTons = Math.round(annualTons * 45);  // 45-year adult lifetime, conservative
  const treesNeeded  = Math.round((weeklyKg * 52) / 21);  // US Forest Service: 21 kg/tree/year
  const sustainableRatio = Math.round((annualTons / 2.3) * 10) / 10;  // IPCC 1.5°C budget
  const globalMultiplier = Math.round(((annualTons * 8) / 37) * 10) / 10;  // 8B people vs. current 37 GtCO2

  // IPCC SSP mapping
  let warmingScenario, warmingDegC;
  if      (annualTons <= 2.3)  { warmingScenario = 'SSP1-1.9'; warmingDegC = 1.5; }
  else if (annualTons <= 4.5)  { warmingScenario = 'SSP1-2.6'; warmingDegC = 1.8; }
  else if (annualTons <= 7.0)  { warmingScenario = 'SSP2-4.5'; warmingDegC = 2.7; }
  else if (annualTons <= 11.0) { warmingScenario = 'SSP3-7.0'; warmingDegC = 3.6; }
  else                         { warmingScenario = 'SSP5-8.5'; warmingDegC = 4.4; }

  return {
    annualTons:       Math.round(annualTons * 10) / 10,
    lifetimeTons,
    treesNeeded,
    sustainableRatio,
    globalMultiplier,
    warmingScenario,
    warmingDegC,
  };
}
```

For the worked example (weeklyKg = 192):
- annualTons = (192 × 52) / 1000 = 9.984 → **10.0**
- lifetimeTons = round(9.984 × 45) = **449**
- treesNeeded = round((192 × 52) / 21) = round(475.4) = **475**
- sustainableRatio = round(9.984 / 2.3 × 10) / 10 = **4.3**
- globalMultiplier = round((9.984 × 8 / 37) × 10) / 10 = **2.2**
- warmingScenario = `SSP3-7.0` (since 7.0 < 9.984 ≤ 11.0)
- warmingDegC = **3.6**

Results Card 2 displays: *"If everyone lived like you, we'd hit 3.6°C of warming by 2100 — IPCC's SSP3-7.0 scenario."*

---

## What-If swap generator — `generateWhatIfs(answers, breakdown)`

Returns up to 3 entries, each `{ emoji, label, saving, pct }`, sorted by impact descending.

```js
function generateWhatIfs(answers, breakdown) {
  const scenarios = [];

  // (a) Transport: solo car drivers swap to transit
  const nonGreenModes = ['driveSedan','driveSUV','motorcycle','parentDropoff'];
  if (nonGreenModes.includes(answers.transportMode)) {
    const distMiles = DISTANCE_MILES[answers.distanceBucket] ?? 0;
    const days      = DAYS_VALUES[answers.daysPerWeek]       ?? 5;
    const transitCO2 = 0.089 * distMiles * 2 * days
                     + (WEEKEND_CO2[answers.weekendTransport] ?? 0);
    const saving = Math.round(breakdown.transport - transitCO2);
    if (saving > 2) {
      scenarios.push({
        emoji: '🚇',
        label: 'Switch to public transit',
        saving,
        pct: Math.round((saving / breakdown.total) * 100),
      });
    }
  }

  // (b) Diet upgrade: heavy meat or meat-most → flexitarian
  const currentDietKg = DIET_DAILY_KG[answers.diet] ?? 3.3;
  if (currentDietKg > 2.5) {
    const saving = Math.round((currentDietKg - 2.5) * 7);
    if (saving > 0) {
      scenarios.push({
        emoji: '🥗',
        label: 'Go flexitarian',
        saving,
        pct: Math.round((saving / breakdown.total) * 100),
      });
    }
  }

  // (c) Cut flights in half
  const flightSavingsMap = { '3to5': 19, '6plus': 38 };
  const flightSaving = flightSavingsMap[answers.flightsPerYear];
  if (flightSaving) {
    scenarios.push({
      emoji: '✈️',
      label: 'Cut flights in half',
      saving: flightSaving,
      pct: Math.round((flightSaving / breakdown.total) * 100),
    });
  }

  // (d) Switch to renewable energy
  if (['standardGrid','oilPropane','notSure'].includes(answers.homeEnergy)) {
    const householdDiv = HOUSEHOLD_DIVISORS[answers.householdSize] ?? 1;
    const renewableHome = Math.round((HOME_BASELINE_KG_PER_WEEK * 0.38) / householdDiv);
    const saving = breakdown.home - renewableHome;
    if (saving > 5) {
      scenarios.push({
        emoji: '☀️',
        label: 'Switch to renewable energy',
        saving,
        pct: Math.round((saving / breakdown.total) * 100),
      });
    }
  }

  // Sort by saving DESC, return top 3
  return scenarios.sort((a, b) => b.saving - a.saving).slice(0, 3);
}
```

For the worked example, the candidates compute to:
- (a) transit saving = round(74 − (0.089 × 10 × 2 × 5 + 12)) = round(74 − 20.9) = **53 kg** (28%)
- (b) flexitarian saving = round((3.3 − 2.5) × 7) = **6 kg** (3%)
- (c) cut flights in half = **19 kg** (10%)
- (d) renewable energy: renewableHome = round(144 × 0.38 / 3.5) = 16; saving = 41 − 16 = **25 kg** (13%)

Sorted: transit (53) → renewable (25) → flights (19). These are the top 3 shown on Card 3.
