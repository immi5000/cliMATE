# Phase 3 — Weekend Transport (merge screen)

All 5 transport branches converge here. After this, the user sees the first interstitial reveal (Transport Impact).

---

## Screen: Weekend

**Route:** `/transport/weekend`
**Phase:** 3 — Daily Transport (merge)
**Progress bar step:** varies by branch (8 of 13, 9 of 14, 9 of 15, etc. — last Phase 3 screen for every branch)

### Layout

Standard frame.

### Copy

- H1: `On days off, how do you usually get around?`
- Subhead: `Weekends and free time.`
- Options:
  - 🚶  `Mostly walk or bike` → `walkBike`
  - 🚇  `Public transit` → `publicTransit`
  - 🚗  `Drive myself` → `drive`
  - 🔀  `Mix of everything` → `mix`
  - 🏠  `Mostly stay home` → `stayHome`
- CTA: `Continue`

### Validation

Required.

### State write

`answers.weekendTransport = <value>`

### Next screen

Reveal1 — Transport Impact (`/reveal/transport`).
