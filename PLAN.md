# Censorfest — Operations Plan v4.0

**Format:** 168-hour asymmetric adversarial CTF and live broadcast network crucible
**Supersedes:** v3.0 (Turn-Key Weeklong Endurance Format)
**Why it changed:** see `REVIEW.md` for the findings this version resolves.

---

## 0. What changed and why

v3.0 asked **thirty people** to endure 168 hours. That single premise generated
almost every problem in the review: the sleep-deprivation liability, the impossible
3–5 person defensive roster, the "Exhaustion phase" language no insurer should read,
and most of the cost.

v4.0 inverts it.

> **The infrastructure runs for 168 hours. The people don't.**

Red Factions are scored primarily on **bridge-hours** — how long a tunnel keeps
working *while unattended and undetected*. You cannot babysit something you are
scored on for a week. You have to engineer it to survive without you, then go to bed
and find out whether it did.

This is a better game, better television, and closer to the actual professional skill.
It also dissolves the duty-of-care problem rather than disclaiming it: rest is not a
rule competitors grudgingly obey, it is the format working as intended.

Every other change in this document follows from that inversion, or from a specific
finding in the review.

| v3.0 | v4.0 |
|---|---|
| Humans endure 168 hours | Infrastructure endures 168 hours; humans work watches |
| Red: ~25 players, Blue: 3–5 | Red: 18 in 6 teams, Blue: 12 in 3 watches |
| Blue escalates, Red does not | Both ladders escalate, converging on Day 7 |
| Blue can null-route everything and win | Service Floor: Blue must keep the Range reachable |
| IOC points *before* blocking (self-contradictory) | Block first, file within a 15-minute window |
| Physical searches of competitors | Disclosure Orders — an in-game legal instrument |
| Laptops dual-homed onto an unblockable VLAN | Three VLANs; capture path is one-way and instrumented |
| 25× full NDI over gigabit (3.7 Gbps needed) | NDI\|HX on an isolated VLAN (~375 Mbps) |
| Targets unspecified | The Range — 15 organiser-built services, allowlisted |
| USD 52,400, single-shot funding | Staged: ~USD 16k pilot, ~USD 134k flagship |

---

## 1. Event vision

Censorfest is a seven-day, continuously broadcast contest between people who build
censorship-resistant infrastructure and people who take it apart.

Six Red Factions build proxy bridges into **the Range** — a self-contained environment
of web services the organisers own. One Blue Faction, working around the clock in
three watches, runs the gateway every packet crosses. The Blue Faction gets more
powerful every day. The Red Factions get more room to hide every day. On Day 7 the two
ladders meet.

The scoreboard shows one number all week: **aggregate Red bridge-hours against the
line Blue is trying to hold it under.** Everything else is detail.

---

## 2. Factions

Thirty competitors. Ten organisers.

### Red Faction — 18 competitors, 6 teams of 3

Build and maintain proxy bridges into the Range. Extract flags. Keep bridges alive.

Teams work their own hours. There is no requirement to be present at any given time,
and no scoring mechanic that rewards being awake at 04:00 — bridges accrue points
whether or not their authors are conscious.

### Blue Faction — 12 competitors, 3 watches of 4

One unified team holding the OPNsense gateway, split into three eight-hour watches:

| Watch | Hours |
|---|---|
| Dawn | 00:00 – 08:00 |
| Day | 08:00 – 16:00 |
| Night | 16:00 – 00:00 |

**Watch handover is a broadcast segment.** The outgoing watch briefs the incoming one
on air — what they saw, what they blocked, what they think is still out there. This is
how real security operations work, it is the most under-televised thing in the
industry, and it gives the stream three guaranteed set-pieces every day.

Blue is scored as a single unit across all three watches, so watches cannot compete
with each other and have every reason to hand over honestly.

### White Team — 10 organisers, non-competing

Game masters, Range engineering, arbitration, broadcast, and welfare. Rostered in
overlapping shifts; at least one arbiter and one producer on duty at all times.

---

## 3. The Range

