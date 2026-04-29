import type { CSSProperties } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyLotus } from "@/components/sections/WhyLotus";
import { Investors } from "@/components/sections/Investors";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/Footer";

const fontOverride = {
  "--font-inter": "var(--font-instrument)",
  fontSynthesis: "none",
} as CSSProperties;

export default function Home2() {
  return (
    <div style={fontOverride}>
      <Navigation />
      <main>
        <Hero
          fontLabel="Instrument Serif"
          fontDescription="Editorial high-contrast serif · Instrument"
          wordmarkClassName="font-normal italic"
          wordmarkStyle={{ letterSpacing: "-0.04em", lineHeight: 0.88 }}
        />
        <About />
        <Portfolio />
        <WhyLotus />
        <Investors />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
