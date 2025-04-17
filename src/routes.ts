import { type AnyFunction } from "./types/utils";

export interface Route {
  href: string | AnyFunction<string>;
  label?: string;
  routes?: Record<string, Route>;
}

export const routes = {
  index: {
    href: "/",
    label: "トップ",
  },
  experience: {
    href: "/experience",
    label: "職務経歴",
  },
  contact: {
    href: "/contact",
    label: "お問い合わせ",
  },
  blog: {
    href: "/blog",
    label: "ブログ",
    routes: {
      ":id": {
        href: (id: string) => `/blog/${id}`,
      },
    },
  },
} as const satisfies Record<string, Route>;
