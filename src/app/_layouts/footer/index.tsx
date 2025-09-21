import Link from "next/link";

import { Container } from "@/components/ui/styled/container";
import { TextLink } from "@/components/ui/styled/text-link";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

import { ExternalTextLink } from "./external-text-link";

interface LinkInterface {
  href: string;
  label: string;
}

const myExternalLinks = [
  {
    href: "https://github.com/yha-1228",
    label: "GitHub",
  },
  {
    href: "https://zenn.dev/yhase_rqp",
    label: "Zenn",
  },
  {
    href: "https://codepen.io/yh10050846",
    label: "Codepen",
  },
] as const satisfies LinkInterface[];

const COPYRIGHT_TEXT = `Yuta Hasegawa © ${new Date().getFullYear()}`;

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("pt-10 pb-14", className)}>
      <Container>
        <div className="flex justify-between">
          <ul className="w-1/2 space-y-2.5 md:flex md:w-auto md:space-y-0 md:space-x-4">
            {myExternalLinks.map((link) => (
              <li key={link.href}>
                <ExternalTextLink
                  className="leading-normal font-bold"
                  href={link.href}
                >
                  {link.label}
                </ExternalTextLink>
              </li>
            ))}
          </ul>
          <ul className="w-1/2 space-y-2.5 md:flex md:w-auto md:space-y-0 md:space-x-4">
            {Object.values(routes)
              .filter((route) => route.hierarchy === 1)
              .map((route) => (
                <li key={route.href}>
                  <TextLink
                    // Linkコンポーネントだと、Basic認証に失敗したあともう一度ダイアログが現れてしまう。
                    // 通常のaタグにして回避する。
                    as={route.protected ? undefined : Link}
                    className="inline-block leading-normal font-bold"
                    href={route.href}
                  >
                    {route.label}
                  </TextLink>
                </li>
              ))}
          </ul>
        </div>
        <div className="border-base-foreground/20 mt-5 border-t border-solid">
          <p className="text-base-foreground/70 pt-5">{COPYRIGHT_TEXT}</p>
        </div>
      </Container>
    </footer>
  );
}
