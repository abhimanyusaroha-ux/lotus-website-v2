import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutStory } from "@/components/sections/AboutStory";
import { AboutBridge } from "@/components/sections/AboutBridge";
import { AboutStats } from "@/components/sections/AboutStats";
import { AboutClosing } from "@/components/sections/AboutClosing";
// PORTFOLIO SECTION — Temporarily disabled per client request 2026-04-29.
// Restore by uncommenting both the import and the <AboutPortfolio /> below.
// import { AboutPortfolio } from "@/components/sections/AboutPortfolio";

export const metadata: Metadata = {
  title: "About · Lotus Property Group",
  description:
    "Lotus Property Group — a Chicago real estate investment firm acquiring, developing, and managing residential and mixed-use assets across the city's most resilient corridors.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <AboutHero />
        <AboutBridge>
          Lotus Property Group was founded on a simple belief — that
          Chicago&apos;s middle market deserved the same rigor and discipline
          that institutional capital brings to larger deals. Two years later,
          that belief is a portfolio of nine projects and a growing circle of
          partners who share it.
        </AboutBridge>
        <AboutStory />
        {/* <AboutPortfolio /> */}
        <AboutBridge>
          We measure ourselves the way our partners do — by what we&apos;ve
          built, how fast we move, and whether we do what we said we would.
          The numbers below are the scorecard we hold ourselves to.
        </AboutBridge>
        <AboutStats />
        <AboutClosing />
      </main>
      <Footer />
    </>
  );
}
