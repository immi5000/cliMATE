# Phase 7 — Goals & Motivation (1 screen)

Sets up the personalized challenge engine on the Results screen. The user's pick determines which "what-if" card is highlighted as the suggested first challenge.

---

## Screen: Goals

**Route:** `/goals`
**Phase:** 7 — Goals & Motivation

### Layout

Standard frame.

### Copy

- H1: `What area do you most want to improve?`
- Subhead: `This becomes your first weekly challenge after onboarding.`
- Options:
  - 🚗  `How I get around` → `transport`
  - 🥗  `What I eat` → `diet`
  - ⚡  `My home energy` → `energy`
  - 🛍️  `What I buy` → `shopping`
  - 🌍  `All of it — show me everything` → `all`
- CTA: `See my results`

### Validation

Required.

### State write

`answers.goal = <value>`

### Next screen

Results (`/results`).
