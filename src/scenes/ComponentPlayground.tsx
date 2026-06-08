"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { stateFirstScenes } from "../data/scenes";

// ── helpers ─────────────────────────────────────────────────────────────────

const CLUSTER_COLORS: Record<string, string> = {
  manifesto: "var(--sf-target)",
  mechanics: "var(--sf-transition)",
  metaphor:  "var(--sf-runtime)",
  product:   "var(--sf-transition)",
  superset:  "var(--sf-runtime)",
  library:   "var(--sf-friction)",
};

function clusterColor(cluster: string): string {
  return CLUSTER_COLORS[cluster] ?? "var(--sf-ink-faint)";
}

// ── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      const t = setTimeout(() => setCopied(false), 1800);
      return () => clearTimeout(t);
    }).catch(() => {
      // clipboard unavailable — silently ignore
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="copy import"
      style={{
        background: "none",
        border: "1px solid var(--sf-hair)",
        borderRadius: "var(--sf-r-sm)",
        cursor: "pointer",
        padding: "3px 8px",
        fontFamily: "var(--sf-font-mono)",
        fontSize: 10,
        color: copied ? "var(--sf-target)" : "var(--sf-ink-faint)",
        flexShrink: 0,
        transition: "color 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

// ── Scene card ───────────────────────────────────────────────────────────────

function SceneCard({
  number,
  title,
  cluster,
  componentName,
}: {
  number: number;
  title: string;
  cluster: string;
  componentName: string;
}) {
  const importLine = `import { ${componentName} } from "rox-ui"`;
  const cc = clusterColor(cluster);

  return (
    <motion.div
      className="sf-box"
      variants={fadeUp}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
    >
      {/* header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
          fontFamily: "var(--sf-font-mono)", fontSize: 10,
          color: "var(--sf-ink-faint)",
          minWidth: 22,
        }}>
          #{String(number).padStart(2, "0")}
        </span>
        <span style={{
          width: 7, height: 7, borderRadius: "50%",
          background: cc, flexShrink: 0, opacity: 0.9,
        }} />
        <span style={{
          fontFamily: "var(--sf-font-mono)", fontSize: 10,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: cc, opacity: 0.85,
        }}>
          {cluster}
        </span>
      </div>

      {/* title */}
      <div style={{
        fontSize: 13, fontFamily: "var(--sf-font-mono)",
        color: "var(--sf-ink)", lineHeight: 1.4,
      }}>
        {title}
      </div>

      {/* import line + copy */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "var(--sf-panel-2)", borderRadius: "var(--sf-r-sm)",
        border: "1px solid var(--sf-hair)", padding: "6px 8px",
        overflow: "hidden",
      }}>
        <span style={{
          fontFamily: "var(--sf-font-mono)", fontSize: 9.5,
          color: "var(--sf-ink-dim)", flex: 1,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {importLine}
        </span>
        <CopyButton text={importLine} />
      </div>
    </motion.div>
  );
}

// ── Filter bar ───────────────────────────────────────────────────────────────

const ALL_CLUSTERS = ["all", "manifesto", "mechanics", "metaphor", "product", "superset", "library"] as const;
type FilterCluster = typeof ALL_CLUSTERS[number];

function FilterBar({
  active,
  onChange,
}: {
  active: FilterCluster;
  onChange: (c: FilterCluster) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
      {ALL_CLUSTERS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          style={{
            fontFamily: "var(--sf-font-mono)", fontSize: 10,
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: "999px", cursor: "pointer",
            border: `1px solid ${active === c ? "var(--sf-transition)" : "var(--sf-hair)"}`,
            background: active === c ? "rgba(255,122,43,0.10)" : "var(--sf-panel-2)",
            color: active === c ? "var(--sf-transition)" : "var(--sf-ink-faint)",
            transition: "all 0.18s",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

// ── scene ────────────────────────────────────────────────────────────────────

export function ComponentPlayground() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [filter, setFilter] = useState<FilterCluster>("all");

  const readyScenes = stateFirstScenes.filter((s) => s.status === "ready");
  const filtered =
    filter === "all" ? readyScenes : readyScenes.filter((s) => s.cluster === filter);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sf-ink-faint)" }}>
            component playground
          </span>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>
            {readyScenes.length} ready · {stateFirstScenes.length} total
          </span>
        </div>
        <FilterBar active={filter} onChange={setFilter} />
      </div>

      {/* grid */}
      <motion.div
        className="sf-g3"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {filtered.map((scene) => (
          <SceneCard
            key={scene.id}
            number={scene.number}
            title={scene.title}
            cluster={scene.cluster}
            componentName={scene.componentName}
          />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div style={{
          fontFamily: "var(--sf-font-mono)", fontSize: 12,
          color: "var(--sf-ink-faint)", textAlign: "center",
          padding: "24px 0",
        }}>
          no ready scenes in this cluster yet
        </div>
      )}
    </div>
  );
}
