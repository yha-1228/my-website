import { type ReactNode } from "react";

import { type Project } from "@/api/models/project";

import { ellipsisTextByComma } from "./utils";

export const sortedTypes = [
  "main-freelance",
  "main-company-1",
  "sub",
] as const satisfies Array<Project["type"]>;

export const typeNameMap = {
  "main-company-1": "システム開発会社",
  "main-freelance": "自営業",
  sub: "副業",
} as const satisfies Record<Project["type"], string>;

export const typeKikanMap = {
  "main-company-1": "2019年4月 - 2023年8月",
  "main-freelance": "2023年9月 - 現在",
  sub: null,
} as const satisfies Record<Project["type"], string | null>;

export interface Experience {
  type: Project["type"];
  kikan: string;
  title: ReactNode;
  projectCompanyName: ReactNode | null;
  description: ReactNode | null;
}

export function getAllExperiences(projects: Project[]): Experience[] {
  return projects.map((project) => ({
    kikan:
      `${project.start} - ${project.end}` +
      (project.blank ? ` (空白期間: ${project.blank})` : ""),
    title: `${project.title} / ${project.role}`,
    projectCompanyName: null,
    description: (
      <>
        <div
          className="space-y-2.5"
          dangerouslySetInnerHTML={{ __html: project.descriptionContent || "" }}
        />
        <div className="mt-4 space-y-1">
          <p>
            <b>言語/FW:</b> {ellipsisTextByComma(project.langAndFws, 3)}
          </p>
          <p>
            <b>ツール:</b> {ellipsisTextByComma(project.tools, 3)}
          </p>
        </div>
      </>
    ),
    type: project.type,
  }));
}
