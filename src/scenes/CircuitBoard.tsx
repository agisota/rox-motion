"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp, drawPath } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

export function CircuitBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();
  const animate = loops && inView;

  const modules = [
    { id: "validator", x: 220, y: 80, label: "validator" },
    { id: "schema", x: 220, y: 160, label: "schema" },
    { id: "runtime", x: 220, y: 240, label: "runtime" },
  ];

  return (
    <motion.div
      ref={ref}
      className="sf-box sf-box--xl"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ fontFamily: "var(--sf-font-mono)", position: "relative" }}
    >
      <motion.div variants={fadeUp} style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sf-ink-faint)", marginBottom: 14 }}>
        execution circuit board
      </motion.div>
      <motion.div variants={fadeUp}>
        <svg viewBox="0 0 460 320" style={{ width: "100%", height: "auto", display: "block" }}>
          {/* Grid dots (PCB feel) */}
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 10 }, (_, col) => (
              <circle key={`${row}-${col}`} cx={col * 46 + 23} cy={row * 54 + 27} r={1.2}
                fill="var(--sf-hair)" opacity={0.5} />
            ))
          )}

          {/* Main trace: S0 → modules → S* */}
          <motion.path d="M 60 160 L 200 160 L 200 80 L 208 80" stroke="var(--sf-transition)" strokeWidth={2} fill="none" variants={drawPath} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.path d="M 60 160 L 200 160 L 200 160 L 208 160" stroke="var(--sf-transition)" strokeWidth={2} fill="none" variants={drawPath} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.path d="M 60 160 L 200 160 L 200 240 L 208 240" stroke="var(--sf-transition)" strokeWidth={2} fill="none" variants={drawPath} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.path d="M 300 80 L 380 80 L 380 160" stroke="var(--sf-transition)" strokeWidth={2} fill="none" variants={drawPath} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.path d="M 300 160 L 380 160" stroke="var(--sf-transition)" strokeWidth={2} fill="none" variants={drawPath} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.path d="M 300 240 L 380 240 L 380 160" stroke="var(--sf-transition)" strokeWidth={2} fill="none" variants={drawPath} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.path d="M 380 160 L 400 160" stroke="var(--sf-target)" strokeWidth={2.4} fill="none" variants={drawPath} initial="hidden" animate={inView ? "visible" : "hidden"} />

          {/* S0 node */}
          <rect x={10} y={138} width={52} height={44} rx={5} fill="var(--sf-panel-2)" stroke="rgba(255,122,43,0.5)" strokeWidth={1.5} />
          <text x={36} y={157} textAnchor="middle" fill="var(--sf-transition)" fontSize={11} fontFamily="var(--sf-font-mono)">S₀</text>
          <text x={36} y={172} textAnchor="middle" fill="var(--sf-ink-dim)" fontSize={9}>start</text>

          {/* Solder pads on S0 */}
          <circle cx={62} cy={160} r={4} fill="var(--sf-transition)" opacity={0.7} />

          {/* Module blocks */}
          {modules.map((m) => (
            <g key={m.id}>
              <rect x={m.x} y={m.y - 18} width={82} height={36} rx={4}
                fill="rgba(111,184,201,0.1)" stroke="rgba(111,184,201,0.4)" strokeWidth={1.2} />
              <text x={m.x + 41} y={m.y - 2} textAnchor="middle" fill="var(--sf-runtime)" fontSize={10} fontFamily="var(--sf-font-mono)">{m.label}</text>
              {/* pads */}
              <circle cx={m.x} cy={m.y} r={3.5} fill="var(--sf-runtime)" opacity={0.6} />
              <circle cx={m.x + 82} cy={m.y} r={3.5} fill="var(--sf-runtime)" opacity={0.6} />
            </g>
          ))}

          {/* S* output node */}
          <rect x={400} y={138} width={52} height={44} rx={5} fill="var(--sf-panel-2)" stroke="rgba(125,255,158,0.5)" strokeWidth={1.5} />
          <text x={426} y={157} textAnchor="middle" fill="var(--sf-target)" fontSize={11} fontFamily="var(--sf-font-mono)">S*</text>
          <text x={426} y={172} textAnchor="middle" fill="var(--sf-ink-dim)" fontSize={9}>verified</text>
          {/* Output solder pad */}
          <circle cx={400} cy={160} r={5} fill="var(--sf-target)" opacity={0.8} />

          {/* Signal pulse */}
          {animate && (
            <motion.circle r={5} fill="var(--sf-transition)"
              style={{ filter: "drop-shadow(0 0 6px var(--sf-transition))" }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 2.4, ease: "linear", repeat: Infinity, repeatDelay: 0.6 }}
              // offsetPath not directly supported via motion style, use cx/cy animation
              cx={0} cy={0}
            >
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 60 160 L 200 160 L 200 80 L 295 80 L 380 80 L 380 160 L 400 160" />
            </motion.circle>
          )}
        </svg>
      </motion.div>
      <motion.div variants={fadeUp} style={{ fontSize: 10, color: "var(--sf-ink-faint)", marginTop: 8, letterSpacing: "0.1em" }}>
        signal travels S₀ → validators → S* · circuit closes on proof
      </motion.div>
    </motion.div>
  );
}
