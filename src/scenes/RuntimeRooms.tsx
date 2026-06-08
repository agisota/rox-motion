"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp, staggerContainer } from "../tokens/motion-variants";

interface Room {
  id: string;
  label: string;
  icon: string;
}

const ROOMS: Room[] = [
  { id: "docs",     label: "docs",     icon: "📄" },
  { id: "browser",  label: "browser",  icon: "🌐" },
  { id: "repo",     label: "repo",     icon: "📦" },
  { id: "shell",    label: "shell",    icon: ">" },
  { id: "db",       label: "db",       icon: "◉" },
  { id: "calendar", label: "calendar", icon: "▦" },
];

export function RuntimeRooms() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [activeId, setActiveId] = useState<string>("repo");

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <motion.div
        variants={fadeUp}
        style={{
          fontFamily: "var(--sf-font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--sf-runtime)",
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sf-runtime)", display: "inline-block" }} />
        runtime · environment
      </motion.div>

      <motion.div variants={fadeUp} className="sf-g3">
        {ROOMS.map((room) => {
          const isActive = room.id === activeId;
          return (
            <motion.div
              key={room.id}
              onClick={() => setActiveId(room.id)}
              animate={{
                borderColor: isActive ? "var(--sf-runtime)" : "var(--sf-hair)",
                background: isActive ? "rgba(111,184,201,0.08)" : "var(--sf-panel-2)",
              }}
              transition={{ duration: 0.25 }}
              style={{
                border: "1px solid var(--sf-hair)",
                borderRadius: "var(--sf-r-md)",
                background: "var(--sf-panel-2)",
                padding: "14px 12px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--sf-font-mono)",
                  fontSize: 16,
                  color: isActive ? "var(--sf-runtime)" : "var(--sf-ink-faint)",
                  lineHeight: 1,
                }}
              >
                {room.icon}
              </span>
              <span
                style={{
                  fontFamily: "var(--sf-font-mono)",
                  fontSize: 11,
                  color: isActive ? "var(--sf-runtime)" : "var(--sf-ink-dim)",
                  letterSpacing: "0.04em",
                }}
              >
                {room.label}
              </span>
              {isActive && (
                <span
                  style={{
                    fontFamily: "var(--sf-font-mono)",
                    fontSize: 9,
                    color: "var(--sf-runtime)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  active
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
