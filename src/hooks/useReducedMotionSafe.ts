/**
 * STATE-FIRST KIT — motion-level hooks
 *
 * Thin re-export. The single source of truth lives in MotionProvider so the
 * level is shared across every component (toggling in the nav updates all of
 * them). Keep importing from here for stable paths.
 */

export {
  useMotionLevel,
  useLoopsAllowed,
  useAnyMotion,
} from "../providers/MotionProvider";
export type { MotionLevel } from "../providers/MotionProvider";
