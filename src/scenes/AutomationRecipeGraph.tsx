"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp, drawPath } from "../tokens/motion-variants";

const NODES = {
  trigger:  { x: 60,  y: 120, label: "issue selected",     color: "var(--sf-transition)", cls: "is-s0" },
  monad:    { x: 220, y: 40,  label: "monad · 6/6",        color: "var(--sf-runtime)",    cls: "is-rt" },
  runtime:  { x: 220, y: 120, label: "runtime · repo+shell", color: "var(--sf-runtime)",  cls: "is-rt" },
  validator:{ x: 220, y: 200, label: "validator · tests ✓", color: "var(--sf-ink-faint)",  cls: "" },
  target:   { x: 400, y: 120, label: "workspace ready",    color: "var(--sf-target)",     cls: "is-star" },
};

const EDGES: { from: keyof typeof NODES; to: keyof typeof NODES }[] = [
  { from: "trigger",  to: "monad" },
  { from: "trigger",  to: "runtime" },
  { from: "trigger",  to: "validator" },
  { from: "monad",    to: "target" },
  { from: "runtime",  to: "target" },
  { from: "validator",to: "target" },
];

const NODE_W = 130;
const NODE_H = 34;

function nodeCenter(id: keyof typeof NODES) {
  const n = NODES[id];
  return { cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 };
}

export function AutomationRecipeGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="sf-winframe"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ maxWidth: 580 }}
    >
      <div className="sf-winframe__bar">
        <div className="sf-winframe__dots">
          <i style={{ background: "rgba(255,90,80,0.7)" }} />
          <i style={{ background: "rgba(255,185,0,0.7)" }} />
          <i style={{ background: "rgba(40,200,70,0.7)" }} />
        </div>
        <span className="sf-winframe__title">automation · issue → workspace</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>recipe · 1 trigger · 3 requirements</span>
      </div>

      <div className="sf-winframe__body">
        {/* legend */}
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
          {[
            { color: "var(--sf-transition)", label: "trigger" },
            { color: "var(--sf-runtime)",    label: "requirement" },
            { color: "var(--sf-target)",     label: "target state" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "inline-block" }} />
              {label}
            </div>
          ))}
        </motion.div>

        {/* graph SVG + nodes */}
        <motion.div variants={fadeUp} style={{ position: "relative", height: 260 }}>
          {/* SVG edges */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden>
            {EDGES.map(({ from, to }) => {
              const a = nodeCenter(from);
              const b = nodeCenter(to);
              const mx = (a.cx + b.cx) / 2;
              const d = `M ${a.cx} ${a.cy} C ${mx} ${a.cy}, ${mx} ${b.cy}, ${b.cx} ${b.cy}`;
              return (
                <motion.path
                  key={`${from}-${to}`}
                  d={d}
                  fill="none"
                  stroke="var(--sf-hair)"
                  strokeWidth={1.5}
                  variants={drawPath}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {(Object.entries(NODES) as [keyof typeof NODES, typeof NODES[keyof typeof NODES]][]).map(([id, node]) => (
            <motion.div
              key={id}
              variants={fadeUp}
              className={`sf-gnode ${node.cls}`}
              style={{
                position: "absolute",
                left: node.x,
                top: node.y,
                width: NODE_W,
                fontSize: 11,
                color: node.color,
                borderColor: id === "trigger" ? "rgba(255,122,43,0.3)" : id === "target" ? "rgba(125,255,158,0.3)" : "rgba(111,184,201,0.25)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: node.color, flexShrink: 0, display: "inline-block" }} />
              {node.label}
            </motion.div>
          ))}
        </motion.div>

        {/* footer */}
        <motion.div variants={fadeUp} style={{ borderTop: "1px solid var(--sf-hair)", paddingTop: 12, marginTop: 4, display: "flex", gap: 16, fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>
          <span>trigger · issue.labeled(p1)</span>
          <span>monad · auto-check</span>
          <span style={{ marginLeft: "auto", color: "var(--sf-target)" }}>template · enabled</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
