"use client";

import { Heading2 } from "@/components/ui/styled/heading2";
import { useTransitionUpdateContext } from "@/contexts/transition-context";
import { cn } from "@/utils/styling";

import {
  type Experience,
  sortedTypes,
  typeKikanMap,
  typeNameMap,
} from "./data";
import { Timeline, type TimelineItem } from "./timeline";

export function Client({ experiences }: { experiences: Experience[] }) {
  const { isPending } = useTransitionUpdateContext();

  return (
    <div
      className={cn(
        "mt-10 space-y-12",
        cn(
          "transition-opacity duration-200 ease-out",
          isPending ? "opacity-30" : "opacity-100",
        ),
      )}
    >
      {sortedTypes
        .filter((type) => {
          const experienceTypes = experiences.map(({ type }) => type);
          return experienceTypes.includes(type);
        })
        .map((type) => (
          <section className="space-y-5" key={type}>
            <div>
              <Heading2>{typeNameMap[type]}</Heading2>
              {typeKikanMap[type] && (
                <div className="text-foreground-secondary mt-6 text-sm">
                  {typeKikanMap[type]}
                </div>
              )}
            </div>
            <Timeline
              items={experiences
                .filter((experience) => experience.type === type)
                .map((experience) => {
                  const { kikan, title, projectCompanyName, description } =
                    experience;

                  const heading = projectCompanyName ? (
                    <>
                      {title} <br />
                      <div className="text-foreground-primary mt-2 text-lg font-normal">
                        {projectCompanyName}
                      </div>
                    </>
                  ) : (
                    title
                  );

                  const item: TimelineItem = {
                    point: kikan,
                    heading: heading,
                    content: description,
                  };

                  return item;
                })}
            />
          </section>
        ))}
    </div>
  );
}
