/**
 * STATE-FIRST KIT — TransitionRail
 *
 * The core S₀ → T → S* visual: a path draws in (pathLength) and a signal dot
 * travels along it (rAF, paused offscreen + when loops are disabled).
 * Styling from components.css (.sf-rail / .sf-node).
 *
 * Usage:
 *   <TransitionRail
 *     from={{ label: "S₀", value: "bug reproduced", detail: "tests red" }}
 *     to={{ label: "S*", value: "tests passing",  detail: "shipped" }}
 *     runtimeLabel="runtime · repo + shell + preview" />
 */

"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { drawPath } from "../tokens/motion-variants";
import { useLoopsAllowed, useAnyMotion } from "../providers/MotionProvider";

interface NodeSpec {
  label: string;
  value: string;
  detail?: string;
}

interface TransitionRailProps {
  from: NodeSpec;
  to: NodeSpec;
  runtimeLabel?: string;
}

const PATH_D = "M120 66 C 220 66, 240 30, 300 30 S 400 102, 480 66";

export function TransitionRail({ from, to, runtimeLabel = "runtime · repo + shell" }: TransitionRailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });
  const loops = useLoopsAllowed();
  const anyMotion = useAnyMotion();

  const signalRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!isInView || !loops) return;
    const path = pathRef.current;
    const signal = signalRef.current;
    if (!path || !signal) return;

    let len = 300;
    try { len = path.getTotalLength(); } catch { /* jsdom */ }
    let t = 0;
    let raf = 0;
    const frame = () => {
      t = (t + 0.0045) % 1;
      const p = path.getPointAtLength(t * len);
      signal.setAttribute("cx", String(p.x));
      signal.setAttribute("cy", String(p.y));
      signal.style.opacity = String(0.35 + 0.65 * Math.sin(t * Math.PI));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [isInView, loops]);

  return (
    <div ref={ref} className="sf-stage" style={{ background: "none", border: "none", padding: 0, overflow: "visible" }}>
      <div className="sf-stage__rt">{runtimeLabel}</div>

      <div className="sf-rail">
        <svg viewBox="0 0 600 132" preserveAspectRatio="none" aria-hidden="true">
          <path className="sf-rail__track" d={PATH_D} />
          <motion.path
            ref={pathRef}
            className="sf-rail__live"
            d={PATH_D}
            variants={drawPath}
            initial="hidden"
            animate={isInView && anyMotion ? "visible" : "hidden"}
          />
          <circle ref={signalRef} className="sf-signal" cx="120" cy="66" r="4.5" />
        </svg>

        <div className="sf-node sf-node--s0">
          <div className="sf-node__k">{from.label}</div>
          <div className="sf-node__v">{from.value}</div>
          {from.detail && <div className="sf-node__state">{from.detail}</div>}
        </div>

        <div className="sf-node sf-node--star">
          <div className="sf-node__k">{to.label}</div>
          <div className="sf-node__v">{to.value}</div>
          {to.detail && <div className="sf-node__state">{to.detail}</div>}
          <span className="sf-validator-ring" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
