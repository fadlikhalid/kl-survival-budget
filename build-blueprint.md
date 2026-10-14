# Build Blueprint

## Source Files

- `project-brief.md`
- `architecture.md`
- `design.md`
- `build-status.md`

## Project Identity

- **Name:** KL Survival Budget
- **Context:** AI Builder Foundations, one evening (Spec, Build, Check). No GitHub, Vercel or deploy tonight.
- **One-sentence concept:** A one-page budget game that shows whether a KL salary survives four weeks of rent, transport, food and one random life event each week.

## Build Shape

Content-led site with sample data (a sample-data dashboard). The main value is a figure worked out from rows: the money left, the amounts taken so far, and each week's event amount. Nothing is added or saved across refresh — a site saves nothing.

## Version-One Promise

The page opens with the sample inputs (salary RM2,800, rent RM800, transport RM200, food RM600) and week 0. The player presses `Next week` up to four times. Each press takes rent/4 + transport/4 + food/4 (RM400.00 with the sample inputs) plus one life event chosen at random, and shows the money left, the week out of 4, the amount taken so far per row, one row per week's event, and a four-part stacked bar. The four inputs lock after the first press, and Next week stays off until all four are valid. Below RM0 it shows "Ran out in week N" and stops; after week 4 it shows "Made it with RM X left". `Start again` restores the sample inputs and week 0. The month ends RM200.00–RM1,200.00 left with the sample inputs.

## Scope Lock

### Now

- One page, four prefilled number inputs.
- `Next week` up to four times; rent/transport/food take a quarter each per week.
- One random life event per week, one row each with its amount.
- Money left, week out of 4, end messages.
- One stacked four-part bar (rent, transport, food, life events) and a share bar per row.
- Input lock after first press; Next week disabled until the four inputs are valid (salary above 0, others 0 or more).
- Two-decimal amounts; money left accent-coloured ≥ RM0, red with a minus sign below RM0.
- `Start again`.

### Later

- Saving a run across refresh.
- Editable or longer life event list.
- Month-by-month view.

### Never

- Accounts, logins, payments, database, backend, live data.
- Tax or EPF sums.
- Real names, phone numbers, IC numbers, account numbers, real balances, company names.
- Advice, ratings, recommendations, or interest.
- Refresh persistence or `localStorage`.

## Architecture Summary

- **Stack:** Vite + React + plain CSS, one page, in this project folder beside `START_HERE.md`.
- **Sections in order:** header → inputs card → hero card (money left + week + stacked bar) → rows card (rent/transport/food + weekly events) → controls → end message.
- **No** backend, database, auth, API, secret keys, or `localStorage`.
- The Vite + React app is scaffolded into `app-temp`, then moved up into this folder without deleting the planning files, `prompts/`, `templates/` or `work-cards/`.

## Data / State / Storage Rules

All state lives in memory in `App` (no stored data type, no persistence):

- `inputs` — `{ salary, rent, transport, food }`, prefilled with the sample values.
- `locked` — true after the first press of Next week.
- `weeks` — array of played weeks (0 to 4), each `{ eventName, eventAmount }`.
- Derived each render: `weeksPlayed`, `spentByCategory`, `moneySpentSoFar`, `moneyLeft`, `weekReached`, `endMessage`.

Rules and figures (values from sample data):

| Quantity | Rule | Sample value |
|---|---|---|
| Money left | salary − money spent so far | starts RM2,800.00 |
| Rent taken so far | rent ÷ 4 × weeks played | RM200.00/week (RM800 rent) |
| Transport taken so far | transport ÷ 4 × weeks played | RM50.00/week (RM200 transport) |
| Food taken so far | food ÷ 4 × weeks played | RM150.00/week (RM600 food) |
| Money taken per week before event | (rent + transport + food) ÷ 4 | RM400.00 |
| Event amount | the chosen event's value, chosen at random | tyre RM180, kenduri RM100, phone screen RM250, Shopee 11.11 RM120, parking saman RM50, no surprise RM0 |
| Week reached | presses of Next week, out of 4 | 0 to 4 |
| Stacked-bar part | category's share of money spent so far | 0 before week 1 |
| Row bar | row's share of money spent so far | 0 before week 1 |
| End message | "Ran out in week N" if money left < RM0, else "Made it with RM X left" after week 4 | — |
| Sample month result | event is random, so a range | RM200.00–RM1,200.00 left |

Storage: none. No `localStorage` key. Refresh returns to the opening state.

## Design Direction Summary