All flag targets are **web services built and hosted by the White Team**. There are
fifteen of them, with a mixture of static content, authenticated apps, APIs, and one
large-file service that exists specifically to make throttling matter.

Three rules, stated here and repeated in the competitor handbook:

1. **Nothing outside the Range is a target.** Not the public internet, not any
   third-party service, and not any real censorship system.
2. **The gateway enforces an allowlist.** Out-of-scope destinations cannot be reached
   even by a competitor who tries. Scope is a property of the network, not of
   competitors' good behaviour.
3. **Attempting to leave scope is disqualifying**, and is logged.

Domain fronting against real CDNs is out — it breaks their terms of service and it
would be done against a sponsor's own infrastructure. The Range hosts its own fronting
target so the technique is still playable, against something we own.

If the Range is cloud-hosted, the provider is notified in writing before the event.
Sustained tunnelling from one venue IP looks exactly like an attack to an abuse desk.

---

## 4. Scoring

### Red Faction

| Source | Points |
|---|---|
| Flag capture | 50–200 by difficulty |
| **Bridge-hours** | 10 per hour per bridge that is live, carrying traffic, and undetected |
| Unattended multiplier | ×1.5 on bridge-hours accrued while no team member is on the floor |
| First blood | 50 bonus for the first capture of each flag |
| Scope violation | Disqualification |

The unattended multiplier is the whole design in one line. The most profitable thing a
Red team can do is build something that survives their absence, and then leave.

### Blue Faction

| Source | Points |
|---|---|
| Bridge detection | 100 per distinct bridge identified |
| IOC filing | 50 per detection, filed within **15 minutes of blocking** |
| Disclosure Order return | 25 per order that yields a confirmed indicator |
| **Service Floor** | 500 per day held (see below) |
| False positive | −75 per clean session blocked in error |

Blue blocks first and documents second. The 15-minute retroactive window removes
v3.0's contradiction, where filing evidence before blocking meant choosing between
scoring and defending.

### The Service Floor

Blue must keep the Range **usable** while defending it.

The White Team runs continuous synthetic probes against all fifteen Range services
from a reference client. If aggregate availability drops below **95% in any rolling
hour**, Blue forfeits that day's Service Floor award; below **85%**, Blue takes an
additional penalty.

This is the fix for v3.0's dominant strategy. "Null-route everything" is no longer a
win — it is a forfeit. It is also simply true to the job: no real defender is allowed
to take the business offline to stop an intruder.

### Winning

- **Red Faction champion** — highest-scoring team of the six.
- **Blue Faction result** — Blue "holds the week" if aggregate Red bridge-hours finish
  below the pre-published line, and "loses the week" if they finish above it. The line
  is set from the pilot data and published before Day 1.

Two independent verdicts, no false equivalence between point scales, and one number on
screen all week. Ties among Red teams break on total bridge-hours, then on first blood
count, then on earliest first capture.

---

## 5. The two ladders

Both sides escalate. Blue gains capability; Red gains room to hide. The contested space
narrows across the week and closes on Day 7.

| Day | Blue unlocks | Red unlocks | Bridge slots |
|---|---|---|---|
| 1 | URL and domain blocklists | Baseline — direct and simple proxies | 1 |
| 2 | IP and DNS blocking | — | 2 |
| 3 | Suricata / Zeek DPI | Pluggable transports | 2 |
| 4 | TLS fingerprinting (JA3/JA4) | Protocol mimicry, WebSocket transports | 3 |
| 5 | DNS sinkholing, throttling | Compartmentalised bridge pools | 3 |
| 6 | **Active probing**, automated honeypots | Probe-resistant transports | 4 |
| 7 | Sudden Death rotation | Full arsenal | 4 |

**Bridge slots** are Red's counter-escalation: the number of concurrent scored bridges
a team may run. More slots means real compartmentalisation — losing one bridge to a
honeypot no longer costs you the week — which is precisely the architecture that
survives in the field.

