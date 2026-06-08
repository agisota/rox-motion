"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

interface AgentNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  border: string;
}

interface GraphEdge {
  from: string;
  to: string;
}

const AGENT_NODES: AgentNode[] = [
  { id: "a1", label: "agent-1", x: 50,  y: 50,  color: "var(--sf-friction)",   border: "var(--sf-hair)" },
  { id: "a2", label: "agent-2", x: 250, y: 30,  color: "var(--sf-friction)",   border: "var(--sf-hair)" },
  { id: "a3", label: "agent-3", x: 450, y: 50,  color: "var(--sf-friction)",   border: "var(--sf-hair)" },
  { id: "a4", label: "agent-4", x: 150, y: 140, color: "var(--sf-friction)",   border: "var(--sf-hair)" },
  { id: "a5", label: "agent-5", x: 350, y: 140, color: "var(--sf-friction)",   border: "var(--sf-hair)" },
];

const GRAPH_NODES: AgentNode[] = [
  { id: "s0",  label: "S₀",  x: 30,  y: 80,  color: "var(--sf-transition)", border: "rgba(255,122,43,0.5)" },
  { id: "s1",  label: "s₁",  x: 170, y: 30,  color: "var(--sf-ink)",        border: "var(--sf-hair)" },
  { id: "s2",  label: "s₂",  x: 170, y: 130, color: "var(--sf-ink)",        border: "var(--sf-hair)" },
  { id: "s3",  label: "s₃",  x: 320, y: 80,  color: "var(--sf-ink)",        border: "var(--sf-hair)" },
  { id: "str", label: "S*",  x: 440, y: 80,  color: "var(--sf-target)",     border: "rgba(125,255,158,0.5)" },
];

const GRAPH_EDGES: GraphEdge[] = [
  { from: "s0",  to: "s1"  },
  { from: "s0",  to: "s2"  },
  { from: "s1",  to: "s3"  },
  { from: "s2",  to: "s3"  },
  { from: "s3",  to: "str" },
];

function nodeById(nodes: AgentNode[], id: string): AgentNode {
  return nodes.find(n => n.id === id) ?? nodes[0]!;
}

export function AgentTeamsToGraphs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [showGraph, setShowGraph] = useState(false);

  const displayed = showGraph ? GRAPH_NODES : AGENT_NODES;

  return (
    <motion.div
      ref={ref}
      className="sf-box"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div className="sf-mono-k">agent teams → transition graphs</div>
        <button
          onClick={() => setShowGraph(v => !v)}
          style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: showGraph ? "var(--sf-target)" : "var(--sf-transition)", border: "1px solid", borderColor: showGraph ? "rgba(125,255,158,0.4)" : "rgba(255,122,43,0.4)", borderRadius: "var(--sf-r-sm)", padding: "5px 12px", background: "transparent", cursor: "pointer" }}>
          {showGraph ? "← agents" : "morph →"}
        </button>
      </motion.div>

      <motion.div variants={fadeUp} style={{ position: "relative", height: 200, background: "var(--sf-panel-2)", borderRadius: "var(--sf-r-md)", border: "1px solid var(--sf-hair)", overflow: "hidden" }}>
        {/* Edges (graph mode only) */}
        {showGraph && (
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
            {GRAPH_EDGES.map(({ from, to }) => {
              const f = nodeById(GRAPH_NODES, from);
              const t = nodeById(GRAPH_NODES, to);
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={f.x + 28} y1={f.y + 16}
                  x2={t.x + 28} y2={t.y + 16}
                  stroke="var(--sf-transition)"
                  strokeWidth={1.5}
                  strokeOpacity={0.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}
          </svg>
        )}

        {/* Nodes */}
        {displayed.map((node) => (
          <motion.div
            key={node.id}
            layout
            animate={{ x: node.x, y: node.y, opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{ position: "absolute", top: 0, left: 0, fontFamily: "var(--sf-font-mono)", fontSize: 11, color: node.color, border: `1px solid ${node.border}`, borderRadius: "var(--sf-r-sm)", padding: "6px 10px", background: "var(--sf-panel)", whiteSpace: "nowrap" as const }}>
            {node.label}
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} style={{ marginTop: 12, fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)" }}>
        teams are transition graphs · <span style={{ color: "var(--sf-target)" }}>agents serve the path</span>, not the other way around
      </motion.div>
    </motion.div>
  );
}
