# 07 — Assets

Complete catalog of every visual the onboarding uses. Three groups: assets already in the folder (use as-is), assets to be generated from `assets/image-prompts.md`, and the moodboard reference files.

---

## Group A — Assets ready to use

These are already in `assets/`. Reference them directly. Do not regenerate.

| File | Use |
|---|---|
| `assets/CliMateLogo.png` | Welcome screen top (32px height). Results header (32px height + name). |
| `assets/treesback.png` | Optional background on Welcome (low opacity, ~12%). Optional decorative element on Results Card 2. |

---

## Group B — Assets to generate

Each has a paste-ready AI prompt in `assets/image-prompts.md`. Save outputs back to `assets/` under the listed filename.

| Filename | Used on | Required? |
|---|---|---|
| `assets/welcome-hero.png` | Welcome screen — hero illustration in lower 30% of viewport. | **Required** |
| `assets/flights-hero.png` | Phase 6 Flights screen — optional small decoration above the header. | Optional |
| `assets/results-globe-hero.png` | Results Card 1 — small icon or decorative background. | Optional |
| `assets/reveal-bg-transport.png` | Interstitial Reveal 1 — extremely faint background watermark. | Optional |
| `assets/reveal-bg-diet.png` | Interstitial Reveal 2 — extremely faint background watermark. | Optional |
| `assets/reveal-bg-flights.png` | Interstitial Reveal 3 — extremely faint background watermark. | Optional |
| `assets/avatar-set.png` | Photo screen avatar picker (alternative: render 8 inline SVG circles). | Optional |

If an optional asset isn't generated, the screen falls back to its emoji icon. The flow still works.

---

## Group C — Moodboard references (do not ship in product)

These are guidance documents for *you, the builder*. The user-provided 5Locks screenshots are described in prose so you understand the design intent. Do not display them in the app.

| File | What it describes |
|---|---|
| `assets/reference-5locks-01.md` | "Apps locked" hero — pacing and type hierarchy. |
| `assets/reference-5locks-02.md` | "Let's customize" warm bubble cluster — the Welcome hero translation guide. |
| `assets/reference-5locks-03.md` | Slider screen — layout principles for standard screens. |
| `assets/reference-5locks-04.md` | **"2,190 hours" stat reveal — the canonical model for cliMATE's interstitial reveals. Most important reference.** |
| `assets/reference-5locks-05.md` | "99%" routine ring — the Results Card 4 percentile pattern. |

Each reference file explicitly calls out what to borrow vs. what to *not* borrow (since cliMATE uses cream + sans-serif, while 5Locks is dark + serif).

---

## File-size targets

Keep generated PNGs under 200 KB each. For backgrounds and decorative elements, prefer JPG output at 80% quality. The Welcome hero is the only image the user will see for more than 2 seconds — invest the most quality there.

If Base44's image generator outputs at a fixed size that's too large, downscale to:
- Hero illustrations: 1024×1024 max, scaled to fit at runtime.
- Backgrounds: 1024×1536 max.
- Icons: 256×256 max.
