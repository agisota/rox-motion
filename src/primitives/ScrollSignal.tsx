/**
 * ROX UI — ScrollSignal  (#14 the "signal thread")
 *
 * A fixed right-edge vertical rail with a signal dot that travels top→bottom
 * as you scroll the page — a scroll-linked thread tying every section together
 * (a robust alternative to layoutId across 50 sections). Hidden on small
 * screens. Scroll-driven only, so it's safe with motion off.
 */

"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function ScrollSignal() {
  const { scrollYProgress } = useScroll();
  const y = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const top = useTransform(y, [0, 1], ["0%", "100%"]);
  const glow = useTransform(y, [0, 1], [
    "0 0 12px var(--sf-transition)",
    "0 0 12px var(--sf-target)",
  ]);
  const bg = useTransform(y, [0, 0.98, 1], [
    "var(--sf-transition)",
    "var(--sf-transition)",
    "var(--sf-target)",
  ]);

  return (
    <div
      aria-hidden
      className="sf-scroll-signal"
      style={{
        position: "fixed",
        right: 14,
        top: "calc(var(--sf-nav-h) + 24px)",
        bottom: 24,
        width: 2,
        background: "var(--sf-hair)",
        borderRadius: 999,
        zIndex: 90,
        pointerEvents: "none",
      }}
    >
      <motion.span
        style={{
          position: "absolute",
          left: "50%",
          top,
          width: 9,
          height: 9,
          borderRadius: "50%",
          x: "-50%",
          y: "-50%",
          background: bg,
          boxShadow: glow,
        }}
      />
    </div>
  );
}
