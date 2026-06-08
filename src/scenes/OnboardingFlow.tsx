"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

interface Step {
  num: number;
  title: string;
  body: string;
  color: string;
}

const STEPS: Step[] = [
  { num: 1, title: "define S*",     body: "What is the verified target state? What does 'done' look like precisely? tests passing · no regressions · diff reviewed",  color: "var(--sf-target)" },
  { num: 2, title: "define S₀",     body: "What is the current state? Be exact — vague S₀ produces vague Δ. Right now: bug reproduced, cause unknown.",              color: "var(--sf-transition)" },
  { num: 3, title: "derive Δ",      body: "Δ = S* − S₀. The gap the transition must close. cause located + patched + covered. Three sub-transitions.",              color: "var(--sf-transition)" },
  { num: 4, title: "build monad",   body: "Assemble everything required: context, tools, rights, memory, constraints, criteria. 6/6 sufficient → proceed.",         color: "var(--sf-runtime)" },
  { num: 5, title: "capture trace", body: "Record every event. The trace proves S* was reached. validator.passed · S* verified · artifact: PR #482.",               color: "var(--sf-target)" },
];

export function OnboardingFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [step, setStep] = useState(0);

  const current = STEPS[step]!;
  const isLast = step === STEPS.length - 1;

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}
    >
      {/* Phone frame */}
      <motion.div variants={fadeUp} style={{ width: "100%", maxWidth: 340, border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-xl)", background: "var(--sf-panel)", overflow: "hidden" }}>
        {/* Phone top bar */}
        <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid var(--sf-hair)", background: "var(--sf-panel-2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--sf-ink-faint)" }}>
            state-first onboarding
          </span>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: isLast ? "var(--sf-target)" : "var(--sf-transition)" }}>
            {step + 1}/{STEPS.length}
          </span>
        </div>

        {/* Step panel with AnimatePresence */}
        <div style={{ position: "relative", minHeight: 180, overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 48, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -48, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ padding: "22px 20px" }}
            >
              <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--sf-ink-faint)", marginBottom: 8 }}>
                step {current.num}
              </div>
              <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 18, color: current.color, marginBottom: 14, fontWeight: 600 }}>
                {current.title}
              </div>
              <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11.5, color: "var(--sf-ink-dim)", lineHeight: 1.65 }}>
                {current.body}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div style={{ padding: "0 20px 16px" }}>
          <div style={{ height: 4, borderRadius: 999, background: "var(--sf-panel-3)", overflow: "hidden", marginBottom: 14 }}>
            <motion.div
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: "100%", borderRadius: 999, background: isLast ? "var(--sf-target)" : "var(--sf-transition)" }}
            />
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: 7, marginBottom: 14 }}>
            {STEPS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setStep(i)}
                animate={{ width: i === step ? 20 : 7, background: i <= step ? (isLast ? "var(--sf-target)" : "var(--sf-transition)") : "var(--sf-hair)" }}
                transition={{ duration: 0.3 }}
                style={{ height: 7, borderRadius: 999, border: "none", cursor: "pointer", padding: 0 }}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                style={{ flex: 1, fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-dim)", border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-sm)", padding: "9px 0", background: "transparent", cursor: "pointer" }}>
                ← back
              </button>
            )}
            <button
              onClick={() => { if (!isLast) setStep(s => s + 1); }}
              style={{ flex: 1, fontFamily: "var(--sf-font-mono)", fontSize: 11, color: isLast ? "var(--sf-bg)" : "var(--sf-bg)", border: "none", borderRadius: "var(--sf-r-sm)", padding: "9px 0", background: isLast ? "var(--sf-target)" : "var(--sf-transition)", cursor: isLast ? "default" : "pointer", opacity: isLast ? 0.9 : 1 }}>
              {isLast ? "✓ complete" : "next →"}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", textAlign: "center" }}>
        define S* first · <span style={{ color: "var(--sf-target)" }}>done is the beginning, not the end</span>
      </motion.div>
    </motion.div>
  );
}
