/**
 * STATE-FIRST KIT — WorkspaceStateCard
 *
 * Replaces a generic "branch / status" workspace card with a state-first view:
 * S₀ → S* with active transition, trace + validator chips, and progress.
 * Styling from components.css (.sf-ws). Slots into the Superset workspace list.
 *
 * Usage:
 *   <WorkspaceStateCard
 *     workspace={{ branch: "feat/auth-fix", worktree: "wt-01" }}
 *     currentState="bug reproduced" targetState="tests passing"
 *     activeTransition="patch implementation"
 *     traceStatus="recording" validatorStatus="pending" progress={62} />
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { stateCard } from "../tokens/motion-variants";

type TraceStatus = "idle" | "recording" | "complete";
type ValidatorStatus = "pending" | "running" | "passed" | "failed";

interface WorkspaceStateCardProps {
  workspace: { branch: string; worktree?: string };
  currentState: string;
  targetState: string;
  activeTransition?: string;
  traceStatus?: TraceStatus;
  validatorStatus?: ValidatorStatus;
  progress?: number;
}

const traceColor: Record<TraceStatus, string> = {
  idle: "var(--sf-ink-faint)",
  recording: "var(--sf-transition)",
  complete: "var(--sf-target)",
};
const validatorColor: Record<ValidatorStatus, string> = {
  pending: "var(--sf-ink-faint)",
  running: "var(--sf-warning)",
  passed: "var(--sf-target)",
  failed: "var(--sf-transition)",
};

export function WorkspaceStateCard({
  workspace,
  currentState,
  targetState,
  activeTransition,
  traceStatus = "idle",
  validatorStatus = "pending",
  progress = 0,
}: WorkspaceStateCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div className="sf-ws" ref={ref} variants={stateCard} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      <div className="sf-ws__top">
        <div className="sf-ws__branch">
          {workspace.worktree && <span className="sf-g">{workspace.worktree} · </span>}
          {workspace.branch}
        </div>
        {activeTransition && (
          <div className="sf-ws__status">
            <motion.span
              style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sf-transition)" }}
              animate={{ boxShadow: ["0 0 0 0 rgba(255,122,43,0.18)", "0 0 0 6px transparent"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
            running
          </div>
        )}
      </div>

      <div className="sf-ws__body">
        <div className="sf-ws__states">
          <div className="sf-ws__s sf-ws__s--s0">
            <div className="sf-k">S₀ · now</div>
            <div className="sf-v">{currentState}</div>
          </div>
          <div className="sf-ws__arrow">→</div>
          <div className="sf-ws__s sf-ws__s--star">
            <div className="sf-k">S* · target</div>
            <div className="sf-v">{targetState}</div>
          </div>
        </div>

        <div className="sf-ws__meta">
          {activeTransition && <Chip color="var(--sf-transition)" label={`T · ${activeTransition}`} />}
          <Chip color={traceColor[traceStatus]} label={`trace · ${traceStatus}`} />
          <Chip color={validatorColor[validatorStatus]} label={`validator · ${validatorStatus}`} />
        </div>

        <div className="sf-ws__progress">
          <motion.i initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
        </div>
      </div>
    </motion.div>
  );
}

function Chip({ color, label }: { color: string; label: string }) {
  return (
    <div className="sf-ws__chip">
      <span className="sf-d" style={{ background: color }} />
      {label}
    </div>
  );
}
