/** ROX UI — className combiner (clsx). Kept tiny so consumers don't need it. */
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
