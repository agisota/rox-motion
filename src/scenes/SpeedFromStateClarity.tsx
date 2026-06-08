"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

interface TimelineRow {
  label: string;
  setupPct: number;
  setupColor: string;
  workPct: number;
  workColor: string;
  caption: string;
}

const ROWS: TimelineRow[] = [
  {
    label: "harness-first",
    setupPct: 15,
    setupColor: "var(--sf-transition)",
    workPct: 85,
    workColor: "var(--sf-friction)",
    caption: "fast start · slow rework tail",
  },
  {
    label: "state-first",
    setupPct: 30,
    setupColor: "var(--sf-transition)",
    workPct: 70,
    workColor: "var(--sf-target)",
    caption: "deliberate start · clean fast finish",
  },
];

export function SpeedFromStateClarity() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="sf-box"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div variants={fadeUp} style={{ marginBottom: 22 }}>
        <div className="sf-mono-k" style={{ marginBottom: 4 }}>speed comes from state clarity</div>
        <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)" }}>
          setup time → execution quality → total duration
        </div>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {ROWS.map((row, idx) => (
          <motion.div key={row.label} variants={fadeUp}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: "var(--sf-font-mono)", fontSize: 11.5 }}>
              <span style={{ color: idx === 1 ? "var(--sf-target)" : "var(--sf-friction)" }}>{row.label}</span>
              <span style={{ color: "var(--sf-ink-faint)" }}>{row.caption}</span>
            </div>
            <div style={{ height: 28, borderRadius: "var(--sf-r-sm)", background: "var(--sf-panel-3)", overflow: "hidden", display: "flex" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${row.setupPct}%` } : { width: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + idx * 0.15 }}
                style={{ height: "100%", background: row.setupColor, opacity: 0.75, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
              >
                <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, color: "var(--sf-bg)", whiteSpace: "nowrap", padding: "0 4px" }}>setup</span>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${row.workPct}%` } : { width: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 + idx * 0.15 }}
                style={{ height: "100%", background: row.workColor, opacity: idx === 1 ? 0.85 : 0.4, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
              >
                <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, color: idx === 1 ? "var(--sf-bg)" : "var(--sf-ink)", whiteSpace: "nowrap", padding: "0 4px" }}>
                  {idx === 0 ? "rework" : "execution"}
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} style={{ marginTop: 18, fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", borderTop: "1px solid var(--sf-hair)", paddingTop: 14 }}>
        clarity is real speed · <span style={{ color: "var(--sf-target)" }}>state-first finishes faster</span> because rework vanishes
      </motion.div>
    </motion.div>
  );
}
