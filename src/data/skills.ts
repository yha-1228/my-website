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
  { category: "fe", label: "Sass", strong: true },
  { category: "fe", label: "Tailwind CSS", strong: true },
  { category: "fe", label: "jQuery" },
  { category: "fe", label: "jotai", strong: true },
  { category: "be", label: "TypeScript", strong: true },
  { category: "be", label: "Node.js", strong: true },
  { category: "be", label: "Express", strong: true },
  { category: "be", label: "PHP" },
  { category: "be", label: "SQL" },
  { category: "tools", label: "Visual Studio Code", strong: true },
  { category: "tools", label: "GitHub", strong: true },
  { category: "tools", label: "Bitbucket", strong: true },
  { category: "tools", label: "Notion", strong: true },
  { category: "tools", label: "Jira", strong: true },
  { category: "tools", label: "Asana" },
  { category: "tools", label: "Redmine" },
  { category: "tools", label: "Figma" },
];

export type Rank = "good" | "normal" | "bad";

export interface SkillDetail {
  category: string;
  items: Array<{ rank: Rank; text: string }>;
}

export const skillDetails: SkillDetail[] = [
  {
    category: "技術的スキル",
    items: [
      {
        rank: "good",
        text: "JSX・CSSを利用したマークアップ",
      },
      {
        rank: "good",
        text: "デザインに柔軟に対応し、機能性・拡張性を備えたコンポーネントライブラリの構築",
      },
      {
        rank: "good",
        text: "動的な変化・UXを両立させたUIの開発",
      },
      {
        rank: "good",
        text: "様々なJavaScriptライブラリの利用経験",
      },
      {
        rank: "good",
        text: "プロジェクト構成・BE連携・認証・コンポーネント設計・Lintをはじめとした初期からのアーキテクチャ設計",
      },
      {
        rank: "good",
        text: "様々な規模・領域・実装パターンに対応した状態管理の設計",
      },
      {
        rank: "good",
        text: "バックエンド・デザインとの連携や提案",
      },
      {
        rank: "normal",
        text: "MVC・クリーンアーキテクチャを参考にしたバックエンドの設計",
      },
    ],
  },
  {
    category: "チーム開発スキル",
    items: [
      { rank: "normal", text: "初級者メンバーの教育" },
      { rank: "normal", text: "教育用Wikiの作成" },
      { rank: "normal", text: "勉強会の開催" },
      { rank: "normal", text: "継続的なコードレビュー" },
      {
        rank: "normal",
        text: "中〜大規模チームにおけるFEリード内の提案や議論",
      },
    ],
  },
];
