/**
 * STATE-FIRST KIT — Font Theme Provider
 *
 * Wraps any subtree. Sets data-sf-font on <html> and persists to localStorage.
 * Children can call useFontTheme() to read/change the theme.
 *
 * Usage:
 *   <FontThemeProvider>
 *     <App />
 *   </FontThemeProvider>
 *
 * Font loading (add to your app's global CSS or layout):
 *   @import '@fontsource/victor-mono/400.css';
 *   @import '@fontsource/victor-mono/600.css';
 *   @import '@fontsource/bebas-neue/400.css';
 *   @import '@fontsource/lekton/400.css';
 *   @import '@fontsource/lekton/700.css';
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
import type { SfFontTheme } from "../tokens/tokens";

export type { SfFontTheme };

const STORAGE_KEY = "sf-font";

interface FontThemeContextValue {
  theme: SfFontTheme;
  setTheme: (t: SfFontTheme) => void;
}

const FontThemeContext = createContext<FontThemeContextValue>({
  theme: "victor",
  setTheme: () => undefined,
});

export function FontThemeProvider({
  children,
  defaultTheme = "victor",
}: {
  children: React.ReactNode;
  defaultTheme?: SfFontTheme;
}) {
  const [theme, setThemeState] = useState<SfFontTheme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(STORAGE_KEY) as SfFontTheme) ?? defaultTheme;
  });

  const setTheme = useCallback((t: SfFontTheme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    document.documentElement.setAttribute("data-sf-font", t);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-sf-font", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <FontThemeContext.Provider value={value}>
      {children}
    </FontThemeContext.Provider>
  );
}

export function useFontTheme() {
  return useContext(FontThemeContext);
}
