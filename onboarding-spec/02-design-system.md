# 02 — Design System

Every value here is final. Use the exact hex codes, font names, and pixel values.

---

## Color palette

Mirror the cliMATE landing page exactly. Cream canvas, deep house-green for headlines, Starbucks-green for CTAs, gold accent reserved for big stat moments only.

| Token | Hex | Use |
|---|---|---|
| `--cream` | `#f2f0eb` | Primary canvas (every screen background). |
| `--ceramic` | `#edebe9` | Secondary background — pressed-state of cards, divider regions. |
| `--white` | `#ffffff` | Card and surface fill. |
| `--starbucks-green` | `#006241` | Headline color on cards. |
| `--green-accent` | `#00754a` | Primary CTA fill. Selected-option border and check. |
| `--house-green` | `#1e3932` | Question text on cream. Dark-band backgrounds (rare; e.g. footer of Results). |
| `--green-light` | `#d4e9e2` | Selected-option soft background tint (alongside `--selected-bg`). |
| `--gold` | `#cba258` | **Reserved.** Only the big stat numbers on interstitial reveals and Results. Never used for chrome. |
| `--text` | `rgba(0,0,0,0.87)` | Primary body text. |
| `--text-soft` | `rgba(0,0,0,0.52)` | Secondary text, captions, subheads. |
| `--text-white` | `#ffffff` | Text on dark-green bands. |
| `--text-white-soft` | `rgba(255,255,255,0.72)` | Secondary text on dark bands. |
| `--selected-border` | `#00754a` | Border of a selected option button. |
| `--selected-bg` | `rgba(0,117,74,0.07)` | Fill of a selected option button. |
| `--divider` | `rgba(0,0,0,0.08)` | Hairlines, progress-bar track. |

---

## Typography

**Font family**: Manrope (Google Fonts). Load weights 400, 600, 700, 800.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
```

No serif fonts anywhere. Even though the 5Locks reference uses serifs, cliMATE matches the landing page (which is all sans-serif).

### Type scale

| Token | Size | Weight | Line height | Letter-spacing | Use |
|---|---|---|---|---|---|
| `display-xl` | 48px | 800 | 52px | -0.04em | Hero stat on interstitial reveals (the gold number). |
| `display-lg` | 36px | 800 | 40px | -0.04em | Big number on Results "Weekly CO2" card. |
| `h1` | 28px | 800 | 34px | -0.02em | Screen question headline. |
| `h2` | 22px | 700 | 28px | -0.02em | Card titles, section headers on Results. |
| `body-lg` | 17px | 600 | 24px | -0.01em | Option button labels. |
| `body` | 15px | 400 | 22px | 0 | Body copy, subheads. |
| `body-sm` | 13px | 400 | 18px | 0 | Sublabels, captions. |
| `meta` | 12px | 600 | 16px | 0.04em | Progress bar label, eyebrow tags, uppercase. |
| `button` | 17px | 700 | 20px | -0.01em | Primary button label. |

---

## Spacing scale

Use only these values. No `7px`, no `18px` improvisation.

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64`

Common patterns:
- Screen horizontal padding: **20px**
- Card padding: **16px** (or **24px** for hero cards on Results)
- Gap between option buttons: **10px**
- Gap between heading and subhead: **8px**
- Gap between heading block and content: **20–28px**

---

## Components

### Primary button

The single most-repeated component. Used as the bottom CTA on every screen except Welcome (which has its own hero CTA).

- Full-width inside 20px screen padding.
- Background: `#ffffff` on cream (high-contrast pill, matches the 5Locks "Continue" button), OR `#00754a` with white text (for hero / Welcome).
- Border radius: **999px** (full pill).
- Padding: **18px** vertical, **24px** horizontal.
- Min height: **56px** (touch target).
- Shadow: `0 10px 20px rgba(0,117,74,0.22)` (green tint), or `0 8px 24px rgba(0,0,0,0.08)` for the white variant.
- Active state: `scale(0.96)`, 120ms ease.
- Disabled state: 0.4 opacity, no shadow, pointer-events: none.

**Variants:**
- `primary-white` (default for Continue) — white fill, `--house-green` text.
- `primary-green` (Welcome CTA, Results) — `--green-accent` fill, white text.

