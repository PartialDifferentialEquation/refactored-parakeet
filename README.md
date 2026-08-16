# Censorfest

Event website for Censorfest — a 168-hour asymmetric adversarial CTF and live
broadcast network crucible.

## Contents

| Path | What it is |
|---|---|
| `index.html` | The site. Single page, no build step, no dependencies. |
| `assets/styles.css` | All styling. Design tokens are at the top of the file. |
| `assets/site.js` | Hero canvas ambience only. The site works fine without it. |
| `REVIEW.md` | **Review of the master plan.** Read this — it flags several issues that need fixing before the event can run as designed. |

## Running it

It is a static site with no build step. Open `index.html`, or:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Deploys as-is to GitHub Pages, Netlify, Cloudflare Pages or any static host — just
point it at the repository root.

## Design

A single committed dark identity, since this is a nocturnal 24/7 broadcast brand.
The palette is built around the event's own structure — two opposed factions
separated by an inspection layer:

- **Red Faction** `#FF5A36`, **Blue Faction** `#6EA8FF`, **White Team / escalation** `#E9B949`
- Ground `#0A0E13`, surface `#121820`, hairline `#263140`, text `#D9E2EC`
- Monospace as the display face; system sans for body text. No webfonts are loaded,
  so there is nothing to fail on a slow connection.

The escalation ladder in §3 is the signature element: the height of each day's blue
block is that day's capability tier straight out of the operations plan, so the
staircase is real data rather than decoration.

The hero canvas draws packets crossing an inspection line, some passing and some
dropped. It is disabled under `prefers-reduced-motion` and pauses on hidden tabs.

## Before this goes live

Two things need your attention.

**1. Placeholders.** Everything not yet decided in the master plan is marked with a
dashed amber `TBC` chip rather than invented. Search the HTML for `class="tbc"`:

- Dates, venue and city
- Broadcast platform
- Application open date and competitor fee
- Sponsor branding deadline

Contact addresses are `apply@censorfest.example` and `partners@censorfest.example` —
`.example` is a reserved domain, so these are inert until you replace them.

**2. The site states commitments the plan does not yet implement.** To be publishable
without creating legal exposure, the copy commits Censorfest to several policies that
the master plan currently lacks — organiser-owned targets only, opt-in capture consent,
an on-screen capture indicator, a broadcast delay and kill switch, equipment-only
audits, and scheduled rest. These are the right commitments, but the plan has to
actually adopt them or the site is promising something you don't deliver.

`REVIEW.md` §1 and §3 cover both in detail.
