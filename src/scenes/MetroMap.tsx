"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { drawPath, fadeUp, staggerContainer } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

const STATIONS = [
  { id: "s0",    x: 60,  y: 120, label: "S₀",      color: "var(--sf-transition)" },
  { id: "s1",    x: 180, y: 60,  label: "draft",    color: "var(--sf-ink-dim)" },
  { id: "s2",    x: 300, y: 100, label: "review",   color: "var(--sf-ink-dim)" },
  { id: "s3",    x: 200, y: 180, label: "test",     color: "var(--sf-runtime)" },
  { id: "star",  x: 420, y: 100, label: "S*",       color: "var(--sf-target)" },
];

const ORANGE_PATH = "M60,120 C110,90 140,65 180,60 C220,55 260,80 300,100 C360,120 390,105 420,100";
const CYAN_PATH   = "M60,120 C90,150 140,175 200,180 C260,185 340,170 420,100";

export function MetroMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();

  return (
    <motion.div
      ref={ref}
      className="sf-box"
      style={{ position: "relative", overflow: "hidden", minHeight: 220 }}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.svg
        viewBox="0 0 480 240"
        style={{ width: "100%", height: "100%", display: "block" }}
        variants={fadeUp}
      >
        {/* cyan secondary line */}
        <motion.path
          d={CYAN_PATH}
          stroke="var(--sf-runtime)"
          strokeWidth={2}
          fill="none"
          opacity={0.5}
          variants={drawPath}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
        {/* orange main line */}
        <motion.path
          d={ORANGE_PATH}
          stroke="var(--sf-transition)"
          strokeWidth={2.5}
          fill="none"
          variants={drawPath}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />

        {/* moving train dot on orange line — gated behind loops+inView */}
        {loops && inView && (
          <motion.circle
            r={5}
            fill="var(--sf-transition)"
            style={{ filter: "drop-shadow(0 0 6px var(--sf-transition))" }}
            animate={{ cx: [60, 180, 300, 420], cy: [120, 60, 100, 100] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />
        )}

        {/* station circles */}
        {STATIONS.map((s) => (
          <g key={s.id}>
            <circle
              cx={s.x}
              cy={s.y}
              r={s.id === "star" ? 14 : s.id === "s0" ? 12 : 9}
              fill="var(--sf-panel-2)"
              stroke={s.color}
              strokeWidth={s.id === "star" ? 2.5 : 1.5}
              style={s.id === "star" ? { filter: "drop-shadow(0 0 8px var(--sf-target))" } : undefined}
            />
            <text
              x={s.x}
              y={s.y + (s.id === "star" || s.id === "s0" ? 30 : 26)}
              textAnchor="middle"
              fill={s.color}
              fontFamily="var(--sf-font-mono)"
              fontSize={s.id === "star" ? 11 : 10}
            >
              {s.label}
            </text>
          </g>
        ))}
      </motion.svg>
    </motion.div>
  );
}
