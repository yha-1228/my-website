interface SkillWord {
  label: string;
  category: "langs" | "fws" | "tools";
  accent?: true;
}

export const skillWords: SkillWord[] = [
  { category: "langs", label: "TypeScript: 約4年", accent: true },
  { category: "fws", label: "React: 約4年" },
  { category: "fws", label: "Next.js: 約2年" },

  { category: "langs", label: "HTML / CSS: 約6年" },
  { category: "langs", label: "Sass: 約2年" },
  { category: "fws", label: "Tailwind CSS: 約1年強" },

  { category: "langs", label: "JavaScript: 約6年" },
  { category: "fws", label: "jQuery: 約1年" },

  { category: "langs", label: "Node.js: 約1年半強" },
  { category: "langs", label: "PHP: 約2年" },
  { category: "fws", label: "Express: 約1年半強" },
  { category: "langs", label: "SQL: 約2年" },

  { category: "tools", label: "Visual Studio Code" },
  { category: "tools", label: "Cursor" },
  { category: "tools", label: "Figma, FigJam" },
  { category: "tools", label: "draw.io" },
  { category: "tools", label: "Miro" },
  { category: "tools", label: "Notion" },
  { category: "tools", label: "Jira" },
  { category: "tools", label: "Asana" },
  { category: "tools", label: "Redmine" },
  { category: "tools", label: "GitHub" },
  { category: "tools", label: "Bitbucket" },
];
