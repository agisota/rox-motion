/**
 * STATE-FIRST KIT — TypeScript design tokens
 *
 * Use these in Framer Motion variants, inline styles, and Tailwind config.
 * Always read from CSS variables at runtime — these are the source values only.
 */

export const sfColors = {
  bg:         "#0A0D0E",
  panel:      "#121819",
  panel2:     "#161D1F",
  panel3:     "#1B2426",
  hair:       "#243032",
  hairSoft:   "#1A2325",

  ink:        "#D7E2E0",
  inkDim:     "#8B9B98",
  inkFaint:   "#54625F",

  /** S* · verified · WHAT layer — NEVER pulses, always calm */
  target:     "#7DFF9E",
  /** Active transition · event energy — MAY pulse/animate */
  transition: "#FF7A2B",
  /** Runtime · environment · structure */
  runtime:    "#6FB8C9",
  /** How-first · rework · ambiguity — always grey, never bright */
  friction:   "#5D6A68",
  /** Missing monad · validator fail */
  warning:    "#FFB15E",
} as const;

export const sfGlows = {
  target:     "rgba(125, 255, 158, 0.16)",
  transition: "rgba(255, 122, 43, 0.18)",
  runtime:    "rgba(111, 184, 201, 0.14)",
} as const;

export const sfRadius = {
  sm: "6px",
  md: "10px",
  lg: "16px",
  xl: "22px",
} as const;

export const sfEase = [0.22, 1, 0.36, 1] as const;

/**
 * The global MotionConfig transition — use this as the default for ALL
 * Framer Motion animations in this kit.
 */
export const sfSpring = {
  type: "spring",
  stiffness: 280,
  damping: 30,
  mass: 0.9,
} as const;

export type SfColorKey = keyof typeof sfColors;
export type SfFontTheme = "victor" | "bebas" | "lekton";

/** Semantic meaning of each color — enforce at code-review time */
export const sfColorMeaning: Record<SfColorKey, string> = {
  bg:         "page background",
  panel:      "elevated surface level 1",
  panel2:     "elevated surface level 2",
  panel3:     "elevated surface level 3",
  hair:       "hairline borders and dividers",
  hairSoft:   "very subtle background lines",
  ink:        "primary text",
  inkDim:     "secondary/muted text",
  inkFaint:   "tertiary/disabled text",
  target:     "S* — verified state — WHAT layer (never pulses)",
  transition: "active transition — event energy (may pulse)",
  runtime:    "runtime / environment / structure",
  friction:   "how-first / rework / ambiguity (never bright)",
  warning:    "missing monad / validator failure",
};
