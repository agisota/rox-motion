# Rox UI — Brainstorming: 20 Improvements toward "best-in-class UI/UX"

Ordered by **impact ÷ effort**. Each has: what, why, how, effort (S/M/L), and status. Status legend: ✅ landed in v0.3 · 🔜 next · 🧪 needs verification gate.

The north star: a **futuristic operating-system-for-work** aesthetic — translucent glass over a graphite blueprint, semantic color as law, motion that *means* something, type that creates real hierarchy.

---

## A. Surface & depth (the "glass" the user asked for)

### 1. Glass / translucency surface system ✅ (landed v0.3)
**What:** Translucent, blurred surfaces with a layered top-light edge + soft drop shadow. Tokens `--sf-glass-*`, utilities `.sf-glass`, `.sf-glass--strong/faint/target/transition/runtime`, `.sf-ring` gradient hairline.
**Why:** Instantly reads as premium/modern; creates depth without heavy borders; the blur ties foreground to the blueprint grid behind it.
**How:** `backdrop-filter: blur() saturate()`, `inset 0 1px 0 highlight`, `@supports` fallback to opaque. Applied to nav, hero stage, cards.
**Effort:** M · **Next:** roll onto formula/delta/gravity panels, command palette, modals.

### 2. Two-layer light edges (top highlight + bottom shadow)
**What:** Every elevated surface gets a 1px top inner-highlight and a faint bottom inner-shadow → simulates a light source above.
**Why:** This single trick is what separates "flat dark card" from "physical glass panel."
**How:** `box-shadow: inset 0 1px 0 var(--sf-glass-highlight), inset 0 -1px 0 rgba(0,0,0,.3)`. ✅ partially landed; generalize via a `.sf-elev` class. **Effort:** S.

### 3. Gradient hairline rings (`.sf-ring`) ✅
**What:** A 1px border that fades from light at the top to transparent — the Apple/Linear "lit edge."
**Why:** Far more premium than a flat `1px solid`.
**How:** masked gradient border (shipped in `elevation.css`). **Next:** apply to hero stage + primary buttons. **Effort:** S.

### 4. Depth tiers / elevation scale
**What:** Formalize 4 elevation levels (flat → raised → overlay → modal) as tokens: bg opacity, blur radius, shadow, ring strength step up per tier.
**Why:** Consistent z-language; popovers/command-palette/modals feel correctly "above."
**How:** `--sf-elev-1..4` token bundles + `.sf-elev-{n}` utilities. **Effort:** M · 🔜

### 5. Noise / grain texture layer
**What:** A 2–3% SVG/feTurbulence grain over glass surfaces.
**Why:** Kills banding on gradients and makes dark glass feel film-like, not plastic.
**How:** tiny inline SVG data-URI as a `::before` at low opacity, `mix-blend-mode: overlay`; gate behind `prefers-reduced-data`. **Effort:** S · 🔜

---

## B. Typography (the "more font sizes / smarter" the user asked for)

### 6. Modular type scale ✅ (landed v0.3)
**What:** `--sf-text-2xs … --sf-text-5xl` on a 1.2 ratio, plus tracking + leading tokens and `.sf-t-*` utilities.
**Why:** Ad-hoc px sizes look "random"; a ratio-based scale looks designed and creates real hierarchy.
**How:** clamp()-based fluid steps for the big sizes. **Next:** migrate components off inline px to `var(--sf-text-*)`. **Effort:** M.

### 7. Optical size & weight pairing
**What:** Pair display weight/tracking with size: big sizes get tighter tracking (`--sf-tracking-tight`) and heavier weight; small caps-labels get wide tracking.
**Why:** Tight tracking on large type + airy tracking on tiny labels is the single biggest "smart typography" signal.
**How:** baked into `.sf-t-3xl/4xl/5xl` and `.sf-caps`. **Next:** apply across scene headers. **Effort:** S · ✅ tokens / 🔜 adoption.

### 8. Tabular numerals for all metrics
**What:** `font-variant-numeric: tabular-nums` (`.sf-tabular`) on counters, meters, trace timestamps, sufficiency scores.
**Why:** Numbers stop "jittering" when animating (RunButton, ComparisonDashboard, MonadBuilder).
**How:** shipped utility; apply to numeric components. **Effort:** S · 🔜

### 9. Fluid type + container queries
**What:** Move scene headings to container-query-driven sizes so components look right embedded anywhere (docs, narrow panels, desktop).
**Why:** Same component, many contexts (the whole point of a kit).
**How:** `@container` + the clamp scale. **Effort:** M · 🔜

### 10. A "reading" body measure
**What:** Cap body copy at ~62ch, set `text-wrap: pretty`/`balance` on headings.
**Why:** Long lines and orphans are the most common "amateur" tell.
**How:** `--sf-measure: 62ch`; apply to `.sf-sub`, captions. **Effort:** S · 🔜

