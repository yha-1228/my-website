import { type AnyFunction } from "./types/utils";

export interface Route {
  href: string | AnyFunction<string>;
  label?: string;
  protected: boolean;
  hierarchy: number;
}

export const routes = {
  index: {
    href: "/",
    label: "トップ",
    hierarchy: 1,
    protected: false,
  },
  experience: {
    href: "/experience",
    label: "職務経歴",
    hierarchy: 1,
    protected: false,
  },
  "portfolio/[id]": {
    href: <T extends string>(id: T) => `/portfolio/${id}` as const,
    hierarchy: 2,
    protected: true,
  },
  contact: {
    href: "/contact",
    label: "お問い合わせ",
    hierarchy: 1,
    protected: false,
  },
  blog: {
    href: "/blog",
    label: "ブログ",
    hierarchy: 1,
    protected: false,
  },
} as const satisfies Record<string, Route>;
