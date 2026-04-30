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
            Why we started in Chicago.
          </LineReveal>
          <LineReveal
            as="p"
            className="body-md font-sans text-ink-muted mt-8 max-w-[440px]"
            stagger={0.05}
            duration={0.9}
          >
            Chicago has a real estate market that doesn't get the institutional attention it deserves. The biggest funds are focused on coastal cities. The smallest landlords don't have the underwriting discipline to make good decisions consistently. In between sits a market full of buildings worth owning, owners ready to sell to the right buyer, and neighborhoods that have been quietly improving for a decade. That's where we work.
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
            Our pace is part of the strategy.
          </LineReveal>
          <LineReveal
            as="p"
            className="body-md font-sans text-ink-muted mt-8 max-w-[440px]"
            stagger={0.05}
            duration={0.9}
          >
            Most real estate firms measure themselves by how many deals they close. We measure ourselves by how the deals perform years after closing. That difference shapes everything we do, from how we underwrite, to how long we hold, to how we treat the residents and neighborhoods we operate in. It's slower work, but the buildings hold up better and the partners come back.
          </LineReveal>
        </div>
      </div>
    </section>
  );
}
