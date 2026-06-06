# 01 — Product Brief

## What cliMATE is

cliMATE is a social sustainability app. Users track the carbon footprint of their daily decisions — how they commute, what they eat, how they power their home, what they buy — and compare progress with friends in weekly challenges and leaderboards. The goal is behavior change through visibility, gentle competition, and personalized "what-if" projections that show users the lever with the biggest payoff.

## What onboarding does

Onboarding is the user's first ~3 minutes with the app. It accomplishes three things:

1. **Data collection** — 16 lifestyle questions across 7 phases, mostly single-tap answers.
2. **Emotional anchoring** — 3 short "impact reveal" screens mid-flow that show the user a dramatic real-world equivalent of their answers so far (e.g. *"If everyone ate like you, we'd need 4.3 Earths to sustain humanity"*).
3. **Personalized baseline** — a Results screen that computes the user's weekly CO2 in kg, projects it across their lifetime, ranks it against IPCC scenarios, and surfaces the 3 highest-leverage changes they could make.

Onboarding ends when the user finishes reading their Results. Nothing after that is in scope here.

## Target user

- Adults 18–45, primarily in North America.
- Climate-curious but not climate-expert. They've heard "carbon footprint" but couldn't quote a number for their own.
- Phone-first. They'll do onboarding on the couch, not at a desk.
- Skeptical of preachy environmental messaging. They want facts, not lectures.

## Tone of voice

- **Conversational, second-person.** "How do you usually get to work?" not "Please indicate your commute method."
- **Warm but factual.** State the number; let the number do the emotional work. "One round-trip domestic flight ≈ 1 ton CO2" is more powerful than "Flying a lot is bad for the planet."
- **Never moralizing.** No "should," no "must," no "guilt." Vegan and meat-heavy eaters get the same neutral acknowledgment.
- **Specific over vague.** "2,190 hours on your phone this year" beats "you spend a lot of time on your phone."
- **The emotional anchor**: *"If everyone lived like you, by 2100…"* This framing appears once, in the Results screen lifetime projection. Don't overuse it elsewhere.

## Non-goals

These are explicitly **out of scope** — do not build them, even if they seem like natural next steps:

- Main app / home dashboard
- Friend social graph, leaderboards, challenges, photo-verification habits
- User accounts, login, authentication, password recovery
- Backend persistence — state lives in memory or `localStorage` only
- Push notifications, calendar integration, weather data
- Multiple language support — English only for this spec
- Dark mode — light cream theme only

## Success criteria

A user can complete the onboarding in 2–3 minutes, see a weekly CO2 estimate they trust, and walk away with at least one concrete change idea they could act on. Trust comes from the screens *not* feeling generic — the 3 interstitial reveals and the 3 personalized "what-if" cards on Results both reference the user's actual answers.
