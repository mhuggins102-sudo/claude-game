# ARCADE 🎮✨

A tiny neon arcade — **eight** self-contained browser games. Zero install, zero dependencies, zero build step.

**▶ Play:** open [`index.html`](index.html) in any browser. It's the hub; pick a game.

![play](https://img.shields.io/badge/play-instant-2de2e6) ![deps](https://img.shields.io/badge/dependencies-zero-ff2e97)

## The games

### ⚡ Reflex
- **GLIDE** (`glide.html`) — a juiced-up neon snake. Chain a combo multiplier (up to x9), grab golden orbs, survive escalating speed. Particles, screen shake, sound.

### 🧠 Word deduction
- **WORDLOCK** (`wordlock.html`) — Mastermind for words. Each guess returns only *in place* (🔒) and *wrong spot* (🔁) counts — no colors. Deduce the rest in 10 guesses.
- **SLEUTH** (`sleuth.html`) — each guess returns shared-letter count **plus** whether the secret is earlier/later in the dictionary. A live range narrows as you go.
- **PROBE** (`probe.html`) — spend a budget of clue tokens (test a letter, reveal a slot, count vowels), then name the word. Spend less, score more.

### 🔤 Word play
- **WORDHIVE** (`wordhive.html`) — Spelling-Bee style. Seven letters, one required center; make words, hunt the pangram, climb Beginner → Genius.
- **UNTANGLE** (`untangle.html`) — six scrambled letters hide dozens of words; find them all, including the full 6-letter word.
- **CLIMB** (`climb.html`) — word ladder. Change one letter at a time, every step a real word; beat the shortest known path.
- **DECODE** (`decode.html`) — cryptogram. A famous quote scrambled by a substitution cipher; crack it with letter frequency and short words.

Each game shows its saved progress (streak / best / solves) on its home-screen card, has a **How to play** link top-right, and works on desktop & mobile (on-screen keyboard + touch).

## Tech

- Pure HTML/CSS/JS. No frameworks, no bundler.
- `index.html` is the hub; each game is its own page.
- Shared layer: `shared.css` (neon theme + components), `shared.js` (deduction math, on-screen keyboard, toast, persistence).
- Dictionaries: `words.js` (curated 5-letter answers + valid guesses, for the deduction trio) and `dict.js` (full ENABLE word list, lengths 3–12, for WORDHIVE / UNTANGLE / CLIMB). DECODE needs no dictionary — it ships with a quote set.
- GLIDE: Canvas with a fixed-timestep logic loop + interpolated rendering.

## Deploy (Cloudflare Pages)

Static site: Framework preset **None**, build command **blank**, output directory **`/`**. `index.html` becomes the homepage. The dictionaries are plain text and gzip well over the wire.

Enjoy — and good luck on those streaks. 🏆
