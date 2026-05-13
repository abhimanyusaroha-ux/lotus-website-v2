"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SectionMarker } from "../SectionMarker";
import LineReveal from "../LineReveal";

export function AboutHero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      [eyebrowRef, imgRef, imgInnerRef].forEach((r) => {
        if (r.current) gsap.set(r.current, { clearProps: "all" });
      });
      return;
    }

    const tl = gsap.timeline();

    if (eyebrowRef.current) {
      tl.to(
        eyebrowRef.current,
        { opacity: 1, duration: 0.5, ease: "power3.out" },
        0.4
      );
    }
    if (imgRef.current) {
      tl.to(
        imgRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
        },
        0.2
      );
    }
    if (imgInnerRef.current) {
      tl.to(
        imgInnerRef.current,
        { scale: 1, duration: 1.6, ease: "power3.out" },
        0.2
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      aria-label="About hero"
      className="relative min-h-screen pt-[72px] flex flex-col"
    >
      <div className="flex-1 flex items-center">
        <div
          className="grid grid-cols-12 gap-x-8 w-full max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6 max-[1024px]:grid-cols-1 max-[1024px]:gap-y-10 max-[1024px]:py-16 min-[1025px]:items-stretch"
          style={{}}
        >
          {/* Left column — eyebrow + heading, top-aligned with image */}
          <div className="col-span-3 max-[1024px]:col-span-1 max-[1024px]:order-2 flex flex-col justify-start min-[1025px]:h-[75vh]">
            <div ref={eyebrowRef} style={{ opacity: 0 }}>
              <SectionMarker label="About" />
            </div>
            <LineReveal
              as="h1"
              className="display-md font-sans text-ink mt-2"
              trigger="mount"
              delay={0.6}
              stagger={0.1}
              duration={1.1}
            >
              The story of how Lotus came together.
            </LineReveal>
          </div>

          {/* Center column — image, fills 75vh height, centered cols 5-8 */}
          <div className="col-start-5 col-span-4 max-[1024px]:col-start-1 max-[1024px]:col-span-1 max-[1024px]:order-1 flex items-center justify-center">
            <div
              ref={imgRef}
              className="relative w-full overflow-hidden min-[1025px]:h-[75vh] max-[1024px]:aspect-[4/5]"
              style={{
                clipPath: "inset(50% 50% 50% 50%)",
                opacity: 0,
              }}
            >
              <div
                ref={imgInnerRef}
                className="absolute inset-0"
                style={{
                  transform: "scale(1.15)",
                  transformOrigin: "center",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&q=80"
                  fill
                  alt="Lotus Property Group — Chicago architectural interior"
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>

          {/* Right column — subtext, bottom-aligned with image */}
          <div className="col-start-10 col-span-3 max-[1024px]:col-start-1 max-[1024px]:col-span-1 max-[1024px]:order-3 flex flex-col justify-end min-[1025px]:h-[75vh]">
            <LineReveal
              as="p"
              className="body-md font-sans text-ink max-w-[420px]"
              trigger="mount"
              delay={1.4}
              stagger={0.05}
              duration={0.9}
            >
              Lotus Property Group LLC is a female-owned local developer founded by Shreya Singh in 2017.
            </LineReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
