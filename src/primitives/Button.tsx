/**
 * ROX UI — Button  (cva variant primitive)
 *
 * Consistent button with variant / tone / size. Maps to .sf-btn* classes.
 *
 *   <Button variant="primary" tone="target">run</Button>
 *   <Button variant="ghost" tone="transition" size="sm">cancel</Button>
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const buttonVariants = cva("sf-btn", {
  variants: {
    variant: {
      primary: "sf-btn--primary",
      ghost: "sf-btn--ghost",
      glass: "sf-btn--glass",
    },
    tone: {
      neutral: "sf-btn--neutral",
      target: "sf-btn--target",
      transition: "sf-btn--transition",
      runtime: "sf-btn--runtime",
    },
    size: {
      sm: "sf-btn--sm",
      md: "sf-btn--md",
      lg: "sf-btn--lg",
    },
  },
  defaultVariants: { variant: "primary", tone: "target", size: "md" },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, tone, size, className, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, tone, size }), className)} {...rest} />
  );
}
