import { type ReactNode } from "react";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { cn, cx } from "@/utils/styling";

import { skillWords } from "./data";

interface IntroductionSectionProps {
  heading: string;
  children: ReactNode;
}

function IntroductionSection({ heading, children }: IntroductionSectionProps) {
  return (
    <section
      className={cx(
        "border-t pt-8",
        "flex flex-col gap-10 lg:flex-row lg:gap-0",
      )}
    >
      <Heading1 className="shrink-0 text-left leading-[1.1] whitespace-nowrap lg:w-72">
        {heading}
      </Heading1>
      <div
        className={cx(
          "grid gap-x-4 gap-y-1.5 sm:gap-x-9",
          "grid-cols-2 md:grid-cols-3",
          "w-full leading-[1.6]",
        )}
      >
        {children}
      </div>
    </section>
  );
}

const baseItemClassName = cx(
  "inline-flex items-end justify-between gap-2 pb-1",
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
                <span className="inline-block text-xl">{label}</span>
                <span className="text-foreground-secondary hidden text-sm leading-[2.3] sm:inline-block">
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
            .map(({ label, extraClassName }) => (
              <span
                className={cn(baseItemClassName, extraClassName)}
                key={label}
              >
                <span className="inline-block text-xl">{label}</span>
              </span>
            ))}
        </IntroductionSection>
      </Container>
    </>
  );
}
