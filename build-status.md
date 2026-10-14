# Build Status

## Project

- Course: AI Builder Foundations (one evening: Spec, Build, Check; four work cards; no GitHub, Vercel or deploy tonight)
- Name: KL Survival Budget
- Build shape: Content-led site with sample data (sample-data dashboard)
- Shape confirmation: Confirmed
- Current KDBM Lite stage: Build
- Current phase: Ready to Build
- Current work card: `work-cards/04-save-or-polish.md` (implemented; awaiting learner check)

## Completed planning phases

- [x] Project Brief
- [x] Architecture
- [x] Design
- [x] Build Blueprint
- [x] Work Cards 01 to 04

## Completed work cards

- [x] 00 Setup Gate
- [x] 01 Project Skeleton
- [x] 02 First Visible Version
- [x] 03 Core Behaviour
- [x] 04 Save or Polish
- [x] Post-card feature: weekly event reveal animation (learner-requested, beyond the four cards)
- [x] UI redesign (learner-requested, overrides some locked design rules — recorded in `design.md`)
- [x] Anti-slop pass 2 (learner feedback)

## In progress

- [ ] Nothing — all four work cards done, reveal animation, UI redesign and anti-slop pass 2 in; awaiting learner stop/close

## Blockers

- None recorded yet

## Decisions made

- Build type: Not confirmed yet
- Build shape: Content-led site with sample data (a sample-data dashboard), confirmed
- Stack: Vite + React + plain CSS, one page, no backend/database/API
- Design inspiration: Fallback 3 Playful student dashboard; entertainment mood; anti-slop stance; accent #0F9D8F
- UI redesign (learner-requested): hero health tint Safe/Tight/Danger + status subtitle + danger pulse; category pill widgets; event timeline/feed with icons and impact tags; Shopee-orange and transit-blue accents; softer floating shadows; primary `Next week` + quiet `Start again` link; summary banner end state; plain CSS kept (Tailwind rejected). Recorded in `design.md`; overrides the earlier money-left-colour-only rule
- Storage: None (a site saves nothing; no localStorage)
- Structure: header, inputs card, hero card (money left + week + stacked bar), rows card (rent/transport/food + weekly events), controls, end message
- Deployment target: None tonight (Ship is taught in Build & Ship)
- Project name: KL Survival Budget
- Proof target: sample inputs give RM400.00 taken per week before the event, month ends RM200.00–RM1,200.00 left
- Card 01: Vite + React scaffolded into `app-temp`, moved up beside `START_HERE.md`, `app-temp` deleted; `index.html` title and `package.json` name set; `src/` trimmed to the header + one-line purpose
- Card 02: full static layout built from `design.md` `## Visual recipe` — header + `Sample data` pill, 4 prefilled inputs (non-interactive), hero card with `RM -` placeholder + `Week 0 of 4` + empty stacked bar + legend, rows card (rent/transport/food rows + 4 placeholder week rows), Next week / Start again buttons (disabled), end message. No figure worked out, no interactivity, no new libraries
- Card 03: game logic in code — `inputs`/`locked`/`weeks` state; weekly take rent/4+transport/4+food/4; one random event per week from the six fixed events; derived money left, amounts taken, week reached, stacked-bar and row-bar shares (shares of money spent so far); input lock after first press; Next week disabled until all four inputs valid; accent/red-minus money-left colour; "Ran out in week N" / "Made it with RM X left"; Start again restores sample inputs and week 0. Verified: RM400.00/week before event, end range RM200.00–RM1,200.00
- Card 04: polish — bars (stacked + row) grow from 0 on load via a mount flag + CSS transition, with a `prefers-reduced-motion` guard and no other motion; mobile verified at a true 375px viewport (no horizontal overflow, 343px cards, 48px buttons, 56px hero figure, 20px padding under 360px); labels tied to inputs, real buttons, visible focus rings, contrast kept; anti-slop pass (no refresh instruction, no logo/testimonial/stats, no localStorage); content check (two decimals, six events match, both end messages)
- Post-card feature: weekly event reveal animation — the newest event row pops/slides in (`row-reveal`) and the hero money-left figure pulses when the week changes, both driven by `revealIndex` state and reset by Start again; motion only on the reveal, with `prefers-reduced-motion` guards. No new data, figures or numbers
- UI redesign: hero health tint (Safe mint > RM300 / Tight amber RM100–300 / Danger crimson < RM100 incl. negatives) with a matching border, a factual status subtitle (`Survival status: Safe · 4 weeks to go`, `RM 70.00 over`), and a pulsing dot in the danger zone; rent/transport/food as tinted category pill widgets; life events as a timeline/feed with per-event icons (🎲 🛍️ 🚗 🍽️ 📱 🛞 ✔️) and soft-red impact tags (`−RM 50.00`, neutral tag for RM0); Shopee-orange `#EE4D2D` accent for shopping events; softer multi-layer floating shadows; `Next week` as the single primary with `Start again` as a quiet underline link; end state as a rising summary banner (title + money-left figure + note) instead of plain text. Plain CSS kept (Tailwind rejected). New `health`/`statusText` derived state; all words are worked-out figures or event names, never advice/rating. Verified live: Safe/Tight/Danger tints, banner for ran-out and made-it, no 375px overflow
- Anti-slop pass 2 (learner feedback: "still AI-slop vibe"): hardened `design.md` with binding anti-slop rules; reduced to one accent — row palette colours now appear only as small dots + bar fills (no pastel-per-row card tints, no coloured row borders); replaced "Survival status: X" fabricated chrome with a plain factual status (`4 weeks to go`, `Month complete`, `RM 70.00 over`); removed emoji from the result banner and emoji circles from the feed (muted glyph marks); summary banner states the outcome once + figure once (dropped the duplicate "Made it with RM X left" restatement); removed the dead grey `Month over` primary button when finished; calmed the stacked-bar palette, tightened radii/shadows, darkened page background for card contrast. Verified: only 2 surface colours (white + near-white hero), no "Survival status" text, no 375px overflow

## Last verified state

- Coding workspace: Not checked
- File read/write access: Not checked
- Terminal access: Not checked
- Node: v25.6.1 (passes: needs v20.19+ on 20, or v22.12+)
- npm: 11.9.0 (passes)
- Git: 2.50.1 (passes, Apple Git-155)
- GitHub account: Not needed tonight
- Vercel account: Not needed tonight
- KrackedDevs account: Done on the school page (not asked tonight)
- Localhost: Ready — `npm run dev` serves http://localhost:5173/ (all four cards + reveal animation + UI redesign + anti-slop pass 2)
- Build: Complete — game plays start to end; reveal animation, UI redesign and anti-slop pass 2 in; lint clean; all rule, content, mobile and a11y checks pass

## Next instruction for AI

All four work cards are done. No further build work unless the learner replies `fix`. On `fix`, address the described issue only and re-verify.