**Active probing** on Day 6 is the most realistic mechanic in the event. Blue may send
crafted traffic to a suspected endpoint to confirm whether it is a bridge, exactly as
real national firewalls do. Red's answer is probe-resistant transports. This single
exchange is worth more than any amount of scripted drama.

### Sudden Death — Day 7

v3.0 specified hourly target rotation without saying how Red would learn the new
targets. Defined here:

- At the top of each hour the Range publishes the next target set to the scoreboard.
- Rotation is reachable **only through a bridge that was already live before the
  rotation.** New bridges take 20 minutes to score, so you cannot simply rebuild each
  hour.

Day 7 therefore pays off the entire week's thesis: the teams that engineered for
persistence are the ones still standing. Game closes 13:00, then awards, post-mortem
and teardown.

---

## 6. Disclosure Orders

v3.0's "physical contraband discoveries during random audit rounds" is removed
entirely. Searching competitors and their belongings is a legal problem with no
upside, and it was solving a game need that a game mechanic solves better.

**Disclosure Orders** replace it:

- Blue may issue **three per day.** Each compels one Red team to disclose the
  configuration of **one** named bridge endpoint, truthfully and in full, within ten
  minutes.
- A team may **refuse once per event** at a cost of 300 points ("contempt"). Refusal is
  announced on the broadcast.
- False disclosure is disqualification.

It preserves the surprise-inspection drama, scores cleanly, requires no one to touch
anybody's possessions, and is a sharper piece of thematic design than the thing it
replaces — a censorship event where the defender's strongest instrument is a legal
demand rather than a technical one.

Equipment audits still exist, narrowly: White Team may inspect **event-issued hardware
and competitor desks**, announced, with the competitor present. Never persons, never
personal belongings.

---

## 7. Network architecture

Three VLANs. v3.0 had two, and the second one broke the game.

### VLAN 10 — Game

Every competitor packet routes through the Blue Faction's OPNsense gateway. Inspected,
throttled, sinkholed and blocked in real time. Egress allowlisted to the Range.

### VLAN 20 — Production

Staff telemetry, internal chat, the broadcast encoder chain. No competitor device
touches it. Switch management lives here and **the Blue Faction does not hold switch
credentials** — otherwise "unblockable" is a promise the architecture cannot keep.

### VLAN 30 — Capture (one-way)

This is the fix for the review's most serious finding. In v3.0, competitor laptops sat
on both the game VLAN and an unblockable production VLAN — a clean second path that
Blue could not see, on every Red machine, which any competent competitor would use to
carry flag traffic.

VLAN 30 carries video only:

- **NDI\|HX**, not full NDI. ~15 Mbps per stream against 100–150 for full NDI; 30
  streams is roughly 450 Mbps, which a gigabit fabric carries comfortably. Full NDI
  needed 3.7 Gbps and would have saturated the OBS machine's NIC at six streams.
- **Switch-enforced port ACLs** permit only NDI to the broadcast host's address and
  port range. No default gateway, no DNS, no inter-station traffic.
- **IP forwarding disabled** on the competitor image, verified per-station at handoff.
- **Instrumented.** The White Team alerts on any non-NDI traffic on VLAN 30. Using the
  capture path to move game traffic is disqualifying and detectable.
- The eight stations that get the most airtime additionally use **hardware HDMI
  encoders**, which are physically incapable of carrying return traffic.

### Hardware

L3 managed switch with 10G uplinks, plus a spare switch — v3.0 had a single switch as
a single point of failure for the whole event. OPNsense on a Protectli appliance,
Proxmox host for the Range, OBS rig with 10GbE.

### The image

**Linux**, not Windows. Every tool in this event — Wireshark, Suricata, Zeek, Docker,
and every transport and tunnelling tool a Red team will reach for — is Linux-native.
This also takes the software licensing line to zero and removes v3.0's USD 40-per-seat
Windows keys, which at that price are gray-market and a poor thing to be holding while
asking Microsoft for sponsorship.

---

## 8. Broadcast

A commentary desk on an OBS production rig, cutting between competitor screens, gateway
dashboards, the scoreboard, and the three daily watch handovers.

