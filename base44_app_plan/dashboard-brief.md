# cli-MATE — Main Dashboard Build Brief (for base44)

## Context

cli-MATE is a city-first climate-tracking app: people track how they move through their city (bike / walk / transit vs. car) and the app gamifies the carbon they save with a daily score, streaks, tiers, and friend leaderboards. A polished marketing **landing page already exists** (`landing/index.html`, Starbucks-inspired design system) and shows preview snippets of the in-app UI.

**This document is a build brief to hand to base44** to generate the **main dashboard ("Home" screen)** of the app. The goal is a **demo** — UI quality and a believable, interactive "wow" flow are the priority, not a real backend. All data is hardcoded demo state; interactions mutate in-memory state and animate.

**The demo centerpiece** is a **tree that visibly grows** as the user logs greener trips. Everything on the screen is designed to feed that moment: tapping a task, acting on the daily suggestion, or logging a trip all increase "CO₂ saved," grow the tree a stage, count the numbers up, and fire a celebratory confetti + toast.

**Files in this folder:**
- `dashboard-brief.md` — this build brief (source of truth).
- `tokens.css` — the canonical design tokens (colors, fonts, spacing) so base44 matches the landing page exactly.
- `demo-script.md` — the exact tap sequence to run on stage.

---

## 1. Form factor & framing

- **Mobile app screen (~390px wide) shown inside a CSS phone frame/bezel**, centered on a dark desktop page — so it demos cleanly on a laptop/projector. The phone has a notch, a faux status bar (9:41 / signal / battery), a scrollable inner screen, and a **fixed bottom tab bar** (Home · Garden · Friends · Profile). The dashboard is the **Home** tab; other tabs are inert for the demo.
- Reproduce the **exact cli-MATE design system** in §2 (and `tokens.css`) so the dashboard is visually continuous with the landing page.
- A quiet **"← cli-MATE" back link** (top-left, outside the phone) returns to the landing page. The landing page's "Get started" CTA should link forward to this dashboard.

---

## 2. Design system (match the landing page exactly)

**Fonts** (Google Fonts): `Manrope` (400–800) for body/UI, `Anton` for big display numbers & headings. Default tracking `-0.01em`; Anton all-caps uses `+0.015em`.

**Color tokens** (full set in `tokens.css`):

| Role | Hex |
|---|---|
| Brand green (headings) | `#006241` |
| Accent green (CTAs, active, "today" bar) | `#00754a` |
| House green (dark page bg, footer) | `#1e3932` |
| Uplift green (decorative) | `#2b5148` |
| Light mint (pills, empty bars, tints) | `#d4e9e2` |
| Cream (app canvas) | `#f2f0eb` |
| Ceramic (separators) | `#edebe9` |
| White (cards) | `#ffffff` |
| Gold (milestone/celebration accent only) | `#cba258` |
| Text primary | `rgba(0,0,0,.87)` |
| Text soft | `rgba(0,0,0,.58)` |

**Geometry & elevation:** card radius `16px`, pill radius `999px`, small radius `10px`. Whisper-soft layered shadows (e.g. `0 1px 2px rgba(15,40,30,.06), 0 8px 24px rgba(15,40,30,.06)`; a stronger "lift" shadow for the phone). Spacing scale in 8px steps (4/8/16/24/32/40/48/56/64).

**Aesthetic:** warm cream canvas, dark-green accents, chunky Anton numbers, small uppercase **eyebrow** labels above each section ("Your garden", "Today", "This week", "Daily tasks", "Friends", "Recent activity"), generous rounded cards, smooth `cubic-bezier(.22,1,.36,1)` transitions. **Honor `prefers-reduced-motion`**: snap instead of animate, no confetti.

---

## 3. Screen layout (top → bottom, inside the phone, scrollable)

1. **Tree hero — "Your garden"** *(centerpiece)*
   - A **staged SVG tree** that grows through **5 stages**: Seed/sprout → Sapling → Young tree → Full tree → Blossoming.
   - Big Anton number: **total CO₂ saved** (e.g. `0.0 kg CO₂ saved`), counts up on every action.
   - Stage is derived from total kg via thresholds (see §6). A subtle green **glow pulse** plays when the tree levels up.

2. **Daily suggestion card — "Today's smart swap"** *(new, requested)*
   - A prominent, **actionable** card with a contextual tip computed from a distance-aware swap, e.g.:
     > **Take your bike to work today** — your usual 8 km train trip → biking saves **~1.4 kg CO₂**.
   - Shows: the suggested greener mode, the trip distance, the kg saved, and a **"Log this trip"** button.
   - Tapping **applies the saving**: counts up the total, grows the tree, fires confetti + toast, bumps today's chart bar and the leaderboard, and adds an activity entry. This is a key demo beat.

3. **Daily score + streak row**
   - **Score ring** (e.g. `68`, "▼ 16% vs. your average") — circular progress ring driven by a percentage.
   - **Streak** — flame 🔥 + day count + a row of day-dots (filled = active, one marked "today").

4. **Weekly chart — "This week"**
   - 7 vertical bars (Mon–Sun), height = CO₂ saved that day, **today's bar in accent green**. Pure CSS bars; **today's bar visibly grows** when the user logs a trip.

5. **Daily tasks — "Daily tasks"**
   - A short tappable checklist (e.g. "Bike to work +1.2 kg", "Skip the rideshare +0.9 kg", "Reusable cup +0.2 kg"). Tapping one checks it off and applies its saving (same celebration path → grows the tree).

6. **Weekly tasks / challenges**
   - 2–3 longer-horizon items with progress (e.g. "Car-free 4 days this week — 2/4"). Tappable to advance progress.

