import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutStory } from "@/components/sections/AboutStory";
import { AboutWork } from "@/components/sections/AboutWork";
import { AboutTeamHeader } from "@/components/sections/AboutTeamHeader";
import { AboutTeam } from "@/components/sections/AboutTeam";

export const metadata: Metadata = {
  title: "About · Lotus Property Group",
  description:
    "Lotus Property Group LLC is a female-owned local developer founded by Shreya Singh in 2017, providing affordable rental and market-rate housing across Chicago's West side neighborhoods.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutWork />
      <AboutTeamHeader />
      <AboutTeam />
    </main>
  );
}
