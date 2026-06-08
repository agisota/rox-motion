/**
 * STATE-FIRST KIT — MotionControl
 *
 * Full / Essential / Off segmented control. Reads and writes the page-wide
 * motion level from MotionProvider, so toggling here updates every component.
 *
 * Usage:
 *   <MotionControl />   // place in your nav, requires <MotionProvider> ancestor
 */

"use client";

import { LayoutGroup, motion } from "motion/react";
import { useMotionLevel, type MotionLevel } from "../providers/MotionProvider";

const LEVELS: MotionLevel[] = ["full", "essential", "off"];

export function MotionControl({ className }: { className?: string }) {
  const { level, setLevel } = useMotionLevel();

  return (
    <LayoutGroup>
      <div
        role="group"
        aria-label="motion level"
        className={`sf-segmented sf-segmented--motion ${className ?? ""}`}
      >
        {LEVELS.map((l) => (
          <button key={l} type="button" aria-pressed={level === l} onClick={() => setLevel(l)}>
            {level === l && (
              <motion.span
                layoutId="sf-motion-pill"
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--sf-panel-3)",
                  borderRadius: 999,
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {l}
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}
