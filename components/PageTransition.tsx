"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          // Strip the transform so descendants with position:fixed are once
          // again contained by the viewport, not this wrapper.
          gsap.set(el, { clearProps: "transform" });
        },
      }
    );
  }, [pathname]);

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
