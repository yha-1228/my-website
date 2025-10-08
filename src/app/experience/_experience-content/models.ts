import { type Project } from "@/api/models/project";

export const sortedTypes = [
  "main-freelance",
  "main-company-1",
  "sub",
] as const satisfies Array<Project["type"]>;

export const typeNameMap = {
  "main-company-1": "フルタイム / 正社員",
  "main-freelance": "フルタイム / 自営業",
  sub: "副業",
} as const satisfies Record<Project["type"], string>;

export const typeKikanMap = {
  "main-company-1": "2019年4月 - 2023年8月",
  "main-freelance": "2023年9月 - 現在",
  sub: null,
} as const satisfies Record<Project["type"], string | null>;
