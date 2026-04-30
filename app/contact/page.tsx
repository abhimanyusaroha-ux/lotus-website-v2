import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact · Lotus Property Group",
  description: "Get in touch with Lotus Property Group. Investor inquiries, property submissions, and general questions welcome. We reply within one business day.",
};

export default function ContactPage() {
  return <ContactContent />;
}
