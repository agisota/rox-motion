/**
 * ROX UI — ColorThemeProvider
 *
 * Switches the color theme by setting `data-sf-theme` on <html>:
 *   "dark"  (default, the :root palette)
 *   "light"
 *   "hc"    (high contrast)
 * Persists to localStorage. Recolors everything because all surfaces read
 * the `--sf-*` palette variables.
 *
 *   <ColorThemeProvider><App /></ColorThemeProvider>
 *   const { theme, setTheme } = useColorTheme();
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

export type SfColorTheme = "dark" | "light" | "hc";

const STORAGE_KEY = "sf-theme";

interface ColorThemeContextValue {
  theme: SfColorTheme;
  setTheme: (t: SfColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextValue>({
  theme: "dark",
  setTheme: () => undefined,
});

export function ColorThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode;
  defaultTheme?: SfColorTheme;
}) {
  const [theme, setThemeState] = useState<SfColorTheme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(STORAGE_KEY) as SfColorTheme) ?? defaultTheme;
  });

  const setTheme = useCallback((t: SfColorTheme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    document.documentElement.setAttribute("data-sf-theme", t);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-sf-theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ColorThemeContext.Provider value={value}>{children}</ColorThemeContext.Provider>;
}

export function useColorTheme() {
  return useContext(ColorThemeContext);
}
