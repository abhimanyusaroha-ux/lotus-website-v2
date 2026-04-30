import type { Metadata } from "next";
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
    <main>
      <AboutHero />
      <AboutBridge>
        What follows is the short version of why we started Lotus, what we've learned in the first two years, and where we go from here.
      </AboutBridge>
      <AboutStory />
      {/* <AboutPortfolio /> */}
      <AboutBridge>
        Two years in, the way we work has produced numbers we're comfortable putting in front of any investor.
      </AboutBridge>
      <AboutStats />
      <AboutClosing />
    </main>
  );
}
