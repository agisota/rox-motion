"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

const CHAMBERS = [
  { id: "derive",   label: "derive Δ",    color: "var(--sf-transition)" },
  { id: "monad",    label: "build monad", color: "var(--sf-transition)" },
  { id: "execute",  label: "execute",     color: "var(--sf-runtime)" },
  { id: "trace",    label: "trace",       color: "var(--sf-runtime)" },
  { id: "validate", label: "validate",    color: "var(--sf-target)" },
] as const;

export function IntentToArtifact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const tick = () => {
      setActive(i);
      i++;
      if (loops && i <= CHAMBERS.length) {
        setTimeout(tick, 500);
      } else if (!loops && i <= CHAMBERS.length) {
        setTimeout(tick, 500);
      }
    };
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [inView, loops]);

  const done = active >= CHAMBERS.length;

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      {/* Pipeline row */}
      <motion.div variants={fadeUp}
        style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" as const }}>
        {/* Intent input */}
        <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 12, color: "var(--sf-friction)", border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-md)", padding: "10px 14px", background: "var(--sf-panel-2)", whiteSpace: "nowrap" as const }}>
          raw intent
        </div>

        <span style={{ color: "var(--sf-transition)", fontFamily: "var(--sf-font-mono)", fontSize: 14 }}>→</span>

        {CHAMBERS.map((chamber, i) => (
          <div key={chamber.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <motion.div
              className="sf-box"
              animate={{ borderColor: active >= i ? chamber.color : "var(--sf-hair)", background: active >= i ? `color-mix(in srgb, ${chamber.color} 8%, var(--sf-panel))` : "var(--sf-panel)" }}
              transition={{ duration: 0.3 }}
              style={{ padding: "10px 14px", fontFamily: "var(--sf-font-mono)", fontSize: 12, color: active >= i ? chamber.color : "var(--sf-ink-faint)", whiteSpace: "nowrap" as const }}>
              {chamber.label}
            </motion.div>
            {i < CHAMBERS.length - 1 && (
              <motion.span
                animate={{ color: active > i ? "var(--sf-transition)" : "var(--sf-hair)" }}
                style={{ fontFamily: "var(--sf-font-mono)", fontSize: 14 }}>
                →
              </motion.span>
            )}
          </div>
        ))}

        <span style={{ color: done ? "var(--sf-target)" : "var(--sf-hair)", fontFamily: "var(--sf-font-mono)", fontSize: 14, transition: "color 0.3s" }}>→</span>

        {/* Artifact output */}
        <motion.div
          animate={{ borderColor: done ? "rgba(125,255,158,0.4)" : "var(--sf-hair)", background: done ? "rgba(125,255,158,0.06)" : "var(--sf-panel-2)" }}
          transition={{ duration: 0.4 }}
          style={{ fontFamily: "var(--sf-font-mono)", fontSize: 12, color: done ? "var(--sf-target)" : "var(--sf-ink-faint)", border: "1px solid", borderRadius: "var(--sf-r-md)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" as const }}>
          {done && <span style={{ fontSize: 14 }}>✓</span>}
          verified artifact
        </motion.div>
      </motion.div>

      {/* Status bar */}
      <motion.div variants={fadeUp}
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", display: "flex", gap: 14 }}>
        <span>chambers: <span style={{ color: "var(--sf-ink)" }}>{Math.min(active + 1, CHAMBERS.length)}/{CHAMBERS.length}</span></span>
        <span>status: <span style={{ color: done ? "var(--sf-target)" : active >= 0 ? "var(--sf-transition)" : "var(--sf-ink-faint)" }}>{done ? "S* reached" : active >= 0 ? "processing" : "waiting"}</span></span>
      </motion.div>
    </motion.div>
  );
}
