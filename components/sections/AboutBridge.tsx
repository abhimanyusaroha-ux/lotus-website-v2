"use client";

import LineReveal from "../LineReveal";

export function AboutBridge({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-label="Section bridge"
      className="py-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <LineReveal
        as="p"
        className="body-lg font-sans text-ink-muted text-center"
        stagger={0.05}
        duration={0.9}
      >
        {children}
      </LineReveal>
    </section>
  );
}
