import { type Tag } from "@/api/models/portfolio-content";

export function groupTags(tags: Tag[]) {
  return {
    methodTags: tags.filter((tag) => tag.category[0] === "手法"),
    projectTags: tags.filter((tag) => tag.category[0] === "案件"),
    uxLayerTags: tags.filter((tag) => tag.category[0] === "UX階層"),
    assignTags: tags.filter((tag) => tag.category[0] === "参画"),
    jobTypeTags: tags.filter((tag) => tag.category[0] === "稼働"),
  };
}
