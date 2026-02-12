import { type Project } from "@/api/models/project";
import { someIncludes } from "@/utils/some-includes";

export function isDev(project: Project) {
  return someIncludes(project.roles, ["開発", "FE開発"]);
}

export function isDesign(project: Project) {
  return someIncludes(project.roles, ["UIデザイン", "グラフィックデザイン"]);
}

export function formatTitleWithNo(index: number, title: string) {
  const no = (index + 1).toString().padStart(2, "0");
  return `${no}. ${title}`;
}
