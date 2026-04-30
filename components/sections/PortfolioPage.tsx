"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────────────
   Project data — exactly 4 completed projects, matching home Portfolio.tsx
   ────────────────────────────────────────────────────────────────────────── */

interface Project {
  slug: string;
  name: string;
  location: string;
  status: string;
  year: string;
  images: string[];
  alt: string;
}

const projects: Project[] = [
  {
    slug: "fulton-district-mixed-use",
    name: "Fulton District Mixed-Use",
    location: "Fulton Market, Chicago",
    status: "Completed",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2400&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=2400&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=2400&q=80",
    ],
    alt: "Fulton District mixed-use project, Fulton Market, Chicago",
  },
  {
    slug: "logan-square-multifamily",
    name: "Logan Square Multifamily",
    location: "Logan Square, Chicago",
    status: "Completed",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2400&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2400&q=80",
    ],
    alt: "Logan Square multifamily development, Chicago",
  },
  {
    slug: "west-loop-value-add",
    name: "West Loop Value-Add",
    location: "West Loop, Chicago",
    status: "Completed",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=2400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=2400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=80",
    ],
    alt: "West Loop value-add acquisition, Chicago",
  },
  {
    slug: "wicker-park-residential",
    name: "Wicker Park Residential",
    location: "Wicker Park, Chicago",
    status: "Completed",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2400&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=2400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=2400&q=80",
    ],
    alt: "Wicker Park residential development, Chicago",
  },
];

interface UpcomingProject {
  name: string;
  location: string;
  year: string;
  image: string;
  alt: string;
}

const upcoming: UpcomingProject[] = [
  {
    name: "River North Mixed-Use",
    location: "River North, Chicago",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2400&q=80",
    alt: "River North mixed-use site, Chicago",
  },
  {
    name: "Pilsen Multifamily",
    location: "Pilsen, Chicago",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=2400&q=80",
    alt: "Pilsen multifamily project site, Chicago",
  },
  {
    name: "Humboldt Park Residential",
    location: "Humboldt Park, Chicago",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=2400&q=80",
    alt: "Humboldt Park residential site, Chicago",
  },
  {
    name: "Bucktown Value-Add",
    location: "Bucktown, Chicago",
    year: "2027",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2400&q=80",
    alt: "Bucktown value-add site, Chicago",
  },
  {
    name: "South Loop Development",
    location: "South Loop, Chicago",
    year: "2027",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=80",
    alt: "South Loop ground-up development site, Chicago",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   Per-card image gallery
   ────────────────────────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
  hovered,
  setHovered,
  cardRef,
}: {
  project: Project;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
  cardRef: (el: HTMLElement | null) => void;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previousActiveRef = useRef(0);

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveImg((cur) => {
        previousActiveRef.current = cur;
        return (cur + 1) % project.images.length;
      });
    },
    [project.images.length]
  );

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveImg((cur) => {
        previousActiveRef.current = cur;
        return (cur - 1 + project.images.length) % project.images.length;
      });
    },
    [project.images.length]
  );

  // Ken-burns settle on the newly active image (skip very first mount —
  // initial reveal animation handles that)
  useEffect(() => {
    if (activeImg === 0 && previousActiveRef.current === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = imgRefs.current[activeImg];
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 1.02 },
      { scale: 1, duration: 0.8, ease: "power3.out", overwrite: true }
    );
  }, [activeImg]);

  const counter = `${String(activeImg + 1).padStart(2, "0")} / ${String(
    project.images.length
  ).padStart(2, "0")}`;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      ref={cardRef}
      className="portfolio-card group block"
      style={{
        opacity: hovered !== null && hovered !== index ? 0.5 : 1,
        transition: "opacity 400ms ease",
      }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
    >
      {/* Image gallery */}
      <div
        className="portfolio-img relative w-full overflow-hidden min-h-[400px] max-[640px]:min-h-[280px]"
        style={{ aspectRatio: "16 / 10" }}
      >
        {/* Hover-scale wrapper around all images */}
        <div className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]">
          {project.images.map((src, i) => (
            <div
              key={src}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="portfolio-img-slide absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: i === activeImg ? 1 : 0,
                pointerEvents: i === activeImg ? "auto" : "none",
              }}
              aria-hidden={i !== activeImg}
            >
              <Image
                src={src}
                fill
                alt={`${project.alt} — view ${i + 1}`}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2 && i === 0}
              />
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-canvas border border-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-[opacity,background-color,color] duration-300 text-ink hover:bg-ink hover:text-canvas"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 1L1 6L6 11M1 6H15"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-canvas border border-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-[opacity,background-color,color] duration-300 text-ink hover:bg-ink hover:text-canvas"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 1L15 6L10 11M15 6H1"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Image counter */}
        <span className="absolute bottom-4 right-4 caption font-sans text-canvas uppercase tracking-[0.12em] bg-ink px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
          {counter}
        </span>
      </div>

      {/* Text stack */}
      <div className="portfolio-text mt-6">
        <p className="heading-md font-sans font-bold text-ink relative inline-block">
          {project.name}
          <span
            aria-hidden="true"
            className="absolute left-0 bottom-[-2px] w-full h-px bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
          />
        </p>
        <p className="body-sm font-sans text-gray-600 mt-1">
          {project.location}
        </p>
        <p className="caption font-sans text-gray-400 uppercase tracking-[0.1em] mt-2">
          {project.status} · {project.year}
        </p>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Upcoming card — single image, not interactive
   ────────────────────────────────────────────────────────────────────────── */

