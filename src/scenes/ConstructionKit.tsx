"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

// ── types ───────────────────────────────────────────────────────────────────

interface KitState {
  monadCompleteness: number;   // 0–100
  validationDepth: number;     // 0–4 (0=none, 4=deep)
  traceVerbosity: number;      // 0–3 (0=silent, 3=verbose)
  strictMode: boolean;
  autoResolve: boolean;
}

// ── helpers ─────────────────────────────────────────────────────────────────

function sufficiencyLabel(v: number): string {
  if (v >= 90) return "complete";
  if (v >= 65) return "sufficient";
  if (v >= 35) return "partial";
  return "insufficient";
}

const DEPTH_LABELS = ["none", "shallow", "moderate", "deep", "exhaustive"] as const;
const VERBOSITY_LABELS = ["silent", "minimal", "standard", "verbose"] as const;

function verbositySample(v: number): string {
  if (v === 0) return "—";
  if (v === 1) return "transition.opened · validator.passed";
  if (v === 2) return "transition.opened · monad.check · diff.written · validator.passed";
  return "transition.opened · runtime.ready · monad.check · tool.read · diff.written · tests.run · validator.passed";
}

// ── Slider ───────────────────────────────────────────────────────────────────

function KitSlider({
  label,
  value,
  min,
  max,
  onChange,
  complete,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  complete: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const fillColor = complete ? "var(--sf-target)" : "var(--sf-transition)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-dim)" }}>{label}</span>
        <span style={{
          fontFamily: "var(--sf-font-mono)", fontSize: 11,
          color: complete ? "var(--sf-target)" : "var(--sf-transition)",
        }}>
          {value}
        </span>
      </div>
      <div style={{ position: "relative" }}>
        <div className="sf-track">
          <motion.div
            className="sf-track__fill"
            style={{ background: complete ? `linear-gradient(90deg, var(--sf-transition), var(--sf-target))` : `linear-gradient(90deg, var(--sf-transition), ${fillColor})` }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            opacity: 0, cursor: "grab",
          }}
        />
      </div>
    </div>
  );
}

// ── Toggle ───────────────────────────────────────────────────────────────────

function KitToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "none", border: "none", cursor: "pointer",
        padding: 0, width: "100%", textAlign: "left",
      }}
    >
      <motion.div
        style={{
          width: 34, height: 18, borderRadius: 999,
          border: `1.5px solid ${value ? "var(--sf-target)" : "var(--sf-hair)"}`,
          background: value ? "rgba(125,255,158,0.12)" : "var(--sf-panel-3)",
          position: "relative", flexShrink: 0,
        }}
        animate={{ borderColor: value ? "var(--sf-target)" : "var(--sf-hair)" }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          style={{
            position: "absolute", top: 2,
            width: 12, height: 12, borderRadius: "50%",
            background: value ? "var(--sf-target)" : "var(--sf-ink-faint)",
          }}
          animate={{ left: value ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </motion.div>
      <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-dim)" }}>{label}</span>
    </button>
  );
}

// ── scene ───────────────────────────────────────────────────────────────────

