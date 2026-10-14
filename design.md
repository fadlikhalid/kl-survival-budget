# Design Direction

> **Redesign v3 (learner-requested, "still slop, ignore all guardrails") supersedes the visual rules below.**
> Look: neo-brutalist arcade — cream dotted page, 2.5px ink borders, hard offset shadows, Bricolage Grotesque display type, a KL skyline masthead, and a dark ink "scoreboard" hero with a segmented wallet bar.
> Added game features: persona presets, a weekly move (Hemat / Biasa / Lepak) that trades money for **Vibes**, a suspenseful event-card draw, ten events (two pay you), a quip per event, archetype endings with confetti, a Wordle-style copyable result, and best-run stats saved in `localStorage`.
> The anti-slop rules and the "site saves nothing" brief rule below no longer apply. Game rules live in `src/game.js`.

## Design Inspiration URL

Fallback 3: Playful student dashboard

## What We Borrow

- A dashboard that feels like a game, not a spreadsheet: a big number up top, rows that read at a glance below.
- Chunky rounded cards, a light tinted background, clear colour-coded rows.
- A friendly student energy: playful but still honest about money.

## What We Do Not Copy

- No other brand's logo, name, colours, text, photos, icons, or exact layout identity.
- No recreated dashboards from real products; this is translated style, not a clone.

## Visual Mood

Entertaining and playful, like a scoreboard for your month. It should feel light to open and a little dramatic when the money runs out. Learner's own one thing: **it should be entertaining** — the weekly reveal and the result line are the moments that carry that.

## Layout Rules

- Mobile-first single column, max content width ~560px centred on desktop.
- Order: header (on the page, no card) → inputs card → hero card → result banner (only when the month ends) → rows card → controls.
- The hero and the `Next week` button are both visible on a 375×812 phone without scrolling. The primary button is sticky at the bottom of the viewport while the cards scroll under it.
- Hero card is the most prominent thing: the money-left figure at 44–68px (fluid, never overflowing 320px), week line under it, stacked bar across the card.
- 24px card padding, 16px radius, 12px between rows, 20px between cards (20px padding under 360px).
- Page background tinted lightly with the accent (never plain white or plain grey).

## Color / Contrast Rules

- One accent colour from the style: a bright teal `#0F9D8F` for large figures and bars. Small text and the primary button use the darker `#08695F` (white on it is 5.9:1) because `#0F9D8F` is only 3.4:1 on white.
- Muted text is `#58606A` (6.4:1 on white). The earlier `#8B9096` was 3.2:1 and failed the 4.5:1 rule.
- Money left uses the accent while it is RM0 or more; red `#D62828` with an explicit minus sign below RM0.
- Five-colour row palette, all AA contrast on the card background: rent `#3A6EA5` (blue), transport `#7B5EA7` (purple), food `#E08A00` (amber), life events `#D62828` (red), neutral/muted `#9AA0A6` for finished or disabled.
- Text `#1B1F24` on light cards, minimum 4.5:1; never grey-on-grey for real numbers.
- **Local-flavour accents (redesign):** Shopee orange `#EE4D2D` for online-shopping shocks; deep transit blue `#3A6EA5` for LRT/MRT transport.
- **Hero health tint (redesign):** the hero card carries a very light background wash by budget health. This is decoration only — the money-left figure keeps the accent/red-minus truth rule above, so meaning is never colour-only. The tint is subtle (a near-white wash), not a saturated pastel.
  - Safe (money left > RM300): near-white `#FBFEFD` with a thin teal top rule.
  - Tight (RM100–RM300): near-white `#FFFDF7` with a thin amber top rule.
  - Danger (money left < RM100, including any negative value): near-white `#FFFBFB` with a thin crimson top rule, and the money-left figure in red.
- Every tint keeps body text at AA contrast on that tint; tints are near-white so the near-black text passes comfortably.

## Typography Feel

- One system sans stack (`-apple-system, "Segoe UI", Roboto, sans-serif`), no font downloads.
- Big numbers bold and tight; labels small, uppercase-ish and quiet; row names bold.
- Money amounts always tabular-aligned to the right, two decimals.
- The hero money-left figure uses heavier weight and tighter tracking so it pops; a short **status subtitle** sits under the week line.

## Component Style