---

## C. Color & light

### 11. Semantic glow as interaction feedback
**What:** On hover/active, surfaces emit a *semantic* glow (target=green, transition=orange) via `box-shadow` + the existing pointer-glow hook.
**Why:** Reinforces the color law through motion; feels alive without pulsing the green.
**How:** extend `usePointerGlow` to accept a tone; add `.sf-glow-{tone}` hover utilities. **Effort:** M · 🔜

### 12. Light mode + high-contrast theme
**What:** A `[data-sf-theme="light|hc"]` token set, switchable like fonts.
**Why:** Docs/embeds often live on light backgrounds; HC is an a11y must.
**How:** alternate `--sf-*` blocks; verify AA. **Effort:** L · 🔜 (v0.4)

### 13. Dedicated focus-ring token + visible focus everywhere
**What:** `--sf-focus` (runtime-cyan, 2px offset ring) applied via `:focus-visible` on every interactive element.
**Why:** Keyboard a11y + it looks intentional.
**How:** global `:focus-visible` rule; never bare `outline:none`. **Effort:** S · 🔜

---

## D. Motion polish

### 14. Spring-based, shared-element route/section transitions
**What:** Use `layoutId` + `MotionConfig` to morph the hero `S*` into the first scene's `S*`, and animate section-to-section via a shared "signal."
**Why:** Turns a long scroll page into a *choreographed* experience (Linear/Vercel-tier).
**How:** a `<SignalThread>` that owns a `layoutId` across sections. **Effort:** L · 🔜

### 15. Scroll-linked progress + magnetic anchor nav
**What:** `useScroll` driven cluster progress bar in the nav; nav chips "magnetize" to the active section.
**Why:** Wayfinding on a 50-scene page; premium feel.
**How:** `useScroll`/`useTransform`; `IntersectionObserver` for active section. **Effort:** M · 🔜

### 16. Sound-of-state micro-interactions (optional, off by default)
**What:** Tiny, opt-in audio ticks on transition.opened / validator.passed.
**Why:** Multi-sensory state feedback; very "OS for work."
**How:** WebAudio, gated behind an explicit user toggle + reduced-motion respect. **Effort:** M · 🔜 (experimental)

---

## E. Architecture / DX / quality

### 17. `--rox-*` brand alias layer (no breaking rename)
**What:** Add `--rox-bg`, `--rox-target`, … that resolve to the `--sf-*` values; export `roxColors` aliasing `sfColors`.
**Why:** Brand consistency with the `rox-ui` name without churning the verified `sf-` internals.
**How:** one alias block in tokens.css + a re-export. **Effort:** S · 🔜 (v0.4)

### 18. Variant/density/tone prop API + `cva`
**What:** Replace one-off props with a consistent `tone` (target/transition/runtime/neutral), `density` (cozy/compact), `variant` (glass/solid/ghost) across primitives, powered by class-variance-authority.
**Why:** Predictable, composable API; less inline styling.
**How:** `cva` recipes per component mapping to `.sf-*` classes. **Effort:** L · 🔜

### 19. Accessibility + visual-regression CI gates
**What:** `axe` test on `StateFirstPage`; Playwright screenshot diffs of flagship scenes × 3 fonts × {full,off}.
**Why:** Locks quality; prevents regressions across the 50 scenes.
**How:** `@axe-core/playwright`, `@playwright/test` snapshots; wire into `bun run test:visual`. **Effort:** M · 🧪

### 20. Storybook/Ladle + MDX token docs + "copy import" everywhere
**What:** A browsable catalog of every primitive/scene with controls, plus auto-generated token tables, and a copy-import affordance on each (ComponentPlayground already has the pattern).
**Why:** Adoption hinges on discoverability; this is how teams actually consume a system.
**How:** Ladle (fast, Vite) stories per component; MDX that reads `sfColors`/scale tokens. **Effort:** M · 🔜

---

## Quick-win bundle (do first, all S/M, mostly CSS)
**#2 light edges · #3 rings on stage+buttons · #5 grain · #8 tabular nums · #10 reading measure · #13 focus ring · #17 `--rox-*` aliases.**
Together these are a half-day of low-risk CSS/token work that visibly lifts the whole system, with the verified build staying green.

## Bigger bets (schedule deliberately)
**#12 light/HC themes · #14 shared-element choreography · #18 cva variant API · #19 a11y+visual CI.**
These define v0.4–v1.0 and need their own verification gates.

---

*Companion to `PRD.md`. v0.3 already shipped #1, #3, #6, and the tokens for #2, #7, #8 — verified (`tsc` clean, 19 tests green).*
