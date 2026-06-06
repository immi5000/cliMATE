# 08 — Acceptance Checklist

The build is not done until every item below passes. Treat this as a deployment gate, not a wishlist.

---

## A. Flow completeness

- [ ] All 5 life-stage branches (Student, College, Office, WFH, Trades) reach Results without broken navigation.
- [ ] Caregiver and Retired life stages route through the WFH branch (per `03-screen-flow.md`).
- [ ] The "Walk / Bike" answer on Student Mode skips the Distance screen.
- [ ] The "Drive alone / Carpool / etc." answer on College and Office Mode correctly inserts the Fuel screen.
- [ ] The "Rarely / walkBike" answer on WFH Errands skips the Vehicle screen.
- [ ] All 3 interstitial reveal screens (`/reveal/transport`, `/reveal/diet`, `/reveal/flights`) display computed stats from the user's actual answers, not placeholder text.
- [ ] The Continue button on reveal screens is disabled for the first 1200 ms after mount.
- [ ] The Results screen loads with all 5 cards populated.

## B. Copy fidelity

- [ ] Every screen's H1, subhead, option labels, and CTA label match `04-screens/*.md` **verbatim**. No rephrasing, no Title Case substitutions, no synonym swaps.
- [ ] The Welcome screen's CTA reads `Bismillah, let's get started →`.
- [ ] The Goals screen's CTA reads `See my results`.
- [ ] The Results screen's CTA reads `I'm in. Start tracking.`
- [ ] No exclamation marks anywhere except the Welcome tagline.

## C. Design system fidelity

- [ ] Canvas color on every screen is `#f2f0eb`.
- [ ] Primary CTA fill is either `#ffffff` (white pill) or `#00754a` (green-accent pill) — no other colors.
- [ ] Big stat numbers on reveals and Results use `#cba258` (gold) — and gold is used nowhere else.
- [ ] Question H1 is Manrope ExtraBold (800) at 28px with letter-spacing −0.02em.
- [ ] All buttons have 999px (full pill) border radius and a minimum 56px touch target.
- [ ] Option buttons in selected state show `#00754a` border and a light green tint background.

## D. CO2 engine accuracy

- [ ] `calculateWeeklyCO2()` returns `{ transport: 74, diet: 26, home: 41, flights: 39, shopping: 12, total: 192 }` for the worked example in `05-co2-engine.md` § "Worked example" — within ±2 kg per category.
- [ ] `getPlanetaryImpact(192)` returns `warmingScenario = 'SSP3-7.0'` and `warmingDegC = 3.6`.
- [ ] `generateWhatIfs(answers, breakdown)` for the worked example returns 3 entries with `"Switch to public transit"` first (saving ≈ 53 kg, ≈ 28%).
- [ ] No CO2 number is rounded down to 0 unless the formula genuinely produces 0.

## E. Reveal screen accuracy

- [ ] Reveal 1 shows `annualTransportKg` based on the user's actual transport answers, not a hardcoded number.
- [ ] Reveal 2 shows `earthsNeeded` computed from `dietAnnualTons / 0.575`, displayed to one decimal.
- [ ] Reveal 3 shows `annualFlightKg` based on `FLIGHT_ANNUAL_KG[flightsPerYear]`.
- [ ] Edge-case copy variants in `interstitial-reveals.md` fire correctly (e.g. vegan user gets the "rare" copy on Reveal 2; "never flies" user gets the praise copy on Reveal 3).

## F. Results screen accuracy

- [ ] Card 1 shows the weekly total in gold (display-lg), with a stacked horizontal bar of the 5 category segments in the colors specified in `04-screens/results.md`.
- [ ] Card 2 shows the IPCC-anchored 2100 framing. The scenario name and degrees come from `getPlanetaryImpact()` — not invented.
- [ ] Card 3 shows up to 3 what-if cards, sorted by saving descending. If `whatIfs.length < 3`, only the available rows render — no placeholders.
- [ ] Card 4 percentile matches the lookup table in `04-screens/results.md` for the user's total weekly kg.
- [ ] Card 5 challenge matches the `answers.goal` row in the goal-to-challenge table.

## G. State management

- [ ] `answers` persists to `localStorage` under key `climate_onboarding_v1` on every change.
- [ ] On reload mid-flow, the user resumes at the first incomplete screen.
- [ ] On reload after completion, the user goes straight to Results.
- [ ] A `Start over` link is offered on the Welcome screen if a saved object exists.

## H. Responsiveness & accessibility

- [ ] The layout renders correctly from 360px viewport width up to 768px.
- [ ] All interactive elements are reachable by keyboard (Tab order is logical).
- [ ] Color contrast on body text meets WCAG AA on cream canvas (`rgba(0,0,0,0.87)` on `#f2f0eb` is ~12:1 — fine).
- [ ] Gold stat numbers on cream canvas have at least 3:1 contrast (`#cba258` on `#f2f0eb` ≈ 2.3:1 — **fails** AA for body, but acceptable for non-text large display numbers under WCAG 2.1 SC 1.4.11. Document this trade-off if requested.)
- [ ] No interaction depends on hover (mobile-first).

## I. Motion

- [ ] Page transitions cross-fade 240ms.
- [ ] Reveal stat numbers fade-and-scale in over 600ms, starting 200ms after mount.
- [ ] Option buttons transition 120ms on select.
- [ ] No carousels, parallax, shimmer placeholders, or Lottie used anywhere.

## J. Edge cases & error handling

- [ ] If geolocation is denied on Location screen, the search input appears and the user can proceed.
- [ ] If the user skips Photo, `answers.photo` is `null` and no error is shown.
- [ ] If `breakdown.total === 0` on Results, the screen shows the "lower than 99% of users" disclaimer from `results.md` § Edge cases.
- [ ] No console errors on any screen during the happy path of any of the 5 branches.

## K. Out-of-scope confirmation

These must **not** be built:

- [ ] No main app dashboard.
- [ ] No authentication / login.
- [ ] No backend API calls (except optional geocoding for Location).
- [ ] No social / leaderboard / friends features.
- [ ] No dark mode.
- [ ] No multi-language toggle.

---

## How to verify

1. Run the app. Walk through each life-stage branch end-to-end with realistic test answers.
2. For the CO2 accuracy section, hardcode the worked-example `answers` object at app start and verify the Results screen displays the expected numbers.
3. For the reveal screens, try answer extremes (vegan + walks + never flies vs. heavy meat + SUV + 6+ flights) and confirm the supporting-sentence variants fire.
4. Run Lighthouse in Chrome DevTools mobile mode at 375×667. Performance should be ≥85, Accessibility ≥95.
5. Resize the viewport from 360px to 768px live. No horizontal scroll, no clipped text.

The spec is complete when every checkbox above is checked.