export function ConstructionKit() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [kit, setKit] = useState<KitState>({
    monadCompleteness: 60,
    validationDepth: 2,
    traceVerbosity: 1,
    strictMode: false,
    autoResolve: true,
  });

  function set<K extends keyof KitState>(key: K, val: KitState[K]) {
    setKit((prev) => ({ ...prev, [key]: val }));
  }

  const monadComplete = kit.monadCompleteness >= 90;
  const depthComplete = kit.validationDepth >= 4;
  const verbosityComplete = kit.traceVerbosity >= 3;
  const allComplete = monadComplete && depthComplete && verbosityComplete && kit.strictMode;

  const suffPct = Math.round(
    (kit.monadCompleteness / 100) * 0.5 +
    (kit.validationDepth / 4) * 0.3 +
    (kit.traceVerbosity / 3) * 0.2 * 100
  );

  const depthLabel = DEPTH_LABELS[kit.validationDepth] ?? "none";
  const verbLabel = VERBOSITY_LABELS[kit.traceVerbosity] ?? "silent";

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      {/* controls panel */}
      <motion.div
        className="sf-box"
        variants={fadeUp}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sf-ink-faint)" }}>
            transition construction kit
          </span>
          {allComplete && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--sf-target)", border: "1px solid rgba(125,255,158,0.3)", borderRadius: "var(--sf-r-sm)",
                padding: "3px 8px",
              }}
            >
              complete
            </motion.span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <KitSlider
            label="monad completeness"
            value={kit.monadCompleteness}
            min={0} max={100}
            onChange={(v) => set("monadCompleteness", v)}
            complete={monadComplete}
          />
          <KitSlider
            label={`validation depth · ${depthLabel}`}
            value={kit.validationDepth}
            min={0} max={4}
            onChange={(v) => set("validationDepth", v)}
            complete={depthComplete}
          />
          <KitSlider
            label={`trace verbosity · ${verbLabel}`}
            value={kit.traceVerbosity}
            min={0} max={3}
            onChange={(v) => set("traceVerbosity", v)}
            complete={verbosityComplete}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <KitToggle label="strict mode" value={kit.strictMode} onChange={(v) => set("strictMode", v)} />
          <KitToggle label="auto-resolve" value={kit.autoResolve} onChange={(v) => set("autoResolve", v)} />
        </div>
      </motion.div>

      {/* live preview readout */}
      <motion.div
        className="sf-box"
        variants={fadeUp}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div className="sf-mono-k">live readout</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {/* sufficiency */}
          <div style={{ background: "var(--sf-panel-2)", borderRadius: "var(--sf-r-md)", padding: "12px 14px", border: "1px solid var(--sf-hair)" }}>
            <div className="sf-metric__k">sufficiency</div>
            <motion.div
              className="sf-metric__v"
              style={{ fontSize: 22, color: monadComplete ? "var(--sf-target)" : "var(--sf-transition)" }}
              animate={{ opacity: 1 }}
            >
              {suffPct}%
            </motion.div>
            <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", marginTop: 4 }}>
              {sufficiencyLabel(suffPct)}
            </div>
          </div>

          {/* validation */}
          <div style={{ background: "var(--sf-panel-2)", borderRadius: "var(--sf-r-md)", padding: "12px 14px", border: "1px solid var(--sf-hair)" }}>
            <div className="sf-metric__k">validation</div>
            <motion.div
              className="sf-metric__v"
              style={{ fontSize: 22, color: depthComplete ? "var(--sf-target)" : "var(--sf-ink-dim)" }}
            >
              {kit.validationDepth}/4
            </motion.div>
            <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", marginTop: 4 }}>
              {depthLabel}
            </div>
          </div>

          {/* mode */}
          <div style={{ background: "var(--sf-panel-2)", borderRadius: "var(--sf-r-md)", padding: "12px 14px", border: "1px solid var(--sf-hair)" }}>
            <div className="sf-metric__k">mode</div>
            <div
              style={{
                fontFamily: "var(--sf-font-mono)", fontSize: 13, marginTop: 6,
                color: kit.strictMode ? "var(--sf-target)" : "var(--sf-ink-dim)",
              }}
            >
              {kit.strictMode ? "strict" : "lenient"}
            </div>
            <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", marginTop: 4 }}>
              {kit.autoResolve ? "auto-resolve on" : "manual"}
            </div>
          </div>
        </div>

        {/* trace sample */}
        <div style={{
          fontFamily: "var(--sf-font-mono)", fontSize: 10.5, lineHeight: 1.7,
          color: "var(--sf-ink-dim)", background: "var(--sf-panel-2)",
          borderRadius: "var(--sf-r-md)", border: "1px solid var(--sf-hair)",
          padding: "10px 12px",
        }}>
          <span style={{ color: "var(--sf-ink-faint)" }}>trace · </span>
          <motion.span
            key={kit.traceVerbosity}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {verbositySample(kit.traceVerbosity)}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
