"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp, staggerContainer } from "../tokens/motion-variants";

interface MonadItem {
  key: string;
  label: string;
  present: boolean;
}

const MONAD_ITEMS: MonadItem[] = [
  { key: "context",     label: "context",     present: true  },
  { key: "tools",       label: "tools",       present: true  },
  { key: "rights",      label: "rights",      present: true  },
  { key: "memory",      label: "memory",      present: false },
  { key: "constraints", label: "constraints", present: false },
  { key: "criteria",    label: "criteria",    present: true  },
];

export function MissingMonadDetector() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [detected, setDetected] = useState<string | null>(null);

  // auto-detect the first missing item after entering view
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const missing = MONAD_ITEMS.find((m) => !m.present);
      if (missing) setDetected(missing.key);
    }, 900);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="sf-box"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      {/* header */}
      <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--sf-warning)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--sf-font-mono)",
            fontSize: 12,
            color: "var(--sf-warning)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          agent failed
        </span>
      </motion.div>

      {/* monad item list */}
      <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {MONAD_ITEMS.map((item) => {
          const isHighlighted = detected === item.key;
          return (
            <motion.div
              key={item.key}
              animate={isHighlighted ? { backgroundColor: "rgba(255,177,94,0.1)", borderColor: "var(--sf-warning)" } : {}}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--sf-font-mono)",
                fontSize: 12,
                color: item.present ? "var(--sf-ink-dim)" : "var(--sf-ink-faint)",
                border: "1px solid var(--sf-hair)",
                borderRadius: "var(--sf-r-sm)",
                padding: "8px 11px",
                background: "var(--sf-panel-2)",
                transition: "border-color 0.3s, background-color 0.3s",
              }}
            >
              <span style={{ color: item.present ? "var(--sf-target)" : "var(--sf-warning)", fontSize: 13 }}>
                {item.present ? "✓" : "✗"}
              </span>
              {item.label}
              {!item.present && (
                <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--sf-warning)", letterSpacing: "0.08em" }}>
                  missing
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* conclusion */}
      <motion.div
        variants={fadeUp}
        style={{
          fontFamily: "var(--sf-font-mono)",
          fontSize: 11,
          color: "var(--sf-ink-dim)",
          borderTop: "1px solid var(--sf-hair)",
          paddingTop: 12,
          lineHeight: 1.6,
        }}
      >
        <span style={{ color: "var(--sf-ink-faint)" }}>diagnosis · </span>
        not an agent failure — the monad was incomplete
      </motion.div>
    </motion.div>
  );
}
