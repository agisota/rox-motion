/**
 * ROX UI — ScrollProgress
 * A thin scroll-linked progress bar (orange→green) pinned under the nav.
 * Pure scroll-driven (useScroll), no loop — safe with motion off.
 */

"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: "var(--sf-nav-h)",
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: "left center",
        scaleX,
        background: "linear-gradient(90deg, var(--sf-transition), var(--sf-target))",
        zIndex: 99,
        pointerEvents: "none",
      }}
    />
  );
}
