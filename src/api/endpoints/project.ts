import { type MicroCMSQueries } from "microcms-js-sdk";

import { createListResponseSchema, type ListResponse } from "../models/_zod";
import { type Project, projectSchema } from "../models/project";
import { client } from "./_microcms";

export async function getProjects(
  queries?: MicroCMSQueries,
): Promise<ListResponse<Project>> {
  const response = await client.getList({ endpoint: "projects", queries });

  return createListResponseSchema(projectSchema).parse(response);
}

export async function getProject(id: string): Promise<Project> {
  const response = await client.getListDetail({
    endpoint: "projects",
    contentId: id,
  });

  return projectSchema.parse(response);
}
