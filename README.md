# ARCADE 🎮✨

A tiny neon arcade — four self-contained browser games, zero install, zero dependencies, zero build step.

**▶ Play:** open [`index.html`](index.html) in any browser. It's the hub; pick a game.

![play](https://img.shields.io/badge/play-instant-2de2e6) ![deps](https://img.shields.io/badge/dependencies-zero-ff2e97)

## The games

### ⚡ GLIDE — `glide.html`
A juiced-up neon snake. Steer the line, swallow orbs, and chain a **combo multiplier** (up to x9) for big points. Grab time-limited golden orbs, survive escalating speed. Smooth interpolated motion, particles, screen shake, procedural sound, persistent best score.
*Arrow keys / WASD / swipe • Space to pause • M to mute.*

### 🧠 Three original word-deduction games

None of these are Wordle — each uses a **different information mechanic**, so each is a distinct logic puzzle. All share a 5-letter dictionary (2,315 common answers, ~13k accepted guesses).

- **🔐 WORDLOCK** (`wordlock.html`) — *Mastermind for words.* Guess a 5-letter word and you get only **two numbers**: how many letters are **in place** (🔒) and how many are **right letter, wrong spot** (🔁). No per-letter colors — you deduce which is which. A notes tracker helps. Crack it in 10 guesses.

- **🕵️ SLEUTH** (`sleuth.html`) — *Two clues per guess.* Each guess returns how many letters it **shares** with the secret, **plus** whether the secret is **earlier or later** in the dictionary. Combine letter overlap with binary-search logic; a live range bound narrows automatically.

- **🔎 PROBE** (`probe.html`) — *Detective with a budget.* You don't guess words — you spend **clue tokens** to interrogate the hidden word (test if a letter exists, reveal a slot, count vowels), then name it. A wrong solve costs a token. Spend fewer tokens → higher score.

All four track a **streak / best** in `localStorage`. Everything works on desktop and mobile (on-screen keyboard + touch).

## Tech

- Pure HTML/CSS/JS. No frameworks, no bundler, no network calls at runtime.
- `index.html` is the hub; each game is its own page.
- Shared layer: `shared.css` (neon theme + components), `shared.js` (dictionary helpers, deduction math, on-screen keyboard, sound, persistence), `words.js` (word data).
- GLIDE: Canvas with a fixed-timestep logic loop + interpolated rendering.
- Sound is synthesized at runtime via the Web Audio API — no audio assets.

## Deploy (Cloudflare Pages)

It's a static site, so: Framework preset **None**, build command **blank**, output directory **`/`**. Cloudflare serves the files as-is and `index.html` becomes the homepage.

Enjoy — and good luck on those streaks. 🏆
