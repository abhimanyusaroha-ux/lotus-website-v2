import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PortfolioPage } from "@/components/sections/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio · Lotus Property Group",
  description:
    "Lotus Property Group's portfolio of completed and in-development real estate projects across Chicago's core neighborhoods.",
};

export default function Portfolio() {
  return (
    <>
      <Navigation />
      <main>
        <PortfolioPage />
      </main>
      <Footer />
    </>
  );
}
