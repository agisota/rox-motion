"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useMotionTemplate } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

// ── Swatch 1: Gradient Mesh (drifting gradient) ────────────────────────────

function GradientMeshSwatch({ loops }: { loops: boolean }) {
  return (
    <motion.div
      className="sf-box"
      variants={fadeUp}
      style={{ position: "relative", minHeight: 160, overflow: "hidden", padding: 0, cursor: "default" }}
    >
      <motion.div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 30% 40%, rgba(255,122,43,0.13) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(111,184,201,0.10) 0%, transparent 55%), linear-gradient(135deg, var(--sf-panel) 0%, var(--sf-panel-2) 100%)",
        }}
        animate={loops ? {
          backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "0% 0%"],
        } : {}}
        transition={loops ? { duration: 14, ease: "linear", repeat: Infinity } : { duration: 0 }}
      />
      <motion.div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 65% 30%, rgba(125,255,158,0.07) 0%, transparent 50%)",
        }}
        animate={loops ? { opacity: [0.5, 1, 0.5], x: [0, 10, 0] } : { opacity: 0.7 }}
        transition={loops ? { duration: 8, ease: "easeInOut", repeat: Infinity } : { duration: 0 }}
      />
      <div style={{ position: "relative", padding: "14px 16px" }}>
        <div className="sf-mono-k">gradient mesh</div>
        <div style={{ marginTop: 6, fontSize: 10, color: "var(--sf-ink-faint)", fontFamily: "var(--sf-font-mono)" }}>ambient state field</div>
      </div>
    </motion.div>
  );
}

// ── Swatch 2: Grid Field (dot grid + glow) ─────────────────────────────────

function GridFieldSwatch({ loops }: { loops: boolean }) {
  return (
    <motion.div
      className="sf-box"
      variants={fadeUp}
      style={{ position: "relative", minHeight: 160, overflow: "hidden", padding: 0 }}
    >
      {/* dot grid via SVG pattern */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="sfgrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="var(--sf-hair)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sfgrid)" />
      </svg>
      {/* animated pulse node */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute", left: "50%", top: "50%",
          width: 60, height: 60, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,122,43,0.18) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
        animate={loops ? { scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.8 }}
        transition={loops ? { duration: 3.2, ease: "easeInOut", repeat: Infinity } : { duration: 0 }}
      />
      <div style={{ position: "relative", padding: "14px 16px" }}>
        <div className="sf-mono-k">grid field</div>
        <div style={{ marginTop: 6, fontSize: 10, color: "var(--sf-ink-faint)", fontFamily: "var(--sf-font-mono)" }}>transition node pulse</div>
      </div>
    </motion.div>
  );
}

// ── Swatch 3: Particle Drift ───────────────────────────────────────────────

const PARTICLES = [
  { x: "15%", y: "25%", r: 1.5, delay: 0,    dur: 7 },
  { x: "40%", y: "60%", r: 1,   delay: 1.2,  dur: 9 },
  { x: "70%", y: "30%", r: 2,   delay: 0.6,  dur: 6 },
  { x: "55%", y: "75%", r: 1.2, delay: 2,    dur: 8 },
  { x: "85%", y: "50%", r: 1.8, delay: 0.3,  dur: 11 },
  { x: "25%", y: "80%", r: 1,   delay: 1.7,  dur: 7.5 },
  { x: "60%", y: "15%", r: 1.5, delay: 0.9,  dur: 10 },
  { x: "90%", y: "20%", r: 1,   delay: 2.4,  dur: 8.5 },
];

function ParticleDriftSwatch({ loops }: { loops: boolean }) {
  return (
    <motion.div
      className="sf-box"
      variants={fadeUp}
      style={{ position: "relative", minHeight: 160, overflow: "hidden", padding: 0 }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, var(--sf-panel) 0%, var(--sf-panel-2) 100%)",
        }}
      />
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            left: p.x, top: p.y,
            width: p.r * 2, height: p.r * 2,
            borderRadius: "50%",
            background: i % 3 === 0 ? "var(--sf-runtime)" : i % 3 === 1 ? "var(--sf-transition)" : "var(--sf-ink-faint)",
            opacity: 0.6,
          }}
          animate={loops ? {
            y: [0, -12, 4, -8, 0],
            x: [0, 5, -3, 7, 0],
            opacity: [0.3, 0.8, 0.4, 0.9, 0.3],
          } : { opacity: 0.6 }}
          transition={loops ? {
            duration: p.dur,
            delay: p.delay,
            ease: "easeInOut",
            repeat: Infinity,
          } : { duration: 0 }}
        />
      ))}
      <div style={{ position: "relative", padding: "14px 16px" }}>
        <div className="sf-mono-k">particle drift</div>
        <div style={{ marginTop: 6, fontSize: 10, color: "var(--sf-ink-faint)", fontFamily: "var(--sf-font-mono)" }}>runtime event scatter</div>
      </div>
    </motion.div>
  );
}

// ── Swatch 4: Pointer Glow (interactive) ──────────────────────────────────

function PointerGlowSwatch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const background = useMotionTemplate`radial-gradient(120px circle at ${mouseX}% ${mouseY}%, rgba(125,255,158,0.12) 0%, transparent 70%), linear-gradient(135deg, var(--sf-panel) 0%, var(--sf-panel-2) 100%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function handleMouseLeave() {
    mouseX.set(50);
    mouseY.set(50);
  }

  return (
    <motion.div
      ref={containerRef}
      className="sf-box"
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", minHeight: 160, overflow: "hidden", padding: 0, cursor: "crosshair" }}
    >
      <motion.div
        aria-hidden
        style={{ position: "absolute", inset: 0, background }}
      />
      <div style={{ position: "relative", padding: "14px 16px" }}>
        <div className="sf-mono-k">pointer glow</div>
        <div style={{ marginTop: 6, fontSize: 10, color: "var(--sf-ink-faint)", fontFamily: "var(--sf-font-mono)" }}>S* proximity field · hover me</div>
      </div>
    </motion.div>
  );
}

// ── scene ───────────────────────────────────────────────────────────────────

export function ShaderWallpapers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();

  return (
    <motion.div
      ref={ref}
      className="sf-g4"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <GradientMeshSwatch loops={loops && isInView} />
      <GridFieldSwatch loops={loops && isInView} />
      <ParticleDriftSwatch loops={loops && isInView} />
      <PointerGlowSwatch />
    </motion.div>
  );
}
