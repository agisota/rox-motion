/**
 * STATE-FIRST KIT — TraceConsole
 *
 * Streaming event log grouped by transition. Styling from components.css
 * (.sf-console / .sf-cl). Replace raw agent log output with this.
 *
 * Usage:
 *   <TraceConsole entries={run.traceEntries} />
 */

"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fadeUp } from "../tokens/motion-variants";

export type TraceEntryKind = "tr" | "ev" | "ok" | "warn";

export interface TraceEntry {
  timestamp: string;
  kind: TraceEntryKind;
  event: string;
  detail: string;
}

interface TraceConsoleProps {
  entries: TraceEntry[];
  maxRows?: number;
  height?: number;
  className?: string;
}

export function TraceConsole({ entries, maxRows = 10, height = 326, className }: TraceConsoleProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const visible = entries.slice(-maxRows);

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  }, [entries.length]);

  return (
    <div className={`sf-console ${className ?? ""}`} style={{ height }}>
      <div>
        <AnimatePresence initial={false}>
          {visible.map((entry, i) => (
            <motion.div
              key={`${entry.timestamp}-${entry.event}-${i}`}
              className="sf-cl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, height: 0 }}
            >
              <span className="sf-cl__t">{entry.timestamp}</span>
              <span className="sf-cl__b">
                <span className={`sf-t-${entry.kind}`}>{entry.event}</span> · {entry.detail}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

/** Pre-built demo trace for showcases. */
export const DEMO_TRACE: TraceEntry[] = [
  { timestamp: "00.04", kind: "tr", event: "transition.opened", detail: "T1 · reproduce issue" },
  { timestamp: "00.21", kind: "ev", event: "event.received", detail: "repo.cloned" },
  { timestamp: "01.07", kind: "ev", event: "runtime.ready", detail: "shell + repo" },
  { timestamp: "02.30", kind: "tr", event: "transition.opened", detail: "T2 · locate cause" },
  { timestamp: "03.12", kind: "ev", event: "tool.read", detail: "src/auth/session.ts" },
  { timestamp: "04.48", kind: "tr", event: "transition.opened", detail: "T3 · apply patch" },
  { timestamp: "05.51", kind: "ev", event: "diff.written", detail: "+18 −6" },
  { timestamp: "06.30", kind: "tr", event: "transition.opened", detail: "T4 · validate" },
  { timestamp: "07.02", kind: "ev", event: "tests.run", detail: "142 passed" },
  { timestamp: "07.40", kind: "ok", event: "validator.passed", detail: "S* reached · verified" },
];
