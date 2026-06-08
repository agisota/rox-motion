"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

const STAGES = [
  { min: 0,  max: 24,  label: "raw prompt",           text: "fix it",                                    color: "var(--sf-friction)" },
  { min: 25, max: 49,  label: "vague intent",          text: "make the login better somehow",             color: "var(--sf-ink-dim)" },
  { min: 50, max: 74,  label: "partial spec",          text: "S₀: login fails · S*: user authenticated",  color: "var(--sf-transition)" },
  { min: 75, max: 100, label: "full transition spec",  text: "S₀: bug reproduced · S*: tests passing · Δ: cause located + patched · monad: 6/6 · validator: tests green", color: "var(--sf-target)" },
] as const;

function getStage(v: number) {
  return STAGES.find((s) => v >= s.min && v <= s.max) ?? STAGES[3];
}

export function PromptMaturitySlider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [value, setValue] = useState(0);

  const stage = getStage(value);
  const pct = value;

  return (
    <motion.div
      ref={ref}
      className="sf-box"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div className="sf-mono-k">prompt maturity</div>
        <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: stage.color }}>{stage.label}</div>
      </motion.div>

      {/* slider */}
      <motion.div variants={fadeUp} style={{ marginBottom: 22 }}>
        <div className="sf-track" style={{ marginBottom: 8 }}>
          <div className="sf-track__fill" style={{ width: `${pct}%` }} />
          <div className="sf-track__knob" style={{ left: `${pct}%` }} />
        </div>
        <input
          type="range" min={0} max={100} value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ position: "absolute", opacity: 0, width: "100%", left: 0, top: 0, height: "100%", cursor: "pointer" }}
          aria-label="Prompt maturity"
        />
        <div style={{ position: "relative" }}>
          <input
            type="range" min={0} max={100} value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--sf-transition)", cursor: "pointer", display: "block" }}
            aria-label="Prompt maturity level"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", marginTop: 4 }}>
          <span>0% · raw</span>
          <span style={{ color: "var(--sf-ink-dim)" }}>{value}%</span>
          <span>100% · full spec</span>
        </div>
      </motion.div>

      {/* prompt display */}
      <motion.div variants={fadeUp}
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 13, color: stage.color, background: "var(--sf-panel-2)", border: `1px solid var(--sf-hair)`, borderRadius: "var(--sf-r-md)", padding: "16px 18px", minHeight: 72, lineHeight: 1.6, transition: "color 0.3s ease" }}>
        {stage.text}
      </motion.div>

      <motion.div variants={fadeUp} style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" as const }}>
        {STAGES.map((s) => (
          <span key={s.label} className="sf-pill"
            style={{ borderColor: value >= s.min ? s.color : "var(--sf-hair)", color: value >= s.min ? s.color : "var(--sf-ink-faint)", opacity: value >= s.min ? 1 : 0.4, transition: "all 0.3s ease" }}>
            {s.min}%
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