- Header: sits on the tinted page (no card). Name with one small emoji (💰), the one-line purpose and the `Sample data` pill under it.
- Inputs card: the quietest card. Four labelled number inputs in a 2×2 grid with an `RM` prefix, sample values prefilled, clear focus ring. Once locked they go flat (outline only, `not-allowed` cursor) and the numbers stay full-contrast.
- Hero card: short label ("Money left"), the figure at 48px+, a four-pip week track with the one-line week text (`Week 2 of 4`) under it, a plain factual status line (figure-only, see below), then the stacked bar with a small legend under it. Card background/figure follow the health-tint rules above.
- Status line (redesign): factual, worked-out text only — e.g. `4 weeks to go`, `1 week left`, `RM 430.00 above zero`, `RM 50.00 over`. Never advice, a rating, a recommendation, or a fabricated "status" label.
- Rows: rent/transport/food rows as a plain row with a small colour dot, bold name, amount taken so far on the right, and a thin share bar. Event rows become a timeline/feed: a small event glyph, the event name, and the amount as an impactful tag (outgoing money shown as `−RM 50.00`; a zero event shows a neutral `RM 0.00` tag).
- Controls (redesign): keep `Next week` as the single primary action in the accent. `Start again` becomes a quiet secondary — an outline/text button that does not compete with the primary. When the month is over the primary is replaced by the finished state, not a second competing button.
- Empty/finished states are honest: before week 1 the bars are empty; a finished run shows the result message, not a fake value.
- **Summary banner (redesign):** when the month ends (ran out, or made week 4), the result appears as a distinct summary card — a banner that slides up into the result area — instead of plain floating text. It sits directly under the hero, states the outcome **once** in large type (`Survived the month`, `Ran out in week 3`), and carries the quiet `Start again` outline button. The money-left figure is **not** repeated: the hero right above it is the one place it appears. No modal overlay; the banner sits in the normal single-column flow so nothing is hidden on a phone.

## Depth / Shadows

- Cards keep the 16px radius and 24px padding but use softer, deeper floating shadows (a low-opacity multi-layer shadow) so the layout reads as a light dashboard, not flat boxes.
- Hover/press states stay subtle; no drop-shadow soup, no rainbow gradients.

## Mobile Rules

- Single column, full-width cards with 16px side margins.
- The money-left figure and the stacked bar never overflow; the bar is 100% width of the card.
- Inputs sit two per row (one per row under 360px); buttons full width.
- Tap targets at least 44px tall.
- Test at 375px wide: no text, button or card is cut off; no horizontal scroll.

## Accessibility Basics

- Every input has a visible label tied to it; not placeholder-only.
- The result message and money left are readable text, not colour-only meaning (red also carries a minus sign).
- Buttons are real `<button>` elements with readable text.
- Focus states are visible on inputs and buttons.
- Contrast: body text ≥ 4.5:1, large figures ≥ 3:1.
- Language is plain and short; no jargon.

## Anti-Slop Rules

- No fake logos, no fake testimonials, no fake stats.
- Sample data is clearly marked with a `Sample data` pill; it is illustrative, never presented as real.
- No "lorem ipsum" in the final proof; all visible text is real and specific to this game.
- The page never tells the player to refresh.
- No invented metrics — every number shown is either a sample input, a worked-out figure, or a bar share from the same rows.
- No blurry stock photos, no rainbow gradients, no drop-shadow soup, no emoji flooding (one icon per element at most).
- One clear purpose: play the month. No sign-up, no newsletter, no pay button.
- Every space sits on the 4px scale (4/8/12/16/20/24/32).
- Reads well on phone width.

### Hard anti-slop rules (added after review)

The first pass still read as generic AI output. These are now binding:

