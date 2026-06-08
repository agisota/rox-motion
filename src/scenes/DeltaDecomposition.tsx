/**
 * STATE-FIRST KIT — DeltaDecomposition  (scene #12 — conceptually core)
 *
 * Δ is not one leap. It factors into intermediate sub-states and the events
 * that cause each transition. Driven by a demo example so it stays in sync
 * with the rest of the kit.
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp, drawPath } from "../tokens/motion-variants";
import { DEFAULT_EXAMPLE, type StateFirstExample } from "../data/demo-data";

interface DeltaDecompositionProps {
  example?: StateFirstExample;
}

export function DeltaDecomposition({ example = DEFAULT_EXAMPLE }: DeltaDecompositionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  const subStates = example.transitions.slice(0, 3);
  const events = example.events.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      className="sf-delta"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div className="sf-delta__eq" variants={fadeUp}>
        <span className="sf-op">Δ</span> = <span className="sf-star">S*</span>{" "}
        <span className="sf-op">−</span> <span className="sf-s0">S₀</span>
      </motion.div>

      <div className="sf-delta__tree">
        {/* tier 1: S₀ / S* */}
        <motion.div className="sf-dtier" variants={fadeUp}>
          <div className="sf-dnode">
            <span className="sf-d" style={{ background: "var(--sf-transition)" }} />
            S₀ · {example.s0}
          </div>
          <div className="sf-dnode">
            <span className="sf-d" style={{ background: "var(--sf-target)" }} />
            S* · {example.star}
          </div>
        </motion.div>

        <Connector isInView={isInView} d="M150 0 L300 18 M450 0 L300 18" />

        {/* tier 2: sub-states */}
        <motion.div className="sf-dtier" variants={fadeUp}>
          {subStates.map((s, i) => (
            <div key={s} className="sf-dnode sf-dnode--sub">
              s{i + 1} · {s}
            </div>
          ))}
        </motion.div>

        <Connector isInView={isInView} d="M120 0 L120 18 M300 0 L300 18 M480 0 L480 18" />

        {/* tier 3: events */}
        <motion.div className="sf-dtier" variants={fadeUp}>
          {events.map((e) => (
            <div key={e} className="sf-dnode sf-dnode--ev">
              event · {e}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function Connector({ d, isInView }: { d: string; isInView: boolean }) {
  return (
    <div className="sf-delta__connect">
      <svg viewBox="0 0 600 18" preserveAspectRatio="none">
        <motion.path
          d={d}
          stroke="var(--sf-hair)"
          strokeWidth={1.5}
          fill="none"
          variants={drawPath}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </svg>
    </div>
  );
}
