/**
 * STATE-FIRST KIT — MonadBuilder  (scene #13 — product-proof)
 *
 * Toggle prerequisites; the sufficiency meter and verdict resolve live.
 * Doubles as a real preflight checker for agent runs.
 *
 * Usage:
 *   <MonadBuilder onSufficient={() => enableRun()} />
 */

"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";

const DEFAULT_ITEMS = ["context", "tools", "rights", "memory", "constraints", "criteria"];

interface MonadBuilderProps {
  items?: string[];
  initiallyOn?: string[];
  onChange?: (on: string[]) => void;
  onSufficient?: () => void;
}

export function MonadBuilder({
  items = DEFAULT_ITEMS,
  initiallyOn = [],
  onChange,
  onSufficient,
}: MonadBuilderProps) {
  const [on, setOn] = useState<Set<string>>(() => new Set(initiallyOn));

  const toggle = (item: string) => {
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      onChange?.([...next]);
      if (next.size === items.length) onSufficient?.();
      return next;
    });
  };

  const complete = on.size;
  const total = items.length;
  const pct = Math.round((complete / total) * 100);
  const ok = complete === total;
  const missing = total - complete;

  const verdict = useMemo(
    () =>
      ok
        ? "monad complete · transition can be derived"
        : `incomplete monad · ${missing} prerequisite${missing > 1 ? "s" : ""} missing → agent would fail`,
    [ok, missing]
  );

  return (
    <div className="sf-card">
      <div className="sf-card__bar">
        <span className="sf-lamp" style={{ background: ok ? "var(--sf-target)" : "var(--sf-warning)" }} />
        <b>monad builder</b> · preflight
      </div>
      <div className="sf-card__body">
        <div className="sf-mb__suff">
          <div className="sf-mb__meter">
            <motion.div
              className="sf-mb__fill"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="sf-mb__score">{complete}/{total} sufficient</div>
        </div>

        <div className="sf-mb__grid">
          {items.map((item) => {
            const isOn = on.has(item);
            return (
              <div
                key={item}
                className="sf-mb__item"
                data-on={isOn}
                role="checkbox"
                aria-checked={isOn}
                tabIndex={0}
                onClick={() => toggle(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(item);
                  }
                }}
              >
                <span>{item}</span>
                <span className="sf-mb__box">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M2 6.5l2.5 2.5L10 3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            );
          })}
        </div>

        <motion.div
          className="sf-mb__verdict"
          data-ok={ok}
          layout
          transition={{ duration: 0.3 }}
        >
          {verdict}
        </motion.div>
      </div>
    </div>
  );
}
