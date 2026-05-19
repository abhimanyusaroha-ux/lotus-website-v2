"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Member = {
  name: string;
  image?: string;
  imageAlt?: string;
  paragraphs: string[];
};

const development: Member[] = [
  {
    name: "Shreya Singh",
    paragraphs: [
      "Shreya Singh is a local neighborhood developer on the West side interested in community development. She started Lotus Property Group LLC in 2017 and has created a small portfolio of two- and three-unit buildings in East Garfield Park and North Lawndale. She also manages $25MM – $200MM projects for an affordable housing developer who works with the City, IHDA and CHA.",
      "Shreya lives in North Lawndale and holds an MBA from University of Chicago and a BBA from the University of Michigan.",
    ],
  },
  {
    name: "Yasamin Enshaeian",
    paragraphs: [
      "Yasamin Enshaeian is an architect and local affordable housing developer in Chicago South side. She is currently managing complex affordable housing projects in which she manages all design, financing, general contractor, public agency consultants and partners and property management ensuring the seamless execution for the success of the projects.",
      "Yasamin holds a MRED+D from Berkeley and Bachelors in Architecture from University of Cincinnati.",
    ],
  },
];

const construction: Member[] = [
  {
    name: "Pashupati Nath",
    paragraphs: [
      "Pashupati Nath owns a General Contracting firm called Nath Construction LLC and is responsible for leading construction on our development projects. Over his career, he has completed 650+ rehabs, and accumulated over 30+ years of experience. Pashupati was also recently selected as a developer under the City Lots for Working Families program. Additionally, he has a robust pipeline of new construction projects currently under construction in East Garfield Park and Humboldt Park neighborhoods.",
      "Pat completed his Bachelors in Civil Engineering from Karnataka University, India.",
    ],
  },
  {
    name: "Parviz Enchayan",
    paragraphs: [
      "Parviz Enchayan has over 20 years of experience in management of mega oil, gas and infrastructure projects ranging from $10MM to $1.25BN. He has a solid track record of managing multi discipline projects and excels at planning, leading and managing construction activities in fields such as Civil, piping, mechanical, electrical, instrumentation and fire detection and fire protection. Parallel to his professional work, Parviz has developed multi-family housing in Iran.",
      "Parviz holds a Bachelor and Master in Civil Engineering from Georgia Tch and holds a PMP Certification.",
    ],
  },
];

function MemberBlock({
  member,
  refSetter,
}: {
  member: Member;
  refSetter: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={refSetter} className="max-w-[480px]">
      {member.image && (
        <div
          className="relative w-[200px] max-[640px]:w-[160px] overflow-hidden mb-6"
          style={{ aspectRatio: "1 / 1" }}
        >
          <Image
            src={member.image}
            alt={member.imageAlt ?? member.name}
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
      )}
      <h3 className="heading-md font-sans font-bold text-ink">{member.name}</h3>
      <div className="mt-4 space-y-4">
        {member.paragraphs.map((p, i) => (
          <p
            key={i}
            className="body-md font-sans font-light text-ink-muted"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export function AboutTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const members = memberRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!members.length) return;

    gsap.set(members, { opacity: 0, y: 16 });
    const t = gsap.to(members, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 80%", once: true },
    });

    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Team profiles"
      className="pt-16 pb-[100px] max-[640px]:pb-16 max-w-[1440px] mx-auto px-[120px] max-[1024px]:px-12 max-[640px]:px-6"
    >
      <div className="grid grid-cols-12 gap-x-24 max-[1024px]:gap-x-12 gap-y-20 max-[1024px]:grid-cols-1">
        {/* DEVELOPMENT column */}
        <div className="col-span-6 max-[1024px]:col-span-1 relative">
          {/* Vertical division label — desktop */}
          <span
            aria-hidden="true"
            className="hidden min-[1025px]:block absolute -left-12 top-0 text-ink"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            Development
          </span>

          {/* Horizontal label — tablet/mobile */}
          <p className="hidden max-[1024px]:block caption font-sans text-ink uppercase tracking-[0.24em] font-bold mb-8">
            Development
          </p>

          <div className="space-y-16">
            {development.map((m, i) => (
              <MemberBlock
                key={m.name}
                member={m}
                refSetter={(el) => {
                  memberRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* CONSTRUCTION column */}
        <div className="col-span-6 max-[1024px]:col-span-1 relative">
          <span
            aria-hidden="true"
            className="hidden min-[1025px]:block absolute -left-12 top-0 text-ink"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            Construction
          </span>

          <p className="hidden max-[1024px]:block caption font-sans text-ink uppercase tracking-[0.24em] font-bold mb-8">
            Construction
          </p>

          <div className="space-y-16">
            {construction.map((m, i) => (
              <MemberBlock
                key={m.name}
                member={m}
                refSetter={(el) => {
                  memberRefs.current[development.length + i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
