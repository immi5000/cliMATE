# cli-MATE Dashboard — Demo Script

A tight ~60-second stage flow that shows the tree growing from seed to bloom. See `dashboard-brief.md` for the full spec.

## Before you start
- Tune `tree thresholds` low (`[0, 5, 12, 22, 35]`) and per-action kg so ~4–5 taps reach the blossoming stage.
- Set "You" just below #1 on the leaderboard so a couple of logs let you overtake.
- Make sure the demo starts at the reset state (press **⟳** / **R**).

## The flow

| # | Action | What the audience sees |
|---|---|---|
| 1 | **Open the dashboard** | Tree at **stage 1 (seed)**, `0.0 kg CO₂ saved`, week bars low, "You" near the top of the leaderboard. |
| 2 | Read the **"Today's smart swap"** card aloud: *"Take your bike to work today — your usual 8 km train trip → biking saves ~1.4 kg CO₂."* | Establishes the suggestion feature. |
| 3 | Tap **"Log this trip"** on the suggestion | Total **counts up to 1.4 kg**, confetti + toast *"+1.4 kg saved! 🌱"*, today's chart bar grows, new activity row appears. |
| 4 | Tap **daily task "Bike to work" (+1.2 kg)** | Task checks off, total climbs, **tree grows seed → sapling** with a green glow pulse. |
| 5 | Tap **another daily task** (e.g. "Skip the rideshare" +0.9 kg) | **Tree → young tree.** |
| 6 | Tap **"Log a trip" → Transit chip** (preset kg) | Crosses the next threshold → **tree → full tree.** |
| 7 | Tap one more action | **Tree → blossoming** (flowers/petals), and **"You" overtakes a friend** — leaderboard rows reorder live. |
| 8 | **Closing line** | "Every small swap grows your garden — and your city's." |
| 9 | Press **⟳ reset** (or **R**) | Everything snaps back to initial — ready for the next run. |

## Talking points to weave in
- The **daily suggestion** is distance-aware ("8 km train → bike = 1.4 kg"), so it feels personal, not generic.
- The **tree** is the emotional payoff: progress you can *see*, not just a number.
- The **leaderboard re-sort** shows the social/competitive hook.
- **Streak + score ring** reinforce the daily-habit loop from the landing page.

## Accessibility note (if asked)
Toggle OS **Reduce Motion** and re-run: stages snap instead of animating, numbers still update, no confetti — the app stays fully usable.
