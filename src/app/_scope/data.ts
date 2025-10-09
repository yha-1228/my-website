interface SkillDetail {
  category: string;
  items: string[];
}

export const skillDetails = [
  {
    category: "フロントエンド開発 / 約6年",
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
    category: "デザイン / 約1.8年",
    items: [
      "UIデザイン",
      "デザインシステム構築",
      "文言やレイアウトのパターン構築",
      "ワイヤーフレーム作成",
      "コーポレートサイトのデザイン",
      "Webアプリケーションのデザイン",
    ],
  },
] as const satisfies SkillDetail[];
