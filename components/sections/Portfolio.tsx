"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { PillButton } from "../PillButton";
import { TextButton } from "../TextButton";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    id: "01",
    slug: "fulton-district-mixed-use",
    name: "Fulton District Mixed-Use",
    location: "Completed · Fulton Market, Chicago",
    description:
      "We acquired this property in 2023, modernized the systems, and re-tenanted the ground floor with operators who fit the neighborhood.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
    alt: "Fulton District mixed-use project, Fulton Market, Chicago",
  },
  {
    id: "02",
    slug: "logan-square-multifamily",
    name: "Logan Square Multifamily",
    location: "Completed · Logan Square, Chicago",
    description:
      "Twenty-four residential units we bought off-market and brought to ninety-six percent occupancy within sixty days.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    alt: "Logan Square multifamily development, Chicago",
  },
  {
    id: "03",
    slug: "west-loop-value-add",
    name: "West Loop Value-Add",
    location: "Completed · West Loop, Chicago",
    description:
      "A ground-up reposition of an industrial building we took down to the structure and built back as mixed-use loft residential.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
    alt: "West Loop value-add acquisition, Chicago",
  },
  {
    id: "04",
    slug: "wicker-park-residential",
    name: "Wicker Park Residential",
    location: "Completed · Wicker Park, Chicago",
    description:
      "Nine residential units we renovated while preserving the original masonry, and sold to a long-term hold partner.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    alt: "Wicker Park residential project, Chicago",
  },
];

