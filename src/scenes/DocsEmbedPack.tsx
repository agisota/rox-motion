"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";

// ── Embed 1: Hero Formula S₀ → T → S* ──────────────────────────────────────

function HeroFormulaEmbed() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "18px 20px",
      background: "var(--sf-panel-2)",
      borderRadius: "var(--sf-r-md)",
      border: "1px solid var(--sf-hair)",
    }}>
      <span style={{
        fontFamily: "var(--sf-font-display)", fontSize: 22,
        color: "var(--sf-transition)", letterSpacing: "-0.01em",
      }}>
        S₀
      </span>
      <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 14, color: "var(--sf-ink-faint)" }}>→</span>
      <span style={{
        fontFamily: "var(--sf-font-display)", fontSize: 22,
        color: "var(--sf-runtime)", letterSpacing: "-0.01em",
      }}>
        T
      </span>
      <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 14, color: "var(--sf-ink-faint)" }}>→</span>
      <span style={{
        fontFamily: "var(--sf-font-display)", fontSize: 22,
        color: "var(--sf-target)", letterSpacing: "-0.01em",
      }}>
        S*
      </span>
      <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
        <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9.5, color: "var(--sf-ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          work = controlled transition
        </div>
        <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9.5, color: "var(--sf-ink-faint)" }}>
          S₀ = current · T = transition · S* = target
        </div>
      </div>
    </div>
  );
}

// ── Embed 2: S₀ → T → S* diagram (state machine) ───────────────────────────

function StateDiagramEmbed() {
  return (
    <div style={{
      padding: "18px 20px",
      background: "var(--sf-panel-2)",
      borderRadius: "var(--sf-r-md)",
      border: "1px solid var(--sf-hair)",
    }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: 0, overflowX: "auto" }}>
        {/* S₀ node */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 72 }}>
          <div style={{
            width: 52, height: 52,
            borderRadius: "var(--sf-r-md)",
            border: "1.5px solid rgba(255,122,43,0.35)",
            background: "rgba(255,122,43,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "var(--sf-font-display)", fontSize: 18, color: "var(--sf-transition)" }}>S₀</span>
          </div>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, color: "var(--sf-ink-faint)", textAlign: "center" }}>current state</span>
        </div>

        {/* arrow + T */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: 14, gap: 3, flex: 1, minWidth: 80 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, width: "100%" }}>
            <div style={{ flex: 1, height: 1, background: "var(--sf-hair)" }} />
            <div style={{
              padding: "4px 10px",
              borderRadius: "999px",
              border: "1px solid rgba(111,184,201,0.3)",
              background: "rgba(111,184,201,0.08)",
              fontFamily: "var(--sf-font-mono)", fontSize: 11,
              color: "var(--sf-runtime)",
              flexShrink: 0,
            }}>
              T
            </div>
            <div style={{ flex: 1, height: 1, background: "var(--sf-hair)" }} />
            <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "6px solid var(--sf-hair)", flexShrink: 0 }} />
          </div>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, color: "var(--sf-ink-faint)" }}>transition</span>
        </div>

        {/* S* node */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 72 }}>
          <div style={{
            width: 52, height: 52,
            borderRadius: "var(--sf-r-md)",
            border: "1.5px solid rgba(125,255,158,0.35)",
            background: "rgba(125,255,158,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "var(--sf-font-display)", fontSize: 18, color: "var(--sf-target)" }}>S*</span>
          </div>
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, color: "var(--sf-ink-faint)", textAlign: "center" }}>target state</span>
        </div>
      </div>

      {/* monad + validator footnote */}
      <div style={{
        display: "flex", gap: 16, marginTop: 14,
        paddingTop: 12, borderTop: "1px solid var(--sf-hair)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sf-transition)", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9.5, color: "var(--sf-ink-faint)" }}>M · monad (context + tools + rights)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sf-target)", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9.5, color: "var(--sf-ink-faint)" }}>V · validator (proves S* reached)</span>
        </div>
      </div>
    </div>
  );
}

// ── Embed 3: Delta line Δ = S* − S₀ ─────────────────────────────────────────

function DeltaLineEmbed() {
  return (
    <div style={{
      padding: "18px 20px",
      background: "var(--sf-panel-2)",
      borderRadius: "var(--sf-r-md)",
      border: "1px solid var(--sf-hair)",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <span style={{
          fontFamily: "var(--sf-font-display)", fontSize: 20,
          color: "var(--sf-ink-dim)",
        }}>
          Δ
        </span>
        <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 14, color: "var(--sf-ink-faint)" }}>=</span>
        <span style={{
          fontFamily: "var(--sf-font-display)", fontSize: 20,
          color: "var(--sf-target)",
        }}>
          S*
        </span>
        <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 14, color: "var(--sf-ink-faint)" }}>−</span>
        <span style={{
          fontFamily: "var(--sf-font-display)", fontSize: 20,
          color: "var(--sf-transition)",
        }}>
          S₀
        </span>
        <span style={{
          marginLeft: 8,
          fontFamily: "var(--sf-font-mono)", fontSize: 10,
          color: "var(--sf-ink-faint)",
          letterSpacing: "0.06em",
        }}>
          the gap the transition must close
        </span>
      </div>

      {/* concrete example */}
      <div style={{
        marginTop: 12, display: "grid", gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center", gap: 8,
      }}>
        <div style={{
          background: "var(--sf-panel-3)", borderRadius: "var(--sf-r-sm)",
          padding: "8px 12px", border: "1px solid rgba(255,122,43,0.2)",
        }}>
          <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, color: "var(--sf-ink-faint)", marginBottom: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>S₀</div>
          <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-transition)" }}>bug reproduced</div>
        </div>
        <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink-faint)", textAlign: "center" }}>→</div>
        <div style={{
          background: "var(--sf-panel-3)", borderRadius: "var(--sf-r-sm)",
          padding: "8px 12px", border: "1px solid rgba(125,255,158,0.2)",
        }}>
          <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 9, color: "var(--sf-ink-faint)", marginBottom: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>S*</div>
          <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-target)" }}>tests passing</div>
        </div>
      </div>
    </div>
  );
}

// ── Window frame wrapper ──────────────────────────────────────────────────────

function DocsWinFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="sf-winframe">
      <div className="sf-winframe__bar">
        <div className="sf-winframe__dots">
          <i style={{ background: "rgba(255,100,100,0.5)" }} />
          <i style={{ background: "rgba(255,200,100,0.5)" }} />
          <i style={{ background: "rgba(100,200,100,0.5)" }} />
        </div>
        <div className="sf-winframe__title">README.md</div>
      </div>
      <div className="sf-winframe__body" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {children}
      </div>
    </div>
  );
}

// ── embed section ─────────────────────────────────────────────────────────────

function EmbedSection({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{
        fontFamily: "var(--sf-font-mono)", fontSize: 10,
        letterSpacing: "0.08em", textTransform: "uppercase",
        color: "var(--sf-ink-faint)",
      }}>
        {caption}
      </div>
      {children}
    </motion.div>
  );
}

// ── scene ────────────────────────────────────────────────────────────────────

export function DocsEmbedPack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <DocsWinFrame>
        <EmbedSection caption="hero formula">
          <HeroFormulaEmbed />
        </EmbedSection>

        <EmbedSection caption="state diagram  S₀ → T → S*">
          <StateDiagramEmbed />
        </EmbedSection>

        <EmbedSection caption="delta line  Δ = S* − S₀">
          <DeltaLineEmbed />
        </EmbedSection>
      </DocsWinFrame>
    </motion.div>
  );
}
