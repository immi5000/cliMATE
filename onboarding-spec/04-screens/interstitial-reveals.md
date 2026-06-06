# Interstitial Reveals (3 screens)

The dramatic moments between phases. Each one is a single computed stat in big gold typography, one sentence below it, and a single Continue button.

These screens use the **reveal frame** described in `02-design-system.md` — no progress bar, lots of breathing room, big gold number scales/fades in 200ms after mount. Modeled on the 5Locks "2,190 hours this year" reference (see `assets/reference-5locks-04.md`).

**All three reveals compute their stat from the user's actual in-progress answers, not placeholder values.**

---

## Reveal 1 — Transport Impact

**Route:** `/reveal/transport`
**Triggered after:** Weekend screen
**Progress bar:** hidden

### Stat formula

Compute the user's transport-only weekly CO2 using the same logic as `calculateWeeklyCO2()` in `05-co2-engine.md`, then multiply by 52 for annual.

```
transportWeekly = modeFactor(transportMode, fuelType)
                  × distanceMidpoint(distanceBucket)
                  × 2  // round trip
                  × daysValue(daysPerWeek)
                + weekendCO2(weekendTransport)

annualTransportKg = transportWeekly × 52
treesNeeded       = round(annualTransportKg / 21)   // 21 kg/year per mature tree, US Forest Service
```

### Layout

```
[Top space ~22% of viewport]
[Eyebrow text — meta style, --text-soft, centered: "YOUR TRANSPORT SO FAR"]
[28px gap]
[Stat row: display-xl --gold "{annualTransportKg}" + body --text " kg CO2"]
[16px gap]
[Body --text, centered, max-width 320px: "That's about {treesNeeded} mature trees of work to absorb every year."]
[Spacer flex]
[Primary CTA: "Continue"]
[24px bottom safe area]
```

### Copy

- Eyebrow: `YOUR TRANSPORT SO FAR`
- Stat unit suffix: ` kg CO2`
- Supporting sentence template: `That's about {treesNeeded} mature trees of work to absorb every year.`
- Edge case: if `annualTransportKg < 200` (e.g. walks/bikes only), supporting sentence becomes: `That's a featherlight footprint — under {treesNeeded} trees a year to absorb. Keep it up.`
- CTA: `Continue`

### Next

Diet (`/diet/type`).

---

## Reveal 2 — Diet Impact

**Route:** `/reveal/diet`
**Triggered after:** EatingOut screen
**Progress bar:** hidden

### Stat formula

Use IPCC's sustainable per-person carbon budget of **2.3 tons CO2/year** (to keep warming to +1.5°C) as the comparison baseline. Compute "Earths needed" as the ratio between the user's *projected annual* diet footprint and the share of the carbon budget that diet should occupy (~25% per IPCC AR6 Chapter 12, so ~0.575 tons/year for diet).

```
dietWeeklyKg     = DIET_DAILY_KG[diet] × 7 + EATING_OUT_EXTRA[eatingOut]
dietAnnualTons   = (dietWeeklyKg × 52) / 1000
dietBudgetTons   = 0.575
earthsNeeded     = round(dietAnnualTons / dietBudgetTons × 10) / 10   // one decimal
```

### Layout

Same as Reveal 1 — eyebrow, gold stat row, supporting sentence, CTA.

### Copy

- Eyebrow: `IF EVERYONE ATE LIKE YOU`
- Stat: `display-xl --gold "{earthsNeeded}"` then on the next line `body --text "Earths needed to sustain humanity"`
- Supporting sentence template:
  - If `earthsNeeded ≤ 1.0`: `You're already within the sustainable budget for diet. That's rare.`
  - If `1.0 < earthsNeeded ≤ 2.0`: `Cutting back on meat once or twice a week would bring this close to one.`
  - If `2.0 < earthsNeeded ≤ 4.0`: `Most of this is animal agriculture. Diet is the second-biggest lever you have.`
  - If `earthsNeeded > 4.0`: `Diet alone is using more than four planets' worth of capacity.`
- CTA: `Continue`

### Source for "Earths needed" framing

Based on the Global Footprint Network's *Earth Overshoot Day* methodology adapted to the per-person IPCC carbon budget. https://www.footprintnetwork.org/our-work/ecological-footprint/

### Next

Household (`/home/household`).

---

## Reveal 3 — Flight Impact

**Route:** `/reveal/flights`
**Triggered after:** Flights screen
**Progress bar:** hidden

### Stat formula

```
FLIGHT_ANNUAL_KG = {
  never:  0,
  1to2:   1500,   // 1.5 round-trips × 1000 kg
  3to5:   4000,   // 4 round-trips × 1000 kg
  6plus:  8000,   // 8 round-trips × 1000 kg
}

annualFlightKg = FLIGHT_ANNUAL_KG[flightsPerYear]
treeYears      = round(annualFlightKg / 21)
```

### Layout

Same reveal frame.

### Copy

- Eyebrow: `YOUR FLIGHTS THIS YEAR`
- Stat: `display-xl --gold "{annualFlightKg}" kg CO2`
- Supporting sentence template:
  - If `flightsPerYear == 'never'`: `Skipping flights is one of the biggest single choices anyone can make. You're already there.`
  - Else: `That's roughly {treeYears} tree-years of carbon — enough to offset would require a small forest.`
- CTA: `Continue`

### Source

ICAO Carbon Emissions Calculator: 1 round-trip domestic US flight ≈ 1,000 kg CO2 (https://www.icao.int/environmental-protection/CarbonOffset/Pages/default.aspx)
US Forest Service: mature tree absorbs ~21 kg CO2/year.

### Next

Shopping (`/consumption/shopping`).

---

## Implementation notes

- Mount-time animation: the gold stat number fades in (opacity 0 → 1) and scales (0.92 → 1.0) over 600ms with ease-out, starting 200ms after the screen mounts. The supporting sentence fades in starting at 500ms.
- The Continue button is **disabled for the first 1200ms** after mount. Forcing the user to read for a moment makes the reveal hit harder. Show no countdown — just the disabled state.
- After tapping Continue, the user cannot go back. Treat reveals as one-way doors.
