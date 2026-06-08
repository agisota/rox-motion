"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

const LAYERS = [
  {
    id: "what",
    label: "WHAT",
    sublabel: "target · S*",
    caption: "the verified goal — primary",
    color: "var(--sf-target)",
    border: "rgba(125,255,158,0.4)",
    bg: "rgba(125,255,158,0.06)",
    scale: 1,
    zIndex: 3,
    marginBottom: 0,
  },
  {
    id: "how",
    label: "HOW",
    sublabel: "harness · subordinate",
    caption: "the mechanism — serves the WHAT",
    color: "var(--sf-friction)",
    border: "var(--sf-hair)",
    bg: "rgba(93,106,104,0.08)",
    scale: 0.94,
    zIndex: 2,
    marginBottom: 0,
  },
  {
    id: "evidence",
    label: "EVIDENCE",
    sublabel: "trace · τ",
    caption: "the proof stream — runtime record",
    color: "var(--sf-runtime)",
    border: "rgba(111,184,201,0.3)",
    bg: "rgba(111,184,201,0.05)",
    scale: 0.88,
    zIndex: 1,
    marginBottom: 0,
  },
];

export function HarnessNotCenter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="sf-box sf-box--xl"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        variants={fadeUp}
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sf-ink-faint)", marginBottom: 18 }}
      >
        harness is not the center
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {LAYERS.map((layer, i) => (
          <motion.div
            key={layer.id}
            variants={fadeUp}
            style={{
              border: `1px solid ${layer.border}`,
              borderRadius: "var(--sf-r-md)",
              background: layer.bg,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              position: "relative",
              zIndex: layer.zIndex,
              marginLeft: `${i * 14}px`,
              marginRight: `${i * 14}px`,
            }}
          >
            {/* Color swatch */}
            <div style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: layer.color,
              flexShrink: 0,
              boxShadow: layer.id === "what" ? `0 0 10px ${layer.color}` : undefined,
            }} />

            {/* Labels */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 13, fontWeight: 600, color: layer.color, letterSpacing: "0.08em" }}>
                  {layer.label}
                </span>
                <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-dim)", letterSpacing: "0.04em" }}>
                  {layer.sublabel}
                </span>
              </div>
              <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", marginTop: 3, letterSpacing: "0.04em" }}>
                {layer.caption}
              </div>
            </div>

            {/* Dominant indicator for WHAT */}
            {layer.id === "what" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 24 }}
                style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, color: "var(--sf-target)", border: "1px solid rgba(125,255,158,0.4)", borderRadius: 999, padding: "3px 9px", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                primary
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", marginTop: 16, letterSpacing: "0.06em", lineHeight: 1.6 }}
      >
        harness is a HOW-layer · it serves the WHAT · the WHAT is always primary
      </motion.div>
    </motion.div>
  );
}
