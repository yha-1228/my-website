import { type Project } from "@/api/models/project";
import { someIncludes } from "@/utils/some-includes";

export function isDev(project: Project) {
  return someIncludes(project.roles, ["開発", "FE開発"]);
}

export function isDesign(project: Project) {
  return someIncludes(project.roles, ["UIデザイン", "グラフィックデザイン"]);
}
