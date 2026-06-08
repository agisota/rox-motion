"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

export function AgentIsVehicle() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();
  const animate = loops && inView;

  // Agent moves from center prominence onto the transition edge between S0 and S*
  const agentPhase = inView;

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
        agent is a vehicle
      </motion.div>

      <motion.div variants={fadeUp} style={{ position: "relative", height: 160 }}>
        <svg viewBox="0 0 360 160" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
          {/* Path from S0 to S* */}
          <motion.line
            x1={50} y1={80} x2={310} y2={80}
            stroke="var(--sf-transition)"
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Arrow head */}
          <motion.path
            d="M 304 74 L 312 80 L 304 86"
            stroke="var(--sf-transition)"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7 }}
          />

          {/* S0 node */}
          <motion.g
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 280, damping: 26 }}
          >
            <rect x={10} y={60} width={44} height={40} rx={6}
              fill="var(--sf-panel-2)" stroke="rgba(255,122,43,0.5)" strokeWidth={1.5} />
            <text x={32} y={83} textAnchor="middle" fill="var(--sf-transition)"
              fontSize={12} fontFamily="var(--sf-font-mono)" fontWeight="600">S₀</text>
          </motion.g>

          {/* S* node */}
          <motion.g
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 280, damping: 26 }}
          >
            <rect x={306} y={60} width={44} height={40} rx={6}
              fill="rgba(125,255,158,0.08)"
              stroke="rgba(125,255,158,0.5)"
              strokeWidth={1.5}
            />
            <text x={328} y={83} textAnchor="middle" fill="var(--sf-target)"
              fontSize={12} fontFamily="var(--sf-font-mono)" fontWeight="600">S*</text>
          </motion.g>

          {/* Agent — starts large/centered, shrinks onto edge */}
          <motion.g
            initial={{ x: 180, y: 30, scale: 1.6 }}
            animate={agentPhase
              ? { x: 180, y: 68, scale: 0.65 }
              : { x: 180, y: 30, scale: 1.6 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 180, damping: 22 }}
          >
            <rect x={-28} y={-18} width={56} height={36} rx={8}
              fill="rgba(93,106,104,0.25)"
              stroke="var(--sf-friction)"
              strokeWidth={1.5}
            />
            <text x={0} y={5} textAnchor="middle" fill="var(--sf-friction)"
              fontSize={10} fontFamily="var(--sf-font-mono)">agent</text>
          </motion.g>

          {/* Pulse on the path when animating */}
          {animate && (
            <motion.circle
              cy={80}
              r={4}
              fill="var(--sf-friction)"
              opacity={0.6}
              style={{ filter: "drop-shadow(0 0 4px var(--sf-friction))" }}
              animate={{ cx: [54, 306] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            />
          )}
        </svg>
      </motion.div>

      <motion.div
        variants={fadeUp}
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", textAlign: "center", letterSpacing: "0.06em", marginTop: 6, lineHeight: 1.6 }}
      >
        agents execute transitions · transitions own the work
      </motion.div>
    </motion.div>
  );
}
