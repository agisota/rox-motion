/**
 * STATE-FIRST KIT — StateFirstPage
 *
 * The complete `/state-first` page in one drop-in component: nav (with font +
 * motion switches), hero machine, all 50 scenes grouped by cluster with anchor
 * navigation, and the manifesto footer.
 *
 * It wraps itself in MotionProvider + FontThemeProvider so you can render it at
 * a route as-is:
 *
 *   // apps/marketing/app/state-first/page.tsx
 *   import { StateFirstPage } from "rox-ui";
 *   import "rox-ui/tokens.css";
 *   export default function Page() { return <StateFirstPage />; }
 *
 * If your app already provides the two providers at its root, pass
 * `withProviders={false}`.
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { MotionProvider } from "./providers/MotionProvider";
import { FontThemeProvider } from "./providers/FontThemeProvider";
import { FontThemeSwitch } from "./primitives/FontThemeSwitch";
import { MotionControl } from "./primitives/MotionControl";
import { TransitionRail } from "./primitives/TransitionRail";
import { MonadCapsule } from "./primitives/MonadCapsule";
import { TraceConsole, DEMO_TRACE } from "./primitives/TraceConsole";

import { fadeUp, staggerContainer } from "./tokens/motion-variants";
import { stateFirstScenes, SCENE_CLUSTERS, type SceneCluster } from "./data/scenes";
import { sceneRegistry } from "./scene-registry";

/* ───────────────────────── nav ───────────────────────── */
function Nav() {
  return (
    <nav className="sf-nav">
      <a className="sf-nav__brand" href="#top">
        <span className="sf-nav__mark" aria-hidden="true">
          <svg viewBox="0 0 22 22" fill="none" width={22} height={22}>
            <circle cx="5" cy="11" r="3" stroke="var(--sf-transition)" strokeWidth="1.6" />
            <path d="M8.5 11h5" stroke="var(--sf-ink-faint)" strokeWidth="1.6" strokeDasharray="1.4 1.8" />
            <circle cx="17" cy="11" r="3.4" stroke="var(--sf-target)" strokeWidth="1.6" />
            <path d="M15.6 11l1 1 1.8-2" stroke="var(--sf-target)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>state‑first <b>/ set</b></span>
      </a>
      <div className="sf-nav__links">
        {SCENE_CLUSTERS.map((c) => (
          <a key={c.id} className="sf-nav__link" href={`#cluster-${c.id}`}>
            {c.label}
          </a>
        ))}
      </div>
      <div className="sf-nav__spacer" />
      <MotionControl />
      <FontThemeSwitch />
      <a className="sf-nav__cta" href="https://github.com/agisota/set" target="_blank" rel="noopener noreferrer">
        github.com/agisota/set
      </a>
    </nav>
  );
}

/* ───────────────────────── hero ───────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <header className="sf-hero" id="top">
      <div className="sf-hero__grid" ref={ref}>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div className="sf-kicker" variants={fadeUp}>
            state‑first · transition‑first work model
          </motion.div>
          <motion.h1 className="sf-hero__title" variants={fadeUp}>
            <span className="l1">we stopped designing agents.</span>
            <span className="l2">we design the state.</span>
          </motion.h1>
          <motion.p className="sf-hero__sub" variants={fadeUp}>
            work is a <b>controlled transition</b> from what is true now to what must become true next —
            executed inside a sufficient monad, run in a runtime, proven by an observable trace.
          </motion.p>
          <motion.div className="sf-hero__meta" variants={fadeUp}>
            <span className="sf-tag"><span className="sf-dot" style={{ background: "var(--sf-transition)" }} />S₀ · current state</span>
            <span className="sf-tag"><span className="sf-dot" style={{ background: "var(--sf-target)" }} />S* · target state</span>
            <span className="sf-tag"><span className="sf-dot" style={{ background: "var(--sf-runtime)" }} />runtime</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="sf-stage"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <TransitionRail
            from={{ label: "S₀", value: "bug reproduced", detail: "tests red · cause unknown" }}
            to={{ label: "S*", value: "tests passing", detail: "cause fixed · shipped" }}
            runtimeLabel="runtime · repo + shell + preview"
          />
          <MonadCapsule
            slots={[
              { label: "context", complete: true }, { label: "tools", complete: true },
              { label: "rights", complete: true }, { label: "memory", complete: true },
              { label: "files", complete: true }, { label: "limits", complete: true },
              { label: "runtime", complete: true }, { label: "criteria", complete: true },
            ]}
          />
          <div style={{ marginTop: 14, borderTop: "1px solid var(--sf-hair)", paddingTop: 12 }}>
            <TraceConsole entries={DEMO_TRACE.slice(-3)} height={72} maxRows={3} />
          </div>
        </motion.div>
      </div>
    </header>
  );
}

/* ───────────────── one scene block ───────────────── */
function SceneBlock({
  number,
  id,
  title,
  concept,
  componentName,
  reuseTargets,
  isSuperset,
}: {
  number: number;
  id: string;
  title: string;
  concept: string;
  componentName: string;
  reuseTargets: string[];
  isSuperset: boolean;
}) {
  const Cmp = sceneRegistry[componentName];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ marginBottom: 56, scrollMarginTop: "calc(var(--sf-nav-h) + 18px)" }}
    >
      <div className="sf-kicker" style={{ marginBottom: 14 }}>
        <b>{String(number).padStart(2, "0")}</b> {title}
      </div>
      <p style={{ color: "var(--sf-ink-dim)", fontSize: 14, marginBottom: 18, maxWidth: 640 }}>{concept}</p>
      {Cmp ? <Cmp /> : <div className="sf-box sf-mono-xs">component: {componentName}</div>}
      {isSuperset && (
        <div className="sf-surf-note">
          <b>where this lands →</b> {reuseTargets.join(" · ")}
        </div>
      )}
    </motion.section>
  );
}

