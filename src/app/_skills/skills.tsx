import { type ReactNode } from "react";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Heading2 } from "@/components/ui/styled/heading2";
import { splitNode } from "@/components/ui/unstyled/split-node";
import {
  CATEGORIES,
  skillDetails,
  skillWords,
  type Rank,
  type SkillDetail,
  type SkillWord,
} from "@/data/skills";
import { tailwindFullConfig } from "@/tailwind-config";
import { cn } from "@/utils/css/cn";

interface SkillDetailCardProps {
  heading: ReactNode;
  items: SkillDetail["items"];
  accent?: boolean;
  className?: string;
}

const rankIconClassNameMap: { [key in Rank]: string } = {
  good: "bg-[url('/assets/check-circle-fill-color-foreground.svg')]",
  normal: "bg-[url('/assets/check-circle-color-foreground.svg')]",
  bad: "bg-[url('/assets/dash-circle-color-foreground.svg')]",
};

function SkillDetailCard(props: SkillDetailCardProps) {
  const { heading, items, className, accent } = props;

  return (
    <div
      className={cn(
        "w-full rounded-lg px-5 lg:px-6",
        "bg-white shadow-card",
        "border-2 border-solid",
        accent ? "border-primary-600" : "border-white",
        className,
      )}
    >
      <div className="pb-3 pt-4">
        <h4 className="font-bold">{heading}</h4>
      </div>
      <div
        className={cn(
          "space-y-5 pb-8 pt-5",
          "text-base-foreground",
          "border-t border-solid border-t-base-light-300",
        )}
      >
        <ul className="mt-2 space-y-2.5 text-sm text-base-foreground-weak">
          {items.map((item) => (
            <li
              key={item.text}
              className={cn(
                "bg-[length:18px_18px] bg-[0_0.12rem] bg-no-repeat ps-[1.75rem] leading-[1.6]",
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

const skillWordCategoryHeadingMap: { [key in SkillWord["category"]]: string } =
  {
    fe: "フロントエンド",
    be: "バックエンド",
    tools: "ツール等",
  };

export function Skills() {
  return (
    <>
      <div className="bg-base-light-100 py-14">
        <Container>
          <Heading1>言語/FW等</Heading1>
          <div className="mt-8 space-y-3 sm:flex sm:space-x-8 sm:space-y-0 sm:[&>*]:w-1/3">
            {CATEGORIES.map((category) => {
              const filteredSkillWordsByCategory = skillWords.filter(
                (s) => s.category === category,
              );

              return (
                <section key={category} className="pt-2">
                  <Heading2 className="mb-2 mt-1 text-2xl sm:mb-3">
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
                              ? // @ts-expect-error 拡張したtailwind config
                                `linear-gradient(transparent 75%, ${tailwindFullConfig.theme.colors.accent} 75%)`
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
          <hr className="h-px w-full border-0 bg-base-light-400" />
        </Container>
      </div>

      <div className="bg-base-light-100 py-14">
        <Container>
          <Heading1>提供可能な業務</Heading1>
          <ul className="mt-8 space-y-6 lg:flex lg:flex-wrap lg:justify-between lg:gap-x-[16px] lg:gap-y-[20px] lg:space-y-0">
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
