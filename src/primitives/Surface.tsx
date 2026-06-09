/**
 * ROX UI — Surface  (cva variant primitive)
 *
 * A consistent panel with tone / variant / density props instead of ad-hoc
 * styling. Maps to .sf-surface* classes.
 *
 *   <Surface variant="glass" tone="target" density="cozy">…</Surface>
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const surfaceVariants = cva("sf-surface", {
  variants: {
    variant: {
      solid: "",
      glass: "sf-surface--glass",
      ghost: "sf-surface--ghost",
    },
    tone: {
      neutral: "",
      target: "sf-surface--target",
      transition: "sf-surface--transition",
      runtime: "sf-surface--runtime",
    },
    density: {
      cozy: "sf-surface--cozy",
      compact: "sf-surface--compact",
    },
  },
  defaultVariants: { variant: "solid", tone: "neutral", density: "cozy" },
});

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {}

export function Surface({ variant, tone, density, className, ...rest }: SurfaceProps) {
  return <div className={cn(surfaceVariants({ variant, tone, density }), className)} {...rest} />;
}