function UpcomingCard({
  project,
  cardRef,
}: {
  project: UpcomingProject;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={cardRef} className="portfolio-card block">
      <div
        className="portfolio-img relative w-full overflow-hidden min-h-[400px] max-[640px]:min-h-[280px] bg-gray-200 flex flex-col items-center justify-center"
        style={{ aspectRatio: "16 / 10" }}
      >
        <div className="portfolio-img-slide flex items-center justify-center">
          <span className="caption font-sans text-gray-600 uppercase tracking-[0.18em]">
            Coming Soon
          </span>
        </div>
      </div>

      <div className="portfolio-text mt-6">
        <p className="heading-md font-sans font-bold text-ink">
          {project.name}
        </p>
        <p className="body-sm font-sans text-gray-600 mt-1">
          {project.location}
        </p>
        <p className="caption font-sans text-gray-400 uppercase tracking-[0.1em] mt-2">
          Pre-Development · {project.year}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Page component
   ────────────────────────────────────────────────────────────────────────── */

export function PortfolioPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const upcomingEyebrowRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const upcomingGridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const upcomingCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // "Our Projects" eyebrow fades in 0.6s after page load
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1 });
      return;
    }
    const el = eyebrowRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: "power3.out" }
    );
  }, []);

  // "In Pre-Development" eyebrow — fade in when upcoming section enters view
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (upcomingEyebrowRef.current)
        gsap.set(upcomingEyebrowRef.current, { opacity: 1 });
      return;
    }
    const el = upcomingEyebrowRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 8 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Scroll-in stagger reveal — same animation for both grids
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tweens: gsap.core.Tween[] = [];

    const reveal = (
      grid: HTMLDivElement | null,
      cardArr: (HTMLElement | null)[]
    ) => {
      if (!grid) return;
      const cards = cardArr.filter(Boolean) as HTMLElement[];
      if (!cards.length) return;

      cards.forEach((card, i) => {
        const delay = i * 0.15;
        const imgClip = card.querySelector<HTMLElement>(".portfolio-img");
        const firstImgInner = card.querySelector<HTMLElement>(
          ".portfolio-img-slide"
        );
        const text = card.querySelector<HTMLElement>(".portfolio-text");

        gsap.set(card, { opacity: 0, y: 40 });
        if (imgClip) gsap.set(imgClip, { clipPath: "inset(100% 0 0 0)" });
        if (firstImgInner) gsap.set(firstImgInner, { scale: 1.06 });
        if (text) gsap.set(text, { opacity: 0, y: 16 });

        const trigger = {
          trigger: grid,
          start: "top 85%",
          once: true,
        } as const;

        tweens.push(
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: trigger,
          })
        );

        if (imgClip) {
          tweens.push(
            gsap.to(imgClip, {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.2,
              delay,
              ease: "power3.out",
              scrollTrigger: trigger,
            })
          );
        }

        if (firstImgInner) {
          tweens.push(
            gsap.to(firstImgInner, {
              scale: 1,
              duration: 1.6,
              delay,
              ease: "power3.out",
              scrollTrigger: trigger,
            })
          );
        }

        if (text) {
          tweens.push(
            gsap.to(text, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: delay + 1.5,
              ease: "power3.out",
              scrollTrigger: trigger,
            })
          );
        }
      });
    };

    reveal(gridRef.current, cardRefs.current);
    reveal(upcomingGridRef.current, upcomingCardRefs.current);

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <>
      {/* Hero — heading + subtext */}
      <section
        className="pt-[120px] pb-[96px] max-[1024px]:pt-[112px] max-[768px]:pt-[100px] max-[768px]:pb-16 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
        aria-label="Portfolio hero"
      >
        <div className="grid grid-cols-12 gap-x-8 max-[768px]:grid-cols-1">
          <div className="col-span-7 max-[768px]:col-span-1">
            <span className="caption font-sans text-gray-600 uppercase tracking-[0.12em]">
              Portfolio
            </span>
            <div className="mt-2">
              <LineReveal
                as="h1"
                className="font-sans font-bold text-ink"
                stagger={0.1}
                duration={1.1}
                trigger="mount"
              >
                <span
                  style={{
                    fontSize: "clamp(36px, 4vw, 56px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    display: "block",
                  }}
                >
                  The work,
                </span>
                <span
                  style={{
                    fontSize: "clamp(36px, 4vw, 56px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    display: "block",
                  }}
                >
                  four projects in.
                </span>
              </LineReveal>
            </div>
          </div>

          <div className="col-start-9 col-span-4 max-[768px]:col-start-1 max-[768px]:col-span-1 flex items-end max-[768px]:mt-8">
            <LineReveal
              as="p"
              className="body-md font-sans text-ink-muted max-w-[360px]"
              stagger={0.05}
              duration={0.9}
              trigger="mount"
              delay={0.4}
            >
              Each of these started as an idea about a building or a block. We acquired, planned, executed, and stabilized them, and we'd happily walk you through any of them in person. The summaries here are the short version.
            </LineReveal>
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section
        className="pb-[160px] max-[768px]:pb-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
        aria-label="Our projects"
      >
        <div className="flex items-center">
          <span
            ref={eyebrowRef}
            className="caption font-sans text-gray-600 uppercase tracking-[0.12em]"
            style={{ opacity: 0 }}
          >
            Our Projects
          </span>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-2 max-[768px]:grid-cols-1 gap-x-12 gap-y-16"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              hovered={hovered}
              setHovered={setHovered}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </section>

      {/* Upcoming projects */}
      <section
        className="pb-[160px] max-[768px]:pb-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
        aria-label="Upcoming projects"
      >
        <div className="grid grid-cols-12 gap-x-8 max-[768px]:grid-cols-1">
          <div className="col-span-7 max-[768px]:col-span-1">
            <span
              ref={upcomingEyebrowRef}
              className="caption font-sans text-gray-600 uppercase tracking-[0.12em]"
              style={{ opacity: 0 }}
            >
              In Pre-Development
            </span>
            <div className="mt-2">
              <LineReveal
                as="h2"
                className="display-md font-sans font-bold text-ink"
                stagger={0.08}
                duration={1.0}
              >
                On the boards.
              </LineReveal>
            </div>
          </div>

          <div className="col-start-9 col-span-4 max-[768px]:col-start-1 max-[768px]:col-span-1 flex items-end max-[768px]:mt-8">
            <LineReveal
              as="p"
              className="body-md font-sans text-ink-muted max-w-[360px]"
              stagger={0.05}
              duration={0.9}
            >
              We currently have five sites in active pre-development. They sit at different points in the cycle, from sourcing and design to permitting and breaking ground, but they're all underwritten the same way we do everything else: carefully.
            </LineReveal>
          </div>
        </div>

        <div
          ref={upcomingGridRef}
          className="mt-16 grid grid-cols-2 max-[768px]:grid-cols-1 gap-x-12 gap-y-16"
        >
          {upcoming.map((project, i) => (
            <UpcomingCard
              key={project.name}
              project={project}
              cardRef={(el) => {
                upcomingCardRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
