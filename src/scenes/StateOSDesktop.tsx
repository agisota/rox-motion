"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

const PANELS = [
  {
    id: "inspector",
    title: "Inspector",
    accent: "var(--sf-transition)",
    content: [
      { k: "S₀", v: "bug reproduced", c: "var(--sf-transition)" },
      { k: "S*", v: "tests passing",  c: "var(--sf-target)" },
      { k: "Δ",  v: "cause + patch",  c: "var(--sf-ink-dim)" },
    ],
  },
  {
    id: "planner",
    title: "Planner",
    accent: "var(--sf-runtime)",
    content: [
      { k: "T1", v: "reproduce",  c: "var(--sf-ink-dim)" },
      { k: "T2", v: "locate",     c: "var(--sf-transition)" },
      { k: "T3", v: "patch",      c: "var(--sf-transition)" },
    ],
  },
  {
    id: "monad",
    title: "Monad Builder",
    accent: "var(--sf-target)",
    content: [
      { k: "ctx",  v: "✓", c: "var(--sf-target)" },
      { k: "tools",v: "✓", c: "var(--sf-target)" },
      { k: "6/6",  v: "sufficient", c: "var(--sf-target)" },
    ],
  },
  {
    id: "runtime",
    title: "Runtime Dock",
    accent: "var(--sf-runtime)",
    content: [
      { k: "repo",  v: "ready", c: "var(--sf-runtime)" },
      { k: "shell", v: "ready", c: "var(--sf-runtime)" },
      { k: "mem",   v: "4 MB",  c: "var(--sf-ink-dim)" },
    ],
  },
  {
    id: "trace",
    title: "Trace Console",
    accent: "var(--sf-runtime)",
    content: [
      { k: "00.21", v: "repo.cloned",     c: "var(--sf-runtime)" },
      { k: "05.51", v: "diff.written",    c: "var(--sf-transition)" },
      { k: "07.40", v: "validator.passed",c: "var(--sf-target)" },
    ],
  },
] as const;

export function StateOSDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="sf-winframe"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Title bar */}
      <div className="sf-winframe__bar">
        <div className="sf-winframe__dots">
          <i style={{ background: "rgba(255,90,80,0.7)" }} />
          <i style={{ background: "rgba(255,185,0,0.7)" }} />
          <i style={{ background: "rgba(40,200,70,0.7)" }} />
        </div>
        <span className="sf-winframe__title">State OS · workspace alpha</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-target)", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sf-target)", display: "inline-block" }} />
          S* reached
        </span>
      </div>

      {/* Dashboard grid */}
      <div className="sf-winframe__body">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {PANELS.map((panel) => (
            <motion.div key={panel.id} variants={fadeUp}
              style={{ border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-md)", background: "var(--sf-panel-2)", overflow: "hidden" }}>
              {/* Panel header */}
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 10px", borderBottom: "1px solid var(--sf-hair)", background: "var(--sf-panel-3)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: panel.accent, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-dim)", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                  {panel.title}
                </span>
              </div>
              {/* Panel body */}
              <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
                {panel.content.map(({ k, v, c }) => (
                  <div key={k} style={{ display: "flex", gap: 7, fontFamily: "var(--sf-font-mono)", fontSize: 10.5 }}>
                    <span style={{ color: "var(--sf-ink-faint)", flexShrink: 0, width: 40 }}>{k}</span>
                    <span style={{ color: c }}>{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <motion.div variants={fadeUp}
          style={{ marginTop: 10, padding: "7px 10px", background: "var(--sf-panel-3)", borderRadius: "var(--sf-r-sm)", display: "flex", gap: 16, fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>
          <span>fix-bug</span>
          <span style={{ color: "var(--sf-transition)" }}>transition active</span>
          <span style={{ marginLeft: "auto", color: "var(--sf-target)" }}>S* · tests passing</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
