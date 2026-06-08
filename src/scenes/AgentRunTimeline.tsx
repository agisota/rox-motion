"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp, drawPath } from "../tokens/motion-variants";
import { DEFAULT_EXAMPLE } from "../data/demo-data";

const ex = DEFAULT_EXAMPLE;

type TStatus = "done" | "active" | "pending";

const TRANSITIONS: { id: string; label: string; status: TStatus; events: string[] }[] = [
  { id: "T1", label: "reproduce issue",  status: "done",    events: ["repo.cloned", "env.ready"] },
  { id: "T2", label: "locate cause",     status: "done",    events: ["tool.read session.ts", "cause.identified"] },
  { id: "T3", label: "apply patch",      status: "active",  events: ["diff.written +18 −6", "review.pending"] },
  { id: "T4", label: "validate",         status: "pending", events: ["tests.run", "validator.gate"] },
];

const statusColor: Record<TStatus, string> = {
  done:    "var(--sf-target)",
  active:  "var(--sf-transition)",
  pending: "var(--sf-ink-faint)",
};

const statusLabel: Record<TStatus, string> = {
  done:    "done",
  active:  "running",
  pending: "pending",
};

export function AgentRunTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="sf-winframe"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ maxWidth: 520 }}
    >
      <div className="sf-winframe__bar">
        <div className="sf-winframe__dots">
          <i style={{ background: "rgba(255,90,80,0.7)" }} />
          <i style={{ background: "rgba(255,185,0,0.7)" }} />
          <i style={{ background: "rgba(40,200,70,0.7)" }} />
        </div>
        <span className="sf-winframe__title">run · {ex.id} · wt-07</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-transition)", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sf-transition)", display: "inline-block" }} />
          T3 active
        </span>
      </div>

      <div className="sf-winframe__body" style={{ padding: "18px 16px" }}>
        {/* S₀ → S* header */}
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, fontFamily: "var(--sf-font-mono)", fontSize: 11 }}>
          <span style={{ color: "var(--sf-transition)", border: "1px solid rgba(255,122,43,0.3)", borderRadius: "var(--sf-r-sm)", padding: "5px 9px" }}>S₀ · {ex.s0}</span>
          <span style={{ color: "var(--sf-ink-faint)" }}>→</span>
          <span style={{ color: "var(--sf-target)", border: "1px solid rgba(125,255,158,0.3)", borderRadius: "var(--sf-r-sm)", padding: "5px 9px" }}>S* · {ex.star}</span>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 28 }}>
          {/* Vertical connecting line */}
          <svg style={{ position: "absolute", left: 9, top: 0, width: 2, height: "100%", overflow: "visible" }} aria-hidden>
            <motion.line
              x1="1" y1="0" x2="1" y2="100%"
              stroke="var(--sf-hair)" strokeWidth={2}
              variants={drawPath}
            />
          </svg>

          {TRANSITIONS.map((tr, idx) => (
            <motion.div key={tr.id} variants={fadeUp} style={{ marginBottom: idx < TRANSITIONS.length - 1 ? 22 : 0, position: "relative" }}>
              {/* Status dot */}
              <div style={{
                position: "absolute", left: -28, top: 3,
                width: 10, height: 10, borderRadius: "50%",
                background: tr.status === "pending" ? "var(--sf-panel-2)" : statusColor[tr.status],
                border: `2px solid ${statusColor[tr.status]}`,
                boxShadow: tr.status === "done" ? "0 0 8px rgba(125,255,158,0.4)" : "none",
              }} />

              {/* Transition row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", width: 22 }}>{tr.id}</span>
                <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 12, color: statusColor[tr.status] }}>{tr.label}</span>
                <span style={{
                  marginLeft: "auto", fontFamily: "var(--sf-font-mono)", fontSize: 9,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: statusColor[tr.status], opacity: 0.85,
                }}>
                  {statusLabel[tr.status]}
                </span>
              </div>

              {/* Nested events */}
              <div style={{ paddingLeft: 32, display: "flex", flexDirection: "column", gap: 4 }}>
                {tr.events.map(ev => (
                  <div key={ev} style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--sf-font-mono)", fontSize: 10.5, color: "var(--sf-ink-faint)" }}>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--sf-ink-faint)", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ color: tr.status === "pending" ? "var(--sf-ink-faint)" : "var(--sf-runtime)" }}>{ev}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trace footer */}
        <motion.div variants={fadeUp} style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--sf-hair)", display: "flex", gap: 14, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>runtime · {ex.runtime.join(" + ")}</span>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>artifact · {ex.artifact}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
