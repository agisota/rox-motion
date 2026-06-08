"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp, scaleIn } from "../tokens/motion-variants";
import { DEFAULT_EXAMPLE } from "../data/demo-data";

const ex = DEFAULT_EXAMPLE;

const ISSUE = {
  id: "ENG-482",
  title: "Auth session expires silently — users get 401 with no feedback",
  labels: ["bug", "auth", "p1"],
  body: "When a session token expires the server returns 401 but the client does not notify the user. They hit a blank redirect with no explanation.",
  author: "jsmith",
  repo: "acme/api",
};

export function IssueImportToContour() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      {/* header */}
      <motion.div variants={fadeUp} style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sf-ink-faint)", display: "flex", alignItems: "center", gap: 8 }}>
        <span>GitHub / Linear import</span>
        <span style={{ color: "var(--sf-runtime)" }}>→ state contour</span>
      </motion.div>

      <div className="sf-g2" style={{ alignItems: "start" }}>
        {/* Issue card — grey/neutral */}
        <motion.div variants={fadeUp} className="sf-card">
          <div className="sf-card__bar">
            <span className="sf-lamp" style={{ background: "var(--sf-ink-faint)" }} />
            <b>{ISSUE.repo} · {ISSUE.id}</b>
          </div>
          <div className="sf-card__body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 12.5, color: "var(--sf-ink)", lineHeight: 1.45 }}>{ISSUE.title}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {ISSUE.labels.map(l => (
                <span key={l} style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)", border: "1px solid var(--sf-hair)", borderRadius: 999, padding: "3px 8px" }}>{l}</span>
              ))}
            </div>
            <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", lineHeight: 1.6 }}>{ISSUE.body}</div>
            <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 10, color: "var(--sf-ink-faint)" }}>opened by {ISSUE.author}</div>
          </div>
        </motion.div>

        {/* Contour card — semantic colors */}
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} className="sf-card">
          <div className="sf-card__bar">
            <span className="sf-lamp" style={{ background: "var(--sf-target)" }} />
            <b>state contour · derived</b>
            <span style={{ marginLeft: "auto", fontFamily: "var(--sf-font-mono)", fontSize: 9, color: "var(--sf-target)", letterSpacing: "0.08em", textTransform: "uppercase" }}>imported ✓</span>
          </div>
          <div className="sf-card__body" style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {[
              { k: "S₀ · now",    v: ex.s0,    c: "var(--sf-transition)", bc: "rgba(255,122,43,0.25)" },
              { k: "S* · target", v: ex.star,  c: "var(--sf-target)",     bc: "rgba(125,255,158,0.25)" },
              { k: "Δ · gap",     v: ex.delta, c: "var(--sf-ink)",        bc: "var(--sf-hair)" },
            ].map(row => (
              <motion.div key={row.k} variants={scaleIn} style={{ border: `1px solid ${row.bc}`, borderRadius: "var(--sf-r-sm)", padding: "9px 11px", background: "var(--sf-panel-2)" }}>
                <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sf-ink-faint)", marginBottom: 4 }}>{row.k}</div>
                <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 12, color: row.c }}>{row.v}</div>
              </motion.div>
            ))}
            <motion.div variants={scaleIn} style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 2 }}>
              <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sf-ink-faint)" }}>validators</div>
              {ex.validator.map(v => (
                <div key={v} style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-dim)" }}>
                  <span style={{ color: "var(--sf-target)" }}>✓</span>{v}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
