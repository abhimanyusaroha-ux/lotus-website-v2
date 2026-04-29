"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LineReveal from "../LineReveal";
import type { Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function ProjectPanel({ project }: { project: Project }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const factRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = panelRef.current;
    if (!panel) return;

    const tags = tagRefs.current.filter(Boolean) as HTMLSpanElement[];
    const facts = factRefs.current.filter(Boolean) as HTMLDivElement[];

    gsap.set(panel, { opacity: 0, y: 32 });
    gsap.set(tags, { opacity: 0, y: 8 });
    gsap.set(facts, { opacity: 0, y: 8 });

    const trigger = {
      trigger: panel,
      start: "top 85%",
      once: true,
    } as const;

    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.to(panel, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: trigger,
      })
    );

    if (tags.length) {
      tweens.push(
        gsap.to(tags, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: trigger,
        })
      );
    }

    if (facts.length) {
      tweens.push(
        gsap.to(facts, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: trigger,
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

  return (
    <section
      aria-label="Project details"
      className="pt-[120px] pb-[120px] max-[640px]:pt-20 max-[640px]:pb-20 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <div ref={panelRef}>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 max-[1024px]:grid-cols-1">
          {/* Left — deliverables */}
          <div className="col-span-4 max-[1024px]:col-span-1">
            <p className="caption font-sans text-gray-600 uppercase tracking-[0.12em]">
              Deliverables
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.deliverables.map((d, i) => (
                <span
                  key={d}
                  ref={(el) => {
                    tagRefs.current[i] = el;
                  }}
                  className="inline-flex items-center body-sm font-sans text-ink uppercase tracking-[0.06em] border border-gray-400 px-4 py-2"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Right — summary + facts */}
          <div className="col-start-6 col-span-7 max-[1024px]:col-start-1 max-[1024px]:col-span-1">
            <h2 className="display-md font-sans font-bold text-ink">
              {project.name}
            </h2>
            <LineReveal
              as="p"
              className="body-md font-sans text-ink-muted mt-6 max-w-[540px]"
              stagger={0.05}
              duration={0.9}
            >
              {project.summary}
            </LineReveal>

            <div className="mt-12">
              {project.facts.map((fact, i) => (
                <div
                  key={fact.label}
                  ref={(el) => {
                    factRefs.current[i] = el;
                  }}
                  className={`flex items-center justify-between gap-6 py-4 border-t border-gray-200 ${
                    i === project.facts.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="caption font-sans text-gray-600 uppercase tracking-[0.12em]">
                    {fact.label}
                  </span>
                  <span className="body-sm font-sans text-ink text-right">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
