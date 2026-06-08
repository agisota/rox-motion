"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

const EVENTS = [
  { id: "received", label: "event.received", x: 60, color: "var(--sf-runtime)" },
  { id: "diff", label: "diff.written", x: 160, color: "var(--sf-transition)" },
  { id: "tests", label: "tests.passed", x: 260, color: "var(--sf-transition)" },
  { id: "validator", label: "validator.passed", x: 370, color: "var(--sf-target)" },
];

export function TraceRiver() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();
  const animate = loops && inView;

  return (
    <motion.div
      ref={ref}
      className="sf-box sf-box--xl"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div variants={fadeUp} style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sf-ink-faint)", marginBottom: 14 }}>
        trace river — experience as observable stream
      </motion.div>
      <motion.div variants={fadeUp}>
        <svg viewBox="0 0 460 140" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
          {/* River band (wavy) */}
          <defs>
            <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--sf-runtime)" stopOpacity="0.12" />
              <stop offset="70%" stopColor="var(--sf-transition)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--sf-target)" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          {/* River fill */}
          <motion.path
            d="M 10 62 Q 80 52 150 62 Q 220 72 290 62 Q 360 52 450 62 L 450 82 Q 360 92 290 82 Q 220 72 150 82 Q 80 92 10 82 Z"
            fill="url(#riverGrad)"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
          {/* River top edge */}
          <motion.path
            d="M 10 62 Q 80 52 150 62 Q 220 72 290 62 Q 360 52 450 62"
            stroke="var(--sf-runtime)" strokeWidth={1.5} fill="none" strokeOpacity={0.4}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* River bottom edge */}
          <motion.path
            d="M 10 82 Q 80 92 150 82 Q 220 72 290 82 Q 360 92 450 82"
            stroke="var(--sf-transition)" strokeWidth={1.5} fill="none" strokeOpacity={0.3}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />

          {/* Flow direction arrow */}
          <motion.path d="M 415 72 L 430 72 M 424 67 L 430 72 L 424 77"
            stroke="var(--sf-target)" strokeWidth={1.5} fill="none"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 0.7 } : { opacity: 0 }}
            transition={{ delay: 0.8 }} />

          {/* Event markers */}
          {EVENTS.map((ev, i) => (
            <motion.g key={ev.id}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 280, damping: 28 }}
            >
              {/* Stem from river center */}
              <line x1={ev.x} y1={72} x2={ev.x} y2={48} stroke={ev.color} strokeWidth={1} strokeOpacity={0.5} strokeDasharray="2 2" />
              {/* Pad */}
              <circle cx={ev.x} cy={72} r={4} fill={ev.color} opacity={0.8} />
              {/* Label bubble */}
              <rect x={ev.x - 50} y={22} width={100} height={22} rx={11}
                fill="var(--sf-panel-2)" stroke={ev.color} strokeWidth={1} strokeOpacity={0.5} />
              <text x={ev.x} y={37} textAnchor="middle" fill={ev.color} fontSize={9}
                fontFamily="var(--sf-font-mono)">{ev.label}</text>
            </motion.g>
          ))}

          {/* Floating flow particle */}
          {animate && (
            <motion.circle r={3} fill="var(--sf-transition)" opacity={0.7}
              style={{ filter: "drop-shadow(0 0 4px var(--sf-transition))" }}
            >
              <animateMotion dur="3s" repeatCount="indefinite"
                path="M 10 70 Q 80 60 150 70 Q 220 80 290 70 Q 360 60 450 70" />
            </motion.circle>
          )}
          {animate && (
            <motion.circle r={2} fill="var(--sf-runtime)" opacity={0.5}>
              <animateMotion dur="3s" begin="1s" repeatCount="indefinite"
                path="M 10 74 Q 80 64 150 74 Q 220 84 290 74 Q 360 64 450 74" />
            </motion.circle>
          )}

          {/* S* terminal marker */}
          <motion.rect x={430} y={58} width={26} height={28} rx={5}
            fill="rgba(125,255,158,0.1)" stroke="var(--sf-target)" strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 22 }}
          />
          <motion.text x={443} y={76} textAnchor="middle" fill="var(--sf-target)" fontSize={10}
            fontFamily="var(--sf-font-mono)" fontWeight="600"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.0 }}
          >S*</motion.text>
        </svg>
      </motion.div>
      <motion.div variants={fadeUp} style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", letterSpacing: "0.08em", marginTop: 4 }}>
        every trace event flows left → right · river ends at verified S*
      </motion.div>
    </motion.div>
  );
}
