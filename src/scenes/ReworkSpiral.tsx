"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp, drawPath } from "../tokens/motion-variants";

export function ReworkSpiral() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Generate spiral path points (inward)
  const spiralPath = (() => {
    const cx = 90;
    const cy = 90;
    const turns = 3.5;
    const points: string[] = [];
    const steps = 120;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * turns * 2 * Math.PI;
      const r = 72 * (1 - t * 0.85);
      const x = cx + r * Math.cos(angle - Math.PI / 2);
      const y = cy + r * Math.sin(angle - Math.PI / 2);
      points.push(i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `L ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(" ");
  })();

  return (
    <motion.div
      ref={ref}
      className="sf-box sf-box--xl"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div variants={fadeUp} style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sf-ink-faint)", marginBottom: 14 }}>
        rework spiral vs execution circuit
      </motion.div>
      <div className="sf-g2" style={{ alignItems: "start" }}>
        {/* Left: rework spiral */}
        <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <svg viewBox="0 0 180 180" style={{ width: "100%", maxWidth: 180, height: "auto" }}>
            <motion.path
              d={spiralPath}
              stroke="var(--sf-friction)"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              variants={drawPath}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />
            {/* Center dot */}
            <motion.circle cx={90} cy={90} r={4} fill="var(--sf-friction)"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 0.6 } : { opacity: 0 }}
              transition={{ delay: 0.8 }} />
          </svg>
          <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-friction)", textAlign: "center", letterSpacing: "0.06em" }}>
            harness-first<br />
            <span style={{ color: "var(--sf-ink-faint)" }}>rework loops</span>
          </div>
        </motion.div>

        {/* Right: clean circuit */}
        <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <svg viewBox="0 0 180 180" style={{ width: "100%", maxWidth: 180, height: "auto" }}>
            {/* S0 node */}
            <rect x={14} y={76} width={44} height={28} rx={5}
              fill="var(--sf-panel-2)" stroke="rgba(255,122,43,0.5)" strokeWidth={1.5} />
            <text x={36} y={95} textAnchor="middle" fill="var(--sf-transition)"
              fontSize={11} fontFamily="var(--sf-font-mono)">S₀</text>

            {/* Orange trace */}
            <motion.path d="M 58 90 L 100 90"
              stroke="var(--sf-transition)" strokeWidth={2.5} fill="none"
              variants={drawPath} initial="hidden" animate={inView ? "visible" : "hidden"} />

            {/* Midpoint validator */}
            <motion.rect x={92} y={76} width={38} height={28} rx={4}
              fill="rgba(255,122,43,0.08)" stroke="rgba(255,122,43,0.4)" strokeWidth={1}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }} />
            <text x={111} y={95} textAnchor="middle" fill="var(--sf-transition)"
              fontSize={9} fontFamily="var(--sf-font-mono)">T</text>

            {/* Green trace to S* */}
            <motion.path d="M 130 90 L 150 90"
              stroke="var(--sf-target)" strokeWidth={2.5} fill="none"
              variants={drawPath} initial="hidden" animate={inView ? "visible" : "hidden"} />

            {/* S* node */}
            <motion.rect x={146} y={76} width={20} height={28} rx={4}
              fill="rgba(125,255,158,0.1)" stroke="rgba(125,255,158,0.5)" strokeWidth={1.5}
              initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 22 }} />
            <text x={156} y={95} textAnchor="middle" fill="var(--sf-target)"
              fontSize={10} fontFamily="var(--sf-font-mono)">S*</text>

            {/* Check mark */}
            <motion.path d="M 151 106 L 155 110 L 163 102"
              stroke="var(--sf-target)" strokeWidth={1.5} fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ delay: 1.0, duration: 0.4 }} />
          </svg>
          <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-target)", textAlign: "center", letterSpacing: "0.06em" }}>
            state-first<br />
            <span style={{ color: "var(--sf-ink-faint)" }}>one execution circuit</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
