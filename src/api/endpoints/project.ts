import { type MicroCMSQueries } from "microcms-js-sdk";

import {
  type GetProjectResponse,
  getProjectResponseSchema,
  type GetProjectsResponse,
  getProjectsResponseSchema,
} from "../models/project";
import { client } from "./_microcms";

export async function getProjects(
  queries?: MicroCMSQueries,
): Promise<GetProjectsResponse> {
  const response = await client.getList({ endpoint: "projects", queries });

  return getProjectsResponseSchema.parse(response);
}

export async function getProject(id: string): Promise<GetProjectResponse> {
  const response = await client.getListDetail({
    endpoint: "projects",
    contentId: id,
  });

  return getProjectResponseSchema.parse(response);
}
