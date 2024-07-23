import { fetchAllProjects, fetchProjectBySlug } from "@/lib/api";
import type { Project, ProjectList } from "../../../../flotiqApi/src";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { draftMode } from "next/headers";

export async function generateStaticParams() {
  const allProjects: ProjectList = await fetchAllProjects();
  return allProjects.data?.map((project: Project) => ({
    slug: project.slug,
  })) || [];
}

interface ProjectProps {
  params: {
    slug: string
  };
}

export default async function Project(props: ProjectProps) {
  const { isEnabled } = draftMode();
  const project = await fetchProjectBySlug(props.params.slug, isEnabled);

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 border-b-2 border-gray-600">{project.name}</h1>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Image
            src={`https://api.flotiq.com${project.photos?.[0].url}`}
            alt={project.name}
            className="w-full h-auto rounded"
            width={400}
            height={300}
          />
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{__html: project.description ?? ''}}
            className="prose prose-invert"
          />
        </div>
        <Link href="/">Back</Link>
      </div>
    </main>
  );
}