### Option button

Used for every multi-choice question (life stage, transport mode, diet, etc.).

- Layout: horizontal row of [emoji badge] · [label + optional sublabel] · [radio dot].
- Background: white. Border: 1.5px `--divider`. Radius: 16px. Padding: 16px.
- Emoji badge: 44×44 ceramic-fill square, 14px radius, emoji centered at 22px.
- Selected state: border becomes `--selected-border`, background `--selected-bg`, emoji badge fill becomes `rgba(0,117,74,0.12)`, radio dot fills green with white checkmark.
- Shadow: `0 3px 10px rgba(0,0,0,0.07)`.
- Tap feedback: opacity 0.72 on press.

### Card

- Background: white. Radius: 16px (or 24px for hero cards).
- Shadow: `0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05)`.
- Padding: 24px.

### Progress bar

- Track: 4px tall, full screen width minus 24px horizontal padding, `--divider` fill, 99px radius.
- Fill: `--green-accent`, animated width-transition (240ms ease).
- Label to the right: `"3 of 14"` in `meta` style, `--text-soft` color.
- **Total varies by branch** — see `03-screen-flow.md` for the per-branch step count.

### Slider (used only on the optional "phone time" pre-reveal screen if Base44 chooses to mirror 5Locks closely — not part of core flow)

- Track: 4px, `--divider` fill, 99px radius.
- Active fill: `--gold` (gold accent allowed here because it's a stat-related screen).
- Thumb: 24px circle, white fill, `--gold` border, `0 4px 12px rgba(0,0,0,0.12)` shadow.

### Text input (used only on Name screen)

- No box, no border by default.
- 32px font size, weight 700, `--house-green` color.
- Bottom border: 2px `--divider`, animates to `--green-accent` on focus.
- Placeholder: `--text-soft`.

---

## Layout

### Screen frame

Every onboarding screen uses the same outer frame:

```
[Safe-area top inset]
[Progress bar — 8px top padding, 12px bottom]
[Scrollable content area]
  [Header: 28px top padding, 20px bottom — question + subhead]
  [Content: option list, slider, input, etc.]
  [Spacer flex]
  [Primary CTA — 16px from bottom safe area]
[Safe-area bottom inset]
```

The CTA is always pinned near the bottom. If content overflows the viewport, the page scrolls; the CTA scrolls with it (do not fix to viewport bottom — feels disconnected from the question).

### Interstitial reveal frame

Different from the standard frame. Modeled on 5Locks reference 04:

```
[Safe-area top inset]
[Empty top space ~25% of viewport]
[Eyebrow text — small, --text-soft, e.g. "Your transport so far"]
[Big stat — display-xl, --gold]
[Supporting sentence — body, centered, --text]
[Empty bottom space ~30% of viewport]
[Primary CTA Continue button]
[Safe-area bottom inset]
```

No progress bar on reveal screens. They are intentionally a "moment" in the flow.

### Results screen frame

See [04-screens/results.md](04-screens/results.md) for the full layout. Five scrollable cards stacked vertically, with the Weekly CO2 hero card at top.

---

## Voice / writing rules

- **Sentence case**, not Title Case. "How do you usually get to work?" not "How Do You Usually Get To Work?"
- **No exclamation marks** anywhere except the Welcome screen's tagline.
- **No emoji in headlines** — only on option buttons (where they're decorative badges).
- **Numbers as numerals** in stats: "2,190 hours" not "two thousand one hundred ninety hours."
- **Units are full words** at small scale, abbreviated at large scale: "1.5 kg" (large stat) and "kilograms per day" (caption).
- **Abbreviate CO2 as "CO2"** (no subscript — keep it readable as plain text).

---

## Motion

Keep it subtle. Three approved patterns:

1. **Screen transition** — 240ms cross-fade. No slide.
2. **Stat reveal** — on reveal screens, the big gold number fades in + scales from 0.92 → 1.0 over 600ms, ease-out, starting 200ms after the screen mounts. This is the only "wow" moment.
3. **Option select** — 120ms color/border transition. No bounce.

No carousels, no parallax, no shimmer placeholders, no Lottie. The 5Locks references are visually still for a reason — calm equals trustworthy.
