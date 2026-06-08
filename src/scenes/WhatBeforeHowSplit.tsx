/**
 * STATE-FIRST KIT — WhatBeforeHowSplit  (scene #02 — signature interaction)
 *
 * Left: how-first tool cloud (grey hatch, jittering chips).
 * Right: state-first rail. The focus toggle morphs `task?` → `S*` with
 * a shared layoutId so it physically travels, not crossfades.
 */

"use client";

import React, { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useLoopsAllowed } from "../providers/MotionProvider";

type Focus = "how" | "what";

const TOOLS = [
  { label: "terminal", style: { left: "4%", top: "10%" } },
  { label: "browser", style: { right: "6%", top: "4%" } },
  { label: "editor", style: { left: "12%", bottom: "14%" } },
  { label: "search", style: { right: "10%", bottom: "8%" } },
  { label: "shell", style: { left: "38%", top: "2%" } },
  { label: "git", style: { right: "30%", bottom: "2%" } },
  { label: "memory", style: { left: "2%", top: "46%" } },
  { label: "db", style: { right: "2%", top: "50%" } },
];

const RAIL = [
  { k: "S₀", label: "current state", star: false },
  { k: "T₁", label: "derive Δ", star: false },
  { k: "T₂", label: "execute in runtime", star: false },
  { k: "S*", label: "verified artifact", star: true },
];

export function WhatBeforeHowSplit() {
  const [focus, setFocus] = useState<Focus>("what");
  const loops = useLoopsAllowed();

  return (
    <LayoutGroup>
      <div className="sf-toggle" role="group" aria-label="focus">
        {(["how", "what"] as Focus[]).map((side) => (
          <button
            key={side}
            type="button"
            data-side={side}
            aria-pressed={focus === side}
            onClick={() => setFocus(side)}
          >
            focus · {side}
          </button>
        ))}
      </div>

      <div className="sf-wbh">
        {/* how-first */}
        <motion.div
          className="sf-wbh__panel sf-wbh__panel--how"
          animate={{ opacity: focus === "how" ? 1 : 0.32, filter: focus === "how" ? "saturate(1)" : "saturate(0.4)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sf-wbh__tag">harness-first · how</div>
          <div className="sf-wbh__name">a cloud of tools</div>
          <p className="sf-wbh__desc">
            orbiting capabilities, rework loops, an ambiguous request at the center. effort without a destination.
          </p>
          <div className="sf-cloud" aria-hidden="true">
            {TOOLS.map((t, i) => (
              <motion.span
                key={t.label}
                className="sf-chip"
                style={t.style}
                animate={loops && focus === "how" ? { x: [0, 2, -2, 3, -1, 0], y: [0, -3, 2, 1, -2, 0] } : {}}
                transition={{ duration: 3.4 + i * 0.2, ease: "easeInOut", repeat: Infinity }}
              >
                {t.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* state-first */}
        <motion.div
          className="sf-wbh__panel sf-wbh__panel--what"
          animate={{ opacity: focus === "what" ? 1 : 0.32, filter: focus === "what" ? "saturate(1)" : "saturate(0.4)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sf-wbh__tag">state-first · what</div>
          <div className="sf-wbh__name">a derived transition</div>
          <p className="sf-wbh__desc">
            the ambiguous task resolves into a target state. tools become subordinate to the path.
          </p>

          {/* the signature morph */}
          <div className="sf-morph">
            <AnimatePresence mode="popLayout">
              {focus === "how" ? (
                <motion.div
                  key="task"
                  layoutId="sf-task-star"
                  className="sf-morph__token sf-morph__task"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, filter: "blur(1.4px)" }}
                  exit={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
                  transition={{ type: "spring", stiffness: 240, damping: 26 }}
                >
                  task?
                </motion.div>
              ) : (
                <motion.div
                  key="star"
                  layoutId="sf-task-star"
                  className="sf-morph__token sf-morph__star"
                  initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                >
                  S*
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="sf-crail">
            {RAIL.map((step, i) => (
              <React.Fragment key={step.k}>
                <div className={`sf-crail__step ${step.star ? "sf-crail__step--star" : ""}`}>
                  <span className="sf-crail__dot" />
                  <span className="sf-crail__k">{step.k}</span> {step.label}
                </div>
                {i < RAIL.length - 1 && <div className="sf-crail__line" />}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </LayoutGroup>
  );
}
