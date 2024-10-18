import { FlotiqApi, Project, ProjectList } from "fqapi-ts-tst";

type ProjectFilter = {
  slug?: {
    type: string,
    filter: string
  },
  status?: {
    type: string,
    filter: "draft"|"public"
  }
}

export async function fetchAllProjects(draftMode?: boolean): Promise<ProjectList> {
  const flotiq = new FlotiqApi(process.env.FLOTIQ_API_KEY)
  const filters: ProjectFilter = {};

  if(!draftMode) {
    filters.status = {
      type: 'equals',
      filter: 'public'
    }
  }

  return flotiq.ProjectAPI.list({
    limit: 100,
    filters: JSON.stringify(filters)
  })
}

export async function fetchProjectBySlug(slug: string, draftMode?: boolean): Promise<Project | undefined> {
  const flotiq = new FlotiqApi(process.env.FLOTIQ_API_KEY);
  const filters: ProjectFilter = {
    slug: {
      type: 'equals',
      filter: slug,
    }
  }

  if (!draftMode) {
    filters.status = {
      type: 'equals',
      filter: 'public'
    }
  }

  const projects = await flotiq.ProjectAPI.list({
    limit: 1,
    filters: JSON.stringify(filters)
  });
  return projects.data?.[0];
}