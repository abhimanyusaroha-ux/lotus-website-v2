export type ProjectFact = { label: string; value: string };

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  location: string;
  year: string;
  status: "Completed" | "Pre-Development";
  type: string;
  summary: string;
  deliverables: string[];
  facts: ProjectFact[];
  heroImage: ProjectImage;
  galleryImages: ProjectImage[];
};

const u = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: "fulton-district-mixed-use",
    name: "Fulton District Mixed-Use",
    location: "Fulton Market, Chicago",
    year: "2024",
    status: "Completed",
    type: "Mixed-Use",
    summary:
      "A value-add mixed-use acquisition in Chicago's fastest-growing commercial corridor. Lotus repositioned the asset over fourteen months, modernizing common areas, replacing mechanical systems, and re-tenanting the ground-floor retail. The project completed on schedule and is fully stabilized.",
    deliverables: ["Acquisition", "Repositioning", "Asset Management"],
    facts: [
      { label: "Type", value: "Mixed-Use" },
      { label: "Location", value: "Fulton Market, Chicago" },
      { label: "Status", value: "Completed" },
      { label: "Year Completed", value: "2024" },
      { label: "Scope", value: "14 months · Full repositioning" },
    ],
    heroImage: {
      src: u("photo-1486325212027-8081e485255e"),
      alt: "Fulton District mixed-use exterior, Fulton Market, Chicago",
    },
    galleryImages: [
      {
        src: u("photo-1497366216548-37526070297c"),
        alt: "Fulton District — interior atrium",
      },
      {
        src: u("photo-1497366811353-6870744d04b2"),
        alt: "Fulton District — workspace floor",
      },
      {
        src: u("photo-1497215842964-222b430dc094"),
        alt: "Fulton District — corridor detail",
      },
      {
        src: u("photo-1600210492486-724fe5c67fb0"),
        alt: "Fulton District — facade detail",
      },
      {
        src: u("photo-1600566753376-12c8ab7fb75b"),
        alt: "Fulton District — common area lounge",
      },
      {
        src: u("photo-1502672260266-1c1ef2d93688"),
        alt: "Fulton District — circulation gallery",
      },
      {
        src: u("photo-1505691938895-1758d7feb511"),
        alt: "Fulton District — exterior at dusk",
      },
      {
        src: u("photo-1493809842364-78817add7ffb"),
        alt: "Fulton District — ground-floor retail",
      },
    ],
  },
  {
    slug: "logan-square-multifamily",
    name: "Logan Square Multifamily",
    location: "Logan Square, Chicago",
    year: "2024",
    status: "Completed",
    type: "Multifamily",
    summary:
      "Twenty-four units of transit-adjacent residential, acquired off-market in early 2024. Lotus completed a full interior renovation and lease-up within twelve months. Occupancy reached 96% within sixty days of completion.",
    deliverables: ["Acquisition", "Renovation", "Lease-Up"],
    facts: [
      { label: "Type", value: "Multifamily" },
      { label: "Location", value: "Logan Square, Chicago" },
      { label: "Status", value: "Completed" },
      { label: "Year Completed", value: "2024" },
      { label: "Scope", value: "12 months · Interior renovation + lease-up" },
    ],
    heroImage: {
      src: u("photo-1600596542815-ffad4c1539a9"),
      alt: "Logan Square multifamily exterior, Chicago",
    },
    galleryImages: [
      {
        src: u("photo-1600607687939-ce8a6c25118c"),
        alt: "Logan Square — unit interior",
      },
      {
        src: u("photo-1600566753190-17f0baa2a6c3"),
        alt: "Logan Square — kitchen detail",
      },
      {
        src: u("photo-1600585154526-990dced4db0d"),
        alt: "Logan Square — living room",
      },
      {
        src: u("photo-1493809842364-78817add7ffb"),
        alt: "Logan Square — bedroom interior",
      },
      {
        src: u("photo-1600210492486-724fe5c67fb0"),
        alt: "Logan Square — entryway detail",
      },
      {
        src: u("photo-1600585154340-be6161a56a0c"),
        alt: "Logan Square — stairwell",
      },
      {
        src: u("photo-1502672260266-1c1ef2d93688"),
        alt: "Logan Square — common hallway",
      },
      {
        src: u("photo-1505691938895-1758d7feb511"),
        alt: "Logan Square — building façade",
      },
    ],
  },
  {
    slug: "west-loop-value-add",
    name: "West Loop Value-Add",
    location: "West Loop, Chicago",
    year: "2023",
    status: "Completed",
    type: "Loft Residential",
    summary:
      "A ground-up reposition of an underutilized industrial asset, redeveloped into mixed-use loft residential. The project required a full structural retrofit and façade restoration. Now fully stabilized and cash-flowing.",
    deliverables: ["Ground-Up Development", "Stabilization"],
    facts: [
      { label: "Type", value: "Loft Residential" },
      { label: "Location", value: "West Loop, Chicago" },
      { label: "Status", value: "Completed" },
      { label: "Year Completed", value: "2023" },
      { label: "Scope", value: "Structural retrofit + façade restoration" },
    ],
    heroImage: {
      src: u("photo-1600047509807-ba8f99d2cdde"),
      alt: "West Loop value-add exterior, Chicago",
    },
    galleryImages: [
      {
        src: u("photo-1600210492486-724fe5c67fb0"),
        alt: "West Loop — loft interior",
      },
      {
        src: u("photo-1600566753376-12c8ab7fb75b"),
        alt: "West Loop — exposed brick detail",
      },
      {
        src: u("photo-1600585154340-be6161a56a0c"),
        alt: "West Loop — open floor plan",
      },
      {
        src: u("photo-1486325212027-8081e485255e"),
        alt: "West Loop — façade restoration",
      },
      {
        src: u("photo-1502672260266-1c1ef2d93688"),
        alt: "West Loop — circulation",
      },
      {
        src: u("photo-1497366811353-6870744d04b2"),
        alt: "West Loop — work loft",
      },
      {
        src: u("photo-1493809842364-78817add7ffb"),
        alt: "West Loop — bedroom loft",
      },
      {
        src: u("photo-1600596542815-ffad4c1539a9"),
        alt: "West Loop — exterior at street level",
      },
    ],
  },
  {
    slug: "wicker-park-residential",
    name: "Wicker Park Residential",
    location: "Wicker Park, Chicago",
    year: "2023",
    status: "Completed",
    type: "Residential",
    summary:
      "Nine residential units in one of Chicago's most resilient neighborhoods, acquired and renovated in 2023. The project preserved the building's original masonry while modernizing every interior system. Sold to a long-term hold partner in early 2024.",
    deliverables: ["Acquisition", "Renovation"],
    facts: [
      { label: "Type", value: "Residential" },
      { label: "Location", value: "Wicker Park, Chicago" },
      { label: "Status", value: "Completed" },
      { label: "Year Completed", value: "2023" },
      {
        label: "Scope",
        value: "Masonry preservation + interior modernization",
      },
    ],
    heroImage: {
      src: u("photo-1613490493576-7fde63acd811"),
      alt: "Wicker Park residential exterior, Chicago",
    },
    galleryImages: [
      {
        src: u("photo-1493809842364-78817add7ffb"),
        alt: "Wicker Park — kitchen interior",
      },
      {
        src: u("photo-1502672260266-1c1ef2d93688"),
        alt: "Wicker Park — corridor light",
      },
      {
        src: u("photo-1505691938895-1758d7feb511"),
        alt: "Wicker Park — restored masonry",
      },
      {
        src: u("photo-1600596542815-ffad4c1539a9"),
        alt: "Wicker Park — building façade",
      },
      {
        src: u("photo-1600566753190-17f0baa2a6c3"),
        alt: "Wicker Park — living room",
      },
      {
        src: u("photo-1497215842964-222b430dc094"),
        alt: "Wicker Park — entryway detail",
      },
      {
        src: u("photo-1600585154526-990dced4db0d"),
        alt: "Wicker Park — bedroom interior",
      },
      {
        src: u("photo-1600210492486-724fe5c67fb0"),
        alt: "Wicker Park — exterior at street level",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return projects[0];
  return projects[(idx + 1) % projects.length];
}

export function getPreviousProject(slug: string): Project | null {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx <= 0) return null;
  return projects[idx - 1];
}
