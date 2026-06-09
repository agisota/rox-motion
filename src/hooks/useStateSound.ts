/**
 * ROX UI — useStateSound  (#16, opt-in, OFF by default)
 *
 * Tiny WebAudio ticks for state events. Disabled unless the user explicitly
 * enables it (localStorage `sf-sound` === "on"), and silenced under
 * prefers-reduced-motion. No audio file assets; synthesized blips.
 *
 *   const sound = useStateSound();
 *   sound.play("validated");   // green chime
 *   sound.play("transition");  // orange blip
 *   const { enabled, setEnabled } = sound;
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type StateSound = "transition" | "event" | "validated" | "blocked";

const STORAGE_KEY = "sf-sound";

// semantic frequencies (Hz): orange energy mid, green resolves higher/cleaner
const TONE: Record<StateSound, { freq: number; dur: number; type: OscillatorType }> = {
  transition: { freq: 330, dur: 0.06, type: "triangle" },
  event: { freq: 440, dur: 0.04, type: "sine" },
  validated: { freq: 660, dur: 0.12, type: "sine" },
  blocked: { freq: 180, dur: 0.1, type: "sawtooth" },
};

function reduced() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useStateSound() {
  const [enabled, setEnabledState] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "on";
  });
  const ctxRef = useRef<AudioContext | null>(null);

  const setEnabled = useCallback((on: boolean) => {
    setEnabledState(on);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  }, []);

  const play = useCallback(
    (sound: StateSound) => {
      if (!enabled || reduced()) return;
      const AC =
        typeof window !== "undefined"
          ? window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
          : undefined;
      if (!AC) return; // no WebAudio (e.g. jsdom)
      try {
        const ctx = ctxRef.current ?? (ctxRef.current = new AC());
        const { freq, dur, type } = TONE[sound];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur + 0.02);
      } catch {
        /* autoplay policy / unsupported — ignore */
      }
    },
    [enabled]
  );

  useEffect(() => () => { ctxRef.current?.close?.(); }, []);

  return { play, enabled, setEnabled } as const;
}
