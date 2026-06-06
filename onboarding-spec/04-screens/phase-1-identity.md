# Phase 1 — Identity (3 screens)

Sets the personalization tone. The only screen with text input is Name.

---

## Screen: Welcome

**Route:** `/welcome`
**Phase:** 1 — Identity
**Progress bar:** hidden

### Layout

```
[Top safe area]
[Top-center: small CliMateLogo.png — 32px height, --house-green tint if SVG, else as-is]
[Vertical center block:]
  [Eyebrow tag: "CLIMATE" — meta style, --text-soft, letter-spacing 0.16em]
  [H1 headline, centered]
  [Subhead, centered]
[Bottom 24% of screen:]
  [Hero illustration: assets/welcome-hero.png — warm circle cluster]
[Below illustration:]
  [Primary green button — full width]
  [Tiny print below button]
```

### Copy

- Eyebrow: `CLIMATE`
- Headline: `Know your footprint. Change the future.`
- Subhead: `A few quick questions and we'll show you exactly where you stand — and the highest-impact thing you could change today.`
- CTA: `Bismillah, let's get started →`  *(Use this exact label. Inspired by the 5Locks "Bismillah, let's get started" reference — warm and personal. If localization is added later, this becomes "Let's get started".)*
- Tiny print: `Takes about 2–3 minutes`

### Controls

- One button: `primary-green` variant, navigates to `/photo`.

### Validation

- None.

### State write

- None.

### Next screen

- Photo (always).

---

## Screen: Photo

**Route:** `/photo`
**Phase:** 1 — Identity
**Progress bar step:** 1 of [branch total]

### Layout

```
[Progress bar]
[Header block (28px top padding):]
  [H1: "Add a photo"]
  [Subhead]
[Content (centered):]
  [Circular photo preview — 160px diameter, ceramic fill if empty]
    [If empty: camera-icon centered in preview, 32px, --text-soft]
    [If photo set: rendered photo, 1.5px --green-accent border]
  [Vertical stack of 3 action rows, each a row component:]
    Row 1: 📷  "Take a photo"
    Row 2: 🖼️  "Choose from library"
    Row 3: 🎨  "Pick an avatar"
  [Each row: white card, 56px tall, 16px radius, --divider border, body-lg label]
[Spacer flex]
[Skip link — text button, --text-soft, "Skip for now"]
[Primary CTA: "Continue"]
```

### Copy

- H1: `Add a photo`
- Subhead: `Optional. You'll see it on your profile and in the friend leaderboard later.`
- Action rows: `Take a photo`, `Choose from library`, `Pick an avatar`
- Skip: `Skip for now`
- CTA: `Continue`

### Controls

- Three row buttons:
  - `Take a photo` — opens camera (web: `<input type="file" accept="image/*" capture>`).
  - `Choose from library` — opens file picker (`<input type="file" accept="image/*">`).
  - `Pick an avatar` — opens a modal sheet with 8 pre-rendered avatar SVGs. Tapping one selects it.
- Skip link — sets `answers.photo = null`, navigates to Name.
- Continue button — navigates to Name. Enabled regardless of photo state.

### Validation

- None. Photo is fully optional.

### State write

- `answers.photo = <data URL | avatar key | null>`

### Next screen

- Name (always).

---

## Screen: Name

**Route:** `/name`
**Phase:** 1 — Identity
**Progress bar step:** 2 of [branch total]

### Layout

```
[Progress bar]
[Header block:]
  [H1: "What should we call you?"]
  [Subhead: "Just a first name is fine."]
[Content (32px top padding):]
  [Underlined text input — 32px font weight 700, --house-green]
    [Placeholder: "Your name"]
    [Bottom border: 2px --divider → --green-accent on focus]
  [Below input, 32px top margin, an animated greeting that appears once the user types:]
    [body-lg, --text-soft: "Nice to meet you, {name}."]
    [Appears with 200ms fade after first keystroke]
[Spacer flex]
[Primary CTA: "Continue"]
```

### Copy

- H1: `What should we call you?`
- Subhead: `Just a first name is fine.`
- Input placeholder: `Your name`
- Greeting (after typing): `Nice to meet you, {name}.`
- CTA: `Continue`

### Controls

- Text input — autofocus on mount, max 24 characters, autocapitalize first letter.
- Continue button — disabled until input is non-empty (≥1 visible character after trim).

### Validation

- Required, ≥1 character. Show no error text; just keep CTA disabled.

### State write

- `answers.name = <trimmed string>`

### Next screen

- Location (always).
