"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

const PARTICLES = [
  { id: 0, sx: 30,  sy: 20,  color: "var(--sf-friction)" },
  { id: 1, sx: 80,  sy: 10,  color: "var(--sf-transition)" },
  { id: 2, sx: 140, sy: 30,  color: "var(--sf-friction)" },
  { id: 3, sx: 190, sy: 15,  color: "var(--sf-transition)" },
  { id: 4, sx: 240, sy: 25,  color: "var(--sf-friction)" },
  { id: 5, sx: 20,  sy: 80,  color: "var(--sf-transition)" },
  { id: 6, sx: 260, sy: 75,  color: "var(--sf-friction)" },
  { id: 7, sx: 45,  sy: 140, color: "var(--sf-transition)" },
  { id: 8, sx: 230, sy: 130, color: "var(--sf-friction)" },
  { id: 9, sx: 100, sy: 150, color: "var(--sf-transition)" },
];

const CX = 140;
const CY = 85;

export function ArtifactCrystallization() {
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
      <motion.div
        variants={fadeUp}
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sf-ink-faint)", marginBottom: 14 }}
      >
        artifact crystallization — intent → proof
      </motion.div>

      <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}>
        <svg viewBox="0 0 280 170" style={{ width: "100%", maxWidth: 320, height: "auto" }}>
          {/* Particles converging to center */}
          {PARTICLES.map((p, i) => (
            <motion.circle
              key={p.id}
              r={3.5}
              fill={p.color}
              initial={{ cx: p.sx, cy: p.sy, opacity: 0.7, scale: 1 }}
              animate={inView ? { cx: CX, cy: CY, opacity: 0, scale: 0.3 } : { cx: p.sx, cy: p.sy, opacity: 0.7, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
          ))}

          {/* Artifact card crystallizing */}
          <motion.rect
            x={CX - 52} y={CY - 30} width={104} height={60} rx={7}
            fill="rgba(125,255,158,0.07)"
            stroke="var(--sf-target)"
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.85, type: "spring", stiffness: 260, damping: 22 }}
          />

          {/* Artifact label */}
          <motion.text
            x={CX} y={CY - 9}
            textAnchor="middle"
            fill="var(--sf-target)"
            fontSize={11}
            fontFamily="var(--sf-font-mono)"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.05 }}
          >
            PR #482 · verified
          </motion.text>

          {/* Check mark */}
          <motion.path
            d={`M ${CX - 10} ${CY + 8} L ${CX - 2} ${CY + 17} L ${CX + 14} ${CY + 1}`}
            stroke="var(--sf-target)"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Crystalline facet lines */}
          {[[-52, -30], [52, -30], [-52, 30], [52, 30]].map(([dx, dy], i) => (
            <motion.line
              key={i}
              x1={CX} y1={CY}
              x2={CX + (dx ?? 0) * 0.55} y2={CY + (dy ?? 0) * 0.55}
              stroke="var(--sf-target)"
              strokeWidth={0.8}
              strokeOpacity={0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
              transition={{ delay: 0.9 + i * 0.06 }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        variants={fadeUp}
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", textAlign: "center", letterSpacing: "0.08em", marginTop: 8 }}
      >
        scattered intent crystallizes into one verified artifact
      </motion.div>
    </motion.div>
  );
}
