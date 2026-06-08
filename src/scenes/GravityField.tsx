/**
 * STATE-FIRST KIT — GravityField  (scene #06 — screenshot star)
 *
 * S* sits at the center as an attractor; tools orbit it. Orbit is driven by
 * rotating a wrapper and counter-rotating each chip (GPU-composited transforms
 * only — no animating left/top). Loops pause when offscreen and respect the
 * motion level.
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLoopsAllowed } from "../providers/MotionProvider";

interface Orbiter {
  label: string;
  /** orbit radius in px */
  radius: number;
  /** starting angle in degrees */
  angle: number;
  /** seconds per full revolution */
  period: number;
}

const DEFAULT_ORBITERS: Orbiter[] = [
  { label: "terminal", radius: 120, angle: 0, period: 26 },
  { label: "browser", radius: 120, angle: 120, period: 26 },
  { label: "editor", radius: 120, angle: 240, period: 26 },
  { label: "shell", radius: 175, angle: 60, period: 38 },
  { label: "repo", radius: 175, angle: 200, period: 38 },
  { label: "db", radius: 175, angle: 320, period: 38 },
];

interface GravityFieldProps {
  orbiters?: Orbiter[];
  label?: string;
}

export function GravityField({ orbiters = DEFAULT_ORBITERS, label = "S*" }: GravityFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const loops = useLoopsAllowed();
  const spinning = loops && isInView;

  return (
    <div className="sf-gravity" ref={ref}>
      {/* rings */}
      {[120, 175].map((r) => (
        <div key={r} className="sf-gravity__ring" style={{ width: r * 2, height: r * 2 }} />
      ))}

      {/* attractor */}
      <div className="sf-gravity__star">
        <b>{label}</b>
      </div>

      {/* orbiters */}
      {orbiters.map((o) => (
        <motion.div
          key={o.label}
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            transformOrigin: "0 0",
          }}
          initial={{ rotate: o.angle }}
          animate={spinning ? { rotate: o.angle + 360 } : { rotate: o.angle }}
          transition={spinning ? { duration: o.period, ease: "linear", repeat: Infinity } : { duration: 0 }}
        >
          {/* push out along the rotating arm, then counter-rotate so text stays upright */}
          <motion.span
            className="sf-orbiter"
            style={{ position: "absolute", left: o.radius, top: 0, transform: "translate(-50%, -50%)" }}
            initial={{ rotate: -o.angle }}
            animate={spinning ? { rotate: -(o.angle + 360) } : { rotate: -o.angle }}
            transition={spinning ? { duration: o.period, ease: "linear", repeat: Infinity } : { duration: 0 }}
          >
            {o.label}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
