# Censorfest Master Plan v3.0 — Review

Review of `Censorfest_Complete_Master_Plan.pdf` (v3.0, Turn-Key Weeklong Endurance
Format). Findings are ordered by how much damage they do if left unaddressed.

The arithmetic in the budget table is correct — the thirteen line items do sum to
USD 52,400. The problems are elsewhere.

---

## 1. Blockers — these break the event as designed

### 1.1 VLAN 20 hands every competitor an unmonitored, unblockable route

This is the most serious problem in the plan.

The architecture puts participant laptops on **both** VLAN 10 (inspected, blockable)
and VLAN 20 (explicitly "strictly whitelisted, unblockable," where "Sysadmins have
zero visibility or control"). NDI screen capture runs on the laptops over VLAN 20.

That means every Red Faction machine has a second network path that the Blue Faction
cannot see and cannot block, by design. Tunnelling flag traffic over the broadcast
VLAN is the single most obvious move available to any competent competitor, and the
game has no way to detect it. Day 5's "total network control" is meaningless if
there is a clean second path sitting on the same machine.

**Fix:** the capture path must be one-way and must not be a general network
interface. Either:

- **Hardware capture** — HDMI/USB-C out from each station into capture cards on the
  production side. Physically incapable of carrying return traffic. Most robust,
  most expensive.
- **Dedicated NIC with strict egress ACL** — a second interface whose switch port
  permits only NDI to the OBS host's address and port range, with IP forwarding
  disabled on the laptop, no routing, no DNS, and no default gateway on that
  interface. Cheaper, needs to be locked down at the switch and verified per-station.

Whichever you pick, instrument it and state in the rules of engagement that using the
broadcast path to move game traffic is an immediate disqualification.

### 1.2 The broadcast network cannot carry 25 NDI streams

Full-bandwidth NDI runs roughly **100–150 Mbps per 1080p stream**. Twenty-five
simultaneous participant captures is **2.5–3.75 Gbps** of sustained traffic, and OBS
pulls each stream it displays over its own single NIC.

The budgeted hardware is one managed 48-port switch and one OBS PC. On gigabit, the
OBS machine saturates its uplink at roughly **six to eight** full-bandwidth streams.
The plan calls for twenty-five running continuously.

**Fix, in order of preference:**

- Use **NDI|HX** (~8–20 Mbps per stream) rather than full NDI. 25 streams ≈ 200–500
  Mbps, which a gigabit fabric handles. Costs you a little latency and some quality —
  irrelevant for screen content.
- Put **10GbE** in the OBS machine and use a switch with 10G uplinks.
- Only run capture on stations that are **currently on air**, switched on demand,
  rather than all 25 continuously.

Budget assumes a single 48-port switch, which is also a single point of failure for
both VLANs. Add a spare.

### 1.3 The plan never says the targets are yours

Nowhere does the document state that flag targets are organiser-operated
infrastructure. It says "blocked web targets" and "hidden flags from blocked web
targets," which is ambiguous in a document that will be read by competitors and
sponsors.

If any competitor points evasion tooling at a third-party service — or at a real
censorship system — you and they are exposed to computer-misuse liability (CFAA in the
US, Computer Misuse Act in the UK, equivalents elsewhere). Related: domain fronting,
named as a Day 4 tactic, violates the terms of service of every major CDN, including
Cloudflare, who you are also planning to ask for money.

**Fix:** state explicitly and prominently that all targets are event-owned; enforce a
hard target allowlist at the gateway so out-of-scope traffic cannot leave even if
someone tries; put scope violation on the disqualification list; and if targets are
cloud-hosted, notify the provider in writing before the event, because sustained
tunnelling and evasion traffic from one venue IP will otherwise look exactly like an
attack to their abuse systems.

### 1.4 Escalation is one-directional, so "block everything" wins

Blue gains capability every day and Red gains nothing. By Day 5, with DNS sinkholing
and throttling, the dominant Blue strategy is to null-route essentially everything.
That is a legitimate win under the rules as written, and it produces two days of
nothing happening — on a live stream, in front of sponsors.

**Fix:** give Blue a **connectivity SLA**. Define baseline services that must remain
reachable with a measured latency/availability floor, verified continuously by the
White Team, with point penalties for over-blocking and for false positives against
clean traffic. This makes Blue's job the realistic one — defenders in the real world
cannot take the business offline to stop an attacker — and it keeps the game alive.
Consider also giving Red its own unlock ladder so both sides escalate.

---

## 2. Budget

The total is arithmetically right but structurally optimistic. Several lines are
under-scoped and several real costs are missing entirely.

### 2.1 Headcount is inconsistent across lines

The budget says "30 participants and staff," then provisions:

- **25 laptops** — five short of 30, before spares. Refurbished T480s are ~8-year-old
  machines being run continuously for 168 hours; some will fail. Buy 28–30.
- **15 double rooms = 30 beds** — which houses 30 people and leaves **zero rooms for
  the White Team**. A 24/7 broadcast plus game mastering plus arbitration realistically
  needs 6–10 staff. Either they are unhoused or the competitor count is really ~22.

Pick a number, and make every line agree with it. My assumption below is 30
competitors + 8 staff = 38 people.

### 2.2 Under-scoped lines

| Line | Budgeted | Realistic | Note |
|---|---|---|---|
| Food & Beverage | 10,500 | 18,000–23,000 | $50/person/day for 3 hot catered meals + 24/7 snacks is low; $75–110 is typical once service charge and tax land. Also excludes staff. |
| Accommodation | 13,650 | 17,000–20,000 | Excludes staff; likely 8 nights not 7 (people arrive the night before Day 1); excludes hotel occupancy tax, which runs 10–18%. |
| Staffing & Security | 3,500 | 6,000–9,000 | One overnight guard alone is ~$2,100–2,900 for the week. Event liability insurance for a 7-day 24/7 event is $1,500–4,000 on its own. This line currently funds both. |
| Venue | 8,500 | 8,500–25,000 | $1,214/day for a 24/7 esports arena is achievable in a cheap market or with a partner deal, and nowhere near enough in a major metro. |
| Contingency | 3,500 (6.7%) | 10–15% | First-run event on refurbished hardware. 6.7% is thin. |
| Software licensing | 1,000 | 0 | See 2.4. |

### 2.3 Missing from the budget entirely

- **White Team labour** — organisers, game masters, broadcast operators, commentators.
  If these are volunteers, say so explicitly; if not, it is a missing five-figure line.
- **Staff lodging and travel.**
- **Competitor travel** — "elite engineers" implies recruiting beyond one city. If
  travel is not covered, that needs to be stated up front; it is a real barrier.
- **Taxes and service charges** on catering and lodging (see above).
- **Medical / first aid cover** — see §3.4. For this format it is not optional.
- **Legal** — contracts, waivers, media releases, insurance brokerage.
- **Venue damage deposit**, hardware shipping, and post-event resale/disposal.
- **Broadcast extras** — music licensing, graphics package, commentator fees.
- **Payment processing fees**, if there is ever a competitor fee.

Adding the under-scoped deltas and the missing lines, a realistic all-in figure is
**USD 75,000–95,000**, not 52,400.

### 2.4 The Windows licensing line is both unnecessary and risky

USD 1,000 for 25 Windows 11 Pro licences is $40 each. Retail is ~$200; legitimate
volume pricing does not reach $40. Keys at that price are almost always resold
gray-market keys, which is a compliance problem for an event you are asking Microsoft
to sponsor.

It is also probably unnecessary — refurbished ThinkPads from a Microsoft Registered
Refurbisher normally ship with a valid Windows licence already.

More fundamentally: **the entire toolchain here is Linux-native.** Wireshark, Docker,
Suricata, Zeek, and every proxy and tunnelling tool a Red team will reach for. The
golden image should be Linux, and the line should be $0. The plan's own checklist item
says "Windows 11 / Linux," which suggests this has not actually been decided — it
needs to be.

---

## 3. Legal, safety and duty of care

### 3.1 Silent screen capture is the biggest liability in the plan

The plan specifies NDI screen capture running "**silently in the background**" on
participant laptops, cut live to a public broadcast.

Over 168 hours, people will open personal email, banking, password managers, private
messages and medical appointments. Broadcasting that silently is a serious privacy
problem, and in a number of jurisdictions a legal one — GDPR if any competitor is in
the EU, two-party consent rules in several US states, and workplace-monitoring law
where competitors are attending on company time. There is also a straightforward
security risk: API keys, SSH keys and sponsor infrastructure detail going out live.

**Fix — all of these, not a subset:**

- Explicit **written, opt-in consent** and media release, signed at registration.
- **Persistent on-screen indicator** whenever capture is running. Never silent.
- A **physical privacy cut** at each station the competitor controls themselves.
- **30–60 second broadcast delay** with a producer kill switch.
- **Event accounts only** — competitors log into nothing personal on event hardware,
  stated as a rule and reinforced at briefing.

I have written all five of these into the website's Broadcast section as public
commitments. The plan needs to be updated to actually implement them.

### 3.2 "Physical contraband discoveries during random audit rounds"

As written, this reads as staff searching competitors. That is a legal minefield —
unlawful search, personal property, and a very direct route to a discrimination or
false-accusation claim.

**Fix:** limit audits in writing to **event-issued equipment and competitor desks
only**. Announced, conducted by named White Team staff, with the competitor present,
and never extending to persons, bags or personal belongings.

### 3.3 The format actively incentivises sleep deprivation

A 168-hour event with "Night Ops bonus" rounds, a "Sudden Death" morning, and a day
whose name in the plan is literally "**Exhaustion phase**," fuelled by a budget line
for bottomless energy drinks.

Multi-day sleep deprivation carries real medical risk — cardiac events, psychiatric
episodes, and impaired judgement around a lot of electrical equipment. Two practical
consequences: your insurer may decline a claim if the documentation shows you designed
for it, and "traps 30 elite engineers in a dedicated venue for 7 days" is language you
do not want in a document that goes to an insurer, a venue or a sponsor's legal team.

**Fix:** mandated rest windows; no scoring mechanic that rewards being awake at 4am
(move the Night Ops bonus inside a defined shift or drop it); on-site first aid with a
named responder; a written duty-of-care policy; and rewrite the framing throughout.

### 3.4 No code of conduct

There is no code of conduct, no incident reporting path, and no harassment policy
anywhere in the plan. That is table stakes for any event, and non-negotiable for one
where 30 people are co-located around the clock for a week and **sharing hotel rooms**.

Related: double-occupancy rooms assigned to strangers will cost you applicants. Make
pairing opt-in, confirm it before the event, and offer a single-room upgrade path.

---

## 4. Game design

### 4.1 Blue cannot cover 168 hours with 3–5 people

That is 34–56 hours of active monitoring each. Not possible, and Blue's performance
collapsing from fatigue is not an interesting outcome.

**Fix:** either staff Blue for real 24/7 shift rotation (9–12 people minimum for three
shifts with relief), or define **quiet hours** where the gateway runs on standing
automated rules only and no manual defence is expected — which also gives Red a reason
to work at night that isn't a bonus-point bribe.

### 4.2 Manpower asymmetry is roughly 5:1

With 30 competitors and 3–5 on Blue, Red fields ~25 people across 6–8 teams against a
handful of defenders. "Asymmetric" is the premise, but this is lopsided enough that
Blue's day is pure firefighting. The connectivity SLA in §1.4 and proper shift staffing
both help; consider also capping simultaneous Red teams or rotating people through Blue.

### 4.3 Blue's scoring contradicts Blue's objective

Blue scores for **IOC submissions filed prior to blocking**, but Blue's stated goal is
to **block before flags are captured**. Writing up an indicator takes time; blocking
immediately forfeits the points. The two rules pull in opposite directions.

**Fix:** allow a retroactive filing window — block immediately, file the IOC within
N minutes for full credit. Preserves the "show your working" intent without making
Blue choose between scoring and defending.

### 4.4 Unspecified mechanics

- **Sudden Death (Day 7):** target IPs rotate hourly, but the plan never says how Red
  discovers the new targets. Broadcast? Scoreboard? Recon each hour? This is the
  climax of the event and it has no defined mechanism.
- **Cross-faction winner:** Red points and Sysadmin points are on entirely different
  scales, and nothing defines who wins overall or how ties break. Either declare
  separate Red and Blue winners, or define a normalisation.
- **Switch management:** VLAN 20 is only unblockable if Blue has no switch admin
  credentials. State this explicitly — otherwise the first clever Blue player
  reconfigures the port and takes the broadcast down.

---

## 5. Sponsorship and gaps

### 5.1 The tiers cannot fund the budget

One of each tier at top value is 25,000 + 10,000 + 5,000 + 2,500 = **USD 42,500** —
short of the stated 52,400, and far short of the realistic 75–95k. The plan needs
multiple sponsors per tier but never says how many of each it is targeting.

There is also **no revenue line other than sponsorship**. No competitor fee, no ticket,
no in-kind offsets modelled. A first-run event with no audience numbers, no prior VOD
and no attendance history landing a USD 25,000 title sponsor is a genuinely hard sell —
and if it doesn't land, the plan has no fallback. Build a tiered budget: what the event
looks like at 25k raised, at 50k, at 80k.

### 5.2 The sponsor list has conflicts

- **Cloudflare, F5, CrowdStrike** sell the DPI and filtering side. You are asking them
  to fund an event that teaches defeating it — and Day 4's domain fronting specifically
  violates CDN terms of service.
- **Proton, Mullvad** are the opposite end. Mullvad in particular has a public policy
  against affiliate and sponsorship marketing.
- **Microsoft, AWS** will run a brand-safety review, and "Censorfest" plus
  "circumvention" is a difficult packet to get through it.

**Fix:** segment the pitch. To enterprise security, this is a **red-team/blue-team
training and recruiting event** with a live SOC-under-pressure narrative — which is
true, and is the framing I used on the site. To privacy brands, lead with the research
and open-source angle. Don't send the same deck to both.

### 5.3 The name

"Censorfest" reads as celebrating censorship, which is backwards from what the event
actually does. It is also the single hardest word in the pitch for a corporate
sponsor's brand-safety reviewer. Worth reconsidering while it is still cheap to change.

### 5.4 Document and planning gaps

- **Section 7 is missing** — the document jumps from §6 Sponsorship to §8 Pre-Event
  Checklist. Something was lost. Fix before this goes to a sponsor.
- **No dates, no city, no venue** anywhere in the plan. Every downstream number —
  venue, hotel, catering, travel — depends on the city, so nothing in the budget can be
  firmed up until this is decided. It is the first thing to lock.
- **No competitor selection process**, application criteria, or fee.
- **No refund, cancellation or force majeure policy.**
- **No broadcast platform chosen**, no VOD plan, no music rights.
- **No marketing or comms plan** — nothing about how 30 elite engineers hear about this.
- **No timeline on the checklist.** Sponsor sales cycles run 3–6 months; venue
  contracts and hotel blocks need 3+ months. This plan needs a **6–9 month runway**,
  and the checklist should be dated backwards from a target event date.

---

## Suggested order of work

1. Lock **city, dates, venue** — nothing else can be costed until these exist.
2. Fix the **VLAN 20 side channel** (§1.1) and the **NDI bandwidth** plan (§1.2).
3. Write the **rules of engagement**: target scope, allowlist, disqualifications (§1.3).
4. Write the **code of conduct**, **consent/media release**, and **audit policy** (§3).
5. Rebuild the budget at realistic numbers with a headcount that agrees across lines,
   and produce 25k / 50k / 80k tiers (§2, §5.1).
6. Fix the **connectivity SLA**, **Blue shift staffing**, and **IOC scoring** (§4).
7. Then run the sponsor outreach, with segmented decks (§5.2).
