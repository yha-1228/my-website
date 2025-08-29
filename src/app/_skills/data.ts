export const CATEGORIES = ["fe", "be", "tools"] as const;

export interface SkillWord {
  label: string;
  strong?: boolean;
  category: (typeof CATEGORIES)[number];
}

export const skillWords: SkillWord[] = [
  { category: "fe", label: "React", strong: true },
  { category: "fe", label: "Next.js", strong: true },
  { category: "fe", label: "TypeScript", strong: true },
  { category: "fe", label: "CSS", strong: true },
  { category: "fe", label: "Sass" },
  { category: "fe", label: "Tailwind CSS", strong: true },
  { category: "fe", label: "jQuery" },
  { category: "fe", label: "jotai" },
  { category: "be", label: "TypeScript", strong: true },
  { category: "be", label: "Node.js" },
  { category: "be", label: "Express" },
  { category: "be", label: "PHP" },
  { category: "be", label: "SQL" },
  { category: "tools", label: "Visual Studio Code", strong: true },
  { category: "tools", label: "Cursor", strong: true },
  { category: "tools", label: "Figma", strong: true },
  { category: "tools", label: "GitHub", strong: true },
  { category: "tools", label: "Bitbucket" },
  { category: "tools", label: "Notion" },
  { category: "tools", label: "Jira" },
  { category: "tools", label: "Asana" },
  { category: "tools", label: "Redmine" },
];

export interface SkillDetail {
  category: string;
  items: string[];
}

export const skillDetails = [
  {
    category: "フロントエンド開発",
    items: [
      "マークアップ",
      "コンポーネントライブラリの構築",
      "状態管理設計",
      "フォーム・バックエンド連携",
      "初期段階からのアーキテクチャ設計",
      "コードレビュー・チーム教育",
    ],
  },
  {
    category: "UIデザイン",
    items: [
      "文言やレイアウトのパターン構築",
      "Figmaを用いた画面デザイン制作・デザインシステム構築",
      "コーポレートサイトデザイン",
      "社内管理画面デザイン",
      "ワイヤーフレーム作成",
    ],
  },
] as const satisfies SkillDetail[];
