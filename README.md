# GLIDE 🐍✨

A neon, juiced-up arcade game. One rule, sixty-second learning curve, surprisingly hard to put down.

**▶ Play it:** just open [`index.html`](index.html) in any browser. No install, no build step, no dependencies.

![status](https://img.shields.io/badge/play-instant-2de2e6) ![deps](https://img.shields.io/badge/dependencies-zero-ff2e97)

## How to play

Steer the line, swallow the glowing orbs, and don't crash into the walls or your own tail.

- **Move:** Arrow keys / `WASD` / swipe (mobile)
- **Pause:** `Space`
- **Mute:** `M`

## What makes it addictive

- **Combo multiplier** — eat orbs in quick succession to build a chain (up to **x9**). Let the timer run out and it resets. Almost all your points come from keeping the chain alive, so every run is a tense risk/reward dance.
- **Golden orbs** — rare, time-limited bonus orbs worth 5× a normal orb. Grab them before the ring runs out.
- **Escalating speed** — the longer you get, the faster you glide.
- **Game feel** — smooth interpolated movement, particle bursts, screen shake, glow trails, and procedural WebAudio sound (no audio files).
- **Persistent best score** — saved locally, so there's always a number to beat.

## Tech

A single self-contained `index.html`:
- HTML5 Canvas rendering with a fixed-timestep logic loop and interpolated drawing for buttery motion
- Web Audio API for all sound (synthesized at runtime — zero assets)
- `localStorage` for the high score
- Works on desktop and mobile (responsive, touch swipe controls)

No frameworks. No tracking. ~600 lines, one file.

Enjoy — and good luck beating your best. 🏆
