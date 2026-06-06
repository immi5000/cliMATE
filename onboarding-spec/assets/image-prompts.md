# Image Generation Prompts

Paste-ready prompts for an AI image generator (Base44's built-in image tool, DALL·E, Midjourney, etc.). Each generates one asset. Save the output to the filename specified, in this `assets/` folder.

Use a square 1024×1024 canvas for hero illustrations and a portrait 768×1024 for backgrounds, then crop/scale in the app.

---

## welcome-hero.png

**Where it's used:** Welcome screen, lower 30% of viewport.

**Prompt:**

> A soft, abstract cluster of overlapping translucent circles in warm earth tones, arranged like a friendly bouquet. Colors: muted gold (#cba258), soft green-tint (#d4e9e2), deep forest green (#00754a at 50% opacity), dark teal (#1e3932 at 30% opacity), and cream-white (#f2f0eb). One small accent circle floats slightly above the main cluster. Flat illustration, no gradients, no outlines, no text. Background: warm cream (#f2f0eb). Minimal, calming, modernist. Inspired by a watercolor bubble cluster. Square aspect ratio.

---

## flights-hero.png

**Where it's used:** Phase 6 Flights screen, optional small illustration above the header.

**Prompt:**

> A single minimal airplane silhouette in deep forest green (#1e3932), traveling left to right along a softly arched dotted flight path. The dotted path uses the same green at 40% opacity. Background: warm cream (#f2f0eb). Flat vector style, no shading, no text. The airplane is small in frame, ~25% of canvas width. Wide landscape aspect ratio (3:1).

---

## results-globe-hero.png

**Where it's used:** Results Card 1 Weekly CO2 hero, decorative background OR small icon at top.

**Prompt:**

> A stylized globe icon viewed from above-the-equator angle, rendered in flat illustration style. Continents in deep forest green (#1e3932), oceans in muted green-light (#d4e9e2). A very subtle warm orange-gold gradient overlay (#cba258 at 20% opacity) wraps the upper-right hemisphere, suggesting warming. No clouds, no atmosphere lines, no text. Background: warm cream (#f2f0eb). Square aspect ratio. Minimalist, calm.

---

## reveal-bg-transport.png

**Where it's used:** Interstitial Reveal 1 (Transport Impact) — optional very subtle background pattern.

**Prompt:**

> An extremely faint, abstract pattern of road-like wavy lines flowing diagonally across a warm cream background (#f2f0eb). Lines in green-accent (#00754a) at only 6% opacity — barely visible, more like watermark. No text, no road markings, no signs. Minimal, calm, designed to sit behind a large gold stat number without distracting. Square aspect ratio.

---

## reveal-bg-diet.png

**Where it's used:** Interstitial Reveal 2 (Diet Impact) — optional faint background.

**Prompt:**

> An extremely faint, abstract pattern of organic plant-leaf silhouettes scattered sparsely across a warm cream background (#f2f0eb). Leaves in green-accent (#00754a) at only 6% opacity — barely visible. No outlines, no veins drawn, just simple leaf shapes. Minimal, calm. Square aspect ratio.

---

## reveal-bg-flights.png

**Where it's used:** Interstitial Reveal 3 (Flight Impact) — optional faint background.

**Prompt:**

> An extremely faint, abstract pattern of converging arched dotted lines suggesting flight paths across a warm cream background (#f2f0eb). Lines in house-green (#1e3932) at only 6% opacity. Minimal, calm, no airplanes, no labels. Square aspect ratio.

---

## avatar-set.png (optional)

**Where it's used:** Photo screen, when user taps "Pick an avatar" — modal showing 8 avatar choices.

**Prompt:**

> A 4×2 grid of 8 minimal flat-illustration avatars on a white background. Each avatar is a single round circular face in earth-tone palette colors: green-accent (#00754a), starbucks-green (#006241), gold (#cba258), green-light (#d4e9e2), house-green (#1e3932), cream (#f2f0eb), ceramic (#edebe9). Faces have only the simplest features (two dots for eyes, a small curve for mouth, no nose, no hair). Each avatar in its own colored circle background, evenly spaced. No text. Square aspect ratio.

---

## How to use these

1. Paste each prompt into Base44's image tool (or DALL·E / Midjourney).
2. Save the output to the filename in the heading (e.g. `welcome-hero.png`) in this `assets/` folder.
3. Reference them in code by relative path: `/assets/welcome-hero.png`.

If Base44 generates assets that don't match the cliMATE palette (the most common drift), iterate by adding *"strict palette: only use these exact hex colors: #f2f0eb, #cba258, #d4e9e2, #00754a, #1e3932"* to the prompt and regenerating.

---

## Assets already in this folder (do not regenerate)

- `CliMateLogo.png` — official cliMATE logo. Use on Welcome screen and Results header.
- `treesback.png` — pre-rendered tree silhouette background. Use as optional background on Welcome or as decorative element on Results Card 2. Do not stretch — preserve aspect ratio.
