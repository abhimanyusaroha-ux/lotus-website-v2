"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { Counter } from "../Counter";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

const orbitText = "Contact us — Contact us — Contact us — ".toUpperCase();

export function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const invertedCardRef = useRef<HTMLDivElement>(null);
  const ctxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const inverted = invertedCardRef.current;
    const ctxImg = ctxImgRef.current;

    cards.forEach((card) => gsap.set(card, { opacity: 0, y: 24 }));
    if (inverted) gsap.set(inverted, { opacity: 0, y: 24, scale: 0.98 });
    if (ctxImg) gsap.set(ctxImg, { clipPath: "inset(100% 0 0 0)" });

    const tweens: gsap.core.Tween[] = [];

    cards.forEach((card, i) => {
      tweens.push(
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        })
      );
    });

    if (inverted) {
      tweens.push(
        gsap.to(inverted, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        })
      );
    }

    if (ctxImg) {
      tweens.push(
        gsap.to(ctxImg, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          delay: 0.4,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        })
      );
    }

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  const cardBase =
    "min-[1025px]:aspect-square aspect-[4/3] p-10 max-[640px]:p-8 flex flex-col justify-between";

  const numberStyle: React.CSSProperties = {
    fontSize: "clamp(48px, 5vw, 80px)",
    lineHeight: 0.95,
    letterSpacing: "-0.03em",
  };

  return (
    <section
      ref={sectionRef}
      aria-label="The numbers"
      className="py-[160px] max-[640px]:py-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      {/* Intro row */}
      <div className="grid grid-cols-12 gap-x-8 gap-y-10 max-[1024px]:grid-cols-1 items-start">
        <div className="col-span-7 max-[1024px]:col-span-1">
          <SectionMarker label="The Numbers" />
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink mt-3"
            stagger={0.1}
            duration={1.1}
          >
            Two years, four buildings, and counting.
          </LineReveal>
        </div>
        <div className="col-start-9 col-span-4 max-[1024px]:col-start-1 max-[1024px]:col-span-1 pt-2">
          <LineReveal
            as="p"
            className="body-md font-sans text-ink-muted max-w-[360px]"
            stagger={0.05}
            duration={0.9}
          >
            These aren't projections. They're a record of what we've done since we started the firm. We update them as the work progresses.
          </LineReveal>
        </div>
      </div>

      {/* Bento grid */}
      <div className="mt-24 max-[640px]:mt-14 grid grid-cols-12 gap-4 max-[1024px]:grid-cols-1 items-stretch">
        {/* Stats 2×2 */}
        <div className="col-span-6 max-[1024px]:col-span-1 grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
          {/* Card 1 — light */}
          <div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            className={`bg-gray-200 ${cardBase}`}
          >
            <div
              className="font-sans font-bold text-ink"
              style={numberStyle}
            >
              <Counter target={4} />
            </div>
            <p className="body-sm font-sans text-gray-600 mt-6">
              Projects completed since 2023
            </p>
          </div>

          {/* Card 2 — INVERTED */}
          <div
            ref={invertedCardRef}
            className={`bg-ink ${cardBase}`}
            style={{ transformOrigin: "center" }}
          >
            <div
              className="font-sans font-bold text-canvas"
              style={numberStyle}
            >
              <Counter target={5} />
            </div>
            <p className="body-sm font-sans text-canvas/70 mt-6">
              Currently in pre-development
            </p>
          </div>

          {/* Card 3 — light */}
          <div
            ref={(el) => {
              cardRefs.current[2] = el;
            }}
            className={`bg-gray-200 ${cardBase}`}
          >
            <div
              className="font-sans font-bold text-ink"
              style={numberStyle}
            >
              <Counter target={48} suffix="hrs" />
            </div>
            <p className="body-sm font-sans text-gray-600 mt-6">
              Average response time on new opportunities
            </p>
          </div>

          {/* Card 4 — light */}
          <div
            ref={(el) => {
              cardRefs.current[3] = el;
            }}
            className={`bg-gray-200 ${cardBase}`}
          >
            <div
              className="font-sans font-bold text-ink"
              style={numberStyle}
            >
              <Counter target={100} suffix="%" />
            </div>
            <p className="body-sm font-sans text-gray-600 mt-6">
              Of investor capital deployed on schedule
            </p>
          </div>
        </div>

        {/* Contextual card — full height of 2×2 stat grid */}
        <div
          ref={(el) => {
            cardRefs.current[4] = el;
          }}
          className="col-start-7 col-span-6 max-[1024px]:col-start-1 max-[1024px]:col-span-1 bg-gray-200 p-10 max-[640px]:p-8 flex flex-col justify-between gap-10"
        >
          {/* Top — paragraph */}
          <p className="body-md font-sans text-ink max-w-[320px]">
            What you see here is the floor of what we expect from ourselves. Every project is underwritten the same way, carefully, and judged by the same standard once it's complete. If we keep doing that, the numbers should keep telling a good story.
          </p>

          {/* Bottom — circular CTA + image */}
          <div className="flex items-end gap-6 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-8">
            {/* Circular CTA with text-on-path */}
            <Link
              href="/contact"
              aria-label="Contact us"
              className="group relative block w-[120px] h-[120px] flex-shrink-0"
            >
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 orbit"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="contact-orbit"
                    d="M 60,60 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                    fill="none"
                  />
                </defs>
                <text
                  className="fill-ink"
                  style={{ fontSize: "9px", letterSpacing: "0.18em" }}
                >
                  <textPath href="#contact-orbit" startOffset="0">
                    {orbitText}
                  </textPath>
                </text>
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full border border-ink flex items-center justify-center bg-gray-200 group-hover:bg-ink transition-colors duration-200">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="text-ink group-hover:text-canvas transition-colors duration-200"
                >
                  <path
                    d="M3.5 12.5L12.5 3.5M12.5 3.5H6M12.5 3.5V10"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>

            {/* Image */}
            <div
              ref={ctxImgRef}
              className="relative flex-1 w-full overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
                fill
                alt="Lotus Property Group — architectural detail"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
