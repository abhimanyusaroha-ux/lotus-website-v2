"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { EditorialImage } from "../EditorialImage";
import { TextButton } from "../TextButton";
import LineReveal from "../LineReveal";
import type { AboutContent } from "@/lib/strapi";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CONTENT: AboutContent = {
  heading: "Real estate, but built like a business we want to keep.",
  paragraph1:
    "Lotus started in 2023 with a thesis that Chicago's middle market was being passed over by serious capital. The big institutional players were chasing larger deals. The small operators didn't have the discipline to underwrite carefully. We saw a gap, and we set out to fill it with a firm that takes both the analysis and the buildings seriously.",
  paragraph2:
    "Two years in, we've completed four projects and have five more in active pre-development. Every one of them was chosen for the same three reasons: the location made sense for the long term, the deal was structured fairly, and we believed we could improve the asset through active management.",
  ctaLabel: "Read our approach",
  ctaHref: "/about",
  image1: {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    alt: "River North mixed-use project, Chicago, 2024",
    caption: "River North Mixed-Use · Chicago, 2024",
  },
  image2: {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
    alt: "Logan Square development project, Chicago, 2023",
    caption: "Logan Square Development · Chicago, 2023",
  },
};

export function About({ content = DEFAULT_CONTENT }: { content?: AboutContent } = {}) {
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    [
      { ref: img1Ref, delay: 0 },
      { ref: img2Ref, delay: 0.15 },
    ].forEach(({ ref, delay }) => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });
  }, []);

  return (
    <section
      id="about"
      className="py-[100px] max-[640px]:py-16 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      {/* Eyebrow + heading */}
      <div className="grid grid-cols-12 gap-x-8 max-[1024px]:grid-cols-1">
        <div className="col-span-3 max-[1024px]:col-span-1 max-[1024px]:mb-8 pt-2">
          <SectionMarker label="About" />
        </div>
        <LineReveal
          as="h2"
          className="col-span-9 max-[1024px]:col-span-1 display-md font-sans font-bold text-ink"
          stagger={0.1}
          duration={1.1}
        >
          {content.heading}
        </LineReveal>
      </div>

      {/* Body text */}
      <div className="mt-16 grid grid-cols-12 gap-x-8 max-[1024px]:grid-cols-1">
        <div className="col-start-4 col-span-8 max-[1024px]:col-start-1 max-[1024px]:col-span-1">
          <LineReveal
            as="p"
            className="body-lg font-sans text-gray-600 max-w-[560px]"
            stagger={0.05}
            duration={0.9}
          >
            {content.paragraph1}
          </LineReveal>
          {content.paragraph2 && (
            <LineReveal
              as="p"
              className="body-lg font-sans text-gray-600 max-w-[560px] mt-6"
              stagger={0.05}
              duration={0.9}
            >
              {content.paragraph2}
            </LineReveal>
          )}
          {content.ctaLabel && content.ctaHref && (
            <div className="mt-8">
              <TextButton href={content.ctaHref}>{content.ctaLabel}</TextButton>
            </div>
          )}
        </div>
      </div>

      {/* Asymmetric images */}
      <div className="mt-28 max-[640px]:mt-16 grid grid-cols-12 gap-x-8 items-start max-[1024px]:grid-cols-1 max-[1024px]:gap-y-10">
        <div
          ref={img1Ref}
          className="col-start-2 col-span-4 max-[1024px]:col-start-1 max-[1024px]:col-span-1"
          style={{ overflow: "hidden" }}
        >
          <EditorialImage
            src={content.image1.src}
            caption={content.image1.caption ?? ""}
            aspectRatio="4/5"
            alt={content.image1.alt}
          />
        </div>
        <div
          ref={img2Ref}
          className="col-start-8 col-span-4 max-[1024px]:col-start-1 max-[1024px]:col-span-1 mt-24 max-[1024px]:mt-0"
          style={{ overflow: "hidden" }}
        >
          <EditorialImage
            src={content.image2.src}
            caption={content.image2.caption ?? ""}
            aspectRatio="4/5"
            alt={content.image2.alt}
          />
        </div>
      </div>

    </section>
  );
}
