"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

// ── types ───────────────────────────────────────────────────────────────────

type LoaderKind = "spin" | "arc" | "dash" | "dots" | "pulse" | "trace" | "monad" | "resolved";

interface LoaderDef {
  label: string;
  kind: LoaderKind;
  color: string;
}

const LOADERS: LoaderDef[] = [
  { label: "detecting",     kind: "spin",     color: "var(--sf-transition)" },
  { label: "deriving",      kind: "arc",      color: "var(--sf-transition)" },
  { label: "validating",    kind: "resolved", color: "var(--sf-target)" },
  { label: "tracing",       kind: "dash",     color: "var(--sf-transition)" },
  { label: "building monad",kind: "monad",    color: "var(--sf-transition)" },
  { label: "executing",     kind: "dots",     color: "var(--sf-transition)" },
  { label: "verifying",     kind: "pulse",    color: "var(--sf-transition)" },
  { label: "streaming",     kind: "trace",    color: "var(--sf-runtime)" },
];

// ── individual loaders ──────────────────────────────────────────────────────

function SpinLoader({ color, loops }: { color: string; loops: boolean }) {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <circle cx={16} cy={16} r={12} stroke={color} strokeOpacity={0.18} strokeWidth={2.5} />
      <motion.circle
        cx={16} cy={16} r={12}
        stroke={color} strokeWidth={2.5} strokeLinecap="round"
        strokeDasharray="20 56"
        animate={loops ? { rotate: 360 } : { rotate: 90 }}
        transition={loops ? { duration: 1.1, ease: "linear", repeat: Infinity } : { duration: 0 }}
        style={{ originX: "16px", originY: "16px" }}
      />
    </svg>
  );
}

function ArcLoader({ color, loops }: { color: string; loops: boolean }) {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <circle cx={16} cy={16} r={12} stroke={color} strokeOpacity={0.12} strokeWidth={2} />
      <motion.path
        d="M16 4 A12 12 0 0 1 28 16"
        stroke={color} strokeWidth={2.5} strokeLinecap="round" fill="none"
        animate={loops ? { rotate: [0, 360] } : { rotate: 45 }}
        transition={loops ? { duration: 1.6, ease: "easeInOut", repeat: Infinity } : { duration: 0 }}
        style={{ originX: "16px", originY: "16px" }}
      />
    </svg>
  );
}

function DashLoader({ color, loops }: { color: string; loops: boolean }) {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <motion.circle
        cx={16} cy={16} r={12}
        stroke={color} strokeWidth={2} fill="none"
        strokeDasharray="6 4"
        animate={loops ? { rotate: 360 } : { rotate: 60 }}
        transition={loops ? { duration: 2, ease: "linear", repeat: Infinity } : { duration: 0 }}
        style={{ originX: "16px", originY: "16px" }}
      />
    </svg>
  );
}

function DotsLoader({ color, loops }: { color: string; loops: boolean }) {
  const positions = [
    { cx: 8,  cy: 16 },
    { cx: 16, cy: 16 },
    { cx: 24, cy: 16 },
  ];
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      {positions.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx} cy={p.cy} r={3}
          fill={color}
          animate={loops ? { y: [0, -5, 0], opacity: [0.4, 1, 0.4] } : { y: 0, opacity: 0.8 }}
          transition={loops ? { duration: 0.9, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
        />
      ))}
    </svg>
  );
}

function PulseLoader({ color, loops }: { color: string; loops: boolean }) {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <motion.circle
        cx={16} cy={16} r={8}
        stroke={color} strokeWidth={2} fill="none"
        animate={loops ? { scale: [1, 1.35, 1], opacity: [0.9, 0.3, 0.9] } : { scale: 1, opacity: 0.9 }}
        transition={loops ? { duration: 1.4, ease: "easeInOut", repeat: Infinity } : { duration: 0 }}
        style={{ originX: "16px", originY: "16px" }}
      />
      <circle cx={16} cy={16} r={4} fill={color} opacity={0.7} />
    </svg>
  );
}

function TraceLoader({ color, loops }: { color: string; loops: boolean }) {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <motion.path
        d="M4 16 Q10 8 16 16 Q22 24 28 16"
        stroke={color} strokeWidth={2} fill="none" strokeLinecap="round"
        initial={{ pathLength: loops ? 0 : 1 }}
        animate={loops ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 }}
        transition={loops ? { duration: 2, times: [0, 0.5, 0.8, 1], repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
      />
    </svg>
  );
}

function MonadLoader({ color, loops }: { color: string; loops: boolean }) {
  const segments = 6;
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * Math.PI * 2 - Math.PI / 2;
        const r = 11;
        const cx = 16 + r * Math.cos(angle);
        const cy = 16 + r * Math.sin(angle);
        return (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={2.2}
            fill={color}
            animate={loops ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.8 }}
            transition={loops ? { duration: 1.2, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
          />
        );
      })}
    </svg>
  );
}

function ResolvedLoader({ color }: { color: string }) {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <circle cx={16} cy={16} r={12} stroke={color} strokeWidth={2} opacity={0.3} />
      <motion.circle
        cx={16} cy={16} r={12}
        stroke={color} strokeWidth={2.5} fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M10 16 l4 4 l8 -8"
        stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

// ── single loader card ──────────────────────────────────────────────────────

function LoaderCard({ def, loops }: { def: LoaderDef; loops: boolean }) {
  return (
    <motion.div
      className="sf-box"
      variants={fadeUp}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "18px 12px" }}
    >
      {def.kind === "spin"     && <SpinLoader     color={def.color} loops={loops} />}
      {def.kind === "arc"      && <ArcLoader      color={def.color} loops={loops} />}
      {def.kind === "dash"     && <DashLoader     color={def.color} loops={loops} />}
      {def.kind === "dots"     && <DotsLoader     color={def.color} loops={loops} />}
      {def.kind === "pulse"    && <PulseLoader    color={def.color} loops={loops} />}
      {def.kind === "trace"    && <TraceLoader    color={def.color} loops={loops} />}
      {def.kind === "monad"    && <MonadLoader    color={def.color} loops={loops} />}
      {def.kind === "resolved" && <ResolvedLoader color={def.color} />}
      <div className="sf-mono-k" style={{ textAlign: "center" }}>{def.label}</div>
    </motion.div>
  );
}

// ── scene ───────────────────────────────────────────────────────────────────

export function TransitionLoaders() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();

  return (
    <motion.div
      ref={ref}
      className="sf-g4"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {LOADERS.map((def) => (
        <LoaderCard key={def.label} def={def} loops={loops && isInView} />
      ))}
    </motion.div>
  );
}
