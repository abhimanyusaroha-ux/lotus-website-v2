"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

const underConstruction = [
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=2000&q=80",
    alt: "Residential building under construction, exterior framing",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=2000&q=80",
    alt: "Architectural blueprints and project review",
  },
];

const completedWide = {
  src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=80",
  alt: "Completed residential building exterior, Chicago",
};

const completedRow = [
  {
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2000&q=80",
    alt: "Completed residential building, Chicago — Fulton District",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=80",
    alt: "Completed multifamily building, Chicago — Logan Square",
  },
];

function RevealImage({
  src,
  alt,
  aspect,
  sizes,
  delay = 0,
}: {
  src: string;
  alt: string;
  aspect: string;
  sizes: string;
  delay?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const t1 = gsap.fromTo(
      wrap,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.4,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
      }
    );
    const t2 = gsap.fromTo(
      inner,
      { scale: 1.08 },
      {
        scale: 1,
        duration: 1.6,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
      }
    );
    return () => {
      t1.scrollTrigger?.kill();
      t1.kill();
      t2.scrollTrigger?.kill();
      t2.kill();
    };
  }, [delay]);

  return (
    <div className="group block relative w-full overflow-hidden">
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: aspect, clipPath: "inset(100% 0 0 0)" }}
      >
        <div
          ref={innerRef}
          className="absolute inset-0"
          style={{ transform: "scale(1.08)", transformOrigin: "center" }}
        >
          <div className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutWork() {
  return (
    <section
      aria-label="Work — under construction and completed"
      className="py-[100px] max-[640px]:py-16 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <div className="grid grid-cols-12 gap-x-12 gap-y-16 max-[1024px]:grid-cols-1">
        {/* Left — Under Construction */}
        <div className="col-span-6 max-[1024px]:col-span-1">
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink"
            stagger={0.08}
            duration={1.0}
          >
            Under Construction Work
          </LineReveal>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {underConstruction.map((img, i) => (
              <RevealImage
                key={img.src}
                src={img.src}
                alt={img.alt}
                aspect="3 / 4"
                sizes="(max-width: 1024px) 50vw, 25vw"
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Right — Completed */}
        <div className="col-span-6 max-[1024px]:col-span-1">
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink"
            stagger={0.08}
            duration={1.0}
          >
            Completed Work
          </LineReveal>

          <div className="mt-12 space-y-4">
            <RevealImage
              src={completedWide.src}
              alt={completedWide.alt}
              aspect="16 / 10"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="grid grid-cols-2 gap-4">
              {completedRow.map((img, i) => (
                <RevealImage
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  aspect="3 / 4"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  delay={(i + 1) * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
