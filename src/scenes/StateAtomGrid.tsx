/**
 * STATE-FIRST KIT — StateAtomGrid  (scene #05)
 *
 * The nine ontology atoms. Each cell breathes subtly and reveals its
 * definition on hover (CSS-driven, so it works without JS too).
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";
import { ontologyAtoms } from "../data/demo-data";

const colorVar: Record<string, string> = {
  target: "var(--sf-target)",
  transition: "var(--sf-transition)",
  runtime: "var(--sf-runtime)",
  friction: "var(--sf-friction)",
};

export function StateAtomGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();

  return (
    <motion.div
      ref={ref}
      className="sf-atoms"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {ontologyAtoms.map((atom) => {
        const c = colorVar[atom.color];
        return (
          <motion.div
            key={atom.id}
            className="sf-atom"
            style={{ ["--sf-atom-c" as string]: c }}
            variants={fadeUp}
          >
            <div className="sf-atom__viz">
              <motion.span
                aria-hidden
                style={{ width: 26, height: 26, borderRadius: "50%", border: `2px solid ${c}` }}
                animate={loops ? { scale: [1, 1.16, 1], opacity: [0.8, 1, 0.8] } : {}}
                transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
            <div className="sf-atom__name">{atom.name}</div>
            <div className="sf-atom__def">
              <b>{atom.name}</b>
              {atom.def}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
