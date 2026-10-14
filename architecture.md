# Architecture

## Build Shape

Content-led site with sample data (a sample-data dashboard). The main value is a figure worked out from rows: the money left, the amounts taken so far, and each week's event amount. Nothing is added or saved across refresh.

## Stack Decision

- **Vite + React** (default KDBM Lite stack), plain CSS.
- One page, runs in the browser.
- No backend, no database, no auth, no live API, no secret keys.
- No `localStorage` — a site saves nothing, and this page is a one-sitting game.

## Structure Overview

The app lives in this project folder, beside `START_HERE.md`. The Vite + React app is scaffolded into a temporary `app-temp` folder, then moved up into this folder without deleting the planning files, `prompts/`, `templates/` or `work-cards/`.

Sections in order:

1. **Header:** app name `KL Survival Budget` with one emoji or small inline SVG icon, one-line purpose under it, and a `Sample data` pill.
2. **Inputs card:** four number inputs — gross monthly salary, average rent per month, average transport per month, average food per month — prefilled with the sample values. Locks after the first press of Next week. Next week stays off until all four are filled with numbers of 0 or more (salary above 0).
3. **Hero card:** the money left (48px+, accent colour, or red with a minus sign below RM0), one line with the week reached out of 4, and the stacked four-part bar under it.
4. **Rows card:** one row each for rent, transport and food with the amount taken so far; then one row for each week's event with its name and amount. Each row has its own share bar.
5. **Controls:** `Next week` (up to four times, disabled as the rules require) and `Start again`.
6. **End message:** "Ran out in week N" or "Made it with RM X left".

## Component Map

- `App` — holds all state, renders the sections in order.
- `Header` — name, icon, purpose line, `Sample data` pill.
- `InputsCard` — four labelled number inputs, disabled after the first press.
- `HeroCard` — money-left figure, week line, status subtitle, stacked bar + legend, health tint.
- `StackedBar` — four segments (rent, transport, food, life events), widths as shares of money spent so far, no gaps; empty before week 1.
- `WeekRows` — rent/transport/food category widgets with amounts taken so far.
- `EventRows` — one timeline row per week's event, icon + name + amount tag.
- `RowBar` — each row's share of money spent so far.
- `Controls` — Next week (primary), Start again (quiet secondary).
- `EndMessage` — the summary banner showing the week-N / RM-X result.

## Data / State Model

No stored data type. All state is in memory in the `App` component:

- `inputs` — `{ salary, rent, transport, food }` numbers, prefilled with the sample values.
- `locked` — boolean, true after the first press of Next week.
- `weeks` — array of played weeks (0 to 4), each `{ eventName, eventAmount }`.
- `revealIndex` — index of the newest event row, so only it plays the reveal animation.
- Derived each render: `weeksPlayed`, `spentByCategory` (rent, transport, food, events), `moneySpentSoFar`, `moneyLeft`, `weekReached`, `health` (Safe/Tight/Danger from money left), `statusText`, `endMessage`.

Sample inputs: salary RM2,800, rent RM800, transport RM200, food RM600.

## Storage Logic

None. A site saves nothing. No `localStorage` key. Refreshing the browser returns the page to its opening state (sample inputs, week 0).

## User Flow

1. Page opens with sample inputs prefilled and week 0.
2. Player edits any of the four numbers (optional).
3. Player presses `Next week`. On the first press the four inputs lock; on every press the app takes rent/4 + transport/4 + food/4 plus one random event amount, and adds one event row.
4. Steps 2–3 repeat up to four times, or until the money left drops below RM0.
5. If money left < RM0: show "Ran out in week N" and stop Next week.
6. After week 4 (money left ≥ RM0): show "Made it with RM X left".
7. `Start again` restores the sample inputs and returns to week 0 (inputs unlock).

## Rules and Figures (values from sample data)

| Quantity | Rule | Sample value |
|---|---|---|
| Money left | salary − money spent so far | starts RM2,800.00 |
| Rent taken so far | rent ÷ 4 × weeks played | RM200.00 per week (RM800 rent) |
| Transport taken so far | transport ÷ 4 × weeks played | RM50.00 per week (RM200 transport) |
| Food taken so far | food ÷ 4 × weeks played | RM150.00 per week (RM600 food) |
| Money taken per week before event | (rent + transport + food) ÷ 4 | RM400.00 |
| Event amount | the chosen event's value, chosen at random | tyre RM180, kenduri RM100, phone screen RM250, Shopee 11.11 RM120, parking saman RM50, no surprise RM0 |
| Week reached | presses of Next week, out of 4 | 0 to 4 |
| Each stacked-bar part | that category's share of money spent so far | 0 before week 1 |
| Each row's bar | that row's share of money spent so far | 0 before week 1 |
| End message | "Ran out in week N" if money left < RM0, else "Made it with RM X left" after week 4 | — |
| Hero health | money left > RM300 Safe; RM100–RM300 Tight; < RM100 (incl. negative) Danger | Safe with RM2,800.00 |
| Status subtitle | worked-out, factual text only (weeks to go, RM above/over zero) — never advice or a rating | — |
| Sample month result | event is random, so a range | RM200.00–RM1,200.00 left |

## File Expectations

- `index.html` — `<title>` set to `KL Survival Budget`.
- `package.json` — `"name"` set to `kl-survival-budget`.
- `src/App.jsx` (or `App.tsx`) — state, derived figures, sections in order.
- `src/` components as in the Component Map, or kept in one file if small.
- `src/index.css` or `App.css` — plain CSS following `design.md`.
- Planning files (`project-brief.md`, `architecture.md`, `design.md`, `build-blueprint.md`, `build-status.md`, `work-cards/`, `prompts/`, `templates/`) are never modified by the app and never deleted.

## Constraints

- One page only.
- Four inputs, four weeks, six fixed life events.
- Amounts shown to two decimals.
- The four inputs lock after the first press; Next week disabled until the four are valid.
- Money left accent colour while ≥ RM0, red with a minus sign below RM0.
- Start again restores sample inputs and week 0; the page never tells the player to refresh.
- Money brief: work out and show figures only (sums, counts, what is left); never advise, rate or recommend, and never work out interest.

## Technical Non-Goals

- No accounts, logins, payments, database, backend, live data, tax or EPF sums.
- No saving across refresh, no `localStorage`.
- No real names, phone numbers, IC numbers, account numbers, real balances or company names.
- No advice, ratings, recommendations or interest.

## Verification Notes

- With the sample inputs, each week takes RM400.00 before the event (check the rule, not one end figure).
- The four inputs lock after the first press; Next week is off until all four are valid.
- The month ends RM200.00 to RM1,200.00 left with the sample inputs (the event is random, so check the range).
- The stacked bar is empty before week 1, then split into rent/transport/food/life events with no gaps.
- "Ran out in week N" appears and Next week stops when money left < RM0.
- "Made it with RM X left" appears after week 4.
- Mobile width: text, buttons and cards are not cut off.
- Design check against `design.md` on each card.