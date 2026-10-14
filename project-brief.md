# Project Brief

## Project Identity

- **Name:** KL Survival Budget
- **Course:** AI Builder Foundations (one evening: Spec, Build, Check)
- **Shape:** Content-led site with sample data (a sample-data dashboard)
- **Built tonight:** One page that runs in the browser, no accounts, no database, no live data.

## One-Sentence Concept

A one-page budget game that shows whether a KL salary survives four weeks of rent, transport, food and one random life event each week.

## Target User

Me — a young adult starting a first job in Kuala Lumpur, working out the real cost of living with my own numbers before the money runs out. (Named as "myself"; the pre-filled problem context is young adults starting their first job in KL.)

## User Goal

Type my own four numbers, press Next week up to four times, and see how the money holds up — either running out in a week or making it to week 4, with the amount left.

## Build Shape

Content-led site with sample data (sample-data dashboard). The main value is reading a figure worked out from rows: the money left, the amounts taken so far, and each week's event amount, all worked out in code from the sample data or the user's four inputs.

## Shape Confirmation

Confirmed by the learner.

## Version-One Success

- The sample data is on the screen when the page opens: salary RM2,800, rent RM800, transport RM200, food RM600.
- The main action works — pressing Next week takes a quarter of rent, transport and food (RM400.00 total per week before the event) plus one life event chosen at random.
- The four inputs lock after the first press; Next week stays off until all four are filled with numbers of 0 or more (salary above 0).
- The page shows the money left, the week reached out of 4, one row each for rent, transport and food with the amount taken so far, and one row per week's event with its amount.
- Below RM0 it shows "Ran out in week N" and Next week stops. After week 4 it shows "Made it with RM X left".
- With the sample inputs the month ends between RM200.00 and RM1,200.00 left (the event is random, so this is a range, not one figure).
- Start again puts the example inputs back and starts at week 0.
- Amounts show two decimals. Money left is in the accent colour while RM0 or more, and red with a minus sign below RM0.
- One stacked bar under the money left, split into four parts (rent, transport, food, life events), each part as wide as its share of the money spent so far, no gaps; empty before week 1.
- A site saves nothing: this page holds no data across refresh beyond the example inputs it starts with.

## Now / Later / Never

### Now

- One page, four inputs with the sample values prefilled.
- Four weeks of play, Next week up to four times.
- Rent/transport/food rows with amounts taken so far.
- One random life event per week, one row each with its amount.
- Money left, week out of 4, end messages.
- One stacked four-part bar (rent, transport, food, life events), each row's own share bar.
- Locks, disabled Next week, Start again, two-decimal amounts, accent/red money-left colour.

### Later

- Saving a run across refresh (not tonight; the page is a one-sitting game).
- More life events or editable event list.
- A month-by-month view.

### Never

- User accounts, logins, payments, a database, a backend, live data.
- Tax or EPF sums.
- Real people's names, phone numbers, IC numbers, account numbers, real balances or company names.
- Advice, ratings, recommendations, or interest calculations of any kind.

## Assumptions

- "Life event chosen at random" means each of the six listed events is equally likely on each press (including "no surprise this week RM0").
- "A quarter of rent, transport and food" means rent/4 + transport/4 + food/4 taken each week, exactly.
- The bar before week 1 is empty (no money spent yet).
- The four numbers lock after the first press means they cannot be edited until Start again.
- Sample data is illustrative only, never real records.

## Proof Target

The app running on localhost, with the rule checked, not one end figure: with the sample inputs each week takes RM400.00 before the event, the four inputs lock after the first press, Next week stays off until the four inputs are valid, and the month ends with RM200.00 to RM1,200.00 left. No GitHub or Vercel tonight.

## Trainer / Learner Notes

- Money brief: work out and show figures only (sums, counts, what is left); never advise, rate or recommend, and never work out interest.
- Learner's own answer to "who it is for": themselves.
- Sample data stays as sample data; only used as illustrative example inputs.
- The page never tells the player to refresh.