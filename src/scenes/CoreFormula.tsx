/**
 * STATE-FIRST KIT — CoreFormula  (scene #03)
 *
 * The living work equation: S₀ → T → S* and Δ = S* − S₀.
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

const SUB = [
  { dot: "var(--sf-target)", text: "inside a sufficient monad" },
  { dot: "var(--sf-runtime)", text: "executed in runtime" },
  { dot: "var(--sf-transition)", text: "proven by trace" },
  { dot: "var(--sf-target)", text: "validated by criteria" },
];

export function CoreFormula() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="sf-formula"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div className="sf-formula__line" variants={fadeUp}>
        <span className="sf-s0">S₀</span>
        <span className="sf-arr">→</span>
        <span className="sf-op">T</span>
        <span className="sf-arr">→</span>
        <span className="sf-star">S*</span>
      </motion.div>
      <motion.div className="sf-formula__line" style={{ fontSize: "clamp(20px,3vw,34px)" }} variants={fadeUp}>
        <span className="sf-op">Δ</span>
        <span className="sf-op">=</span>
        <span className="sf-star">S*</span>
        <span className="sf-op">−</span>
        <span className="sf-s0">S₀</span>
      </motion.div>
      <motion.div className="sf-formula__sub" variants={fadeUp}>
        {SUB.map((s) => (
          <span key={s.text}>
            <i style={{ color: s.dot, fontStyle: "normal" }}>●</i> {s.text}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
