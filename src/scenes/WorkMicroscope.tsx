"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

const LAYERS = [
  { id: "s0",  label: "S₀", sublabel: "initial state",    color: "var(--sf-ink-dim)",    bg: "rgba(255,255,255,0.03)" },
  { id: "s1",  label: "s₁", sublabel: "diff applied",     color: "var(--sf-transition)",  bg: "rgba(255,122,43,0.07)" },
  { id: "s2",  label: "s₂", sublabel: "tests running",    color: "var(--sf-transition)",  bg: "rgba(255,122,43,0.10)" },
  { id: "star",label: "S*", sublabel: "validator passed", color: "var(--sf-target)",      bg: "rgba(125,255,158,0.10)" },
];

export function WorkMicroscope() {
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
      <motion.div variants={fadeUp} style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sf-ink-faint)", marginBottom: 14 }}>
        work microscope — layers of state change
      </motion.div>

      <motion.div
        variants={fadeUp}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
          transition={{ type: "spring", stiffness: 240, damping: 26, delay: 0.1 }}
          style={{ position: "relative", width: 220, height: 220 }}
        >
          {/* Circular viewport frame */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "2.5px solid rgba(111,184,201,0.6)",
            boxShadow: "0 0 30px rgba(111,184,201,0.12), inset 0 0 40px rgba(111,184,201,0.04)",
            overflow: "hidden",
            background: "var(--sf-panel-2)",
          }}>
            {/* Layers stacked inside circle */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
              {LAYERS.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 300, damping: 28 }}
                  style={{
                    flex: 1,
                    background: layer.bg,
                    borderBottom: i < LAYERS.length - 1 ? "1px solid var(--sf-hair)" : "none",
                    display: "flex", alignItems: "center",
                    padding: "0 22px", gap: 10,
                    position: "relative",
                  }}
                >
                  <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 13, fontWeight: 600, color: layer.color, minWidth: 24 }}>{layer.label}</span>
                  <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", letterSpacing: "0.06em" }}>{layer.sublabel}</span>
                  {layer.id === "star" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                      transition={{ delay: 0.9, type: "spring", stiffness: 320, damping: 22 }}
                      style={{ marginLeft: "auto", color: "var(--sf-target)", fontSize: 13 }}
                    >✓</motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Scan line */}
            <motion.div
              style={{
                position: "absolute", left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, rgba(111,184,201,0.5), transparent)",
                pointerEvents: "none",
              }}
              initial={{ top: "0%" }}
              animate={inView ? { top: ["0%", "100%", "0%"] } : { top: "0%" }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 0.5 }}
            />
          </div>

          {/* Crosshair lines */}
          <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: "100%", background: "rgba(111,184,201,0.15)", transform: "translateX(-50%)", borderRadius: 1 }} />
          <div style={{ position: "absolute", top: "50%", left: 0, height: 1, width: "100%", background: "rgba(111,184,201,0.15)", transform: "translateY(-50%)" }} />

          {/* Cyan ring accent */}
          <div style={{
            position: "absolute", inset: -6, borderRadius: "50%",
            border: "1px dashed rgba(111,184,201,0.2)", pointerEvents: "none",
          }} />
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp} style={{ textAlign: "center", fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", marginTop: 14, letterSpacing: "0.08em" }}>
        each layer = a discrete state · S* is the only verified bottom
      </motion.div>
    </motion.div>
  );
}
