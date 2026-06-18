# WORDPLAY 🔤✨

A tiny neon collection of word & letter games. Zero install, zero dependencies, zero build step — just open it in a browser.

**▶ Play:** open [`index.html`](index.html). It's the hub; pick a game.

![play](https://img.shields.io/badge/play-instant-2de2e6) ![deps](https://img.shields.io/badge/dependencies-zero-ff2e97)

## The games

### Core three (home screen)
- **WORDLOCK** (`wordlock.html`) — Mastermind for words. Each guess returns only *in place* (🔒) and *wrong spot* (🔁) counts — no colors. Deduce the rest within 10 guesses.
- **SLEUTH** (`sleuth.html`) — each guess returns how many letters it **shares** with the secret **plus** whether the secret is **earlier or later** in the dictionary. A live range narrows as you go. 10 guesses.
- **WORDHIVE** (`wordhive.html`) — Spelling-Bee style. Seven letters, one required center; make words, hunt the pangram, climb Beginner → Genius. No timer.

Each card on the home screen surfaces your saved stats (win % / average / streak / best, or best & average score for WORDHIVE), and there's a **Clear all saved data** button at the bottom.

### Words in Progress (`more.html`)
Rougher, still-being-tuned games, linked from the bottom of the home screen:
- **UNTANGLE** — anagram finder: spell every word hiding in six scrambled letters.
- **CLIMB** — word ladder: change one letter at a time; beat the shortest known path.
- **DECODE** — cryptogram: crack a substitution-ciphered quote.

> Also in the repo but unlinked: **GLIDE** (`glide.html`, a neon snake) and **PROBE** (`probe.html`, a token-budget word detective).

## Tech

- Pure HTML/CSS/JS. No frameworks, no bundler, no runtime network calls.
- `index.html` / `more.html` are static hubs; each game is its own page.
- Shared layer: `shared.css` (neon theme + components) and `shared.js` (deduction math, on-screen keyboard, toast, persistence).
- Dictionaries: `words.js` (curated 5-letter answers + valid guesses, for WORDLOCK / SLEUTH) and `dict.js` (full ENABLE word list, lengths 3–12, for WORDHIVE / UNTANGLE / CLIMB). DECODE ships its own quote set.
- Stats persist in `localStorage`.

## Deploy (Cloudflare Pages)

Static site: Framework preset **None**, build command **blank**, output directory **`/`**. `index.html` becomes the homepage; the dictionaries are plain text and gzip well over the wire.
