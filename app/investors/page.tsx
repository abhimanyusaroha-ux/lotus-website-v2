import type { Metadata } from "next";
import { InvestorContent } from "./InvestorContent";

export const metadata: Metadata = {
  title: "Investor Portal · Lotus Property Group",
  description: "Sign in to the Lotus Property Group investor portal. Access quarterly reports, K-1 documents, and fund performance.",
};

export default function InvestorsPage() {
  return <InvestorContent />;
}
