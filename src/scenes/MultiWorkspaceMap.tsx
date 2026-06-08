"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp, drawPath } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

type WsStatus = "verified" | "running" | "idle";

interface WorkspaceNode {
  id: string;
  branch: string;
  s0: string;
  star: string;
  status: WsStatus;
  x: number;
  y: number;
}

const NODES: WorkspaceNode[] = [
  { id: "wt-01", branch: "fix/auth-session",   s0: "bug reproduced", star: "tests passing",   status: "verified", x: 30,  y: 30  },
  { id: "wt-02", branch: "feat/prd-checkout",   s0: "loose idea",     star: "approved PRD",    status: "running",  x: 240, y: 20  },
  { id: "wt-03", branch: "feat/landing-v2",     s0: "design handoff", star: "deployed prod",   status: "running",  x: 430, y: 50  },
  { id: "wt-04", branch: "chore/review-pr482",  s0: "PR opened",      star: "merge-ready",     status: "idle",     x: 100, y: 180 },
  { id: "wt-05", branch: "fix/db-index",        s0: "slow queries",   star: "p99 < 50ms",      status: "idle",     x: 320, y: 190 },
];

const EDGES: [string, string][] = [
  ["wt-01", "wt-04"],
  ["wt-02", "wt-03"],
  ["wt-04", "wt-05"],
];

const statusColor: Record<WsStatus, string> = {
  verified: "var(--sf-target)",
  running:  "var(--sf-transition)",
  idle:     "var(--sf-ink-faint)",
};

const statusLabel: Record<WsStatus, string> = {
  verified: "S* reached",
  running:  "running",
  idle:     "idle",
};

const NODE_W = 148;
const NODE_H = 70;

function nodeCenter(n: WorkspaceNode) {
  return { cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 };
}

export function MultiWorkspaceMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();

  const nodeById = (id: string) => NODES.find(n => n.id === id);

  return (
    <motion.div
      ref={ref}
      className="sf-winframe"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="sf-winframe__bar">
        <div className="sf-winframe__dots">
          <i style={{ background: "rgba(255,90,80,0.7)" }} />
          <i style={{ background: "rgba(255,185,0,0.7)" }} />
          <i style={{ background: "rgba(40,200,70,0.7)" }} />
        </div>
        <span className="sf-winframe__title">fleet · multi-workspace state map</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>
          {NODES.filter(n => n.status === "verified").length} verified · {NODES.filter(n => n.status === "running").length} running
        </span>
      </div>

      <div className="sf-winframe__body">
        {/* legend */}
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
          {(["verified", "running", "idle"] as WsStatus[]).map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor[s], display: "inline-block" }} />
              {s}
            </div>
          ))}
        </motion.div>

        {/* graph area */}
        <motion.div variants={fadeUp} style={{ position: "relative", height: 290 }}>
          {/* SVG edges */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden>
            {EDGES.map(([fromId, toId]) => {
              const fromNode = nodeById(fromId);
              const toNode = nodeById(toId);
              if (!fromNode || !toNode) return null;
              const a = nodeCenter(fromNode);
              const b = nodeCenter(toNode);
              return (
                <motion.line
                  key={`${fromId}-${toId}`}
                  x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
                  stroke="var(--sf-hair)"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  variants={drawPath}
                />
              );
            })}
          </svg>

          {/* Workspace nodes */}
          {NODES.map(node => (
            <motion.div
              key={node.id}
              variants={fadeUp}
              style={{
                position: "absolute",
                left: node.x,
                top: node.y,
                width: NODE_W,
                border: `1px solid ${node.status === "verified" ? "rgba(125,255,158,0.3)" : node.status === "running" ? "rgba(255,122,43,0.28)" : "var(--sf-hair)"}`,
                borderRadius: "var(--sf-r-md)",
                background: node.status === "verified" ? "rgba(125,255,158,0.04)" : "var(--sf-panel-2)",
                padding: "9px 11px",
                boxShadow: node.status === "verified" ? "0 0 16px rgba(125,255,158,0.1)" : "none",
              }}
            >
              {/* status row */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                {node.status === "running" && loops && inView ? (
                  <motion.span
                    style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor[node.status], display: "inline-block", flexShrink: 0 }}
                    animate={{ boxShadow: ["0 0 0 0 rgba(255,122,43,0.4)", "0 0 0 5px transparent"] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  />
                ) : (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor[node.status], display: "inline-block", flexShrink: 0 }} />
                )}
                <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: statusColor[node.status] }}>{statusLabel[node.status]}</span>
              </div>
              {/* branch */}
              <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10.5, color: "var(--sf-ink)", marginBottom: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{node.branch}</div>
              {/* S₀ → S* */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--sf-font-mono)", fontSize: 9.5 }}>
                <span style={{ color: "var(--sf-transition)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 56 }}>{node.s0}</span>
                <span style={{ color: "var(--sf-ink-faint)", flexShrink: 0 }}>→</span>
                <span style={{ color: "var(--sf-target)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 56 }}>{node.star}</span>
              </div>
              {/* worktree id */}
              <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, color: "var(--sf-ink-faint)", marginTop: 5 }}>{node.id}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* footer stats */}
        <motion.div variants={fadeUp} style={{ borderTop: "1px solid var(--sf-hair)", paddingTop: 12, marginTop: 6, display: "flex", gap: 14, fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>
          <span>{NODES.length} worktrees</span>
          <span style={{ color: "var(--sf-target)" }}>{NODES.filter(n => n.status === "verified").length} S* verified</span>
          <span style={{ color: "var(--sf-transition)" }}>{NODES.filter(n => n.status === "running").length} transitions active</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
