import type { Metadata } from "next";
import { PortfolioPage } from "@/components/sections/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio · Lotus Property Group",
  description:
    "Lotus Property Group's portfolio of completed and in-development real estate projects across Chicago's core neighborhoods.",
};

export default function Portfolio() {
  return (
    <main>
      <PortfolioPage />
    </main>
  );
}
