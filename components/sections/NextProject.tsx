"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import LineReveal from "../LineReveal";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  previous?: Project | null;
};

export function NextProject({ project, previous }: Props) {
  const router = useRouter();

  const navigate = useCallback(
    (slug: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const href = `/portfolio/${slug}`;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      gsap.to("main", {
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => router.push(href),
      });
    },
    [router]
  );

  return (
    <section
      aria-label="Project navigation"
      className="py-[160px] max-[640px]:py-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <div
        className={`flex items-start gap-12 max-[640px]:flex-col max-[640px]:gap-10 ${
          previous ? "justify-between" : "justify-center"
        }`}
      >
        {previous && (
          <a
            href={`/portfolio/${previous.slug}`}
            onClick={navigate(previous.slug)}
            className="group inline-block text-left"
          >
            <p className="caption font-sans text-gray-600 uppercase tracking-[0.12em]">
              Previous Project
            </p>
            <LineReveal
              as="span"
              className="body-lg font-sans font-bold text-ink relative inline-block mt-3"
              stagger={0.06}
              duration={0.9}
            >
              {`← ${previous.name}`}
            </LineReveal>
            <span
              aria-hidden="true"
              className="block h-px bg-ink mt-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
            />
          </a>
        )}

        <a
          href={`/portfolio/${project.slug}`}
          onClick={navigate(project.slug)}
          className={`group inline-block ${previous ? "text-right" : "text-center"}`}
        >
          <p className="caption font-sans text-gray-600 uppercase tracking-[0.12em]">
            Next Project
          </p>
          <LineReveal
            as="span"
            className="body-lg font-sans font-bold text-ink relative inline-block mt-3"
            stagger={0.06}
            duration={0.9}
          >
            {`${project.name} →`}
          </LineReveal>
          <span
            aria-hidden="true"
            className={`block h-px bg-ink mt-1 transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100 ${
              previous ? "origin-right" : "origin-left"
            }`}
          />
        </a>
      </div>
    </section>
  );
}
