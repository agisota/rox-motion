"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { DEFAULT_EXAMPLE } from "../data/demo-data";

const STEPS = [
  { id: "request",  label: "User Request",        desc: "Describe the issue or goal" },
  { id: "s0",       label: "Infer S₀",             desc: "Detect current state" },
  { id: "star",     label: "Define S*",             desc: "Specify target state" },
  { id: "delta",    label: "Derive Δ",              desc: "Compute gap" },
  { id: "contract", label: "Transition Contract",   desc: "Propose steps + validators" },
  { id: "runtime",  label: "Pick Runtime",          desc: "Select environment tools" },
  { id: "preflight",label: "Preflight Monad",       desc: "Verify sufficiency" },
  { id: "launch",   label: "Launch",                desc: "Start workspace" },
];

const ex = DEFAULT_EXAMPLE;

function StepContent({ step }: { step: number }) {
  if (step === 0) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sf-ink-faint)" }}>issue / request</div>
      <div style={{ background: "var(--sf-panel-3)", border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-sm)", padding: "12px 14px", fontFamily: "var(--sf-font-mono)", fontSize: 12, color: "var(--sf-ink-dim)", lineHeight: 1.6 }}>
        "Auth session expires silently — users get 401 with no feedback"
      </div>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)" }}>Linear · ENG-482 · opened 2h ago</div>
    </div>
  );
  if (step === 1) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sf-ink-faint)" }}>inferred S₀</div>
      <div className="sf-gnode is-s0" style={{ fontSize: 13 }}>S₀ · {ex.s0}</div>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", marginTop: 4 }}>detected from: repo state + issue body</div>
    </div>
  );
  if (step === 2) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sf-ink-faint)" }}>target state S*</div>
      <div className="sf-gnode is-star" style={{ fontSize: 13 }}>S* · {ex.star}</div>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", marginTop: 4 }}>validators: {ex.validator.join(" · ")}</div>
    </div>
  );
  if (step === 3) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sf-ink-faint)" }}>Δ = S* − S₀</div>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 13, color: "var(--sf-ink)", padding: "10px 12px", border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-sm)", background: "var(--sf-panel-2)" }}>{ex.delta}</div>
    </div>
  );
  if (step === 4) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sf-ink-faint)" }}>transitions</div>
      {ex.transitions.map((t, i) => (
        <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--sf-font-mono)", fontSize: 12, color: "var(--sf-ink-dim)", padding: "8px 10px", border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-sm)", background: "var(--sf-panel-2)" }}>
          <span style={{ color: "var(--sf-transition)", width: 20 }}>T{i + 1}</span>{t}
        </div>
      ))}
    </div>
  );
  if (step === 5) return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {ex.runtime.map(r => (
        <div key={r} className="sf-pill"><span className="sf-d" style={{ background: "var(--sf-runtime)" }} />{r}</div>
      ))}
    </div>
  );
  if (step === 6) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {(Object.keys(ex.monad) as (keyof typeof ex.monad)[]).map(k => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--sf-font-mono)", fontSize: 12 }}>
          <span style={{ color: ex.monad[k] ? "var(--sf-target)" : "var(--sf-warning)" }}>{ex.monad[k] ? "✓" : "✗"}</span>
          <span style={{ color: "var(--sf-ink-dim)" }}>{k}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 12, color: "var(--sf-target)" }}>Workspace ready to launch</div>
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)" }}>branch · feat/auth-fix · wt-07</div>
      <button
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 12, color: "var(--sf-bg)", background: "var(--sf-target)", border: "none", borderRadius: "var(--sf-r-sm)", padding: "10px 18px", cursor: "pointer", letterSpacing: "0.04em" }}
      >
        launch workspace →
      </button>
    </div>
  );
}

export function NewWorkspaceWizard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [step, setStep] = useState(0);

  return (
    <motion.div ref={ref} className="sf-winframe" variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ maxWidth: 640 }}>
      <div className="sf-winframe__bar">
        <div className="sf-winframe__dots">
          <i style={{ background: "rgba(255,90,80,0.7)" }} />
          <i style={{ background: "rgba(255,185,0,0.7)" }} />
          <i style={{ background: "rgba(40,200,70,0.7)" }} />
        </div>
        <span className="sf-winframe__title">new workspace · state contract wizard</span>
      </div>
      <div className="sf-winframe__body" style={{ display: "grid", gridTemplateColumns: "168px 1fr", gap: 0, padding: 0 }}>
        {/* Step rail */}
        <div style={{ borderRight: "1px solid var(--sf-hair)", padding: "14px 0", background: "var(--sf-panel-2)" }}>
          {STEPS.map((s, i) => (
            <motion.button
              key={s.id}
              variants={fadeUp}
              onClick={() => setStep(i)}
              style={{
                display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
                borderLeft: `2px solid ${i < step ? "var(--sf-target)" : i === step ? "var(--sf-transition)" : "transparent"}`,
                padding: "9px 14px", cursor: "pointer",
                fontFamily: "var(--sf-font-mono)", fontSize: 11,
                color: i < step ? "var(--sf-target)" : i === step ? "var(--sf-transition)" : "var(--sf-ink-faint)",
              }}
            >
              <span style={{ display: "block", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2, opacity: 0.6 }}>
                {i < step ? "done" : i === step ? "active" : `step ${i + 1}`}
              </span>
              {s.label}
            </motion.button>
          ))}
        </div>
        {/* Panel */}
        <motion.div variants={fadeUp} style={{ padding: 20, minHeight: 260 }}>
          <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {STEPS[step]?.desc}
          </div>
          <StepContent step={step} />
          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
            {step < STEPS.length - 1 && (
              <button
                onClick={() => setStep(s => s + 1)}
                style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-bg)", background: "var(--sf-transition)", border: "none", borderRadius: "var(--sf-r-sm)", padding: "8px 16px", cursor: "pointer" }}
              >
                next →
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
