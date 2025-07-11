import { type ReactNode } from "react";

export const typeNameMap = {
  "main-company-1": "システム開発会社",
  "main-freelance": "自営業",
  sub: "副業",
} as const;

type Type = keyof typeof typeNameMap;

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

export const allExperiences = [
  // 本業 フリーランス
  {
    kikan: "2025年5月 - 現在",
    title: "教育系システム",
    projectCompanyName: "EdTechスタートアップ",
    description: (
      <>
        <p>公教育の業務を支援するシステムの開発。</p>
        <p>
          <b>技術:</b> React 19, Next.js 15 (App Router), TypeScript, Tailwind
          CSS, React Native
        </p>
      </>
    ),
    type: "main-freelance",
  },
  {
    kikan: "2024年8月 - 2025年3月",
    title: "株取引サービス/ポータルサイト (新規開発)",
    projectCompanyName: "受託開発会社",
    description: (
      <>
        <p>
          株取引サービスを中心に多様な機能を持つ新規Webサービスの立ち上げ。エンドユーザー向け画面・社内向け画面の両者にてレビュアーを中心に従事し、その他一部機能の開発を担当。
        </p>
        <p>
          <b>技術:</b> React 19, Next.js 15 (App Router), TypeScript, Tailwind
          CSS, Radix UI
        </p>
      </>
    ),
    type: "main-freelance",
  },
  {
    kikan: "2023年9月中旬 - 2024年6月",
    title: "求人掲載システム (リニューアル)",
    projectCompanyName: "大手受託開発会社",
    description: (
      <>
        <p>
          大手アルバイト求人サイトの内部で稼働している求人掲載システムのリプレース案件。HR事業会社の従業員が使う社内管理画面・求人掲載企業向けのユーザー管理画面の2種。
        </p>
        <p>
          PJの合計は100名超であり、フロントエンドは40名超の大規模案件。その中でフロントエンド開発のリードグループとして参画した。
        </p>
        <p>
          <b>技術:</b> React 18, Next.js 13 (Pages Router), TypeScript, Sass
        </p>
      </>
    ),
    type: "main-freelance",
  },

  // 本業 1社目
  {
    kikan: "2022年5月初旬 - 2023年7月",
    title: "SFAツール (新規開発)",
    projectCompanyName: null,
    description: (
      <>
        <p>
          大手食品メーカー向けSFAツールの新規開発案件にフロントエンド開発メンバーとして参画。
        </p>
        <p>
          顧客の営業活動を改善するため、APIは既存のシステムから切り出し、UIはReactで新規開発した。主にWebviewによるiOS
          Appとして閲覧する。
        </p>
        <p>
          <b>技術:</b> React 18, TypeScript, Sass, FullCalendar
        </p>
      </>
    ),
    type: "main-company-1",
  },
  {
    kikan: "2020年12月 - 2022年5月初旬",
    title: "請求書管理アプリ (新規開発)",
    projectCompanyName: null,
    description: (
      <>
        <p>
          インボイス制度対応のため、医療業界向けの請求書管理ツール開発案件に開発メンバーとして参画。
        </p>
        <p>
          特定の医療器具業界は紙で請求書を管理していたが、インボイス制度の施行に伴い基準を満たす請求書をデジタルで管理することが必要になり、Webアプリの新規開発が確定。
        </p>
        <p>
          <b>技術:</b> React 17, TypeScript, CSS Modules, Node.js, Express 4,
          SQL
        </p>
      </>
    ),
    type: "main-company-1",
  },
  {
    kikan: "2020年8月 - 2020年11月",
    title: "勤怠・締め日管理アプリ (新規開発)",
    projectCompanyName: null,
    description: (
      <>
        <p>
          インフラ業界向け勤怠管理ツール開発案件に開発メンバー・テスターとして参画。
        </p>
        <p>
          勤怠管理と締め日の管理を行う小規模なWebアプリ。また、簡素なSQL生成ツールも付属する。
        </p>
        <p>
          <b>技術:</b> jQuery 3, HTML, CSS, Spring Boot, Bootstrap 4
        </p>
      </>
    ),
    type: "main-company-1",
  },
  {
    kikan: "2020年5月 - 2020年6月",
    title: "以下同様",
    projectCompanyName: null,
    description: null,
    type: "main-company-1",
  },
  {
    kikan: "2019年7月 - 2020年1月",
    title: "建物維持管理アプリ (保守)",
    projectCompanyName: null,
    description: (
      <>
        <p>
          建設業界の建物維持アプリの保守案件に、バグ調査・テスター・開発を行う保守中心のメンバーとして参画。
        </p>
        <p>
          設備管理企業の従業員が建物の点検作業に使う、WebブラウザとWindowsの両方に対応するアプリケーションの保守作業。Web版の担当だが、Windows版の担当者も交えて保守とテストを中心に参画し、一部開発も実施した。
        </p>
        <p>
          <b>技術:</b> jQuery1, HTML, CSS, PHP, SQL, CentOS
        </p>
      </>
    ),
    type: "main-company-1",
  },

  // 副業
  {
    kikan: "2025年6月中旬 - 現在",
    title: "デザイン会社コーポレートサイト",
    projectCompanyName: null,
    description: (
      <>
        <p>Web制作やデザインを行う会社のコーポレートサイト開発。</p>
        <p>
          <b>技術:</b> React, Next.js, TypeScript, Tailwind CSS, microCMS
        </p>
      </>
    ),
    type: "sub",
  },
] as const satisfies Experience[];
