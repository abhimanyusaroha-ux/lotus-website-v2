"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import LineReveal from "../LineReveal";
import type { Project } from "@/data/projects";

export function ProjectHero({ project }: { project: Project }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);

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

    const tl = gsap.timeline({ delay: 1.0 });
    if (imgRef.current) {
      tl.to(
        imgRef.current,
        {
          clipPath: "inset(0% 0 0% 0)",
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
        },
        0
      );
    }
    if (imgInnerRef.current) {
      tl.to(
        imgInnerRef.current,
        { scale: 1, duration: 1.6, ease: "power3.out" },
        0
      );
    }
    return () => {
      tl.kill();
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

      {/* Hero image — 80vw, centered, breaks out of container */}
      <div className="mt-16 max-[640px]:mt-10 w-[80vw] mx-auto">
        <div
          ref={imgRef}
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            clipPath: "inset(50% 0 50% 0)",
            opacity: 0,
          }}
        >
          <div
            ref={imgInnerRef}
            className="absolute inset-0"
            style={{ transform: "scale(1.08)", transformOrigin: "center" }}
          >
            <Image
              src={project.heroImage.src}
              fill
              alt={project.heroImage.alt}
              className="object-cover"
              priority
              sizes="80vw"
            />
          </div>
        </div>
        <p className="mt-4 caption font-sans text-gray-600 italic">
          Exterior · {project.location}, {project.year}
        </p>
      </div>
    </section>
  );
}
