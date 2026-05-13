"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

export function AboutStory() {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (imgRef.current && imgInnerRef.current) {
      const t1 = gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
      const t2 = gsap.fromTo(
        imgInnerRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
      return () => {
        t1.scrollTrigger?.kill();
        t1.kill();
        t2.scrollTrigger?.kill();
        t2.kill();
      };
    }
  }, []);

  return (
    <section
      id="about-us"
      aria-label="About Lotus Property Group"
      className="py-[100px] max-[640px]:py-16 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <div className="grid grid-cols-12 gap-x-12 gap-y-12 max-[1024px]:grid-cols-1 items-start">
        {/* Left column — heading + body copy, sticky on desktop */}
        <div className="col-span-6 max-[1024px]:col-span-1 min-[1025px]:sticky min-[1025px]:top-[120px]">
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink"
            stagger={0.08}
            duration={1.0}
          >
            About Us
          </LineReveal>

          <div className="mt-12 max-w-[520px] space-y-6">
            <LineReveal
              as="p"
              className="body-md font-sans font-light text-ink-muted"
              stagger={0.04}
              duration={0.9}
            >
              As a female-owned local developer, Lotus Property Group LLC, founded by Shreya Singh, is a deeply committed developer to making a difference in East Garfield Park, North Lawndale, Humboldt Park, and even more neighborhoods on the West side of Chicago. Since our establishment in 2017, we have been dedicated to providing affordable rental and market-rate housing options tailored specifically to these neighborhoods&apos; needs.
            </LineReveal>

            <LineReveal
              as="p"
              className="body-md font-sans font-light text-ink-muted"
              stagger={0.04}
              duration={0.9}
              delay={0.2}
            >
              Our mission goes beyond just building structures; it&apos;s about creating spaces where people feel safe, comfortable, and proud to call home. By offering a mix of affordable and market-rate housing, we strive to foster diverse and inclusive neighborhoods where everyone has access to quality housing options. With each new development, we&apos;re constructing buildings, building futures, and strengthening communities, and we are committed to making a meaningful difference in the lives of those we serve.
            </LineReveal>
          </div>
        </div>

        {/* Right column — interior image */}
        <div className="col-start-8 col-span-5 max-[1024px]:col-start-1 max-[1024px]:col-span-1">
          <div
            ref={imgRef}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "4 / 5", clipPath: "inset(100% 0 0 0)" }}
          >
            <div
              ref={imgInnerRef}
              className="absolute inset-0"
              style={{ transform: "scale(1.1)", transformOrigin: "center" }}
            >
              <Image
                src="/team/shreya-singh.jpg"
                fill
                alt="Shreya Singh, founder of Lotus Property Group"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
