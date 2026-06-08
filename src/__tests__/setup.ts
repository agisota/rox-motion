/** jsdom doesn't implement IntersectionObserver — Framer Motion's useInView
 *  needs it. A no-op stub is enough for mount/smoke tests. */
if (typeof window !== "undefined" && typeof (window as unknown as { IntersectionObserver?: unknown }).IntersectionObserver === "undefined") {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  }
  (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IO;
  (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IO;
}

/** jsdom doesn't implement matchMedia — provide a minimal stub so the
 *  reduced-motion checks have something to call. */
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}
