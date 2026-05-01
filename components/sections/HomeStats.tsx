"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LineReveal from "../LineReveal";
import { Counter } from "../Counter";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  label: string;
  target: number;
  suffix?: string;
  imageSrc: string;
  imageAlt: string;
};

const fulton = projects.find((p) => p.slug === "fulton-district-mixed-use");
const logan = projects.find((p) => p.slug === "logan-square-multifamily");
const westLoop = projects.find((p) => p.slug === "west-loop-value-add");
const wicker = projects.find((p) => p.slug === "wicker-park-residential");

const stats: Stat[] = [
  {
    label: "Projects completed since 2023",
    target: 4,
    imageSrc: fulton?.heroImage.src ?? "",
    imageAlt: fulton?.heroImage.alt ?? "",
  },
  {
    label: "Currently in pre-development",
    target: 5,
    imageSrc: logan?.heroImage.src ?? "",
    imageAlt: logan?.heroImage.alt ?? "",
  },
  {
    label: "Average response time on opportunities",
    target: 48,
    suffix: " hrs",
    imageSrc: westLoop?.heroImage.src ?? "",
    imageAlt: westLoop?.heroImage.alt ?? "",
  },
  {
    label: "Of investor capital deployed on schedule",
    target: 100,
    suffix: "%",
    imageSrc: wicker?.heroImage.src ?? "",
    imageAlt: wicker?.heroImage.alt ?? "",
  },
];

export function HomeStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ── Cursor-follow listener (desktop only) ────────────────────────
  // Depends on `mounted` because the floating image is portaled — it only
  // exists in the DOM after the first effect flushes setMounted(true).
  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;
    if (
      !window.matchMedia(
        "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)"
      ).matches
    ) {
      return;
    }

    const floating = floatingImageRef.current;
    if (!floating) return;

    const xTo = gsap.quickTo(floating, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(floating, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 160);
      yTo(e.clientY - 200);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mounted]);

  // ── Show / hide image based on activeIndex ──────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const floating = floatingImageRef.current;
    if (!floating) return;

    const visible = activeIndex !== null;
    gsap.to(floating, {
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0.92,
      duration: 0.4,
      ease: visible ? "power3.out" : "power2.in",
      overwrite: "auto",
    });
  }, [activeIndex]);

  // ── Scroll-in reveal for eyebrow / heading / rows ────────────────
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const tweens: gsap.core.Tween[] = [];

    if (eyebrowRef.current) {
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      tweens.push(
        gsap.to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        })
      );
    }

    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (rows.length) {
      gsap.set(rows, { opacity: 0, y: 20 });
      tweens.push(
        gsap.to(rows, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          delay: 0.25,
          ease: "power3.out",
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

  // ── Per-row hover effects (underline + label color) ──────────────
  const handleEnter = (i: number) => {
    setActiveIndex(i);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const underline = underlineRefs.current[i];
    const label = labelRefs.current[i];
    if (underline) {
      gsap.to(underline, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    if (label) {
      gsap.to(label, {
        color: "var(--color-ink)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleLeave = (i: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const underline = underlineRefs.current[i];
    const label = labelRefs.current[i];
    if (underline) {
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.45,
        ease: "power3.in",
        overwrite: "auto",
      });
    }
    if (label) {
      gsap.to(label, {
        color: "var(--color-gray-400)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why"
      onMouseLeave={() => setActiveIndex(null)}
      className="py-[160px] max-[640px]:py-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6 relative"
    >
      <p
        ref={eyebrowRef}
        className="caption font-sans text-gray-600 uppercase tracking-[0.12em]"
      >
        The Numbers
      </p>

      <div className="mt-24 max-[640px]:mt-16 grid grid-cols-12 gap-x-12 gap-y-8 items-end max-[1024px]:grid-cols-1 max-[1024px]:items-start">
        <div className="col-span-7 max-[1024px]:col-span-1 max-w-[640px]">
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink"
            stagger={0.08}
            duration={1.0}
          >
            What two years has built.
          </LineReveal>
        </div>

        <div className="col-span-5 max-[1024px]:col-span-1 max-w-[420px] justify-self-end max-[1024px]:justify-self-start">
          <LineReveal
            as="p"
            className="body-md font-sans font-light text-ink-muted"
            stagger={0.05}
            duration={0.9}
            delay={0.4}
          >
            The numbers below aren&apos;t ambitious targets. They&apos;re what we&apos;ve actually done since starting the firm. We share them because they say more about how we work than any tagline could.
          </LineReveal>
        </div>
      </div>

      {/* Desktop: vertical list with cursor-follow image */}
      <div className="mt-24 max-[1024px]:hidden">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            className={`relative flex justify-between items-baseline py-8 cursor-pointer border-t border-gray-200 ${
              i === stats.length - 1 ? "border-b" : ""
            }`}
          >
            <span
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="body-sm font-sans uppercase tracking-[0.06em] text-gray-400"
            >
              {stat.label}
            </span>
            <span
              className="font-sans font-bold text-ink"
              style={{
                fontSize: "clamp(48px, 5vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              <Counter target={stat.target} suffix={stat.suffix} duration={2.2} />
            </span>

            <span
              ref={(el) => {
                underlineRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-[-0.5px] h-[0.5px] bg-ink pointer-events-none"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />
          </div>
        ))}
      </div>

      {/* Mobile fallback: 2×2 grid, no images */}
      <div className="mt-16 max-[640px]:mt-12 hidden max-[1024px]:grid grid-cols-2 max-[640px]:gap-y-12 gap-y-14 gap-x-8">
        {stats.map((stat) => (
          <div key={stat.label} className="border-t border-gray-200 pt-6">
            <div
              className="font-sans font-bold text-ink"
              style={{
                fontSize: "clamp(40px, 7vw, 64px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              <Counter target={stat.target} suffix={stat.suffix} duration={2} />
            </div>
            <p className="body-sm font-sans uppercase tracking-[0.06em] text-gray-400 mt-3">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Floating cursor-follow image — portaled to document.body so no
          transformed ancestor can break position:fixed. Desktop only. */}
      {mounted &&
        createPortal(
          <div
            ref={floatingImageRef}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-[60] max-[1024px]:hidden"
            style={{
              width: "320px",
              height: "400px",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={stat.imageSrc}
                  alt={stat.imageAlt}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>,
          document.body
        )}
    </section>
  );
}