/* ───────────────── one cluster ───────────────── */
function ClusterSection({ cluster, label }: { cluster: SceneCluster; label: string }) {
  // hero (#1) is rendered separately; skip it here
  const scenes = stateFirstScenes.filter((s) => s.cluster === cluster && s.componentName !== "HeroSection");
  if (scenes.length === 0) return null;

  return (
    <div className="sf-section" id={`cluster-${cluster}`}>
      <div className="sf-head" style={{ marginBottom: 40 }}>
        <div className="sf-kicker">{cluster}</div>
        <h2 className="sf-title">{label}</h2>
      </div>
      {scenes.map((s) => (
        <SceneBlock
          key={s.id}
          number={s.number}
          id={s.id}
          title={s.title}
          concept={s.concept}
          componentName={s.componentName}
          reuseTargets={s.reuseTargets}
          isSuperset={cluster === "superset"}
        />
      ))}
    </div>
  );
}

/* ───────────────── footer ───────────────── */
function Footer() {
  const map: [string, string][] = [
    ["workspace", "state container"],
    ["agent run", "transition execution"],
    ["terminal", "runtime"],
    ["diff", "trace evidence"],
    ["review", "validator"],
    ["automation", "transition template"],
    ["prompt", "transition contract"],
    ["S*", "the destination"],
  ];
  return (
    <footer className="sf-foot">
      <div className="sf-foot__inner">
        <h2 className="sf-foot__manifesto">
          stop managing agents. start managing <span className="sf-star">state change</span>. every workspace has a
          current state, a <span className="sf-tr">target</span>, a transition, a runtime, a trace, and a validator.
        </h2>
        <div className="sf-foot__map">
          {map.map(([a, b]) => (
            <div className="sf-fmap" key={a}>
              <span className="sf-a">{a}</span> = <span className="sf-b">{b}</span>
            </div>
          ))}
        </div>
        <div className="sf-foot__cta">
          <a className="sf-btn-primary" href="https://github.com/agisota/set" target="_blank" rel="noopener noreferrer">
            explore github.com/agisota/set
          </a>
          <a className="sf-btn-ghost" href="#top">back to top</a>
        </div>
        <div className="sf-foot__fine">
          <span>state‑first kit · {stateFirstScenes.length} scenes</span>
          <span>the harness answers HOW · the target state answers WHAT</span>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────── the page ───────────────── */
export function StateFirstPage({ withProviders = true }: { withProviders?: boolean }) {
  const body = (
    <div className="sf-blueprint-bg" style={{ background: "var(--sf-bg)", color: "var(--sf-ink)", minHeight: "100vh" }}>
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        {SCENE_CLUSTERS.map((c) => (
          <ClusterSection key={c.id} cluster={c.id} label={c.label} />
        ))}
      </main>
      <Footer />
    </div>
  );

  if (!withProviders) return body;
  return (
    <MotionProvider defaultLevel="full">
      <FontThemeProvider defaultTheme="victor">{body}</FontThemeProvider>
    </MotionProvider>
  );
}
