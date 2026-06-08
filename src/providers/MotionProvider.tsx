/**
 * STATE-FIRST KIT — MotionProvider
 *
 * Single source of truth for the page-wide motion level.
 * Wraps the tree in Framer Motion's <MotionConfig reducedMotion="user"> so
 * prefers-reduced-motion is honored automatically, AND exposes a manual
 * Full / Essential / Off override that every component reads from one place.
 *
 *   full      — all animation, including ambient loops (orbits, jitter, streams)
 *   essential — enter/exit + state transitions only; no ambient loops
 *   off       — nothing animates; all content rests visible
 *
 * Usage (once, at the app root):
 *   <MotionProvider>
 *     <App />
 *   </MotionProvider>
 *
 * Then anywhere:
 *   const { level, setLevel } = useMotionLevel();
 *   const loops = useLoopsAllowed();
 */

"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MotionConfig } from "motion/react";
import { sfSpring } from "../tokens/tokens";

export type MotionLevel = "full" | "essential" | "off";

const STORAGE_KEY = "sf-motion";

interface MotionContextValue {
  level: MotionLevel;
  setLevel: (l: MotionLevel) => void;
}

const MotionContext = createContext<MotionContextValue>({
  level: "full",
  setLevel: () => undefined,
});

function prefersReduced(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getInitial(defaultLevel: MotionLevel): MotionLevel {
  if (typeof window === "undefined") return defaultLevel;
  const stored = localStorage.getItem(STORAGE_KEY) as MotionLevel | null;
  if (stored) return stored;
  return prefersReduced() ? "off" : defaultLevel;
}

export function MotionProvider({
  children,
  defaultLevel = "full",
}: {
  children: React.ReactNode;
  defaultLevel?: MotionLevel;
}) {
  const [level, setLevelState] = useState<MotionLevel>(() => getInitial(defaultLevel));

  const setLevel = useCallback((l: MotionLevel) => {
    setLevelState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  }, []);

  // reflect the level on <body> so non-React CSS can react too
  useEffect(() => {
    const b = document.body;
    b.classList.remove("sf-motion-full", "sf-motion-essential", "sf-motion-off");
    b.classList.add(`sf-motion-${level}`);
  }, [level]);

  // follow system preference unless the user has explicitly chosen
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => {
      if (!localStorage.getItem(STORAGE_KEY)) setLevelState(mq.matches ? "off" : defaultLevel);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [defaultLevel]);

  const value = useMemo(() => ({ level, setLevel }), [level, setLevel]);

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig transition={sfSpring} reducedMotion={level === "off" ? "always" : "user"}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotionLevel() {
  return useContext(MotionContext);
}

/** True if ambient loops (orbits, jitter, streaming) should run. */
export function useLoopsAllowed() {
  return useContext(MotionContext).level === "full";
}

/** True if any motion at all is allowed. */
export function useAnyMotion() {
  return useContext(MotionContext).level !== "off";
}
