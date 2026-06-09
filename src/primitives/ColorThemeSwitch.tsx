/**
 * ROX UI — ColorThemeSwitch
 * Pill control for dark / light / high-contrast. Requires <ColorThemeProvider>.
 */

"use client";

import { LayoutGroup, motion } from "motion/react";
import { useColorTheme, type SfColorTheme } from "../providers/ColorThemeProvider";

const LABELS: Record<SfColorTheme, string> = { dark: "dark", light: "light", hc: "a11y" };
const THEMES: SfColorTheme[] = ["dark", "light", "hc"];

export function ColorThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useColorTheme();
  return (
    <LayoutGroup>
      <div role="group" aria-label="color theme" className={`sf-segmented ${className ?? ""}`}>
        {THEMES.map((t) => (
          <button key={t} type="button" aria-pressed={theme === t} onClick={() => setTheme(t)}>
            {theme === t && (
              <motion.span
                layoutId="sf-theme-pill"
                aria-hidden
                style={{ position: "absolute", inset: 0, background: "var(--sf-panel-3)", borderRadius: 999, zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {LABELS[t]}
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}
