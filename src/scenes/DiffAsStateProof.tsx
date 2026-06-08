"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

const DIFF_ROWS: { kind: "add" | "del" | "ctx"; line: number; text: string }[] = [
  { kind: "ctx", line: 14, text: "  if (!session.token) {" },
  { kind: "del", line: 15, text: '    return redirect("/login");' },
  { kind: "del", line: 16, text: "  }" },
  { kind: "add", line: 15, text: '    toast.error("Session expired");' },
  { kind: "add", line: 16, text: '    return redirect("/login?reason=expired");' },
  { kind: "add", line: 17, text: "  }" },
  { kind: "ctx", line: 18, text: "" },
  { kind: "ctx", line: 19, text: "  return session.user;" },
];

const PROOF_CHIPS: { label: string; ok: boolean }[] = [
  { label: "tests = validator evidence ✓", ok: true },
  { label: "commit = artifact",            ok: true },
  { label: "diff = trace",                 ok: true },
  { label: "+18 −6 lines changed",         ok: false },
];

export function DiffAsStateProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="sf-diff"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ maxWidth: 580 }}
    >
      {/* File header */}
      <motion.div variants={fadeUp} className="sf-diff__file">
        <span style={{ color: "var(--sf-ink-faint)" }}>src/auth/</span>
        <span>session.ts</span>
        <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", marginLeft: 4 }}>+3 −2</span>
        <span className="sf-badge">state proof ✓</span>
      </motion.div>

      {/* State context bar */}
      <motion.div variants={fadeUp} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "8px 14px",
        borderBottom: "1px solid var(--sf-hair)", background: "var(--sf-panel-3)",
        fontFamily: "var(--sf-font-mono)", fontSize: 10.5,
      }}>
        <span style={{ color: "var(--sf-ink-faint)" }}>changed files =</span>
        <span style={{ color: "var(--sf-transition)" }}>S₀ · bug reproduced</span>
        <span style={{ color: "var(--sf-ink-faint)" }}>→</span>
        <span style={{ color: "var(--sf-target)" }}>S* · tests passing</span>
      </motion.div>

      {/* Diff code */}
      <motion.div variants={fadeUp} className="sf-diff__code">
        {DIFF_ROWS.map((row, i) => (
          <div
            key={i}
            className={`sf-diff__row${row.kind === "add" ? " sf-add" : row.kind === "del" ? " sf-del" : ""}`}
          >
            <span className="sf-gut">{row.kind === "add" ? "+" : row.kind === "del" ? "−" : " "}</span>
            <span className="sf-gut" style={{ color: "var(--sf-ink-faint)", opacity: 0.5, fontSize: 10 }}>{row.line}</span>
            <span className="sf-ln">{row.text}</span>
          </div>
        ))}
      </motion.div>

      {/* Proof chips */}
      <motion.div variants={fadeUp} className="sf-diff__proof">
        {PROOF_CHIPS.map(chip => (
          <div key={chip.label} className={`sf-proofchip${chip.ok ? " sf-ok" : ""}`}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: chip.ok ? "var(--sf-target)" : "var(--sf-ink-faint)", flexShrink: 0, display: "inline-block" }} />
            {chip.label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