export function Portfolio() {
  const sliderSectionRef = useRef<HTMLDivElement>(null);
  const slideImgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideTextGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const slideImgs = slideImgRefs.current.filter(Boolean) as HTMLDivElement[];
        const slideTextGroups = slideTextGroupRefs.current.filter(Boolean) as HTMLDivElement[];
        const n = properties.length;

        // ── Z-index: slide 0 on top, each slide underneath the previous ──
        // Only the outgoing image gets its clip collapsed — the incoming sits
        // fully visible beneath it, so there is no second clip edge to misalign.
        slideImgs.forEach((img, i) => {
          const row = img.parentElement as HTMLElement | null;
          if (row) {
            row.style.zIndex = String(n - i);
            row.style.pointerEvents = i === 0 ? "auto" : "none";
          }
          gsap.set(img, { clipPath: "inset(0 0% 0 0)" });
        });

        // ── Initial text states ────────────────────────────────────────
        // Slide 0 visible; all others below their masks.
        const reveals0 = Array.from(slideTextGroups[0]?.querySelectorAll<HTMLElement>(".s-reveal") ?? []);
        const fades0 = Array.from(slideTextGroups[0]?.querySelectorAll<HTMLElement>(".s-fade") ?? []);
        gsap.set(reveals0, { yPercent: 0, opacity: 1 });
        gsap.set(fades0, { opacity: 1 });
        slideTextGroups.slice(1).forEach((group) => {
          gsap.set(Array.from(group.querySelectorAll<HTMLElement>(".s-reveal")), { yPercent: 110, opacity: 0 });
          gsap.set(Array.from(group.querySelectorAll<HTMLElement>(".s-fade")), { opacity: 0 });
        });

        // Pointer events: only active slide receives interaction.
        const setPointerActive = (idx: number) => {
          slideImgs.forEach((img, i) => {
            const row = img.parentElement as HTMLElement | null;
            if (row) row.style.pointerEvents = i === idx ? "auto" : "none";
          });
        };

        // ── Scrub timeline: image clip + text fade locked to scroll ────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sliderSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            snap: {
              snapTo: [0, 1 / 3, 2 / 3, 1],
              duration: { min: 0.6, max: 1.1 },
              ease: "power4.inOut",
            },
            onUpdate(self) {
              const rawSlide = self.progress * (n - 1);
              const nearest = Math.min(Math.round(rawSlide), n - 1);

              setPointerActive(nearest);

              if (counterRef.current) {
                counterRef.current.textContent = String(nearest + 1).padStart(2, "0");
              }

              progressFillRefs.current.forEach((fill, i) => {
                if (!fill) return;
                fill.style.height = `${Math.max(0, Math.min(1, rawSlide + 1 - i)) * 100}%`;
              });
            },
          },
        });

        // Each outgoing slide's right inset collapses to 100%, revealing the
        // slide beneath — and its text fades out as the next slide's text
        // fades in. All locked to the same scrub progress.
        for (let i = 0; i < n - 1; i++) {
          // Image: collapse over the full row.
          tl.to(
            slideImgs[i],
            { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "none" },
            i
          );

          const outgoingGroup = slideTextGroups[i];
          const incomingGroup = slideTextGroups[i + 1];
          if (outgoingGroup) {
            const outReveals = Array.from(outgoingGroup.querySelectorAll<HTMLElement>(".s-reveal"));
            const outFades = Array.from(outgoingGroup.querySelectorAll<HTMLElement>(".s-fade"));
            tl.to(
              [...outReveals, ...outFades],
              { yPercent: -110, opacity: 0, duration: 0.45, ease: "power2.in" },
              i
            );
          }
          if (incomingGroup) {
            const inReveals = Array.from(incomingGroup.querySelectorAll<HTMLElement>(".s-reveal"));
            const inFades = Array.from(incomingGroup.querySelectorAll<HTMLElement>(".s-fade"));
            tl.to(
              inReveals,
              { yPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
              i + 0.55
            );
            tl.to(
              inFades,
              { opacity: 1, duration: 0.45, ease: "power2.out" },
              i + 0.55
            );
          }
        }

        return () => {
          tl.kill();
          slideTextGroups.forEach((group) => {
            gsap.killTweensOf(Array.from(group.querySelectorAll<HTMLElement>(".s-reveal, .s-fade")));
          });
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="portfolio">
      {/* ── Intro — normal flow ─────────────────────────────────────── */}
      <div className="pt-[100px] max-[640px]:pt-16 pb-14 max-[640px]:pb-10 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6">
        <SectionMarker label="Select Portfolio" />
        <div className="mt-8 max-w-[560px]">
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink"
            stagger={0.08}
            duration={1.0}
          >
            The work, project by project.
          </LineReveal>
          <LineReveal
            as="p"
            className="body-lg font-sans text-gray-600 mt-6"
            stagger={0.05}
            duration={0.9}
          >
            A snapshot of the four projects we've taken from acquisition through completion. Each one taught us something we've carried into the next.
          </LineReveal>
        </div>
      </div>

      {/* ── Desktop pinned slider ────────────────────────────────────── */}
      <div
        ref={sliderSectionRef}
        className="hidden lg:block relative"
        style={{ height: "500vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-canvas">
          {/* Slides stacked; z-index set by JS; only outgoing is clip-animated */}
          {properties.map((property, i) => (
            <div key={property.id} className="absolute inset-0 grid grid-cols-2">

              {/* Left: image — clip-path collapses outgoing, incoming sits beneath */}
              <div
                ref={(el) => { slideImgRefs.current[i] = el; }}
                className="relative h-full overflow-hidden"
              >
                <Image
                  src={property.image}
                  fill
                  alt={property.alt}
                  className="object-cover"
                  priority={i === 0}
                  sizes="50vw"
                />
              </div>

              {/* Right: text, animated at LineReveal speed */}
              <div className="flex items-center px-[80px] h-full overflow-hidden">
                <div
                  ref={(el) => { slideTextGroupRefs.current[i] = el; }}
                  className="w-full max-w-[520px]"
                >
                  <div className="overflow-hidden">
                    <h3
                      className="s-reveal font-sans font-bold text-ink"
                      style={{ fontSize: "clamp(38px, 3.8vw, 62px)", letterSpacing: "-0.035em", lineHeight: 1.0 }}
                    >
                      {property.name}
                    </h3>
                  </div>
                  <div className="overflow-hidden mt-6">
                    <p className="s-reveal body-lg font-sans text-gray-600">{property.location}</p>
                  </div>
                  <div className="overflow-hidden mt-3">
                    <p className="s-reveal body-md font-sans text-gray-600 max-w-[400px]">{property.description}</p>
                  </div>
                  <div className="s-fade flex items-center gap-6 mt-10">
                    <PillButton href={`/portfolio/${property.slug}`}>View project</PillButton>
                    <TextButton href="/portfolio">All projects</TextButton>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Top-left: section marker */}
          <SectionMarker label="Select Portfolio" />



          {/* Right-center: vertical 4-segment progress bar */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 pointer-events-none">
            {properties.map((_, i) => (
              <div key={i} className="h-14 w-[2px] bg-gray-200 overflow-hidden flex flex-col">
                <div
                  ref={(el) => { progressFillRefs.current[i] = el; }}
                  className="w-full bg-ink"
                  style={{ height: "0%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile fallback: vertical stack ─────────────────────────── */}
      <div className="lg:hidden px-12 max-[640px]:px-6 pb-24 max-[640px]:pb-16 space-y-14">
        {properties.map((property) => (
          <div key={property.id}>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={property.image}
                fill
                alt={property.alt}
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="mt-6">
              <p className="caption font-sans text-gray-400 uppercase tracking-[0.08em]">
                {property.location}
              </p>
              <h3 className="heading-lg font-sans font-bold text-ink mt-2">
                {property.name}
              </h3>
              <p className="body-md font-sans text-gray-600 mt-3 max-w-[480px]">
                {property.description}
              </p>
              <div className="mt-5">
                <TextButton href={`/portfolio/${property.slug}`}>View project</TextButton>
              </div>
            </div>
          </div>
        ))}
        <PillButton href="/portfolio">View full portfolio</PillButton>
      </div>
    </section>
  );
}
