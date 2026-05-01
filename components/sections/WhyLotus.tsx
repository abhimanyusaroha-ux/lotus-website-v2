"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionMarker } from "../SectionMarker";
import { EditorialImage } from "../EditorialImage";
import { TextButton } from "../TextButton";
import { Counter } from "../Counter";
import LineReveal from "../LineReveal";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function WhyLotus() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id="why"
      ref={ref}
      className="py-[100px] max-[640px]:py-16 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
        <SectionMarker label="Why Lotus" />
      </motion.div>

      {/* Statement */}
      <div className="mt-12 grid grid-cols-12 max-[1024px]:grid-cols-1">
        <div className="col-span-9 max-[1024px]:col-span-1">
          <LineReveal
            as="h2"
            className="display-md font-sans font-bold text-ink"
            stagger={0.1}
            duration={1.1}
          >
            What two years has built.
          </LineReveal>
          <LineReveal
            as="p"
            className="body-lg font-sans text-gray-600 mt-6 max-w-[560px]"
            stagger={0.05}
            duration={0.9}
          >
            The numbers below aren't ambitious targets. They're what we've actually done since starting the firm. We share them because they say more about how we work than any tagline could.
          </LineReveal>
        </div>
      </div>

      {/* Stats — 4-col desktop, 2×2 mobile */}
      <motion.div
        className="mt-20 max-[640px]:mt-14 grid grid-cols-4 max-[640px]:grid-cols-2 gap-x-0 max-[640px]:gap-y-10"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
      >
        {[
          { target: 4, suffix: "", label: "Projects completed since 2023" },
          { target: 5, suffix: "", label: "Currently in pre-development" },
          { target: 48, suffix: "hrs", label: "Average response time on new opportunities" },
          { target: 100, suffix: "%", label: "Of investor capital deployed on schedule" },
        ].map((stat, i) => (
          <div
            key={i}
            className={[
              "px-6 first:pl-0 min-w-0",
              "max-[640px]:first:pl-0 max-[640px]:border-l-0",
              i > 0 && i % 2 !== 0 ? "max-[640px]:border-l max-[640px]:border-gray-200" : "",
              i >= 2 ? "max-[640px]:border-t max-[640px]:border-gray-200 max-[640px]:pt-10 max-[640px]:mt-0" : "",
              i > 0 && i < 4 ? "border-l border-gray-200" : "",
            ].join(" ")}
          >
            <div
              className="font-sans font-bold text-ink"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
            >
              <Counter target={stat.target} suffix={stat.suffix} />
            </div>
            <p className="body-sm font-sans text-gray-600 mt-3">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Feature image */}
      <motion.div
        className="mt-28 max-[640px]:mt-16 grid grid-cols-12 max-[1024px]:grid-cols-1"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.24, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="col-start-2 col-span-10 max-[1024px]:col-start-1 max-[1024px]:col-span-1">
          <EditorialImage
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=80"
            caption="EXTERIOR · FULTON MARKET PROJECT · CHICAGO, 2024"
            aspectRatio="3/2"
            alt="Exterior of Fulton Market project, Chicago, 2024"
          />
        </div>
      </motion.div>

      {/* Quote — right-aligned */}
      <motion.div
        className="mt-12 grid grid-cols-12 max-[1024px]:grid-cols-1"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="col-start-7 col-span-6 max-[1024px]:col-start-1 max-[1024px]:col-span-1">
          <blockquote className="body-lg font-sans text-gray-600 italic max-w-[520px]">
            &ldquo;We launched Lotus in 2023 because Chicago&apos;s middle market
            was being overlooked by institutional capital. Two years in,
            we&apos;ve closed four acquisitions and broken ground on five more.
            We&apos;ve done it by staying disciplined and moving carefully.&rdquo;
          </blockquote>
          <div className="mt-6">
            <TextButton href="/about">Read our philosophy</TextButton>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