7. **Leaderboard — "Friends"**
   - Ranked rows with avatar, name, weekly kg, **"You" row highlighted**. When the user logs trips and overtakes a friend, the rows **re-order live** — a nice demo moment.

8. **Recent activity — "Recent activity"**
   - A feed of recent logged actions (icon · text · time). New actions **prepend** here in real time (e.g. "🚲 Biked to work · +1.2 kg · just now").

9. **(Optional, cheap) Tier ladder** — Bronze → Silver → Gold → Platinum progress bar showing current tier.

Bottom: **fixed tab bar** (Home active).

---

## 4. The daily suggestion (detail)

- **Source of the number:** a small hardcoded table of **distance-aware swaps**. Each entry has: usual mode, suggested greener mode, **distance (km)**, and a **kg-CO₂-saved** value derived from that distance (so the tip reads specifically, e.g. "8 km" → "1.4 kg"). Provide ~4–5 swaps so the presenter can pick a good one; the dashboard shows one as "today's" suggestion.
  - Example rows: `train→bike, 8 km, 1.4 kg` · `car→transit, 12 km, 2.1 kg` · `rideshare→walk, 3 km, 0.7 kg` · `car→bike, 6 km, 1.1 kg`.
- **Action:** the "Log this trip" button applies exactly that swap's kg to total saved, so the suggestion ties directly into the tree-growing demo. After logging, the card can swap to a "Nice! Logged ✅" state or rotate to the next suggestion.

---

## 5. Demo interactions & celebration

A single in-memory **state object** drives a **render** that paints every module. Any of these mutate state and re-render:

- Tapping a **daily/weekly task** → check it, add its kg.
- Tapping **"Log this trip"** on the suggestion → add the swap's kg.
- A **"Log a trip"** affordance with quick chips (Bike / Walk / Transit, preset kg) → add kg.

Every successful log triggers the **celebration sequence**:
1. **Count-up** animation on the total kg (and any affected number).
2. **Recompute tree stage**; if it increased, the tree **grows** (smooth scale/opacity transition on the newly revealed layer) + **green glow pulse**.
3. **Confetti burst** (lightweight DOM particles in brand greens + gold) from the tap point / tree.
4. **Toast** slides up: e.g. *"+1.4 kg saved! 🌱"*.
5. Today's **chart bar grows**, **leaderboard** re-sorts, **activity feed** prepends a new row, **streak** ticks on first action.

**Reset control:** a subtle **⟳ reset** button (outside the phone, top-right; also an `R` hotkey) restores the initial demo state so the flow can be re-run on stage.

---

## 6. The staged tree (implementation guidance)

- One **inline SVG** with grouped layers, each tagged with the minimum stage at which it appears (seed/mound → slim trunk + first leaves → branches + first canopy → full canopy → blossoms/fruit + petals).
- Driven by a single `stage` value (0–4); reveal each layer whose min-stage ≤ current stage via opacity + upward scale transition (`transform-origin` at the base, `cubic-bezier(.22,1,.36,1)`). A gentle perpetual canopy **sway** at stages ≥ 2.
- **Stage thresholds (kg):** `[0, 5, 12, 22, 35]` → tune **low** so ~4–5 demo taps reach the blossoming stage. `treeStage(kg)` = highest index whose threshold ≤ kg.
- Update the SVG `aria-label` per stage ("Your impact tree, stage 3 of 5"). Under reduced-motion, snap between stages with no sway/confetti.

---

## 7. Hardcoded demo data (single config object)

Expose one editable config so the presenter can tune before a demo:

- **User:** name, avatar, starting kg saved (e.g. `0.0`), starting streak (e.g. `12`), daily score (e.g. `68`).
- **Weekly array:** 7 day values + day labels, `todayIndex`.
- **Tree thresholds:** `[0,5,12,22,35]` (tune low).
- **Daily suggestion swaps:** the distance-aware table from §4.
- **Daily tasks / weekly tasks:** `{label, kg, done}` / `{label, target, progress}`.
- **Leaderboard:** ranked `{name, score, isMe}` rows (set the user just below #1 so a couple of logs let them overtake).
- **Activity seed:** a few prior entries.

---

## 8. Modules → components summary

| Module | Component notes |
|---|---|
| Phone frame | Bezel + notch + faux status bar; scrollable inner screen; fixed bottom tab bar (Home active) |
| Tree hero | Inline staged SVG (5 stages) + big Anton total-kg number + glow-pulse on level-up |
| Daily suggestion | Actionable card: tip text, distance, kg saved, "Log this trip" button |
| Score + streak | Circular progress ring (%) + flame/day-count/day-dots |
| Weekly chart | 7 CSS bars, today in accent green, animates on log |
| Daily/weekly tasks | Tappable checklist + progress challenges |
| Leaderboard | Ranked rows, "You" highlighted, live re-sort |
| Activity feed | Icon · text · time, prepends new entries |
| FX | Count-up, confetti (DOM particles, brand colors), toast (`aria-live`), reset control |

---

## 9. Verification (what to demo)

1. Open the dashboard → tree at **stage 1 (seed)**, `0.0 kg`, leaderboard with "You" near the top.
2. On the **daily suggestion** card, tap **"Log this trip"** → total counts up (e.g. to `1.4 kg`), confetti + toast "+1.4 kg saved! 🌱", today's bar grows, an activity row appears.
3. Tap a couple of **daily tasks** → cross thresholds → **tree grows** seed → sapling → young tree, with glow pulses.
4. Keep logging → tree reaches **full → blossoming**, and **"You" overtakes a friend** on the leaderboard (rows reorder).
5. Press **⟳ reset** (or `R`) → everything returns to the initial state, ready to re-run.
6. Toggle OS **Reduce Motion** → confirm stages snap, numbers still update, no confetti.

See `demo-script.md` for the presenter's exact tap sequence.
