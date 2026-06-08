"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { DEFAULT_EXAMPLE } from "../data/demo-data";

const FIELDS = [
  { key: "S₀", label: "current state", value: DEFAULT_EXAMPLE.s0, color: "var(--sf-transition)" },
  { key: "S*", label: "target state", value: DEFAULT_EXAMPLE.star, color: "var(--sf-target)" },
  { key: "Δ",  label: "delta",        value: DEFAULT_EXAMPLE.delta, color: "var(--sf-ink-dim)" },
  { key: "R",  label: "runtime",      value: DEFAULT_EXAMPLE.runtime.join(", "), color: "var(--sf-runtime)" },
  { key: "V",  label: "validator",    value: DEFAULT_EXAMPLE.validator[0]!, color: "var(--sf-target)" },
] as const;

export function StateContracts() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div className="sf-g2" style={{ alignItems: "stretch" }}>
        {/* Request box */}
        <motion.div variants={fadeUp} className="sf-box" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
          <div className="sf-mono-k" style={{ marginBottom: 6 }}>user request</div>
          <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 13, color: "var(--sf-friction)", border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-md)", padding: "14px 16px", lineHeight: 1.5, background: "var(--sf-panel-2)" }}>
            "make the login better"
          </div>
          <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", lineHeight: 1.5 }}>
            vague · no verifiable target · agent cannot act
          </div>
        </motion.div>

        {/* Contract card */}
        <motion.div variants={fadeUp} className="sf-box" style={{ borderColor: "rgba(125,255,158,0.22)", background: "rgba(125,255,158,0.03)" }}>
          <div className="sf-mono-k" style={{ marginBottom: 12, color: "var(--sf-target)" }}>transition contract</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FIELDS.map(({ key, label, value, color }) => (
              <motion.div key={key} variants={fadeUp}
                style={{ display: "flex", alignItems: "baseline", gap: 8, fontFamily: "var(--sf-font-mono)", fontSize: 12, borderBottom: "1px solid var(--sf-hair)", paddingBottom: 7 }}>
                <span style={{ color, width: 22, flexShrink: 0, fontWeight: 600 }}>{key}</span>
                <span style={{ color: "var(--sf-ink-faint)", width: 80, flexShrink: 0 }}>{label}</span>
                <span style={{ color: "var(--sf-ink)", flex: 1 }}>{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} style={{ textAlign: "center", fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)" }}>
        vague request <span style={{ color: "var(--sf-transition)" }}>→</span> structured contract <span style={{ color: "var(--sf-transition)" }}>→</span> agent can act
      </motion.div>
    </motion.div>
  );
}
