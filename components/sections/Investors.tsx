"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { EditorialImage } from "../EditorialImage";
import { PillButton } from "../PillButton";
import LineReveal from "../LineReveal";
import type { InvestorsContent } from "@/lib/strapi";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const DEFAULT_CONTENT: InvestorsContent = {
  marker: "For Investors",
  heading: "If you're an investor, here's how we work together.",
  body: "We co-invest on every deal alongside a small group of accredited partners who came in early and have stayed with us. Each opportunity is offered one at a time, and access is by introduction. If we haven't met yet and you're interested in being considered, send us a note through our contact page.",
  ctaLabel: "Investor portal",
  ctaHref: "/investors",
  image: {
    src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
    alt: "West Loop acquisition, Chicago, 2024",
    caption: "WEST LOOP ACQUISITION · CHICAGO, 2024",
  },
};

export function Investors({
  content = DEFAULT_CONTENT,
}: { content?: InvestorsContent } = {}) {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      el,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <motion.section
      id="investors"
      ref={ref}
      className="py-[100px] max-[640px]:py-16 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="grid grid-cols-2 gap-20 max-[1024px]:grid-cols-1 max-[1024px]:gap-12 max-[640px]:gap-10">
        {/* Left */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <SectionMarker label={content.marker ?? "For Investors"} />
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink mt-8"
            stagger={0.08}
            duration={1.0}
          >
            {content.heading}
          </LineReveal>
          <LineReveal
            as="p"
            className="body-lg font-sans text-gray-600 max-w-[440px] mt-8"
            stagger={0.05}
            duration={0.9}
          >
            {content.body}
          </LineReveal>
          {content.ctaLabel && content.ctaHref && (
            <div className="mt-10">
              <PillButton href={content.ctaHref}>{content.ctaLabel}</PillButton>
            </div>
          )}
        </motion.div>

        {/* Right: portrait image — right-to-left clip-path reveal */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <div ref={imgRef} style={{ overflow: "hidden" }}>
            <EditorialImage
              src={content.image.src}
              caption={content.image.caption ?? ""}
              aspectRatio="4/5"
              alt={content.image.alt}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
