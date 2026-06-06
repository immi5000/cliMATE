# 06 — Data Model

Single source of truth for state. Every screen reads from and writes to this `answers` object. Build this model before building any screens.

---

## `answers` shape

```ts
type Answers = {
  // Phase 1 — Identity
  photo:           string | null;          // data URL, avatar key, or null
  name:            string;                  // trimmed, ≥1 char before leaving Name screen

  // Phase 2 — Location & Life Stage
  city:            string;                  // "City, Region" — set after Location screen
  lat?:            number;                  // optional, set if geolocation succeeded
  lng?:            number;                  // optional

  lifeStage:       'student' | 'college' | 'office' | 'wfh' | 'trades' | 'caregiver' | 'retired' | null;

  // Phase 3 — Transport (varies by branch)
  collegeHousing?: 'dorm' | 'offCampusNear' | 'offCampusCommute';   // College branch only

  transportMode:
    | 'walk' | 'bike' | 'schoolBus' | 'parentDropoff' | 'publicTransit'
    | 'driveAlone' | 'driveSedan' | 'driveSUV' | 'carpool' | 'ev'
    | 'motorcycle' | 'companyVehicle'
    | 'drives' | 'walkBike' | 'rarely'    // WFH-branch variants
    | null;

  fuelType:        'gas' | 'electric' | 'hybrid' | 'diesel' | null;

  distanceBucket:  'under1' | '1to5' | '5to15' | '15to30' | 'over30' | 'none' | null;

  daysPerWeek:     '1' | '2' | '1to2' | '3' | '4' | '5' | 'varies' | 'homeschool' | null;

  weekendTransport: 'walkBike' | 'publicTransit' | 'drive' | 'mix' | 'stayHome' | null;

  // Phase 4 — Diet
  diet:            'vegan' | 'vegetarian' | 'pescatarian' | 'flexitarian' | 'meatMost' | 'heavyMeat' | null;
  eatingOut:       'rarely' | 'fewTimes' | 'mostMeals' | null;

  // Phase 5 — Home & Energy
  householdSize:   '1' | '2' | '3to4' | '5plus' | null;
  homeEnergy:      'standardGrid' | 'allElectric' | 'solar' | 'renewable' | 'oilPropane' | 'notSure' | null;

  // Phase 6 — Consumption & Travel
  flightsPerYear:  'never' | '1to2' | '3to5' | '6plus' | null;
  shopping:        'secondhand' | 'buyWhatINeed' | 'average' | 'shopOften' | null;

  // Phase 7 — Goals & Motivation
  goal:            'transport' | 'diet' | 'energy' | 'shopping' | 'all' | null;
};
```

---

## Initial state

```js
const initialAnswers = {
  photo: null,
  name: '',
  city: '',
  lifeStage: null,
  collegeHousing: undefined,
  transportMode: null,
  fuelType: null,
  distanceBucket: null,
  daysPerWeek: null,
  weekendTransport: null,
  diet: null,
  eatingOut: null,
  householdSize: null,
  homeEnergy: null,
  flightsPerYear: null,
  shopping: null,
  goal: null,
};
```

---

## State container

Use whatever fits Base44's idiomatic stack — React Context, Zustand, or top-level component state. Required API:

```ts
type AnswersStore = {
  answers: Answers;
  setAnswer<K extends keyof Answers>(key: K, value: Answers[K]): void;
  setAnswers(patch: Partial<Answers>): void;   // for screens that write multiple fields (Phase 3D Vehicle)
  reset(): void;
};
```

`setAnswers` is needed because the WFH Vehicle screen and the Trades Mode screen each write 2 fields at once (`transportMode` + `fuelType`).

---

## Persistence

Persist on every `setAnswer` / `setAnswers` call:

```js
localStorage.setItem('climate_onboarding_v1', JSON.stringify(answers));
```

On app mount:

```js
const stored = localStorage.getItem('climate_onboarding_v1');
if (stored) {
  const parsed = JSON.parse(stored);
  // Resume at first incomplete screen — see "Resume logic" below.
}
```

### Resume logic

Walk the screen sequence in order. The first screen whose required field is `null` or empty in the saved object is where to resume. If all required fields are set, go straight to Results.

### Required-field order (resume table)

| Screen | Required field |
|---|---|
| Photo | none (skip allowed) — never blocks resume |
| Name | `name.length >= 1` |
| Location | `city.length >= 1` |
| LifeStage | `lifeStage != null` |
| Phase 3 first screen for branch | `transportMode != null` |
| Phase 3 distance (when applicable) | `distanceBucket != null` |
| Phase 3 days (when applicable) | `daysPerWeek != null` |
| Weekend | `weekendTransport != null` |
| Diet | `diet != null` |
| EatingOut | `eatingOut != null` |
| Household | `householdSize != null` |
| Energy | `homeEnergy != null` |
| Flights | `flightsPerYear != null` |
| Shopping | `shopping != null` |
| Goals | `goal != null` |

Reveals are not in the resume table — if the user closed the app right after a reveal, they resume on the next data-entry screen.

---

## Defaults written by Phase 3 sub-screens

Some Phase 3 screens write defaults for fields the user wasn't asked. These defaults make the CO2 engine produce sensible output without an extra screen.

| Branch / situation | Field defaulted | Value |
|---|---|---|
| College branch (Distance screen sets it) | `daysPerWeek` | `'5'` |
| WFH `drives` → defaults | `distanceBucket` | `'1to5'` |
| WFH `drives` → defaults | `daysPerWeek` | `'4'` |
| WFH `walkBike` or `rarely` | `distanceBucket` | `'under1'` |
| WFH `walkBike` or `rarely` | `daysPerWeek` | `'3'` |
| Trades branch | `distanceBucket` | `'15to30'` |
| Walk/bike modes (Student) | `distanceBucket` | `'under1'` (skip-distance writes it) |

These are coded into each Phase 3 screen's `onContinue` handler — see the per-screen specs in `04-screens/`.

---

## Validation summary

- Empty `name` blocks leaving the Name screen.
- Empty `city` blocks leaving the Location screen.
- Every option-button screen requires a selection before its CTA is enabled.
- Photo screen is fully optional — skip is always allowed.

If a screen is reached with its prerequisite fields somehow null (e.g. deep-linking), redirect to the first incomplete prior screen rather than crashing.
