# Censorfest

Event website and operations plan for Censorfest — a 168-hour asymmetric
adversarial CTF and live broadcast network crucible.

## Contents

Three pages, one for each audience. They share a stylesheet and a script.

| Path | Audience | What it covers |
|---|---|---|
| `index.html` | **Competitors** | The work, a sample day per faction, the Range, flag classes, the week, scoring, kit, rules of engagement, apply |
| `crew.html` | **White Team** | Ten roles, duty roster, daily runbook, arbitration procedure, incident handling, the pre-event build |
| `sponsors.html` | **Sponsors** | What the event is, who's in the room, tiers, where the money goes, the staged approach |
| `assets/styles.css` | — | All styling. Design tokens at the top of the file. |
| `assets/site.js` | — | Hero canvas ambience only. The site works fine without it. |
| `PLAN.md` | — | **Operations plan v4.0** — the redesigned event. |
| `REVIEW.md` | — | Review of the original v3.0 plan. The record of *why* v4.0 differs. |

Read `PLAN.md` for what the event now is; `REVIEW.md` for the findings that
produced it.

Each page carries one of the three faction colours as its `--accent`, set by a
body class (`p-compete` / `p-crew` / `p-sponsor`), so the three sites read as
one system rather than three unrelated designs. The audience switcher in the
nav stays visible at every width — it is how you reach the other two.

## Running it

Static site, no build step. Open `index.html`, or:

```sh
python3 -m http.server 8000
```

Deploys as-is to GitHub Pages, Netlify, Cloudflare Pages or any static host —
point it at the repository root.

## What changed in v4.0

v3.0 asked thirty people to endure 168 hours, which generated most of the
problems in `REVIEW.md`. v4.0 inverts the premise:

> The infrastructure runs for 168 hours. The people don't.

Red Factions are scored on **bridge-hours** — how long a tunnel survives while
unattended and undetected, at a 1.5× multiplier when the team is off the floor.
You cannot babysit something you're scored on for a week, so rest stops being a
rule competitors resent and becomes the format working as designed.

Everything else follows from that, or from a specific review finding:

- **Factions restructured** — Red 18 in six teams, Blue 12 in three watches for
  real 24-hour cover. v3.0's 3–5 person Blue roster could not cover 168 hours.
- **Both ladders escalate.** Blue gains a capability layer per day; Red gains
  bridge slots. The contested space closes across the week.
- **The Service Floor** — Blue must hold the Range above 95% availability, so
  "block everything" is a forfeit rather than a winning strategy.
- **Disclosure Orders** replace physical searches of competitors — an in-game
  legal instrument instead of a legal problem.
- **Three VLANs.** The capture path is one-way, ACL'd and instrumented; v3.0
  dual-homed every competitor onto an unblockable network, which broke the game.
- **NDI|HX** instead of full NDI — ~450 Mbps across 30 streams rather than 3.7 Gbps.
- **The Range** — fifteen organiser-owned services, gateway-allowlisted, so scope
  is enforced by the network rather than by good behaviour.
- **Budget rebuilt** at consistent headcount with the missing lines restored, plus
  a ~USD 16k pilot that makes the flagship fundable.

## Design

A single committed dark identity — this is a nocturnal 24/7 broadcast brand.
The palette comes from the event's own structure: two opposed forces separated
by an inspection layer.

- **Red Faction** `#FF5A36`, **Blue Faction** `#6EA8FF`, **White Team / escalation** `#E9B949`
- Ground `#0A0E13`, surface `#121820`, hairline `#263140`, text `#D9E2EC`
- Monospace as the display face; system sans for body. No webfonts are loaded,
  so there is nothing to fail on a slow connection.

**The Week** (§3) is the signature element: Blue's capability descends from the
top of each column, Red's bridge slots rise from the bottom, and the gap between
them narrows from 75% to 15% across the seven days. Both series are real values
from `PLAN.md`, and the columns share row lines via CSS subgrid so the bars can
actually be compared across days.

The hero canvas draws traffic crossing an inspection line — most packets short,
a few long streaks that clear it and keep going, which is what the event scores.
Disabled under `prefers-reduced-motion`; pauses on hidden tabs.

## Before this goes live

**Placeholders.** Everything the plan hasn't decided is marked with a dashed
amber `TBC` chip rather than invented. Search all three pages for `class="tbc"`:

- Dates, venue and city
- Broadcast platform and audience figures
- Application open date, crew build-phase start
- Sponsor branding deadline

Contact addresses are `apply@`, `crew@` and `partners@censorfest.example` —
`.example` is a reserved domain, so these are inert until replaced.

**The sponsor page deliberately quotes no viewership number.** It says so, in
as many words, and points at the pilot as the thing that will produce one. Do
not fill that gap with a projection before the pilot has run — the page's
credibility with a sponsor rests on that paragraph.

**Two open decisions from `PLAN.md` §12** affect the site copy directly:

1. **Pilot or flagship first.** The site currently describes the flagship. If you
   run Censorfest Zero first (recommended — §10.2), the vitals and Apply section
   need its numbers instead.
2. **The name.** `Censorfest` reads as celebrating censorship, which is backwards
   from what the event does, and it is the hardest word in the sponsor pitch.
   Kept here because it's your brand and your call, but it is cheap to change now
   and expensive later.
