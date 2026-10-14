# KL Survival Budget

A 4-week budget game: can a first-job KL salary outlast rent, transport, food and whatever the city throws at you?

**Play it:** https://fadlikhalid.github.io/kl-survival-budget/

## How it plays

- Pick a persona (or type your own salary, rent, transport and food) and press **Play week**.
- Each week you choose a move: **Hemat** (save money, lose vibes), **Biasa**, or **Lepak** (spend money, gain vibes).
- Then a random life event is drawn from 20: tyres, saman, flash floods, but also overtime pay and a free lunch. Every amount is rolled fresh.
- Survive four weeks without your wallet going below zero. Your ending depends on both money and vibes.
- Copy your result as a Wordle-style grid to share.

## Built with

Vite, React and plain CSS. Sound effects are synthesised with the Web Audio API and the icons are inline SVG, so there are no asset files. Best-run stats and the mute setting are kept in `localStorage`.

```bash
npm install
npm run dev
```

Built by [@fadlikhalid](https://github.com/fadlikhalid) during KrackedDevs AI Builder Foundations.
