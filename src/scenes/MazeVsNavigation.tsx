"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp, staggerContainer, drawPath } from "../tokens/motion-variants";

export function MazeVsNavigation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="sf-g2"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Left: tangled maze */}
      <motion.div
        className="sf-box"
        variants={fadeUp}
        style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}
      >
        <svg viewBox="0 0 180 140" style={{ width: "100%", maxHeight: 140 }}>
          {/* messy overlapping grey paths */}
          <path d="M20,20 C80,10 160,40 140,80 C120,120 40,100 60,60 C80,20 150,30 160,70 C170,110 90,130 50,110 C10,90 30,50 70,40 C110,30 150,60 130,100"
            stroke="var(--sf-friction)" strokeWidth={1.5} fill="none" opacity={0.6} />
          <path d="M10,70 C50,20 170,50 150,110 C130,140 20,120 40,70 C60,20 150,10 160,50 C170,90 80,130 30,100"
            stroke="var(--sf-friction)" strokeWidth={1} fill="none" opacity={0.4} />
          <path d="M30,130 C70,80 140,120 160,60 C180,20 100,10 50,50 C0,90 20,140 80,130 C140,120 170,70 140,30"
            stroke="var(--sf-friction)" strokeWidth={1} fill="none" opacity={0.3} />
          <circle cx={20} cy={20} r={5} fill="var(--sf-friction)" opacity={0.6} />
          <circle cx={160} cy={120} r={5} fill="var(--sf-friction)" opacity={0.6} />
        </svg>
        <span
          style={{
            fontFamily: "var(--sf-font-mono)",
            fontSize: 11,
            color: "var(--sf-friction)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          wandering
        </span>
      </motion.div>

      {/* Right: clean navigation */}
      <motion.div
        className="sf-box"
        variants={fadeUp}
        style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}
      >
        <svg viewBox="0 0 180 140" style={{ width: "100%", maxHeight: 140 }}>
          {/* single clean S-curve */}
          <motion.path
            d="M25,70 C60,30 120,110 155,70"
            stroke="var(--sf-transition)"
            strokeWidth={2.5}
            fill="none"
            variants={drawPath}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          />
          {/* S0 dot */}
          <circle cx={25} cy={70} r={7} fill="var(--sf-panel-2)" stroke="var(--sf-transition)" strokeWidth={2} />
          <text x={25} y={95} textAnchor="middle" fill="var(--sf-transition)" fontFamily="var(--sf-font-mono)" fontSize={10}>S₀</text>
          {/* S* dot */}
          <circle cx={155} cy={70} r={9} fill="var(--sf-panel-2)" stroke="var(--sf-target)" strokeWidth={2.5}
            style={{ filter: "drop-shadow(0 0 8px var(--sf-target))" } as React.CSSProperties} />
          <text x={155} y={95} textAnchor="middle" fill="var(--sf-target)" fontFamily="var(--sf-font-mono)" fontSize={10}>S*</text>
        </svg>
        <span
          style={{
            fontFamily: "var(--sf-font-mono)",
            fontSize: 11,
            color: "var(--sf-target)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          navigation
        </span>
      </motion.div>
    </motion.div>
  );
}
