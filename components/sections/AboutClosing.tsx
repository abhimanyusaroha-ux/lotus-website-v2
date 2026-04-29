"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PillButton } from "../PillButton";

gsap.registerPlugin(ScrollTrigger);

export function AboutClosing() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { opacity: 0, y: 12 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      aria-label="Closing statement"
      className="py-24 max-[640px]:py-16 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <div ref={innerRef} className="flex flex-col items-center">
        <p className="body-lg font-sans italic text-ink text-center max-w-[560px]">
          Lotus is built on a thesis we&apos;re willing to hold for a decade.
          Our partners hold it with us.
        </p>
        <div className="mt-8">
          <PillButton href="/investors">Become a partner →</PillButton>
        </div>
      </div>
    </section>
  );
}
