/**
 * STATE-FIRST KIT — RunButton  (flagship product-proof control)
 *
 * Lifecycle: idle → pending → running → verified
 * Color law: orange = energy in transition; green = verified (NEVER pulses).
 * Styling from components.css (.sf-runbtn). Click again when verified to reset.
 *
 * Usage:
 *   <RunButton autoPlay onComplete={() => refetch()} />
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useAnyMotion } from "../providers/MotionProvider";

export type RunPhase = "idle" | "pending" | "running" | "verified";

interface TraceStep {
  kind: "tr" | "ev" | "ok";
  event: string;
  detail: string;
}

interface RunButtonProps {
  onComplete?: () => void;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  trace?: TraceStep[];
  /** show the trace box under the button */
  showTrace?: boolean;
}

const DEFAULT_TRACE: TraceStep[] = [
  { kind: "tr", event: "transition.opened", detail: "T · ship landing patch" },
  { kind: "ev", event: "runtime.ready", detail: "repo + shell + preview" },
  { kind: "ev", event: "monad.check", detail: "6/6 sufficient" },
  { kind: "ev", event: "diff.written", detail: "+42 −11" },
  { kind: "ev", event: "tests.run", detail: "142 passed" },
  { kind: "ok", event: "validator.passed", detail: "S* reached" },
];

const phaseLabel: Record<RunPhase, string> = {
  idle: "run transition",
  pending: "deriving contract…",
  running: "executing transition",
  verified: "S* verified",
};
const phaseSub: Record<RunPhase, string> = {
  idle: "S₀ → S* · derive & execute",
  pending: "Δ = S* − S₀",
  running: "agent is a vehicle · trace recording",
  verified: "state proven by observable trace",
};

const PlayIcon = (
  <svg viewBox="0 0 16 16" fill="none" width={16} height={16}>
    <path d="M4 3l9 5-9 5V3z" fill="currentColor" />
  </svg>
);
const CheckIcon = (
  <svg viewBox="0 0 16 16" fill="none" width={16} height={16}>
    <path d="M3 8.5l3.2 3.2L13 4.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function RunButton({
  onComplete,
  autoPlay = false,
  autoPlayDelay = 600,
  trace = DEFAULT_TRACE,
  showTrace = true,
}: RunButtonProps) {
  const [phase, setPhase] = useState<RunPhase>("idle");
  const [rows, setRows] = useState<TraceStep[]>([]);
  const anyMotion = useAnyMotion();
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const reset = useCallback(() => {
    clearTimers();
    busy.current = false;
    setPhase("idle");
    setRows([]);
  }, []);

  const run = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    const step = anyMotion ? 1 : 0;
    setRows([]);
    setPhase("pending");

    timers.current.push(
      setTimeout(() => {
        setPhase("running");
        trace.forEach((t, i) => {
          timers.current.push(setTimeout(() => setRows((r) => [...r, t]), step * (250 + i * 330)));
        });
        timers.current.push(
          setTimeout(() => {
            setPhase("verified");
            busy.current = false;
            onComplete?.();
          }, step * (250 + trace.length * 330 + 200))
        );
      }, step * 520)
    );
  }, [anyMotion, onComplete, trace]);

  const handleClick = () => {
    if (phase === "verified") reset();
    else if (phase === "idle") run();
  };

  useEffect(() => {
    if (autoPlay && isInView) {
      const t = setTimeout(run, autoPlayDelay);
      return () => clearTimeout(t);
    }
  }, [autoPlay, isInView, autoPlayDelay, run]);

  useEffect(() => () => clearTimers(), []);

  const fillScale = phase === "idle" ? 0 : phase === "pending" ? 0.12 : phase === "running" ? 0.9 : 1;

  return (
    <div className="sf-runproof">
      <button ref={ref} className="sf-runbtn" data-phase={phase} onClick={handleClick} type="button">
        <motion.span
          className="sf-runbtn__fill"
          aria-hidden
          animate={{ scaleX: fillScale }}
          transition={phase === "running" ? { duration: 2.4, ease: "linear" } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="sf-runbtn__ico">
          {phase === "verified" ? (
            CheckIcon
          ) : phase === "idle" ? (
            PlayIcon
          ) : (
            <motion.svg viewBox="0 0 16 16" fill="none" width={16} height={16} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth={2} strokeDasharray="9 9" strokeLinecap="round" />
            </motion.svg>
          )}
        </span>
        <span className="sf-runbtn__label">
          {phaseLabel[phase]}
          <span className="sf-runbtn__sub" style={{ display: "block" }}>{phaseSub[phase]}</span>
        </span>
      </button>

      {showTrace && (
        <div className="sf-runproof__trace">
          {rows.map((r, i) => (
            <div className="sf-rl" key={`${r.event}-${i}`}>
              <span className="sf-t">{String(i).padStart(2, "0")}</span>
              <span>
                <span className={`sf-${r.kind}`}>{r.event}</span> · {r.detail}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
