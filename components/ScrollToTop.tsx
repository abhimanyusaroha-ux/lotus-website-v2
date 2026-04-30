"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

type LenisLike = {
  scrollTo: (target: number, opts?: { immediate?: boolean; force?: boolean; lock?: boolean }) => void;
  stop?: () => void;
  start?: () => void;
};

export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reset = () => {
      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
      if (lenis) {
        lenis.stop?.();
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.start?.();
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    reset();
    // Run again next frame in case the new page's layout/animations push scroll.
    const r1 = requestAnimationFrame(reset);
    const r2 = requestAnimationFrame(() => requestAnimationFrame(reset));

    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [pathname]);

  return null;
}
