import { type ReactNode } from "react";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { cn } from "@/utils/styling";

import { skillWords } from "./data";

interface IntroductionDlProps {
  title: string;
  description: ReactNode;
}

function IntroductionDl({ title, description }: IntroductionDlProps) {
  return (
    <dl className="flex flex-col gap-10 lg:flex-row lg:gap-0">
      <Heading1
        as="dt"
        className="shrink-0 text-left leading-[1.1] whitespace-nowrap lg:w-72"
      >
        {title}
      </Heading1>
      <dd
        className={cn(
          "flex flex-wrap gap-x-9 gap-y-1.5 align-top leading-[1.6]",
        )}
      >
        {description}
      </dd>
    </dl>
  );
}

const baseItemClassName = cn(
  "inline-flex items-end gap-2 pb-1",
  "w-full md:w-[200px]",
  "*:inline-block",
  "border-b border-b-stone-300",
);

export function Langs() {
  return (
    <>
      <Container>
        <section className="border-t pt-8">
          <IntroductionDl
            title="言語 / FW"
            description={skillWords
              .filter(
                ({ category }) => category === "langs" || category === "fws",
              )
              .map(({ label }) => {
                const splittedLabel = label.split(":");

                const namePart = splittedLabel[0];
                const kikanPart = splittedLabel[1]?.trim();

                return (
                  <span className={baseItemClassName} key={label}>
                    <span className="text-xl">{namePart}</span>
                    {kikanPart && (
                      <span className="text-foreground-secondary text-sm leading-[2.3]">
                        {kikanPart}
                      </span>
                    )}
                  </span>
                );
              })}
          />
        </section>
      </Container>

      <Container>
        <section className="border-t pt-8">
          <IntroductionDl
            title="ツール"
            description={skillWords
              .filter(({ category }) => category === "tools")
              .map(({ label }) => (
                <span className={baseItemClassName} key={label}>
                  <span className="text-xl">{label}</span>
                </span>
              ))}
          />
        </section>
      </Container>
    </>
  );
}
