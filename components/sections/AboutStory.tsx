"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { EditorialImage } from "../EditorialImage";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

export function AboutStory() {
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    [
      { ref: img1Ref, delay: 0 },
      { ref: img2Ref, delay: 0.1 },
    ].forEach(({ ref, delay }) => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });
  }, []);

  return (
    <section
      id="story"
      aria-label="Our story"
      className="py-[160px] max-[640px]:py-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      {/* ── 2A — text-left, image-right ───────────────────────────── */}
      <div className="grid grid-cols-12 gap-x-8 gap-y-10 max-[1024px]:grid-cols-1 items-start">
        <div className="col-span-5 max-[1024px]:col-span-1">
          <SectionMarker label="Our Story" />
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink mt-6 max-w-[480px]"
            stagger={0.08}
            duration={1.0}
          >
            A different way to invest in Chicago.
          </LineReveal>
          <LineReveal
            as="p"
            className="body-md font-sans text-ink-muted mt-8 max-w-[440px]"
            stagger={0.05}
            duration={0.9}
          >
            Lotus was founded in 2023 with a simple thesis: Chicago&apos;s
            middle market — the slice between large institutional capital and
            small-time landlords — was underserved by disciplined, design-led
            operators. We started with a single building. We now have four
            completed projects and five more underway, all guided by the same
            standard.
          </LineReveal>
        </div>
        <div
          ref={img1Ref}
          className="col-start-7 col-span-6 max-[1024px]:col-start-1 max-[1024px]:col-span-1"
          style={{ overflow: "hidden" }}
        >
          <EditorialImage
            src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=2400&q=80"
            caption="Chicago, IL"
            aspectRatio="3/2"
            alt="Chicago skyline"
          />
        </div>
      </div>

      {/* ── 2B — image-left, text-right ───────────────────────────── */}
      <div className="mt-24 max-[640px]:mt-16 grid grid-cols-12 gap-x-8 gap-y-10 max-[1024px]:grid-cols-1 items-start">
        <div
          ref={img2Ref}
          className="col-span-6 max-[1024px]:col-span-1"
          style={{ overflow: "hidden" }}
        >
          <EditorialImage
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=2400&q=80"
            caption="Project review"
            aspectRatio="3/2"
            alt="Architectural blueprint and project review"
          />
        </div>
        <div className="col-start-8 col-span-5 max-[1024px]:col-start-1 max-[1024px]:col-span-1">
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink max-w-[440px]"
            stagger={0.08}
            duration={1.0}
          >
            We move slowly on purpose.
          </LineReveal>
          <LineReveal
            as="p"
            className="body-md font-sans text-ink-muted mt-8 max-w-[440px]"
            stagger={0.05}
            duration={0.9}
          >
            We don&apos;t optimize for transaction volume. We optimize for
            outcomes — for the partners who fund us, for the residents who
            live in our buildings, and for the neighborhoods we operate in.
            Every acquisition is underwritten with the assumption that
            we&apos;ll hold it longer than the spreadsheet says we should.
          </LineReveal>
        </div>
      </div>
    </section>
  );
}
