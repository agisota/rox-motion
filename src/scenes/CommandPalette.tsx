"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp, scaleIn } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

const QUERY = "create state contract";

const RESULTS: { glyph: string; label: string; sub: string; kbd?: string }[] = [
  { glyph: "◈",  label: "Create transition",          sub: "define S₀ → S* with validators",   kbd: "⏎" },
  { glyph: "⊕",  label: "Define S*",                  sub: "specify target state & criteria" },
  { glyph: "Δ",  label: "Derive Δ",                   sub: "compute gap from current state" },
  { glyph: "◉",  label: "Open monad builder",         sub: "assemble context · tools · rights" },
  { glyph: "⬡",  label: "Launch workspace",           sub: "spin up worktree for this contract" },
  { glyph: "◷",  label: "Import from GitHub / Linear",sub: "pull issue → state contour" },
];

export function CommandPalette() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ maxWidth: 520 }}
    >
      {/* outer floating panel */}
      <motion.div
        variants={scaleIn}
        style={{
          border: "1px solid var(--sf-hair)",
          borderRadius: "var(--sf-r-lg)",
          background: "var(--sf-panel)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px var(--sf-hair)",
          overflow: "hidden",
        }}
      >
        {/* search bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "14px 16px",
          borderBottom: "1px solid var(--sf-hair)", background: "var(--sf-panel-2)",
        }}>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 12, color: "var(--sf-ink-faint)" }}>⌘K</span>
          <span style={{ flex: 1, fontFamily: "var(--sf-font-mono)", fontSize: 13, color: "var(--sf-ink)" }}>
            {QUERY}
            {loops && inView && (
              <motion.span
                style={{ display: "inline-block", width: 2, height: 14, background: "var(--sf-transition)", marginLeft: 1, verticalAlign: "text-bottom" }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            )}
          </span>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-sm)", padding: "3px 7px" }}>esc</span>
        </div>

        {/* section label */}
        <motion.div variants={fadeUp} style={{ padding: "8px 16px 4px", fontFamily: "var(--sf-font-mono)", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sf-ink-faint)" }}>
          state actions
        </motion.div>

        {/* results */}
        <div style={{ padding: "4px 8px 8px" }}>
          {RESULTS.map((r, i) => (
            <motion.div
              key={r.label}
              variants={fadeUp}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 10px",
                borderRadius: "var(--sf-r-sm)",
                background: i === 0 ? "rgba(255,122,43,0.1)" : "transparent",
                border: i === 0 ? "1px solid rgba(255,122,43,0.25)" : "1px solid transparent",
                marginBottom: 2, cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              <span style={{
                fontFamily: "var(--sf-font-mono)", fontSize: 14,
                color: i === 0 ? "var(--sf-transition)" : "var(--sf-ink-faint)",
                width: 18, textAlign: "center", flexShrink: 0,
              }}>
                {r.glyph}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontFamily: "var(--sf-font-mono)", fontSize: 12.5, color: i === 0 ? "var(--sf-transition)" : "var(--sf-ink)" }}>{r.label}</span>
                <span style={{ display: "block", fontFamily: "var(--sf-font-mono)", fontSize: 10.5, color: "var(--sf-ink-faint)", marginTop: 1 }}>{r.sub}</span>
              </span>
              {r.kbd && (
                <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: i === 0 ? "var(--sf-transition)" : "var(--sf-ink-faint)", border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-sm)", padding: "3px 7px" }}>{r.kbd}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
