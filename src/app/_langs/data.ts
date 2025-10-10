type SkillWord =
  | { label: string; kikan: string; category: "langOrFw" }
  | { label: string; category: "tools" };

export const skillWords = [
  { category: "langOrFw", label: "TypeScript", kikan: "約4年" },
  { category: "langOrFw", label: "React", kikan: "約4年" },
  { category: "langOrFw", label: "Next.js", kikan: "約2年" },
  { category: "langOrFw", label: "HTML / CSS", kikan: "約6年" },
  { category: "langOrFw", label: "Sass", kikan: "約2年" },
  { category: "langOrFw", label: "Tailwind CSS", kikan: "約1年強" },
  { category: "langOrFw", label: "JavaScript", kikan: "約6年" },
  { category: "langOrFw", label: "jQuery", kikan: "約1年" },
  { category: "langOrFw", label: "Node.js", kikan: "約1年半強" },
  { category: "langOrFw", label: "PHP", kikan: "約2年" },
  { category: "langOrFw", label: "Express", kikan: "約1年半強" },
  { category: "langOrFw", label: "SQL", kikan: "約2年" },

  { category: "tools", label: "Visual Studio Code" },
  { category: "tools", label: "Cursor" },
  { category: "tools", label: "Figma" },
  { category: "tools", label: "draw.io" },
  { category: "tools", label: "FigJam" },
  { category: "tools", label: "Miro" },
  { category: "tools", label: "Notion" },
  { category: "tools", label: "Jira" },
  { category: "tools", label: "Asana" },
  { category: "tools", label: "Redmine" },
  { category: "tools", label: "GitHub" },
  { category: "tools", label: "Bitbucket" },
] as const satisfies SkillWord[];
