# cliMATE — Onboarding Build Spec for Base44

You are Base44. This folder is a complete, self-contained specification for building the **onboarding flow** of a sustainability app called cliMATE. Read every file in this folder before generating code. Do not invent values — every constant, every line of copy, every color, and every CO2 number you need is in here.

---

## What you will build

A mobile-first onboarding flow that:

1. Collects 16 data points about a user's lifestyle across 7 phases.
2. Branches in Phase 3 based on the user's life stage (5 different transport mini-flows).
3. Shows 3 dramatic single-stat "impact reveal" screens mid-flow to make the numbers feel real.
4. Computes a personalized **weekly CO2 footprint** using a sourced, peer-reviewed formula set.
5. Ends on a **Results screen** with the weekly footprint, a lifetime projection, 3 personalized "what-if" swap suggestions, and an IPCC-anchored "by 2100" planetary framing.

**Scope ends at the Results screen.** Do not build a main app, dashboard, leaderboard, auth, or backend. State lives in memory (or `localStorage` under the key `climate_onboarding_v1`).

---

## Tech stack (your choice, with constraints)

- **Platform**: mobile-first responsive web app. Design target viewport: 390×844 (iPhone 14). Must also render correctly down to 360px wide and up to 768px (tablet portrait).
- **Framework**: React (preferred) or whatever Base44 produces best. No native-only APIs required — the only "camera" interaction is the profile photo picker, which can fall back to a file input on web.
- **Fonts**: Manrope via Google Fonts (weights 400, 600, 700, 800).
- **Animations**: subtle. Cross-fade page transitions, soft scale-in on the stat numbers in reveal screens. No carousels, no parallax.
- **Accessibility**: keyboard navigable, semantic HTML, color contrast WCAG AA on all text.

---

## Reading order (build in this order)

1. **[01-product-brief.md](01-product-brief.md)** — what cliMATE is, target user, tone of voice, non-goals.
2. **[02-design-system.md](02-design-system.md)** — exact hex codes, type scale, spacing, button/card styles. Use these values verbatim.
3. **[03-screen-flow.md](03-screen-flow.md)** — the routing graph + decision table. This tells you how screens connect, including the 5 transport branches and 3 reveal interstitials.
4. **[06-data-model.md](06-data-model.md)** — the `answers` state schema. Build this first as your single source of truth.
5. **[04-screens/](04-screens/)** — one file per screen (or tightly-coupled screen group). Each follows a strict template: copy, controls, validation, state writes, next-screen logic. Implement screens in the order they appear in `03-screen-flow.md`.
6. **[05-co2-engine.md](05-co2-engine.md)** — the calculation engine. Constants, formulas, citations, and a worked example you must reproduce within ±2 kg.
7. **[07-assets.md](07-assets.md)** + **[assets/](assets/)** — image inventory. Use `assets/CliMateLogo.png` and `assets/treesback.png` as-is. Generate the other assets using the prompts in [assets/image-prompts.md](assets/image-prompts.md).
8. **[08-acceptance.md](08-acceptance.md)** — verification checklist. Your build is not done until every item passes.

---

## Hard rules

These are non-negotiable. Violating any one of them means the build is wrong.

- **Use exact copy.** Every heading, subhead, button label, and option label in `04-screens/` is the final user-facing text. Do not rephrase, shorten, or "improve" it.
- **Use exact colors.** Hex codes in `02-design-system.md` are final. Do not pick "close enough" alternatives.
- **Use exact CO2 constants.** Every number in `05-co2-engine.md` is sourced. Do not round, average, or substitute.
- **Reveal stats are computed.** The 3 interstitial screens show numbers derived from the user's *actual in-progress answers* — not placeholder text. Formulas are in [04-screens/interstitial-reveals.md](04-screens/interstitial-reveals.md).
- **Results lifetime projection is IPCC-bracketed.** The "by 2100" framing must map to a real IPCC SSP scenario, not a made-up number. See [05-co2-engine.md](05-co2-engine.md) → `getPlanetaryImpact()`.
- **One idea per screen.** Inspired by the 5Locks reference (see `assets/reference-5locks-*.md`): big breathing room, one dominant question or stat, one primary CTA at the bottom. Never cram two questions on one screen.

---

## File inventory

```
onboarding-spec/
├── README.md                          ← you are here
├── 01-product-brief.md
├── 02-design-system.md
├── 03-screen-flow.md
├── 04-screens/
│   ├── phase-1-identity.md            ← Welcome, Photo, Name
│   ├── phase-2-location-lifestage.md  ← Location, Life Stage
│   ├── phase-3a-student.md            ← K–12 branch
│   ├── phase-3b-college.md            ← College branch
│   ├── phase-3c-office.md             ← Office Worker branch
│   ├── phase-3d-wfh.md                ← Work From Home branch
│   ├── phase-3e-trades.md             ← Trades/Field branch
│   ├── phase-3-weekend.md             ← All branches merge here
│   ├── phase-4-diet.md
│   ├── phase-5-home-energy.md
│   ├── phase-6-consumption.md
│   ├── phase-7-goals.md
│   ├── interstitial-reveals.md        ← 3 dramatic stat screens
│   └── results.md                     ← Final payoff
├── 05-co2-engine.md
├── 06-data-model.md
├── 07-assets.md
├── 08-acceptance.md
└── assets/
    ├── CliMateLogo.png                ← use as-is
    ├── treesback.png                  ← use as-is
    ├── reference-5locks-01.md         ← moodboard refs
    ├── reference-5locks-02.md
    ├── reference-5locks-03.md
    ├── reference-5locks-04.md
    ├── reference-5locks-05.md
    └── image-prompts.md               ← generate visuals from these
```

When in doubt, default to less. Less copy, less ornamentation, less color. The 5Locks reference screens in `assets/reference-5locks-*.md` exist because they nail the pacing — match that pacing, with the cliMATE palette.
