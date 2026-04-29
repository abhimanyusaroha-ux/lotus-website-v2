import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  projects,
  getProjectBySlug,
  getNextProject,
  getPreviousProject,
} from "@/data/projects";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectPanel } from "@/components/sections/ProjectPanel";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { NextProject } from "@/components/sections/NextProject";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found · Lotus Property Group" };
  }
  return {
    title: `${project.name} · Lotus Property Group`,
    description: project.summary.slice(0, 158),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const previous = getPreviousProject(slug);

  return (
    <main>
      <ProjectHero project={project} />
      <ProjectPanel project={project} />
      <ProjectGallery project={project} />
      <NextProject project={next} previous={previous} />
    </main>
  );
}
