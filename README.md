# Rox UI

> A **State-First / Transition-First** motion + component design system for React. The visual language *is* the mental model: `state · transition · event · runtime · monad · trace · validator · agent`. Dark graphite blueprint, glass surfaces, semantic color as law. Built from the `State-First.html` reference for [`agisota/set`](https://github.com/agisota/set) (landing + desktop).

Status (v0.5): **all 50 scenes · glass surfaces · light/dark/high-contrast themes · scroll choreography · cva variant API · opt-in sound · typecheck clean · 30 tests passing** (incl. axe a11y + a test that mounts the entire page).

**Themes:** `<ColorThemeProvider>` + `<ColorThemeSwitch/>` (dark / light / high-contrast). **Fonts:** Victor Mono / Bebas Neue / Lekton. **Motion:** Full / Essential / Off. **Sound:** opt-in WebAudio ticks (off by default). **Scroll:** `<ScrollProgress/>` + `<ScrollSignal/>` + magnetic active nav. **Variants:** `<Surface>` / `<Button>` (cva). **Catalog:** Ladle stories. **Quality:** axe test + Playwright visual + ESLint/Prettier + GitHub Actions scaffolds.

**Docs:** [`PRD.md`](./PRD.md) · [`BRAINSTORM.md`](./BRAINSTORM.md) (all 20 improvements, now landed).

## Install

```bash
bun add motion @fontsource/victor-mono @fontsource/bebas-neue @fontsource/lekton
# then add this package to your workspace (packages/state-first-kit)
```

## Use

```tsx
// 1. global CSS — one import brings tokens + component styles
import "rox-ui/tokens.css";
import "@fontsource/victor-mono/400.css";
import "@fontsource/victor-mono/600.css";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/lekton/400.css";
import "@fontsource/lekton/700.css";

// 2. wrap your app root
import { MotionProvider, FontThemeProvider } from "rox-ui";

<MotionProvider>          {/* owns MotionConfig + Full/Essential/Off level */}
  <FontThemeProvider>     {/* Victor Mono / Bebas Neue / Lekton, persisted */}
    <App />
  </FontThemeProvider>
</MotionProvider>

// 3a. the whole /state-first page in one line (wraps its own providers)
import { StateFirstPage } from "rox-ui";
export default function Page() { return <StateFirstPage />; }

// 3b. …or drop individual components into your app
import { WorkspaceStateCard, AgentRunHeader, RunButton } from "rox-ui";
```

## What's inside

| Layer | Exports |
|-------|---------|
| Tokens | `sfColors`, `sfGlows`, `sfRadius`, `sfEase`, `sfSpring`, `sfColorMeaning`, + Motion variants (`fadeUp`, `staggerContainer`, `drawPath`, `slotSnap`, `breatheLoop`, `taskMorph`/`starMorph`, …) |
| Providers | `MotionProvider`, `FontThemeProvider` |
| Hooks | `useMotionLevel`, `useLoopsAllowed`, `useAnyMotion`, `useFontTheme`, `usePointerGlow` |
| Primitives | `StateCard`, `TransitionRail`, `MonadCapsule`, `RunButton`, `FontThemeSwitch`, `MotionControl`, `WorkspaceStateCard`, `TraceConsole`, `AgentRunHeader` |
| Page | `StateFirstPage` — the full `/state-first` page (nav + hero + all 50 scenes by cluster + footer), `sceneRegistry` (componentName → component) |
| Scenes | **All 44 scene components**, e.g. `WhatBeforeHowSplit`, `MonadBuilder`, `GravityField`, `DeltaDecomposition`, `MetroMap`, `CircuitBoard`, `IntentToArtifact`, `StateOSDesktop`, `DiffAsStateProof`, `CommandPalette`, `MultiWorkspaceMap`, … |
| Data | `stateFirstScenes` (the 50-scene registry), `stateFirstExamples`, `ontologyAtoms`, `DEMO_TRACE` |

## Architecture

- **Styling** lives in `tokens/components.css` (namespaced `.sf-*`, driven by `--sf-*` variables). Components emit classNames — so `:hover`, `@media`, and pseudo-elements all work, and the CSS is portable to any framework. Motion-value-driven transforms stay in the JS layer.
- **Motion** is Framer Motion only — no GSAP/Lottie/Rive, no CSS keyframes for core motion. Everything is gated by `useInView` + the motion level, and resting state is always visible (clock-safe).
- **Color is law:** green (`--sf-target`) never pulses; orange (`--sf-transition`) is the only thing that may.

## Scripts

```bash
bun run typecheck   # tsc --noEmit
bun run test        # vitest run
```

See `../../IMPLEMENTATION_GUIDE.md` for the full landing-page + desktop integration walkthrough.
