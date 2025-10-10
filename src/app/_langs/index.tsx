import { type ReactNode } from "react";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { cn } from "@/utils/styling";

import { skillWords } from "./data";

interface IntroductionDlProps {
  heading: string;
  children: ReactNode;
}

function IntroductionSection({ heading, children }: IntroductionDlProps) {
  return (
    <section
      className={cn(
        "border-t pt-8",
        "flex flex-col gap-10 lg:flex-row lg:gap-0",
      )}
    >
      <Heading1 className="shrink-0 text-left leading-[1.1] whitespace-nowrap lg:w-72">
        {heading}
      </Heading1>
      <div
        className={cn(
          "grid gap-x-9 gap-y-1.5",
          "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
          "w-full leading-[1.6]",
        )}
      >
        {children}
      </div>
    </section>
  );
}

const baseItemClassName = cn(
  "inline-flex items-end justify-between gap-2 pb-1",
  "*:inline-block",
  "border-b border-b-stone-300",
);

export function Langs() {
  return (
    <>
      <Container>
        <IntroductionSection heading="言語 / FW">
          {skillWords
            .filter((skillWord) => skillWord.category === "langOrFw")
            .map(({ label, kikan }) => (
              <span className={baseItemClassName} key={label}>
                <span className="text-xl">{label}</span>
                <span className="text-foreground-secondary text-sm leading-[2.3]">
                  {kikan}
                </span>
              </span>
            ))}
        </IntroductionSection>
      </Container>

      <Container>
        <IntroductionSection heading="ツール">
          {skillWords
            .filter((skillWord) => skillWord.category === "tools")
            .map(({ label }) => (
              <span className={baseItemClassName} key={label}>
                <span className="text-xl">{label}</span>
              </span>
            ))}
        </IntroductionSection>
      </Container>
    </>
  );
}
