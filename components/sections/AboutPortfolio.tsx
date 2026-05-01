"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { TextButton } from "../TextButton";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  name: string;
  location: string;
  year: string;
  image: string;
  alt: string;
  aspectRatio: "3/4" | "4/5";
  /** desktop-only vertical offset in px from a baseline of 32px */
  offsetClass: string;
};

const projects: Project[] = [
  {
    name: "Fulton District Mixed-Use",
    location: "Fulton Market, Chicago",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
    alt: "Fulton District mixed-use project, Fulton Market, Chicago",
    aspectRatio: "3/4",
    offsetClass: "min-[1024px]:mt-8",
  },
  {
    name: "Logan Square Multifamily",
    location: "Logan Square, Chicago",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    alt: "Logan Square multifamily development, Chicago",
    aspectRatio: "4/5",
    offsetClass: "min-[1024px]:mt-24",
  },
  {
    name: "West Loop Value-Add",
    location: "West Loop, Chicago",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
    alt: "West Loop value-add acquisition, Chicago",
    aspectRatio: "3/4",
    offsetClass: "min-[1024px]:mt-0",
  },
  {
    name: "Wicker Park Residential",
    location: "Wicker Park, Chicago",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
    alt: "Wicker Park residential development, Chicago",
    aspectRatio: "4/5",
    offsetClass: "min-[1024px]:mt-20",
  },
];

export function AboutPortfolio() {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const row = rowRef.current;
    if (!row) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    const inners = innerRefs.current.filter(Boolean) as HTMLDivElement[];
    const captions = captionRefs.current.filter(Boolean) as HTMLDivElement[];

    cards.forEach((c) => gsap.set(c, { clipPath: "inset(100% 0 0 0)" }));
    inners.forEach((i) => gsap.set(i, { scale: 1.06 }));
    captions.forEach((c) => gsap.set(c, { opacity: 0, y: 8 }));

    const tweens: gsap.core.Tween[] = [];

    cards.forEach((card, i) => {
      tweens.push(
        gsap.to(card, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          delay: 0.15 * i,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        })
      );
      tweens.push(
        gsap.to(inners[i], {
          scale: 1,
          duration: 1.6,
          delay: 0.15 * i,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        })
      );
      tweens.push(
        gsap.to(captions[i], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.15 * i + 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        })
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section
      id="portfolio"
      aria-label="Our portfolio"
      className="py-[100px] max-[640px]:py-16 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <SectionMarker label="Our Portfolio" />

      <LineReveal
        as="h2"
        className="font-sans font-bold text-ink mt-6"
        stagger={0.08}
        duration={1.0}
      >
        <span
          style={{
            fontSize: "clamp(36px, 4vw, 56px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            display: "block",
          }}
        >
          Four projects,
        </span>
        <span
          style={{
            fontSize: "clamp(36px, 4vw, 56px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            display: "block",
            fontStyle: "italic",
          }}
        >
          in detail.
        </span>
      </LineReveal>

      {/* Row of 4 staggered images */}
      <div
        ref={rowRef}
        className="mt-24 max-[640px]:mt-14 grid grid-cols-4 gap-8 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:gap-10 min-[1024px]:pt-8"
      >
        {projects.map((p, i) => (
          <Link
            key={p.name}
            href="/portfolio"
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`group block ${p.offsetClass} max-[1024px]:!mt-0`}
            style={{
              opacity: hovered !== null && hovered !== i ? 0.5 : 1,
              transition: "opacity 400ms ease",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: p.aspectRatio }}
            >
              <div
                ref={(el) => {
                  innerRefs.current[i] = el;
                }}
                className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                style={{ transformOrigin: "center" }}
              >
                <Image
                  src={p.image}
                  fill
                  alt={p.alt}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
            <div
              ref={(el) => {
                captionRefs.current[i] = el;
              }}
              className="mt-4"
            >
              <p className="body-md font-sans font-medium text-ink relative inline-block">
                {p.name}
                <span
                  aria-hidden="true"
                  className="absolute left-0 bottom-[-2px] w-full h-px bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                />
              </p>
              <p className="body-sm font-sans text-gray-600 mt-1">
                {p.location}
              </p>
              <p className="caption font-sans text-gray-400 uppercase tracking-[0.1em] mt-2">
                {p.year}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-24 max-[640px]:mt-14 flex justify-center">
        <TextButton href="/portfolio">View full portfolio →</TextButton>
      </div>
    </section>
  );
}
