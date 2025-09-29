import { type ProjectTag } from "@/api/models/project";

export function groupTags(tags: ProjectTag[]) {
  return {
    methodTags: tags.filter((tag) => tag.category[0] === "手法"),
    projectTags: tags.filter((tag) => tag.category[0] === "案件"),
    uxLayerTags: tags.filter((tag) => tag.category[0] === "UX階層"),
    assignTags: tags.filter((tag) => tag.category[0] === "参画"),
    jobTypeTags: tags.filter((tag) => tag.category[0] === "稼働"),
  };
}
