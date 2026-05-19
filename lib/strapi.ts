export type CaptionedImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type PropertyCard = {
  displayId: string;
  slug: string;
  name: string;
  location: string;
  description: string;
  image: CaptionedImage;
};

export type StatItem = {
  label: string;
  target: number;
  suffix?: string;
  image: CaptionedImage;
};

export type QaItem = {
  question: string;
  answer: string;
};

export type HeroContent = {
  wordmark: string;
  subtitle?: string;
  paragraph1: string;
  paragraph2?: string;
  heroImage: CaptionedImage;
};

export type AboutContent = {
  heading: string;
  paragraph1: string;
  paragraph2?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image1: CaptionedImage;
  image2: CaptionedImage;
};

export type PortfolioContent = {
  heading: string;
  intro?: string;
  properties: PropertyCard[];
};

export type HomeStatsContent = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  stats: StatItem[];
};

export type InvestorsContent = {
  marker?: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  image: CaptionedImage;
};

export type FaqContent = {
  marker?: string;
  heading: string;
  items: QaItem[];
  footerText?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type HomePageContent = {
  hero: HeroContent;
  about: AboutContent;
  portfolio: PortfolioContent;
  homeStats: HomeStatsContent;
  investors: InvestorsContent;
  faq: FaqContent;
};

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://confident-frogs-94687f188e.strapiapp.com";

const HOME_POPULATE = [
  "populate[hero][populate]=*",
  "populate[about][populate]=*",
  "populate[portfolio][populate][properties][populate]=*",
  "populate[homeStats][populate][stats][populate]=*",
  "populate[investors][populate]=*",
  "populate[faq][populate]=*",
].join("&");

export async function getHomePage(): Promise<HomePageContent | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/home-page?${HOME_POPULATE}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data as HomePageContent) ?? null;
  } catch {
    return null;
  }
}
