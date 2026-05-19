import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { HomeStats } from "@/components/sections/HomeStats";
import { Investors } from "@/components/sections/Investors";
import { FAQ } from "@/components/sections/FAQ";
import { getHomePage } from "@/lib/strapi";

export default async function Home() {
  const content = await getHomePage();

  return (
    <main>
      <Hero content={content?.hero} />
      <About content={content?.about} />
      <Portfolio content={content?.portfolio} />
      <HomeStats content={content?.homeStats} />
      <Investors content={content?.investors} />
      <FAQ content={content?.faq} />
    </main>
  );
}
