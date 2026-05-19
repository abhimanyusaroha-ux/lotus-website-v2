"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LineReveal from "../LineReveal";
import { SectionMarker } from "../SectionMarker";
import type { HeroContent } from "@/lib/strapi";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  fontLabel?: string;
  fontDescription?: string;
  wordmarkClassName?: string;
  wordmarkStyle?: CSSProperties;
  content?: HeroContent;
};

const defaultWordmarkStyle: CSSProperties = {
  fontSize: "clamp(72px, 18vw, 260px)",
  lineHeight: 0.85,
  letterSpacing: "-0.055em",
};

const DEFAULT_CONTENT: HeroContent = {
  wordmark: "Lotus",
  subtitle: "Est. 2023 · Chicago, IL",
  paragraph1:
    "We're a real estate investment firm based in Chicago. We acquire, develop, and operate residential and mixed-use properties in the parts of the city we believe in for the long run.",
  paragraph2:
    "Our work is slow on purpose. We underwrite carefully, hold longer than the spreadsheet says we should, and build relationships that outlast any single deal.",
  heroImage: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=80",
    alt: "Lotus Property Group — Chicago real estate investment",
  },
};

export function Hero({
  fontLabel,
  fontDescription,
  wordmarkClassName = "font-black",
  wordmarkStyle,
  content = DEFAULT_CONTENT,
}: HeroProps = {}) {
  const wordmarkMaskRef = useRef<HTMLDivElement>(null);
  const wordmarkInnerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mask = wordmarkMaskRef.current;
    const inner = wordmarkInnerRef.current;
    const img = imageRef.current;
    if (!mask || !inner || !img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline();

    // Wordmark rises as one line from yPercent 100
    tl.fromTo(
      inner,
      { yPercent: 100 },
      { yPercent: 0, duration: 1.6, ease: "expo.out" }
    );

    // Image clip-path reveal from bottom + scale
    tl.fromTo(
      img,
      { clipPath: "inset(100% 0 0 0)", scale: 1.12 },
      {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.8,
        ease: "expo.out",
      },
      0.7
    );

    const wrapper = imageWrapperRef.current;
    let scrollTl: gsap.core.Timeline | null = null;
    if (wrapper) {
      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 0,
          end: 700,
          scrub: 1,
        },
      });
      scrollTl.fromTo(
        wrapper,
        { width: "80vw" },
        { width: "100vw", ease: "power2.out" }
      );
    }

    return () => {
      scrollTl?.scrollTrigger?.kill();
      scrollTl?.kill();
    };
  }, []);

  return (
    <section className="pt-[72px] bg-canvas" aria-label="Hero">
      <div className="max-w-[1440px] mx-auto px-[120px] pt-10 max-[1024px]:px-12 max-[640px]:px-6 max-[640px]:pt-6">

        {/* Section marker */}
        <div className="mb-6">
          <SectionMarker label="Home" />
        </div>

        {/* Font label — typeface specimen */}
        {fontLabel && (
          <div className="mb-3 flex items-baseline gap-3 flex-wrap">
            <span className="caption font-sans text-ink uppercase tracking-[0.18em]">
              Typeface · {fontLabel}
            </span>
            {fontDescription && (
              <span className="caption font-sans text-gray-400 normal-case tracking-[0.02em]">
                {fontDescription}
              </span>
            )}
          </div>
        )}

        {/* Wordmark — single line reveal */}
        <div ref={wordmarkMaskRef} style={{ overflow: "hidden" }}>
          <div
            ref={wordmarkInnerRef}
            className={`font-sans text-ink ${wordmarkClassName}`}
            style={{ ...defaultWordmarkStyle, ...wordmarkStyle }}
            aria-label={content.wordmark}
          >
            {content.wordmark}
          </div>
        </div>

        {/* Subtitle */}
        {content.subtitle && (
          <p className="body-sm font-sans text-gray-400 mt-4 tracking-[0.06em] uppercase">
            {content.subtitle}
          </p>
        )}

        {/* Body copy row — line-reveal on scroll (delay 0.6s after mount) */}
        <div className="mt-8 flex gap-20 max-[768px]:flex-col max-[768px]:gap-4">
          <LineReveal
            as="p"
            className="body-lg font-sans text-gray-600 max-w-[340px]"
            trigger="mount"
            delay={0.6}
            stagger={0.06}
            duration={0.9}
          >
            {content.paragraph1}
          </LineReveal>
          {content.paragraph2 && (
            <LineReveal
              as="p"
              className="body-lg font-sans text-gray-600 max-w-[340px]"
              trigger="mount"
              delay={0.72}
              stagger={0.06}
              duration={0.9}
            >
              {content.paragraph2}
            </LineReveal>
          )}
        </div>

      </div>

      {/* Hero image — breaks out of padded container for scroll-driven width expansion */}
      <div
        ref={imageWrapperRef}
        className="mt-10 mx-auto"
        style={{ width: "80vw" }}
      >
        <div
          ref={imageRef}
          className="relative w-full overflow-hidden aspect-video max-[640px]:aspect-[4/3]"
          style={{ transformOrigin: "center" }}
        >
          <Image
            src={content.heroImage.src}
            fill
            alt={content.heroImage.alt}
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6">
        {/* Scroll indicator */}
        <div className="mt-5 flex items-center gap-3 pb-6">
          <div
            className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-1 h-1 rounded-full bg-gray-400" />
          </div>
          <span className="caption font-sans text-gray-400 uppercase tracking-[0.1em]">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