- **One accent, not a pastel rainbow.** The page uses the teal accent plus near-black, grey, white. The row palette colours (rent blue, transport purple, food amber, events red) appear **only** as small marks — a 8–10px dot and a thin bar fill — never as full-card background tints. No card gets a coloured pastel background except the hero's single health tint.
- **No per-row colour washes.** Category rows are plain surfaces with a thin divider; the only colour is the small dot and the bar. No coloured left borders on rows.
- **No emoji inside circles, no emoji in the title line, no emoji in the result banner.** At most one small emoji per row and one small icon in the header. Emoji are never UI chrome.
- **No fabricated UI chrome.** No "Survival status:", no invented labels, badges or chips that a real product would not ship. Status text is plain, lowercase-adjacent and factual (`4 weeks to go`, `RM 70.00 over`).
- **No redundant repetition.** A figure appears once in the result area, not three times (title + big number + caption). The summary banner states the outcome once; the money-left figure lives only in the hero.
- **Real hierarchy, not uniform boxes.** Cards are not all the same weight: the hero is visually dominant, supporting cards are quieter. Use type size, weight and space for hierarchy — not five competing tint colours.
- **The hero health tint is subtle.** Danger/Tight/Safe are conveyed mostly by the money-left figure colour and a thin rule, with only a very light background wash. Colour is never the only signal.
- **Bars are information, not decoration.** The stacked bar shows shares of money spent; it is one restrained bar, not a saturated full-width rainbow.

## Design Verification Checklist

- [ ] Money-left figure is the most prominent element (48px+, correct colour for the sign).
- [ ] Hero card shows the health tint for the current money left (Safe/Tight/Danger), with the figure still using the accent/red-minus truth rule.
- [ ] Status subtitle is factual/worked-out only, never advice or a rating.
- [ ] Stacked bar empty at week 0, four parts with no gaps after spending.
- [ ] Row palette colours appear only as small marks (dot + bar fill), never as card tints or borders.
- [ ] Hero health tint is a near-white wash; the money-left figure carries the sign colour.
- [ ] No emoji in circles, in the title, or in the result banner; no fabricated status chrome.
- [ ] Result area states the outcome once and the figure once.
- [ ] Cards 16px radius, restrained shadow, 24px padding, 12px row gap, tinted page background.
- [ ] Bars grow from 0 on load; the reveal animation plays on the newest event row only.
- [ ] End state shows the summary banner (not plain floating text).
- [ ] Mobile at 375px: nothing cut off, no horizontal scroll.
- [ ] Labels tied to inputs; contrast and focus states pass.
- [ ] No slop: no rainbow pastel cards, no emoji flooding, no fake logos/stats/testimonials, no lorem ipsum, sample clearly marked.

## Visual recipe

The build follows this section card by card. For a page that shows rows and a main figure:

- Header: the app name with one emoji or a small inline SVG icon, the one-line purpose under it, and a `Sample data` pill.
- Hero card: a short label, the main figure at 48px or larger in the accent colour, one line under it with the week count, a short status subtitle, and a stacked bar across the card showing each counted row's share of the money spent, one colour per row, with a small legend under it. The card carries a health tint (Safe/Tight/Danger).
- Each row: a coloured dot or an emoji on the left in that row's colour, the name in bold, the main amount on the right, and under them a share bar. Category rows are tinted pill widgets; event rows are timeline entries on a thin vertical rail with an icon and an amount tag; the Shopee event's tag uses the Shopee orange tint.
- Colour: one accent colour from the style, plus a five-colour row palette, every colour with AA contrast on its background.
- Depth: cards with a 16px radius, a softer floating shadow and 24px padding, 12px between rows, and a page background tinted lightly with the accent, never plain white or plain grey.
- Motion: bars grow from 0 when the page loads (a CSS transition); the newest event row reveals when it is added. Nothing else moves.
- No new library: plain CSS and inline SVG. Emoji are fine as icons. (Redesign kept plain CSS; Tailwind was considered and rejected as an unnecessary dependency for one page.)

For an app where the learner adds or changes items, use the same row recipe for the items and the hero card for the count that matters most.

### Notes for this brief (KL Survival Budget)

- The main figure in the hero card is **money left**; the count behind it is the **week reached out of 4** (`Week 2 of 4`).
- Each row's "share bar" is its share of the money spent so far; a row shows amount taken so far on the right (rent/transport/food) or the event amount (event rows).
- The stacked bar is rent / transport / food / life events, one colour each from the palette, no gaps, empty before week 1.
- No "done of total", no "left" pill and no "Finished" pill: rows have no done or total in this brief. Use the row share bar instead.
- No new numbers beyond the ones `architecture.md` lists and the bars' own shares worked out from the same rows.
- Redesign additions: hero health tint + status subtitle, category pill widgets, event timeline/feed with icons and amount tags, summary banner, softer shadows, Shopee-orange and transit-blue accents. Every added word is a worked-out figure or an event name/amount — never advice, a rating or a recommendation.