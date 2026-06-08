"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { fadeUp, staggerContainer } from "../tokens/motion-variants";

const TOOL_WORDS = [
  { label: "sprint board",  x: "8%",  y: "12%" },
  { label: "tickets",       x: "55%", y: "8%"  },
  { label: "standup",       x: "72%", y: "25%" },
  { label: "retro",         x: "5%",  y: "52%" },
  { label: "velocity",      x: "62%", y: "55%" },
  { label: "roadmap",       x: "18%", y: "75%" },
  { label: "story points",  x: "60%", y: "78%" },
  { label: "backlog",       x: "32%", y: "88%" },
  { label: "ceremonies",    x: "3%",  y: "88%" },
  { label: "estimations",   x: "70%", y: "90%" },
];

export function RefocusingLens() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Default lens center position
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const lx = useSpring(rawX, { stiffness: 120, damping: 20 });
  const ly = useSpring(rawY, { stiffness: 120, damping: 20 });

  const background = useMotionTemplate`radial-gradient(120px circle at ${lx}% ${ly}%, rgba(125,255,158,0.18) 0%, transparent 70%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div
      ref={ref}
      className="sf-box"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ position: "relative", minHeight: 220, overflow: "hidden", cursor: "crosshair" }}
      onPointerMove={handlePointerMove}
    >
      {/* glow overlay driven by lens */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background,
          pointerEvents: "none",
          borderRadius: "var(--sf-r-lg)",
        }}
      />

      {/* scattered tool words */}
      {TOOL_WORDS.map((w) => (
        <motion.span
          key={w.label}
          variants={fadeUp}
          style={{
            position: "absolute",
            left: w.x,
            top: w.y,
            fontFamily: "var(--sf-font-mono)",
            fontSize: 11,
            color: "var(--sf-friction)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {w.label}
        </motion.span>
      ))}

      {/* center revealed label */}
      <motion.div
        variants={fadeUp}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--sf-font-mono)",
          fontSize: 13,
          color: "var(--sf-target)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textAlign: "center",
          pointerEvents: "none",
          background: "var(--sf-panel)",
          border: "1px solid rgba(125,255,158,0.3)",
          borderRadius: "var(--sf-r-sm)",
          padding: "8px 14px",
          whiteSpace: "nowrap",
        }}
      >
        state · S*
      </motion.div>
    </motion.div>
  );
}
