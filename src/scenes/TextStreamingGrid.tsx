"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { staggerContainer, fadeUp } from "../tokens/motion-variants";
import { useLoopsAllowed } from "../providers/MotionProvider";

const SAMPLE = "The transition reaches the verified target state.";
const WORDS = SAMPLE.split(" ");

// ── helpers ────────────────────────────────────────────────────────────────

function useLoopClock(intervalMs: number, active: boolean): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [active, intervalMs]);
  return tick;
}

// ── card: typewriter ────────────────────────────────────────────────────────

function TypewriterCard({ active }: { active: boolean }) {
  const [charCount, setCharCount] = useState(active ? 0 : SAMPLE.length);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setCharCount(SAMPLE.length);
      return;
    }
    setCharCount(0);
    let i = 0;
    function step() {
      i += 1;
      setCharCount(i);
      if (i < SAMPLE.length) {
        timerRef.current = setTimeout(step, 40);
      } else {
        timerRef.current = setTimeout(() => {
          setCharCount(0);
        }, 1200);
      }
    }
    timerRef.current = setTimeout(step, 40);
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [active]);

  return (
    <StreamCard label="typewriter">
      <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 12, color: "var(--sf-ink)", lineHeight: 1.6 }}>
        {SAMPLE.slice(0, charCount)}
        {charCount < SAMPLE.length && (
          <motion.span
            style={{ display: "inline-block", width: 2, height: 13, background: "var(--sf-transition)", verticalAlign: "middle", marginLeft: 1 }}
            animate={active ? { opacity: [1, 0, 1] } : { opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </span>
    </StreamCard>
  );
}

// ── card: word-by-word fade ─────────────────────────────────────────────────

function WordFadeCard({ active }: { active: boolean }) {
  const tick = useLoopClock(3400, active);
  const wordCount = active ? (tick % (WORDS.length + 2)) : WORDS.length;
  const visible = Math.min(wordCount, WORDS.length);

  return (
    <StreamCard label="word fade">
      <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, lineHeight: 1.7, color: "var(--sf-ink)" }}>
        {WORDS.map((w, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", marginRight: 4 }}
            animate={{ opacity: i < visible ? 1 : 0, filter: i < visible ? "blur(0px)" : "blur(4px)" }}
            transition={{ duration: 0.3, delay: 0 }}
          >
            {w}
          </motion.span>
        ))}
      </span>
    </StreamCard>
  );
}

// ── card: blur-in ───────────────────────────────────────────────────────────

function BlurInCard({ active }: { active: boolean }) {
  const tick = useLoopClock(2800, active);
  const phase = active ? tick % 2 : 1;
  return (
    <StreamCard label="blur-in">
      <motion.span
        style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink)", lineHeight: 1.6, display: "block" }}
        animate={{ opacity: phase === 1 ? 1 : 0.1, filter: phase === 1 ? "blur(0px)" : "blur(6px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {SAMPLE}
      </motion.span>
    </StreamCard>
  );
}

// ── card: line-by-line ──────────────────────────────────────────────────────

const LINES = ["The transition", "reaches the", "verified target state."];

function LineByLineCard({ active }: { active: boolean }) {
  const tick = useLoopClock(900, active);
  const lineCount = active ? (tick % (LINES.length + 2)) : LINES.length;
  const visible = Math.min(lineCount, LINES.length);

  return (
    <StreamCard label="line-by-line">
      <div style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, lineHeight: 1.8, color: "var(--sf-ink)" }}>
        {LINES.map((line, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i < visible ? 1 : 0, y: i < visible ? 0 : 6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </StreamCard>
  );
}

// ── card: cursor blink ──────────────────────────────────────────────────────

function CursorBlinkCard({ active }: { active: boolean }) {
  return (
    <StreamCard label="cursor blink">
      <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, color: "var(--sf-ink)", lineHeight: 1.6 }}>
        {SAMPLE}
        <motion.span
          style={{ display: "inline-block", width: 7, height: 13, background: "var(--sf-runtime)", verticalAlign: "middle", marginLeft: 2, borderRadius: 1 }}
          animate={active ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
          transition={{ duration: 1.1, times: [0, 0.45, 0.5, 0.95], repeat: Infinity }}
        />
      </span>
    </StreamCard>
  );
}

// ── card: token shimmer ─────────────────────────────────────────────────────

function TokenShimmerCard({ active }: { active: boolean }) {
  const tick = useLoopClock(280, active);
  const highlighted = active ? tick % WORDS.length : -1;
  return (
    <StreamCard label="token shimmer">
      <span style={{ fontFamily: "var(--sf-font-mono)", fontSize: 11, lineHeight: 1.7 }}>
        {WORDS.map((w, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", marginRight: 4 }}
            animate={{
              color: i === highlighted ? "var(--sf-transition)" : "var(--sf-ink)",
              opacity: i === highlighted ? 1 : 0.75,
            }}
            transition={{ duration: 0.18 }}
          >
            {w}
          </motion.span>
        ))}
      </span>
    </StreamCard>
  );
}

// ── wrapper card ────────────────────────────────────────────────────────────

function StreamCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="sf-box"
      variants={fadeUp}
      style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 88 }}
    >
      <div className="sf-mono-k">{label}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </motion.div>
  );
}

// ── scene ───────────────────────────────────────────────────────────────────

export function TextStreamingGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const loops = useLoopsAllowed();
  const active = loops && isInView;

  return (
    <motion.div
      ref={ref}
      className="sf-g3"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <TypewriterCard active={active} />
      <WordFadeCard active={active} />
      <BlurInCard active={active} />
      <LineByLineCard active={active} />
      <CursorBlinkCard active={active} />
      <TokenShimmerCard active={active} />
    </motion.div>
  );
}
