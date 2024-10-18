import { fetchAllProjects } from "@/lib/api";
import { Project } from "fqapi-ts-tst";
import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";

export default async function Home() {
  const { isEnabled } = draftMode();
  const projects = await fetchAllProjects(isEnabled);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 border-b-2 border-gray-600">Our Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {
          projects.data?.map((project: Project) => (
            <article key={project.id}>
              <Link href={`/projects/${project.slug}`}>
                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                <Image
                  src={`https://api.flotiq.com${project.photos?.[0].url}`}
                  alt={project.name}
                  className="w-full h-auto rounded"
                  width={400}
                  height={300}
                />
              </Link>
            </article>
          ))
        }
      </div>
    </main>
  );
}
