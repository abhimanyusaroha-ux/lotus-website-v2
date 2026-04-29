import type { CSSProperties } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyLotus } from "@/components/sections/WhyLotus";
import { Investors } from "@/components/sections/Investors";
import { FAQ } from "@/components/sections/FAQ";

const fontOverride = {
  "--font-inter": "var(--font-cinzel)",
  fontSynthesis: "none",
} as CSSProperties;

export default function Home1() {
  return (
    <main className="lighter-weights" style={fontOverride}>
      <Hero
        fontLabel="Cinzel"
        fontDescription="Roman caps display serif · Natanael Gama"
        wordmarkClassName="font-medium uppercase"
        wordmarkStyle={{ letterSpacing: "0.04em", lineHeight: 0.95 }}
      />
      <About />
      <Portfolio />
      <WhyLotus />
      <Investors />
      <FAQ />
    </main>
  );
}
