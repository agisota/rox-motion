"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

type PortStatus = "active" | "idle" | "connecting";

const PORTS: { id: string; label: string; port?: string; status: PortStatus }[] = [
  { id: "browser",  label: "browser",  status: "active" },
  { id: "shell",    label: "shell",    status: "active" },
  { id: "repo",     label: "repo",     status: "active" },
  { id: "preview",  label: "preview",  port: ":3000", status: "active" },
  { id: "db",       label: "db",       port: ":5432", status: "idle" },
  { id: "search",   label: "search",   status: "idle" },
];

const statusColor: Record<PortStatus, string> = {
  active:     "var(--sf-runtime)",
  idle:       "var(--sf-ink-faint)",
  connecting: "var(--sf-transition)",
};

function DockItem({ label, port, status, loops }: { label: string; port?: string; status: PortStatus; loops: boolean }) {
  const isLive = status === "active";
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
      border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-md)",
      background: isLive ? "rgba(111,184,201,0.05)" : "var(--sf-panel-2)",
      borderColor: isLive ? "rgba(111,184,201,0.25)" : "var(--sf-hair)",
      padding: "12px 10px", minWidth: 72, cursor: "default",
      transition: "transform 0.2s, border-color 0.2s",
    }}>
      {/* status dot */}
      {isLive && loops ? (
        <motion.span
          style={{ width: 7, height: 7, borderRadius: "50%", background: statusColor[status], display: "inline-block" }}
          animate={{ boxShadow: ["0 0 0 0 rgba(111,184,201,0.3)", "0 0 0 5px transparent"] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      ) : (
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: statusColor[status], display: "inline-block" }} />
      )}
      <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: isLive ? "var(--sf-runtime)" : "var(--sf-ink-faint)" }}>{label}</span>
      {port && (
        <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9.5, color: "var(--sf-ink-faint)", letterSpacing: "0.04em" }}>{port}</span>
      )}
    </div>
  );
}

export function RuntimeDock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--sf-hair)", borderRadius: "var(--sf-r-md)", background: "var(--sf-panel)", overflow: "hidden" }}
    >
      {/* dock header bar */}
      <motion.div variants={fadeUp} style={{
        display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
        borderBottom: "1px solid var(--sf-hair)", background: "var(--sf-panel-2)",
        fontFamily: "var(--sf-font-mono)", fontSize: 11,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sf-runtime)", display: "inline-block",
          boxShadow: "0 0 8px var(--sf-runtime)" }} />
        <span style={{ color: "var(--sf-runtime)", letterSpacing: "0.06em", textTransform: "uppercase" }}>runtime dock</span>
        <span style={{ marginLeft: "auto", color: "var(--sf-ink-faint)", fontSize: 10 }}>
          {PORTS.filter(p => p.status === "active").length}/{PORTS.length} active
        </span>
      </motion.div>

      {/* ports row */}
      <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: 14 }}>
        {PORTS.map(p => (
          <DockItem key={p.id} label={p.label} port={p.port} status={p.status} loops={loops && inView} />
        ))}
      </motion.div>

      {/* status footer */}
      <motion.div variants={fadeUp} style={{
        display: "flex", gap: 14, padding: "9px 14px", borderTop: "1px solid var(--sf-hair)",
        background: "var(--sf-panel-3)", fontFamily: "var(--sf-font-mono)", fontSize: 10,
      }}>
        <span style={{ color: "var(--sf-ink-faint)" }}>wt-07 · feat/auth-fix</span>
        <span style={{ color: "var(--sf-runtime)" }}>runtime ready</span>
        <span style={{ marginLeft: "auto", color: "var(--sf-ink-faint)" }}>shell + repo + browser + preview</span>
      </motion.div>
    </motion.div>
  );
}
