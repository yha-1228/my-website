import { type ReactNode } from "react";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Heading2 } from "@/components/ui/styled/heading2";
import { splitNode } from "@/components/ui/unstyled/split-node";
import {
  CATEGORIES,
  type Rank,
  type SkillDetail,
  skillDetails,
  type SkillWord,
  skillWords,
} from "@/data/skills";
import { cn } from "@/utils/css/cn";

interface SkillDetailCardProps {
  heading: ReactNode;
  items: SkillDetail["items"];
  accent?: boolean;
  className?: string;
}

const rankIconClassNameMap = {
  good: cn("bg-[url('/assets/check-circle-fill-color-foreground.svg')]"),
  normal: cn("bg-[url('/assets/check-circle-color-foreground.svg')]"),
  bad: cn("bg-[url('/assets/dash-circle-color-foreground.svg')]"),
} as const satisfies { [key in Rank]: string };

function SkillDetailCard(props: SkillDetailCardProps) {
  const { heading, items, className, accent } = props;

  return (
    <div
      className={cn(
        "w-full rounded-lg px-5 lg:px-6",
        "shadow-card bg-white",
        "border-2 border-solid",
        accent ? "border-primary-600" : "border-white",
        className,
      )}
    >
      <div className="pt-4 pb-3">
        <h4 className="font-bold">{heading}</h4>
      </div>
      <div
        className={cn(
          "space-y-5 pt-5 pb-8",
          "text-base-foreground",
          "border-t-base-light-300 border-t border-solid",
        )}
      >
        <ul className="text-base-foreground-weak mt-2 space-y-2.5 text-sm">
          {items.map((item) => (
            <li
              key={item.text}
              className={cn(
                "bg-[0_0.12rem] bg-[length:18px_18px] bg-no-repeat ps-[1.75rem] leading-[1.6]",
                rankIconClassNameMap[item.rank],
              )}
            >
              {item.text}
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
} as const satisfies { [key in SkillWord["category"]]: string };

export function Skills() {
  return (
    <>
      <div className="bg-base-light-100 py-14">
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

                  <div className="leading-loose">
                    {splitNode(
                      filteredSkillWordsByCategory.map((s) => (
                        <span
                          key={s.label}
                          lang="en"
                          style={{
                            background: s.strong
                              ? `linear-gradient(transparent 75%, var(--color-accent) 75%)`
                              : undefined,
                          }}
                          className={cn(
                            "text-lg",
                            s.strong && "font-extrabold",
                          )}
                        >
                          {s.label}
                        </span>
                      )),
                      " / ",
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </Container>
      </div>

      <div className="bg-base-light-100 pt-3">
        <Container>
          <hr className="bg-base-light-400 h-px w-full border-0" />
        </Container>
      </div>

      <div className="bg-base-light-100 py-14">
        <Container>
          <Heading1>提供可能な業務</Heading1>
          <ul className="mt-8 space-y-6 lg:flex lg:flex-wrap lg:justify-between lg:space-y-0 lg:gap-x-[16px] lg:gap-y-[20px]">
            {skillDetails.map((skillDetail, idx) => (
              <li
                key={skillDetail.category}
                className="lg:flex lg:w-[calc(50%-calc(16px/2))]"
              >
                <SkillDetailCard
                  accent={idx === 0}
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
