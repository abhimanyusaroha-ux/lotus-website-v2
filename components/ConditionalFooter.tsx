"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Do not render the footer on the contact or investors pages
  if (pathname === "/contact" || pathname === "/investors") {
    return null;
  }
  
  return <Footer />;
}
