/**
 * ROX UI — useActiveSection
 * Returns the id of the section currently nearest the top of the viewport,
 * from a list of element ids. Used for magnetic/active nav highlighting.
 */

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[], rootMargin = "-45% 0px -50% 0px") {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          if (top) setActive(top.target.id);
        }
      },
      { rootMargin, threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, rootMargin]);

  return active;
}
