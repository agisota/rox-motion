"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp, staggerContainer } from "../tokens/motion-variants";

interface EventChip {
  id: string;
  label: string;
  received: boolean;
}

const INITIAL_EVENTS: EventChip[] = [
  { id: "e1", label: "context.set",   received: false },
  { id: "e2", label: "monad.ready",   received: false },
  { id: "e3", label: "trigger.fired", received: false },
];

export function MinimalEventsGate() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const allReceived = events.every((e) => e.received);

  // sequentially receive events once in view
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const tick = () => {
      if (i >= INITIAL_EVENTS.length) return;
      const idx = i;
      setEvents((prev) =>
        prev.map((e, j) => (j === idx ? { ...e, received: true } : e))
      );
      i++;
      if (i < INITIAL_EVENTS.length) setTimeout(tick, 600);
    };
    const start = setTimeout(tick, 700);
    return () => clearTimeout(start);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="sf-box"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}
    >
      {/* event chips */}
      <motion.div
        variants={fadeUp}
        style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
      >
        {events.map((ev) => (
          <motion.span
            key={ev.id}
            className="sf-pill"
            animate={{
              borderColor: ev.received ? "rgba(255,122,43,0.5)" : "var(--sf-hair)",
              color: ev.received ? "var(--sf-transition)" : "var(--sf-ink-faint)",
            }}
            transition={{ duration: 0.35 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
          >
            <span
              className="sf-d"
              style={{
                background: ev.received ? "var(--sf-transition)" : "var(--sf-panel-3)",
                transition: "background 0.35s",
              }}
            />
            {ev.label}
          </motion.span>
        ))}
      </motion.div>

      {/* gate visual */}
      <motion.div variants={fadeUp} style={{ position: "relative", width: 120, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* left gate half */}
        <motion.div
          animate={{ x: allReceived ? -22 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 54,
            height: 60,
            borderRadius: "var(--sf-r-sm) 0 0 var(--sf-r-sm)",
            border: "1.5px solid",
            borderColor: allReceived ? "var(--sf-target)" : "var(--sf-transition)",
            background: allReceived ? "rgba(125,255,158,0.06)" : "rgba(255,122,43,0.06)",
            transition: "border-color 0.4s, background 0.4s",
          }}
        />
        {/* right gate half */}
        <motion.div
          animate={{ x: allReceived ? 22 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 54,
            height: 60,
            borderRadius: "0 var(--sf-r-sm) var(--sf-r-sm) 0",
            border: "1.5px solid",
            borderColor: allReceived ? "var(--sf-target)" : "var(--sf-transition)",
            background: allReceived ? "rgba(125,255,158,0.06)" : "rgba(255,122,43,0.06)",
            transition: "border-color 0.4s, background 0.4s",
          }}
        />
      </motion.div>

      {/* status label */}
      <motion.div
        variants={fadeUp}
        style={{
          fontFamily: "var(--sf-font-mono)",
          fontSize: 12,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: allReceived ? "var(--sf-target)" : "var(--sf-transition)",
          transition: "color 0.4s",
        }}
      >
        {allReceived ? "transition can fire" : "waiting for events"}
      </motion.div>
    </motion.div>
  );
}