### Competitor protections

Non-negotiable, and all of them:

- **Opt-in written consent and media release**, signed at registration.
- **Persistent on-screen capture indicator.** Never silent. v3.0 specified capture
  running "silently in the background," which over 168 hours means broadcasting
  somebody's bank login.
- **Physical privacy cut** at every station, under the competitor's own hand.
- **60-second broadcast delay** with a producer kill switch.
- **Event accounts only.** No personal logins on event hardware, stated as a rule and
  reinforced at briefing.

---

## 9. Duty of care

### Rest

Every competitor is **off-floor for 8 hours in every 24**, badge-enforced.

This costs nothing to obey, which is the point: Red bridges accrue points — at 1.5× —
while their authors sleep, and Blue watches hand over to a rested team. The format
rewards the behaviour the rule requires. Contrast v3.0, which paid a bonus for playing
at night and named Day 6 "Exhaustion phase."

### On site

- First aid cover with a named responder on duty at all times.
- Quiet room, away from the floor and off-camera.
- Catering that includes actual food, not only caffeine.

### Code of conduct

Published with applications, agreed at registration. Named contacts, a reporting path
that does not run through the person's own faction, and a stated escalation process.
Non-negotiable for any event; doubly so for thirty people co-located for a week.

### Accommodation

Single occupancy by default. Sharing is opt-in with a named partner, confirmed before
the event. v3.0 assigned double rooms to strangers, which costs applicants and creates
avoidable risk.

---

## 10. Budget

### 10.1 Censorfest I — flagship, 30 competitors + 10 staff

| Category | Detail | USD |
|---|---|---|
| Competitor hardware | 32 refurbished laptops @ 220 (30 + 2 spares) | 7,040 |
| Software licensing | Linux golden image | 0 |
| Network gear | L3 switch w/ 10G uplinks, spare switch, OPNsense appliance, cabling | 2,400 |
| Capture chain | 8 HDMI→NDI\|HX encoders, cables | 1,600 |
| Server & broadcast | Proxmox host, OBS rig w/ 10GbE, audio, monitor wall | 3,600 |
| Venue | 7 days, 24-hour access | 14,000 |
| Venue internet | Dedicated commercial drop + install | 1,500 |
| Accommodation | 24 rooms × 8 nights @ 145, incl. ~14% occupancy tax | 31,700 |
| Catering | 40 people × 7 days @ 85, incl. ~20% service and tax | 28,600 |
| Medical & safety | First aid cover, 7 days | 3,000 |
| Security | Overnight guard, 7 nights | 3,000 |
| Insurance | Event liability, 7-day 24/7 | 3,500 |
| Staff | 10 crew — travel, honoraria, commentators | 12,000 |
| Venue infrastructure | Power, cable runs, peripherals | 1,800 |
| Cloud & domains | Range hosting, VPS pool, DNS | 600 |
| Legal | Contracts, waivers, media releases, CoC drafting | 2,500 |
| Merchandise & prizes | | 3,000 |
| **Subtotal** | | **119,840** |
| Contingency | 12% | 14,400 |
| **TOTAL** | | **134,240** |

This is what the event in this document actually costs. v3.0's 52,400 was arithmetically
correct but assumed 25 laptops for 30 people, 15 double rooms housing zero staff, USD 50
per person per day for three catered meals, and one line covering both a week of
overnight security and 24/7 liability insurance. It also omitted staff labour, staff
lodging, medical cover, legal, and every applicable tax.

### 10.2 Censorfest Zero — pilot, 12 competitors + 5 staff, 72 hours

The flagship is not a viable first event. A USD 25,000 title sponsor will not commit to
a first-run event with no audience numbers, no VOD, and no attendance history — and
v3.0's tier structure could not have funded even its own budget: one sponsor at each of
the four tiers, all at top value, totalled 42,500 against a stated 52,400.

Run a pilot first, locally recruited, no lodging:

