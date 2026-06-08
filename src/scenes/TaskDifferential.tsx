"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp, staggerContainer } from "../tokens/motion-variants";
import { DEFAULT_EXAMPLE, type StateFirstExample } from "../data/demo-data";

interface TaskDifferentialProps {
  example?: StateFirstExample;
}

export function TaskDifferential({ example = DEFAULT_EXAMPLE }: TaskDifferentialProps) {
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
      {/* S0 / Δ / S* row */}
      <motion.div
        variants={fadeUp}
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        {/* S0 node */}
        <div className="sf-gnode is-s0" style={{ flex: 1 }}>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>S₀</span>
          <span style={{ marginLeft: 4 }}>{example.s0}</span>
        </div>

        {/* Δ badge */}
        <div
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid var(--sf-hair)",
            background: "var(--sf-panel-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--sf-font-display)",
            fontSize: 20,
            color: "var(--sf-ink-dim)",
          }}
        >
          Δ
        </div>

        {/* S* node */}
        <div className="sf-gnode is-star" style={{ flex: 1 }}>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>S*</span>
          <span style={{ marginLeft: 4 }}>{example.star}</span>
        </div>
      </motion.div>

      {/* Delta description */}
      <motion.div
        variants={fadeUp}
        className="sf-metric"
        style={{ textAlign: "center" }}
      >
        <div className="sf-metric__k">delta</div>
        <div className="sf-metric__v" style={{ fontSize: 15, color: "var(--sf-ink-dim)" }}>
          {example.delta}
        </div>
      </motion.div>

      {/* Formula summary */}
      <motion.div
        variants={fadeUp}
        style={{
          fontFamily: "var(--sf-font-mono)",
          fontSize: 12,
          color: "var(--sf-ink-faint)",
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ color: "var(--sf-ink-dim)" }}>Δ</span>
        {" = "}
        <span style={{ color: "var(--sf-target)" }}>S*</span>
        {" − "}
        <span style={{ color: "var(--sf-transition)" }}>S₀</span>
      </motion.div>
    </motion.div>
  );
}
