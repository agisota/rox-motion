# Rox UI — Product Requirements Document

**Project:** Rox UI (formerly `state-first-kit`)
**Type:** State-First / Transition-First motion + component design system for React
**Owner:** scharlesky@gmail.com
**Status:** v0.3 (50 scenes shipped, glass + type-scale layer landed) → roadmap to v1.0
**Verification baseline:** `tsc --noEmit` clean · 19 tests passing (incl. full-page mount)

---

## 1. Vision

> The first design system where **the visual language *is* the mental model.**

Most UI kits give you neutral buttons and cards. Rox UI gives you a **semantic ontology of work** — `state`, `transition`, `event`, `runtime`, `monad`, `trace`, `validator`, `agent` — where every concept has its own color, motion signature, and component. You don't decorate the product; you make the product *legible*.

Rox UI should feel like a **futuristic operating system for work**: dark graphite blueprint, translucent glass surfaces, precise grid, crisp technical type, restrained semantic glow. More "engineering instrument" than "AI marketing poster."

**One-line positioning:** *Rox UI turns agent runs into visible state transitions — as a drop-in React system.*

---

## 2. Goals & non-goals

### Goals
- **G1 — Legibility as a feature.** Every surface communicates current state → target state → transition, not just "status."
- **G2 — Drop-in.** One CSS import + two providers + components. No bespoke build steps.
- **G3 — Motion-only, accessible.** Framer Motion exclusively; reduced-motion + Full/Essential/Off honored everywhere; resting state always visible (clock-safe).
- **G4 — Premium surface quality.** Glass/translucency, layered light edges, a real modular type scale, tasteful depth.
- **G5 — Liftable.** Tokens-only theming; portable CSS (works beyond React); zero hardcoded hex in components.
- **G6 — Verified.** Typecheck + unit/smoke tests green on every release; a11y and visual-regression gates added by v1.0.

### Non-goals
- Not a general-purpose kit competing with shadcn/MUI on breadth. Rox UI is *opinionated* around the state-first model.
- No GSAP/Lottie/Rive/anime.js. No CSS keyframes for core motion. No homemade animation runtime.
- No backend coupling. Demo data only; never touches DB/migrations.

---

## 3. Users & use cases

| Persona | Need | Rox UI surface |
|---|---|---|
| Superset/`agisota/set` devs | Make agent runs legible | WorkspaceStateCard, AgentRunHeader, TraceConsole, RunButton, MultiWorkspaceMap |
| Marketing/landing | Premium manifesto page | `StateFirstPage` (one-liner), Hero, GravityField, WhatBeforeHowSplit |
| Docs/onboarding | Teach the model | DocsEmbedPack, OnboardingFlow, CoreFormula, StateAtomGrid |
| Design-system consumers | Browse + copy | ComponentPlayground, the 50-scene registry |

---

## 4. Current state (v0.3)

- **Tokens:** semantic palette (`--sf-*`), font themes (Victor/Bebas/Lekton), geometry, easing, **new modular type scale**, **new glass/translucency tokens**.
- **Providers:** `MotionProvider` (MotionConfig + Full/Essential/Off), `FontThemeProvider` (persisted).
- **Primitives (9):** StateCard, TransitionRail, MonadCapsule, RunButton, FontThemeSwitch, MotionControl, WorkspaceStateCard, TraceConsole, AgentRunHeader.
- **Scenes (44):** all 50 registry entries resolve to a component.
- **Page:** `StateFirstPage` — full `/state-first` assembled, drop-in.
- **Architecture:** CSS-class styling (`.sf-*` + `--sf-*`), motion in JS, clock-safe reveals, viewport-gated loops.
- **Glass layer (new):** translucent blurred nav/stage/cards with inset top-highlight + soft shadow; opt-in `.sf-glass*` utilities; `@supports` fallback.
- **Type scale (new):** `--sf-text-2xs … --sf-text-5xl`, tracking + leading tokens, `.sf-t-*` utilities, tabular-nums.

---

## 5. Requirements for v1.0

