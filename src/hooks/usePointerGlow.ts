/**
 * STATE-FIRST KIT — usePointerGlow
 *
 * Tracks pointer position relative to an element and returns
 * a MotionValue pair for use with useMotionTemplate.
 *
 * Usage:
 *   const { ref, glowStyle } = usePointerGlow({ color: sfColors.target });
 *   <motion.div ref={ref} style={glowStyle} />
 */

import { useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useRef, useCallback } from "react";
import type { RefObject } from "react";

interface UsePointerGlowOptions {
  color?: string;
  radius?: number;
}

export function usePointerGlow({
  color = "rgba(125, 255, 158, 0.16)",
  radius = 260,
}: UsePointerGlowOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${springX}px ${springY}px, ${color}, transparent 80%)`;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  }, [mouseX, mouseY]);

  return {
    ref: ref as RefObject<HTMLElement>,
    onMouseMove,
    onMouseLeave,
    glowStyle: { background },
  } as const;
}
