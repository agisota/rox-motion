"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp, staggerContainer, drawPath } from "../tokens/motion-variants";

interface Gate {
  id: string;
  label: string;
  status: "passed" | "current" | "future";
}

const GATES: Gate[] = [
  { id: "brief",     label: "brief",     status: "passed"  },
  { id: "evidence",  label: "evidence",  status: "passed"  },
  { id: "draft",     label: "draft",     status: "current" },
  { id: "validated", label: "validated", status: "future"  },
  { id: "shipped",   label: "shipped",   status: "future"  },
];

const GATE_COLOR: Record<Gate["status"], string> = {
  passed:  "var(--sf-target)",
  current: "var(--sf-transition)",
  future:  "var(--sf-ink-faint)",
};

export function QualityGates() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="sf-box"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* connector line behind nodes */}
      <motion.div variants={fadeUp} style={{ position: "relative", height: 60, display: "flex", alignItems: "center" }}>
        <svg
          viewBox="0 0 400 20"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
          preserveAspectRatio="none"
        >
          {/* full grey track */}
          <line x1={0} y1={10} x2={400} y2={10} stroke="var(--sf-hair)" strokeWidth={2} />
          {/* passed segment in green */}
          <motion.line
            x1={0} y1={10} x2={160} y2={10}
            stroke="var(--sf-target)"
            strokeWidth={2.5}
            strokeLinecap="round"
            variants={drawPath}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          />
          {/* current segment in orange */}
          <motion.line
            x1={160} y1={10} x2={240} y2={10}
            stroke="var(--sf-transition)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="5 4"
            variants={drawPath}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          />
        </svg>

        {/* gate nodes */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {GATES.map((gate) => {
            const color = GATE_COLOR[gate.status];
            return (
              <div key={gate.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: gate.status === "current" ? 20 : 14,
                    height: gate.status === "current" ? 20 : 14,
                    borderRadius: "50%",
                    border: `2px solid ${color}`,
                    background: gate.status === "passed" ? color : "var(--sf-panel)",
                    boxShadow: gate.status !== "future" ? `0 0 10px ${color}60` : "none",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--sf-font-mono)",
                    fontSize: 10,
                    color,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {gate.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* legend */}
      <motion.div
        variants={fadeUp}
        style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        {(["passed", "current", "future"] as const).map((status) => (
          <span
            key={status}
            style={{
              fontFamily: "var(--sf-font-mono)",
              fontSize: 10,
              color: GATE_COLOR[status],
              display: "flex",
              alignItems: "center",
              gap: 5,
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: GATE_COLOR[status], display: "inline-block" }} />
            {status}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