- **Inspiration:** Fallback 3: Playful student dashboard. Borrow a game-like dashboard feel: big figure up top, colour-coded rows below, rounded tinted cards. **Do not copy** any real brand's logo, name, colours, text, photos, or exact layout identity.
- **Mood:** entertaining and playful, like a scoreboard for your month. The weekly event reveal and the result line carry the entertainment.
- **Colour:** accent teal `#0F9D8F`; money left accent ≥ RM0, red `#D62828` with a minus sign below RM0; row palette rent `#3A6EA5`, transport `#7B5EA7`, food `#E08A00`, life events `#D62828`, muted `#9AA0A6`. Redesign adds Shopee orange `#EE4D2D` for shopping shocks and a hero health tint (Safe mint / Tight amber / Danger crimson).
- **Layout:** mobile-first single column, max ~560px, header → inputs → hero → rows → controls → result; 16px radius cards, softer floating shadow, 24px padding, 12px row gap, tinted background. Hero shows a status subtitle; rows read as tinted category widgets and an event timeline; the result appears as a summary banner.
- **Motion:** bars grow from 0 on load (CSS transition); the newest event row reveals when added; nothing else moves.
- **Anti-slop:** no fake logos, stats or testimonials; no lorem ipsum; sample clearly marked with a `Sample data` pill; the page never tells the player to refresh; no invented numbers; no rainbow gradients or emoji flooding.

## Implementation Rules

- Work the four cards in order; one card at a time.
- All figures and bars are worked out in code from the sample inputs or the player's inputs — never typed into the page by hand.
- Amounts show two decimals; money left uses the accent or red-minus rule.
- The four inputs lock after the first press; Next week disabled until all four are valid.
- `Start again` restores sample inputs and week 0; the page never says refresh.
- Follow `design.md` card by card, including the `## Visual recipe`.
- Plain CSS and inline SVG only; no new UI library.

## File and Folder Expectations

- `index.html` — `<title>` = `KL Survival Budget`.
- `package.json` — `"name"` = `kl-survival-budget`.
- `src/App.jsx` — state, derived figures, sections in order.
- Supporting components in `src/` (Header, InputsCard, HeroCard, StackedBar, WeekRows, EventRows, RowBar, Controls, EndMessage), or in one file if small.
- `src/index.css` / `src/App.css` — plain CSS following `design.md`.
- Planning files, `prompts/`, `templates/`, `work-cards/` are never modified or deleted by the app.

## Work Card Plan

Exactly four cards, in this order:

1. **01 Project skeleton** — the Vite + React app in this folder; the app name as a header and one line under it.
2. **02 First visible version** — the layout and the `## Visual recipe` from `design.md` (header, hero card, coloured rows, pills, depth, background) with the sample data on screen; nothing interactive; the money-left figure and bars show a placeholder (`RM -`) until Card 03.
3. **03 Core behaviour** — every figure and every bar worked out in code from the sample inputs or the player's inputs: Next week, the weekly take, the random event, the lock, the disabled Next week, the end messages, Start again; never a value typed in by hand.
4. **04 Save or polish** — phone width, the bars growing from 0 on load, a final check of every line of the `## Visual recipe`, accessibility basics, a final content check; the card says once that a site saves nothing.

## Review Mirror

Optional tonight — `prompts/07-review-mirror.md`, not a work card.

## Proof Ladder

The app running on localhost, improved your way. No GitHub or Vercel.

## 60-Second Explanation Template

"I built KL Survival Budget. You type four numbers — salary, rent, transport, food — and press Next week up to four times. Each week takes a quarter of rent, transport and food plus one random life event, and the page shows the money left, the week out of 4, what each row has taken, and a stacked bar of where the money went. It ends with either 'Ran out in week N' or 'Made it with RM X left', and Start again replays it. With the sample numbers, each week takes RM400.00 before the event, and the month ends between RM200.00 and RM1,200.00 left."

## Guardrails for the Coding Agent

- Read `build-status.md`, `build-blueprint.md`, and the current work card before editing.
- Implement only the current work card; do not jump ahead.
- Stop after verification; update `build-status.md` after each work card.
- Do not add backend, auth, database, API, secret keys, or `localStorage`.
- Do not add secrets or keys to code.
- Do not invent claims, testimonials, logos, or real numbers; sample data stays marked as sample.
- Apply the content-led site guardrails: one page, factual content in clear sections, honest controls, responsive layout and mobile check; no login, payments, database, backend, API keys or invented metrics.
- No action the brief does not have (no pay, apply, add, sign-up); this page's job is a figure, so the money left is the most prominent thing.
- Money brief: work out and show figures only (sums, counts, what is left); never advise, rate or recommend, and never work out interest.
- If a legacy file uses `Build Mode`, treat it as `Build Shape` without stopping.