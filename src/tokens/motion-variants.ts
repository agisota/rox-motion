/**
 * STATE-FIRST KIT — Framer Motion variant library
 *
 * Import { fadeUp, staggerContainer, ... } from "@/state-first-kit/tokens/motion-variants"
 *
 * Rules:
 * - All core animation goes through these variants (no ad-hoc values).
 * - Clock-safe: resting state is ALWAYS visible (opacity:1, transform:none).
 *   Only entrance/exit animations use these.
 * - Use <MotionConfig reducedMotion="user"> to gate everything at the tree root.
 */

import type { Variants } from "motion/react";

/** Standard fade-up entrance — the workhorse */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 280, damping: 30, mass: 0.9 },
  },
};

/** Stagger container — wrap a list of fadeUp children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

/** Fade in only (no transform) — for elements that shouldn't shift */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

/** Scale-in — for chips, tags, badges appearing */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
};

/** Transition path draw-on — use on SVG <motion.path> with pathLength */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.2 } },
  },
};

/** Monad slot snap-in — stagger inside a monad capsule */
export const slotSnap: Variants = {
  hidden: { opacity: 0, y: 7 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 28, mass: 0.7 },
  },
};

/** Validator ring — scales in from small when criteria pass */
export const validatorRing: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 22, delay: 0.3 },
  },
};

/** State card appearing in a list */
export const stateCard: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    x: 12,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/** Harness-first "jitter" — gray chips in the how-first cloud.
 *  Only runs in full-motion mode. */
export const jitterLoop: Variants = {
  animate: {
    x: [0, 2, -2, 3, -1, 0],
    y: [0, -3, 2, 1, -2, 0],
    transition: {
      duration: 3.4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

/** Breathing loop — for a stable state "alive" at rest (atom cores).
 *  Only attach when loops are allowed. */
export const breatheLoop: Variants = {
  animate: {
    scale: [1, 1.16, 1],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 3.2, ease: "easeInOut", repeat: Infinity },
  },
};

/* Orbit is implemented with GPU-composited rotation in <GravityField>, not by
   animating left/top — see scenes/GravityField.tsx. */

/** Run button phase transition */
export const runBtnPhase: Variants = {
  idle:     { borderColor: "rgba(255,122,43,0.5)", backgroundColor: "var(--sf-panel-2)" },
  pending:  { borderColor: "rgba(255,122,43,0.6)", backgroundColor: "var(--sf-panel-2)" },
  running:  { borderColor: "var(--sf-transition)",  backgroundColor: "var(--sf-panel-2)" },
  verified: { borderColor: "var(--sf-target)",       backgroundColor: "rgba(125,255,158,0.06)" },
};

/** Morph: task? → S* (the signature refocus interaction) */
export const taskMorph: Variants = {
  how: { opacity: 1, scale: 1, filter: "blur(1.4px)", color: "#5D6A68" },
  what: { opacity: 0, scale: 0.7, filter: "blur(8px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
export const starMorph: Variants = {
  how: { opacity: 0, scale: 0.85, filter: "blur(6px)" },
  what: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 240, damping: 24 } },
};
