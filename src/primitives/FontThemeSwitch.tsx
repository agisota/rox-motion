/**
 * STATE-FIRST KIT — FontThemeSwitch
 *
 * Pill-shaped segmented control that switches font themes live, with a
 * layoutId pill that slides between options. Requires <FontThemeProvider>.
 *
 * Usage:
 *   <FontThemeSwitch />
 *   <FontThemeSwitch labels={{ victor: "mono", bebas: "poster", lekton: "docs" }} />
 */

"use client";

import { LayoutGroup, motion } from "motion/react";
import { useFontTheme, type SfFontTheme } from "../providers/FontThemeProvider";

const DEFAULT_LABELS: Record<SfFontTheme, string> = {
  victor: "blueprint",
  bebas: "brutalist",
  lekton: "docs",
};

interface FontThemeSwitchProps {
  labels?: Partial<Record<SfFontTheme, string>>;
  className?: string;
}

export function FontThemeSwitch({ labels = {}, className }: FontThemeSwitchProps) {
  const { theme, setTheme } = useFontTheme();
  const resolved = { ...DEFAULT_LABELS, ...labels };
  const themes: SfFontTheme[] = ["victor", "bebas", "lekton"];

  return (
    <LayoutGroup>
      <div role="group" aria-label="font theme" className={`sf-segmented ${className ?? ""}`}>
        {themes.map((t) => (
          <button key={t} type="button" aria-pressed={theme === t} onClick={() => setTheme(t)}>
            {theme === t && (
              <motion.span
                layoutId="sf-font-pill"
                aria-hidden
                style={{ position: "absolute", inset: 0, background: "var(--sf-panel-3)", borderRadius: 999, zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {resolved[t]}
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}
