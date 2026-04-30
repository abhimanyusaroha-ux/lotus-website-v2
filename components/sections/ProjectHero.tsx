"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import LineReveal from "../LineReveal";
import type { Project } from "@/data/projects";

export function ProjectHero({ project }: { project: Project }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      [imgRef, imgInnerRef].forEach((r) => {
        if (r.current) gsap.set(r.current, { clearProps: "all" });
      });
      return;
    }

    if (imgRef.current && imgInnerRef.current) {
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        imgInnerRef.current,
        { scale: 1.12 },
        { scale: 1, duration: 1.8, ease: "power3.out", delay: 0.3 }
      );
    }

    let scrollTl: gsap.core.Timeline | null = null;
    if (scrollWrapperRef.current) {
      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 0,
          end: 700,
          scrub: 1,
        },
      });

      scrollTl.fromTo(
        scrollWrapperRef.current,
        { width: '80vw' },
        { width: '100vw', ease: 'power2.out' }
      );

      const imgEl = imgInnerRef.current?.querySelector('img');
      if (imgEl) {
        scrollTl.fromTo(
          imgEl,
          { scale: 1.0 },
          { scale: 1.02, ease: 'none' },
          0
        );
      }
    }

    return () => {
      scrollTl?.scrollTrigger?.kill();
      scrollTl?.kill();
    };
  }, []);

  return (
    <section
      aria-label="Project hero"
      className="pt-[120px] max-[640px]:pt-24"
    >
      {/* Back link + name + meta — sit in standard padded container */}
      <div className="max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 body-sm font-sans text-gray-600 hover:text-ink transition-colors duration-200"
        >
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 1L1 5L5 9M1 5H13"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to portfolio
        </Link>

        <div className="mt-16 max-[640px]:mt-12">
          <LineReveal
            as="h1"
            className="display-md font-sans font-bold text-ink"
            stagger={0.08}
            duration={1.0}
            trigger="mount"
          >
            {project.name}
          </LineReveal>
        </div>

        <p className="mt-4 body-sm font-sans text-gray-600">
          {project.status} · {project.year} · {project.location} ·{" "}
          {project.type}
        </p>
      </div>

      {/* Hero image — 80vw, centered, expands on scroll */}
      <div className="mt-16 max-[640px]:mt-10 overflow-visible">
        <div ref={scrollWrapperRef} className="mx-auto" style={{ width: '80vw' }}>
          <div
            ref={imgRef}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16 / 9", clipPath: "inset(100% 0 0 0)" }}
          >
            <div
              ref={imgInnerRef}
              className="absolute inset-0"
              style={{ transform: "scale(1.08)" }}
            >
              <Image
                src={project.heroImage.src}
                fill
                alt={project.heroImage.alt}
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </div>
          <p className="mt-4 caption font-sans text-gray-600 italic">
            Exterior · {project.location}, {project.year}
          </p>
        </div>
      </div>
    </section>
  );
}
