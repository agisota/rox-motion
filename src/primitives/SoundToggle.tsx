/**
 * ROX UI — SoundToggle
 * Small opt-in toggle for state sounds. Plays a confirming chime when enabled.
 */

"use client";

import { useStateSound } from "../hooks/useStateSound";

export function SoundToggle({ className }: { className?: string }) {
  const { enabled, setEnabled, play } = useStateSound();
  return (
    <button
      type="button"
      className={`sf-segmented ${className ?? ""}`}
      aria-pressed={enabled}
      aria-label="state sounds"
      onClick={() => {
        const next = !enabled;
        setEnabled(next);
        if (next) play("validated");
      }}
      style={{ padding: "6px 10px", cursor: "pointer", color: enabled ? "var(--sf-target)" : "var(--sf-ink-faint)" }}
    >
      {enabled ? "♪ sound" : "♪ muted"}
    </button>
  );
}
