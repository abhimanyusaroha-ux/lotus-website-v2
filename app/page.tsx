import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { HomeStats } from "@/components/sections/HomeStats";
import { Investors } from "@/components/sections/Investors";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Portfolio />
      <HomeStats />
      <Investors />
      <FAQ />
    </main>
  );
}
