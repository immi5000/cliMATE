# Phase 2 — Location & Life Stage (2 screens)

Anchors scoring to real-world context. The Life Stage answer determines which Phase 3 branch the user enters.

---

## Screen: Location

**Route:** `/location`
**Phase:** 2 — Location & Life Stage
**Progress bar step:** 3 of [branch total]

### Layout

```
[Progress bar]
[Header block:]
  [H1: "Where do you live?"]
  [Subhead: "We use this to tailor grid carbon, local transit, and city comparisons."]
[Content:]
  [Option button: 📍 "Use my location" sublabel "We'll figure out your city automatically"]
  [Option button: 🔍 "Search city manually" sublabel "Type your city name"]
  [If "Search" selected, expand below into a search input:]
    [Underlined text input "City, State or Country"]
    [Below: top 5 matching suggestions from a static list (no live API required for this spec — Base44 may use a static city list or geocoding library of its choice)]
[Spacer flex]
[Primary CTA: "Continue"]
```

### Copy

- H1: `Where do you live?`
- Subhead: `We use this to tailor grid carbon, local transit, and city comparisons.`
- Options: `Use my location` / `Search city manually`
- Sublabels: `We'll figure out your city automatically` / `Type your city name`
- Search input placeholder: `City, state or country`
- CTA: `Continue`

### Controls

- Two mutually exclusive options.
- "Use my location" — calls `navigator.geolocation.getCurrentPosition()`. On success, reverse-geocode to a city name (Base44 may use any geocoding library). On failure or denial, show inline error: `Couldn't find your location — try searching instead.` and fall back to the search input.
- "Search city manually" — expands an input below.

### Validation

- Required. CTA disabled until `answers.city` is non-empty.

### State write

- `answers.city = "<City, Region>"`
- Optionally `answers.lat`, `answers.lng` for future use (not required for the CO2 engine — energy multipliers in `05-co2-engine.md` use a US average).

### Next screen

- LifeStage (always).

---

## Screen: LifeStage

**Route:** `/life-stage`
**Phase:** 2 — Location & Life Stage
**Progress bar step:** 4 of [branch total]

### Layout

```
[Progress bar]
[Header block:]
  [H1: "Which best describes you?"]
  [Subhead: "We'll tailor the next questions to your day-to-day."]
[Content — vertical stack of 7 option buttons:]
  🎒  Student — K through 12
  🎓  College or University
  🏢  Office Worker
  💻  Work From Home
  🔧  Trades or Field Work
  🏠  Stay-at-home or Caregiver
  ✈️  Retired or Freelance
[Spacer flex]
[Primary CTA: "Continue"]
```

### Copy

- H1: `Which best describes you?`
- Subhead: `We'll tailor the next questions to your day-to-day.`
- Options (label / value):
  - `Student — K through 12` → `student`
  - `College or University` → `college`
  - `Office Worker` → `office`
  - `Work From Home` → `wfh`
  - `Trades or Field Work` → `trades`
  - `Stay-at-home or Caregiver` → `caregiver`
  - `Retired or Freelance` → `retired`
- CTA: `Continue`

### Controls

- 7 mutually exclusive option buttons.

### Validation

- Required.

### State write

- `answers.lifeStage = <enum value>`

### Next screen

Routing depends on the answer (see `03-screen-flow.md`):

- `student` → `/transport/student/mode`
- `college` → `/transport/college/housing`
- `office` → `/transport/office/mode`
- `wfh` → `/transport/wfh/errands`
- `trades` → `/transport/trades/mode`
- `caregiver` or `retired` → `/transport/wfh/errands` (they get the WFH errand-based branch since their transport pattern is similar)
