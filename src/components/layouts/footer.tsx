import { routes } from "@/routes";
import { cn } from "@/utils/css/cn";

import { Container } from "../ui/styled/container";
import { ExternalTextLink, TextLink } from "../ui/styled/text-link";

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
    <footer className={cn("pb-14 pt-10", className)}>
      <Container>
        <div className="flex justify-between">
          <ul className="w-1/2 space-y-2.5 md:flex md:w-auto md:space-x-4 md:space-y-0">
            {myExternalLinks.map((link) => (
              <li key={link.href}>
                <ExternalTextLink className="font-bold" href={link.href}>
                  {link.label}
                </ExternalTextLink>
              </li>
            ))}
          </ul>
          <ul className="w-1/2 space-y-2.5 md:flex md:w-auto md:space-x-4 md:space-y-0">
            {Object.values(routes).map((route) => (
              <li key={route.href}>
                <TextLink className="font-bold" href={route.href}>
                  {route.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 border-t border-solid border-base-foreground/20">
          <p className="pt-5 text-base-foreground/70">{COPYRIGHT_TEXT}</p>
        </div>
      </Container>
    </footer>
  );
}
