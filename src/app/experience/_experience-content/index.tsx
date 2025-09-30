import { getProjects } from "@/api/endpoints/project";

import { Client } from "./index.client";

export async function ExperienceContent() {
  const { contents: projects } = await getProjects();

  return <Client projects={projects} />;
}