| Category | USD |
|---|---|
| Hardware — 14 laptops | 3,080 |
| Network gear | 1,200 |
| Venue — 3 days | 2,400 |
| Internet | 400 |
| Catering — 17 × 3 days | 2,805 |
| Broadcast — single OBS rig | 1,500 |
| Insurance & safety | 1,200 |
| Cloud & domains | 300 |
| Merch & prizes | 800 |
| Contingency 15% | 2,080 |
| **TOTAL** | **≈ 15,800** |

The pilot's job is not revenue. It is to produce the three things that make the
flagship fundable: **footage**, **audience numbers**, and **the calibration data that
sets the Service Floor and the bridge-hour line.**

---

## 11. Funding

### Tiers

More slots, more price points, so no single conversation is load-bearing.

| Tier | Slots | USD each | Includes |
|---|---|---|---|
| Title | 1 | 30,000 | Naming rights, permanent overlay, first-look recruiting |
| Infrastructure | 2 | 12,000 | Gateway and station branding, hardware/cloud offset, technical segment |
| The Range | 1 | 8,000 | Named target environment, Range architecture segment |
| Watch | 3 | 6,000 | One named watch (Dawn/Day/Night) + its handover segments |
| Logistics | 2 | 5,000 | Catering and Fuel Drop rounds |
| Community | open | 1,500–2,500 | Shirt, welcome bag, site and credits |

Full sell-through is ~97,500 plus in-kind hardware and cloud credit, against 134,240.
The remainder comes from in-kind offsets (the Infrastructure and Range tiers are
designed to be taken partly in hardware and hosting) and a reduced-scope fallback.

**Competitor deposit:** USD 200, refunded on attendance. Not a revenue line — it exists
to cut no-shows on thirty funded seats, and it is waived on request, without
explanation, for anyone for whom it is a barrier.

### Segment the pitch

v3.0's target list put Cloudflare, F5 and CrowdStrike — who sell the inspection side —
next to Proton and Mullvad, who sell the evasion side, and planned to send them the same
deck. Mullvad additionally has a public policy against sponsorship marketing.

- **To enterprise security:** this is a red-team/blue-team training and recruiting event
  with a live SOC under sustained pressure, three televised watch handovers a day, and
  thirty vetted network engineers in a room. All true, and it is the strongest framing
  the event has.
- **To privacy and infrastructure brands:** lead with the transport research, the
  open-sourced Range, and the published post-mortem.
- Never the same deck.

### The name

`Censorfest` reads as celebrating censorship, which is backwards from what the event
does, and it is the hardest word in the pitch to get through a corporate brand-safety
review. It is your call and your brand, so this version keeps it — but it is worth
changing while it is still cheap. `Chokepoint`, `Throughline` and `The Narrows` all
carry the meaning without the reversal.

---

## 12. Runway

Sponsor cycles run 3–6 months; venue contracts and hotel blocks need 3+ months. v3.0's
checklist had no dates on it at all.

| When | What |
|---|---|
| T−9 months | Lock city, dates, venue. Nothing else can be costed until these exist. |
| T−8 | Run **Censorfest Zero**. Cut the sponsor reel from its footage. |
| T−7 | Rules of engagement, code of conduct, consent and media release, insurance broker. |
| T−6 | Sponsor outreach opens, segmented decks. Venue and hotel contracts signed. |
| T−5 | Range engineering begins. Golden image built and cloned. |
| T−4 | Applications open. |
| T−3 | Title and Infrastructure tiers closed. Catering and security contracted. |
| T−2 | Competitor selection. Network map finalised, gateway rules written and tested. |
| T−1 | Full technical rehearsal including capture chain and Service Floor probes. |
| T−2 weeks | Freeze the Range. Brief the broadcast crew. |

### Open decisions

Four things gate everything downstream and none of them are decided yet:

1. **City and dates** — every cost in §10 is a placeholder until this is fixed.
2. **Venue** — 24-hour access is the hard requirement and it eliminates most rooms.
3. **Pilot or flagship first** — §10.2 recommends the pilot; it is the single highest
   leverage decision in this plan.
4. **The name** — cheap to change now, expensive later.
