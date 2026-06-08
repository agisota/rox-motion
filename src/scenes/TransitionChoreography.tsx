"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

const STATES = [
  { id: "s0",  x: 40,  label: "S₀", color: "var(--sf-transition)" },
  { id: "s1",  x: 140, label: "s₁", color: "var(--sf-ink-dim)" },
  { id: "s2",  x: 240, label: "s₂", color: "var(--sf-ink-dim)" },
  { id: "star",x: 340, label: "S*", color: "var(--sf-target)" },
];

const BEATS = [
  { id: 0, from: 40,  to: 140, delay: 0 },
  { id: 1, from: 140, to: 240, delay: 0.7 },
  { id: 2, from: 240, to: 340, delay: 1.4 },
];

export function TransitionChoreography() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();
  const pulse = loops && inView;

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
        transition choreography
      </motion.div>

      <motion.div variants={fadeUp}>
        <svg viewBox="0 0 380 100" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
          {/* Track line */}
          <line x1={40} y1={50} x2={340} y2={50} stroke="var(--sf-hair)" strokeWidth={1.5} />

          {/* State points */}
          {STATES.map((s, i) => (
            <motion.g key={s.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 320, damping: 26 }}
            >
              <circle
                cx={s.x} cy={50} r={s.id === "star" ? 12 : 8}
                fill={s.id === "star" ? "rgba(125,255,158,0.1)" : "var(--sf-panel-2)"}
                stroke={s.color}
                strokeWidth={s.id === "star" ? 2 : 1.5}
              />
              <text x={s.x} y={s.id === "star" ? 54 : 54} textAnchor="middle"
                fill={s.color} fontSize={s.id === "star" ? 11 : 9}
                fontFamily="var(--sf-font-mono)" fontWeight={s.id === "star" ? "600" : "400"}>
                {s.label}
              </text>
              {/* State label below */}
              {s.id !== "s0" && s.id !== "star" && (
                <text x={s.x} y={74} textAnchor="middle" fill="var(--sf-ink-faint)" fontSize={8} fontFamily="var(--sf-font-mono)">{s.id}</text>
              )}
            </motion.g>
          ))}

          {/* Event beat labels above track */}
          {BEATS.map((b) => (
            <motion.text
              key={b.id}
              x={(b.from + b.to) / 2}
              y={32}
              textAnchor="middle"
              fill="var(--sf-transition)"
              fontSize={8}
              fontFamily="var(--sf-font-mono)"
              opacity={0.7}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{ delay: 0.5 + b.delay * 0.4 }}
            >
              event
            </motion.text>
          ))}

          {/* Animated pulse beats */}
          {pulse && BEATS.map((b) => (
            <motion.circle
              key={b.id}
              cy={50}
              r={4}
              fill="var(--sf-transition)"
              style={{ filter: "drop-shadow(0 0 5px var(--sf-transition))" }}
              animate={{ cx: [b.from, b.to] }}
              transition={{
                duration: 0.5,
                delay: b.delay,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.6,
              }}
            />
          ))}

          {/* Final state glow when visible */}
          {inView && (
            <motion.circle
              cx={340} cy={50} r={18}
              fill="none"
              stroke="var(--sf-target)"
              strokeWidth={1}
              strokeOpacity={0.2}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 22 }}
            />
          )}
        </svg>
      </motion.div>

      <motion.div
        variants={fadeUp}
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", letterSpacing: "0.08em", marginTop: 8 }}
      >
        events are movement beats · rhythm ends at verified S*
      </motion.div>
    </motion.div>
  );
}
