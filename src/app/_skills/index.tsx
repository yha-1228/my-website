import { type ReactNode } from "react";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Heading2 } from "@/components/ui/styled/heading2";
import { cn } from "@/utils/styling";

import {
  CATEGORIES,
  type SkillDetail,
  skillDetails,
  type SkillWord,
  skillWords,
} from "./data";

interface SkillDetailCardProps {
  heading: ReactNode;
  items: SkillDetail["items"];
  className?: string;
}

function SkillDetailCard(props: SkillDetailCardProps) {
  const { heading, items, className } = props;

  return (
    <div
      className={cn(
        "w-full rounded-sm px-5 lg:px-6",
        "shadow-card border border-gray-300 bg-white",
        className,
      )}
    >
      <div className="pt-4 pb-3">
        <h4 className="font-bold">{heading}</h4>
      </div>
      <div
        className={cn(
          "space-y-5 pt-5 pb-8",
          "text-foreground-primary",
          "border-t border-solid border-t-gray-300",
        )}
      >
        <ul className="mt-2 space-y-2.5 text-sm">
          {items.map((item) => (
            <li
              key={item}
              className="bg-[0_0.12rem] bg-[url('/assets/check-circle-fill-color-foreground.svg')] bg-[length:18px_18px] [background-position:0px_2px] bg-no-repeat ps-[1.75rem] leading-[1.6]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ----------------------------------------

const skillWordCategoryHeadingMap = {
  fe: "フロントエンド",
  be: "バックエンド",
  tools: "ツール等",
} as const satisfies Record<SkillWord["category"], string>;

export function Skills() {
  return (
    <>
      <div className="bg-gray-100 py-14">
        <Container>
          <Heading1>言語/FW等</Heading1>
          <div className="mt-8 space-y-3 sm:flex sm:space-y-0 sm:space-x-8 sm:*:w-1/3">
            {CATEGORIES.map((category) => {
              const filteredSkillWordsByCategory = skillWords.filter(
                (s) => s.category === category,
              );

              return (
                <section key={category} className="pt-2">
                  <Heading2 className="mt-1 mb-2 text-2xl sm:mb-3">
                    {skillWordCategoryHeadingMap[category]}
                  </Heading2>

                  <ul className="leading-loose">
                    {filteredSkillWordsByCategory.map((s) => (
                      <li
                        key={s.label}
                        className="inline first:*:[[data-separator]]:hidden"
                      >
                        <span
                          data-separator
                          aria-hidden="true"
                          className="text-foreground-secondary"
                        >
                          {` / `}
                        </span>
                        <span
                          lang="en"
                          className={cn(
                            "text-lg",
                            s.strong &&
                              "font-extrabold [background:linear-gradient(transparent_75%,var(--color-accent)_75%)]",
                          )}
                        >
                          {s.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </Container>
      </div>

      <div className="bg-gray-100 pt-3">
        <Container>
          <hr className="bg-foreground-placeholder h-px w-full border-0" />
        </Container>
      </div>

      <div className="bg-gray-100 py-14">
        <Container>
          <Heading1>提供可能な業務</Heading1>
          <ul className="mt-8 space-y-6 lg:flex lg:flex-wrap lg:justify-between lg:space-y-0 lg:gap-x-[16px] lg:gap-y-[20px]">
            {skillDetails.map((skillDetail) => (
              <li
                key={skillDetail.category}
                className="lg:flex lg:w-[calc(50%-calc(16px/2))]"
              >
                <SkillDetailCard
                  heading={skillDetail.category}
                  items={skillDetail.items}
                />
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
