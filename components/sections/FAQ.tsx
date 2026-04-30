"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionMarker } from "../SectionMarker";
import { TextButton } from "../TextButton";
import { PillButton } from "../PillButton";
import LineReveal from "../LineReveal";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How does Lotus pick the projects it takes on?",
    answer:
      "We look at every opportunity through four lenses: the quality of the location over a ten-year horizon, the architecture or development potential, the condition of the asset and what it would take to improve, and finally the circumstances of the deal itself. In a typical year, we say yes to about one in fifteen properties we look at seriously.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We focus on Chicago, with most of our work concentrated in West Loop, Fulton Market, Logan Square, Wicker Park, and River North. We expect to expand carefully into one or two adjacent markets over the next several years, but only when we've found the right operating partner and the right deal flow.",
  },
  {
    question: "What's the minimum investment?",
    answer:
      "Our typical co-investment is $100,000 per deal, though some opportunities have higher minimums depending on size and structure. Every investor needs to qualify as accredited under SEC Regulation D before participating.",
  },
  {
    question: "How do investors track their investments?",
    answer:
      "After your first deal closes, you get login credentials to our investor portal. From there, you can pull quarterly reports, K-1 documents, capital call notices, wire instructions, and current performance summaries any time. We also send a written update at the end of each quarter.",
  },
  {
    question: "Do you look at deals from outside brokers and owners?",
    answer:
      "Yes, and we're genuinely open to off-market submissions. If you have a property you think fits how we work, send us the details through the contact page. We respond to every qualified submission within forty-eight hours, even when the answer is no.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const bodyId = `faq-answer-${index}`;

  useEffect(() => {
    const el = bodyRef.current;
    const icon = iconRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.to(el, { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" });
      if (icon) gsap.to(icon, { rotation: 45, duration: 0.25, ease: "power2.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
      if (icon) gsap.to(icon, { rotation: 0, duration: 0.25, ease: "power2.out" });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-6 max-[640px]:py-5 text-left group gap-4"
        aria-expanded={isOpen}
        aria-controls={bodyId}
      >
        <span className="heading-sm font-sans font-light text-ink group-hover:text-gray-600 transition-colors duration-200">
          {question}
        </span>
        <span className="flex-shrink-0 text-gray-400 mt-[3px]" aria-hidden="true">
          <svg ref={iconRef} width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div id={bodyId} ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="body-md font-sans text-gray-600 max-w-[600px] pb-7">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = itemsRef.current?.querySelectorAll<HTMLElement>(".faq-item");
    if (!items?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      Array.from(items),
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: itemsRef.current, start: "top 80%", once: true },
      }
    );
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="py-[160px] max-[640px]:py-24 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <SectionMarker label="Frequently Asked" />

      {/* Title row */}
      <div className="mt-12">
        <LineReveal
          as="h2"
          className="display-md font-sans font-bold text-ink"
          stagger={0.08}
          duration={1.0}
        >
          Things people ask before they invest.
        </LineReveal>
      </div>

      {/* Accordion */}
      <div ref={itemsRef} className="mt-20 max-[640px]:mt-14 grid grid-cols-12 max-[1024px]:grid-cols-1">
        <div className="col-start-2 col-span-10 max-[1024px]:col-start-1 max-[1024px]:col-span-1 border-t border-gray-200">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-28 max-[640px]:mt-16 flex flex-col items-center gap-5">
        <p className="body-md font-sans text-gray-600 text-center">
          If yours isn't here, we usually reply within a business day.
        </p>
        <PillButton href="/contact">Contact our team</PillButton>
      </div>
    </section>
  );
}
