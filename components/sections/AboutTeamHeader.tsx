"use client";

import LineReveal from "../LineReveal";

export function AboutTeamHeader() {
  return (
    <section
      aria-label="The team"
      className="pt-24 pb-16 max-[640px]:pt-16 max-[640px]:pb-10 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <div className="flex justify-end max-[1024px]:justify-start">
        <LineReveal
          as="h2"
          className="display-lg font-sans font-bold text-ink"
          stagger={0.08}
          duration={1.1}
        >
          The Team
        </LineReveal>
      </div>
    </section>
  );
}
