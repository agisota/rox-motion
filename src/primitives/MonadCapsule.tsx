/**
 * STATE-FIRST KIT — MonadCapsule
 *
 * The sufficient monad as a dashed capsule of prerequisite slots that snap in
 * with stagger. Styling from components.css (.sf-monad / .sf-slot).
 *
 * For an interactive, toggleable version use <MonadBuilder> instead.
 *
 * Usage:
 *   <MonadCapsule slots={[
 *     { label: "context", complete: true },
 *     { label: "tools",   complete: false },
 *   ]} />
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, slotSnap } from "../tokens/motion-variants";

interface MonadSlot {
  label: string;
  complete: boolean;
}

interface MonadCapsuleProps {
  slots: MonadSlot[];
  columns?: 2 | 4;
  animate?: boolean;
}

export function MonadCapsule({ slots, columns = 4, animate = true }: MonadCapsuleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const complete = slots.filter((s) => s.complete).length;
  const total = slots.length;
  const sufficient = complete === total;

  return (
    <div className="sf-monad" ref={ref}>
      <div className="sf-monad__head">
        <span>
          sufficient <b>monad</b>
        </span>
        <span style={{ color: sufficient ? "var(--sf-target)" : "var(--sf-warning)" }}>
          {complete}/{total}
        </span>
      </div>

      <motion.div
        className={`sf-monad__slots ${columns === 2 ? "sf-monad__slots--2" : ""}`}
        variants={animate ? staggerContainer : undefined}
        initial={animate ? "hidden" : undefined}
        animate={animate ? (isInView ? "visible" : "hidden") : undefined}
      >
        {slots.map((slot) => (
          <motion.div
            key={slot.label}
            className="sf-slot"
            data-complete={slot.complete}
            variants={animate ? slotSnap : undefined}
          >
            <span className="sf-tick">{slot.complete ? "✓" : "○"}</span>
            {slot.label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
