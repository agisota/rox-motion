"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

interface MetricRow {
  label: string;
  harness: number;
  statefirst: number;
  unit: string;
}

const METRICS: MetricRow[] = [
  { label: "clarity",        harness: 24,  statefirst: 91,  unit: "%" },
  { label: "rework",         harness: 68,  statefirst: 12,  unit: "%" },
  { label: "trace coverage", harness: 31,  statefirst: 94,  unit: "%" },
  { label: "confidence",     harness: 37,  statefirst: 88,  unit: "%" },
];

function AnimatedNumber({ target, active }: { target: number; active: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 24);
    const interval = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(start);
      if (start >= target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [active, target]);

  return <>{val}</>;
}

export function ComparisonDashboard() {
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
      {/* Header */}
      <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="sf-mono-k">metrics comparison</div>
        <div style={{ display: "flex", gap: 14, fontFamily: "var(--sf-font-mono)", fontSize: 10.5 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--sf-friction)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--sf-friction)" }} />
            harness-first
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--sf-target)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--sf-target)" }} />
            state-first
          </span>
        </div>
      </motion.div>

      {/* Metric bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {METRICS.map(({ label, harness, statefirst, unit }) => (
          <motion.div key={label} variants={fadeUp}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, fontFamily: "var(--sf-font-mono)", fontSize: 11.5 }}>
              <span style={{ color: "var(--sf-ink-dim)" }}>{label}</span>
              <div style={{ display: "flex", gap: 14 }}>
                <span style={{ color: "var(--sf-friction)" }}>
                  <AnimatedNumber target={harness} active={inView} />{unit}
                </span>
                <span style={{ color: "var(--sf-target)" }}>
                  <AnimatedNumber target={statefirst} active={inView} />{unit}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ height: 6, borderRadius: 999, background: "var(--sf-panel-3)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${harness}%` } : { width: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  style={{ height: "100%", borderRadius: 999, background: "var(--sf-friction)" }}
                />
              </div>
              <div style={{ height: 6, borderRadius: 999, background: "var(--sf-panel-3)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${statefirst}%` } : { width: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                  style={{ height: "100%", borderRadius: 999, background: "var(--sf-target)" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
