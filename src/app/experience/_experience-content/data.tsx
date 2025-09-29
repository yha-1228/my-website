import { type ReactNode } from "react";

import { type Project } from "@/api/models/project";

import { includesMany } from "./utils";

export const typeNameMap = {
  "main-company-1": "システム開発会社",
  "main-freelance": "自営業",
  sub: "副業",
} as const;

type Type = keyof typeof typeNameMap;

export const sortedTypes = [
  "main-freelance",
  "main-company-1",
  "sub",
] as const satisfies Type[];

export const typeKikanMap = {
  "main-company-1": "2019年4月 - 2023年8月",
  "main-freelance": "2023年9月 - 現在",
  sub: null,
} as const satisfies Record<Type, string | null>;

export interface Experience {
  type: Type;
  kikan: string;
  title: ReactNode;
  projectCompanyName: ReactNode | null;
  description: ReactNode | null;
}

function createExperience(project: Project): Experience {
  const tagLabels = project.tags.map((tag) => tag.label);

  let type: Type | undefined = undefined;

  if (includesMany(tagLabels, ["正社員", "フルタイム"])) {
    type = "main-company-1";
  }

  if (includesMany(tagLabels, ["業務委託", "フルタイム"])) {
    type = "main-freelance";
  }

  if (includesMany(tagLabels, ["業務委託", "副業"])) {
    type = "sub";
  }

  return {
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
            <b>言語/FW:</b> {project.langAndFws}
          </p>
          <p>
            <b>ツール:</b> {project.tools}
          </p>
        </div>
      </>
    ),
    // TODO: 要修正
    type: type as Type,
  };
}

export function getAllExperiences(projects: Project[]): Experience[] {
  return projects.map((project) => createExperience(project));
}