### 5.1 Functional
- **F1** Token API stable & documented; add `--rox-*` aliases mapping to `--sf-*` (brand consistency without breaking).
- **F2** Every component exposes `variant`/`tone`/`density` props where meaningful; no inline-only styling.
- **F3** Theming: light-mode token set + a "high-contrast" set, switchable like fonts.
- **F4** All 50 scenes have a reduced-motion static fallback verified by test.
- **F5** Tree-shakeable ESM; per-component entry points; `sideEffects` correct so CSS isn't dropped.
- **F6** SSR-safe (no `window` at module scope; already guarded for matchMedia/IO).

### 5.2 Quality gates (CI)
- **Q1** `typecheck` + `test` green (have).
- **Q2** ESLint + Prettier config shipped; `lint` green.
- **Q3** `axe` accessibility test on `StateFirstPage` — zero serious violations.
- **Q4** Visual regression (Playwright screenshots) on flagship scenes across the 3 font themes + reduced-motion.
- **Q5** Bundle-size budget per component (size-limit).

### 5.3 Performance
- **P1** No layout-animating loops (`left/top/width`); transforms/opacity only (orbit already fixed).
- **P2** Offscreen loops paused (`useInView`); `content-visibility: auto` on scene sections.
- **P3** `prefers-reduced-data` → drop blur/particles.
- **P4** First scene paints without JS (clock-safe) — keep as an invariant test.

### 5.4 Accessibility
- **A1** WCAG AA contrast for all text tokens over their intended surfaces (glass included — verify against blurred backdrop worst-case).
- **A2** Full keyboard path through interactive scenes (MonadBuilder, toggles, sliders, command palette).
- **A3** `prefers-reduced-motion` and the Off level produce identical static output.
- **A4** Focus-visible rings using a dedicated token; never `outline: none` without replacement.

---

## 6. Success metrics
- 100% of registry scenes render with no console errors across 3 themes × {full, off} motion (visual-reg).
- 0 serious axe violations on the assembled page.
- Adoption: `WorkspaceStateCard` + `AgentRunHeader` + `TraceConsole` replace the generic equivalents in `agisota/set` with a single adapter each.
- Lighthouse ≥ 95 on the marketing route.

---

## 7. Release plan

| Version | Theme | Contents |
|---|---|---|
| **v0.3** (now) | Surface quality | glass tokens+utilities, modular type scale, applied to nav/stage/cards |
| **v0.4** | Brand + theming | `--rox-*` alias layer, light + high-contrast modes, focus-ring token, ESLint/Prettier |
| **v0.5** | A11y + perf | axe gate, keyboard pass, `content-visibility`, reduced-data, per-scene static fallbacks |
| **v0.9** | DX | per-component exports, size-limit, Storybook/Ladle, `copy import` everywhere, MDX docs |
| **v1.0** | Hardening | visual-regression CI, full token docs, semantic-color lint rule, migration guide |

---

## 8. Risks
- **Glass over busy backgrounds** can hurt contrast → mandate AA verification against worst-case blurred backdrop; provide `--sf-glass-bg-strong` for text-heavy surfaces.
- **Backdrop-filter performance** on low-end/Electron → cap blur radius, gate behind `prefers-reduced-data`, `@supports` fallback to opaque (done).
- **Prefix churn** if we rename `--sf-*` → `--rox-*` → mitigate with an *alias layer* (keep `--sf-*` working), never a hard rename.
- **Scope creep** across 50 scenes → freeze scene set at 50; further ideas become variants/props, not new scenes.

---

## 9. Open questions
1. Brand: keep internal `sf-` namespace with `rox-` aliases, or full rename at v1.0? (Recommended: alias now, decide at v1.0.)
2. Light mode: full parity or "docs-only"? 
3. Ship a Tailwind plugin (`@rox/tailwind`) that injects tokens + utilities?
4. Distribute compiled CSS, or source CSS only (current)? (Recommend: both — `dist/rox.css` + source.)

See `BRAINSTORM.md` for the 20 concrete improvements that feed this roadmap.
