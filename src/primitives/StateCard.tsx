/**
 * STATE-FIRST KIT — StateCard
 *
 * A named state (S₀, S*, or intermediate). Styling comes from components.css
 * (.sf-node*), so hover/responsive/pseudo all work and it matches the
 * prototype exactly.
 *
 * Usage:
 *   <StateCard kind="s0"   label="S₀" value="bug reproduced" detail="tests red" />
 *   <StateCard kind="star" label="S*" value="tests passing"  detail="shipped" withValidator />
 */

import { motion } from "motion/react";
import { stateCard } from "../tokens/motion-variants";

export type StateKind = "s0" | "star" | "intermediate" | "neutral";

interface StateCardProps {
  kind: StateKind;
  label: string;
  value: string;
  detail?: string;
  withValidator?: boolean;
  /** disable the mount animation (e.g. inside an already-animated parent) */
  static?: boolean;
  className?: string;
}

const kindClass: Record<StateKind, string> = {
  s0: "sf-node sf-node--s0",
  star: "sf-node sf-node--star",
  intermediate: "sf-node sf-node--s0",
  neutral: "sf-node",
};

export function StateCard({
  kind,
  label,
  value,
  detail,
  withValidator = kind === "star",
  static: isStatic = false,
  className,
}: StateCardProps) {
  return (
    <motion.div
      className={`${kindClass[kind]} ${className ?? ""}`}
      style={{ position: "relative", transform: "none", top: "auto" }}
      variants={isStatic ? undefined : stateCard}
      initial={isStatic ? undefined : "hidden"}
      animate={isStatic ? undefined : "visible"}
    >
      <div className="sf-node__k">{label}</div>
      <div className="sf-node__v">{value}</div>
      {detail && <div className="sf-node__state">{detail}</div>}
      {withValidator && <span className="sf-validator-ring" aria-hidden="true" />}
    </motion.div>
  );
}
