import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyLotus } from "@/components/sections/WhyLotus";
import { Investors } from "@/components/sections/Investors";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Portfolio />
      <WhyLotus />
      <Investors />
      <FAQ />
    </main>
  );
}
