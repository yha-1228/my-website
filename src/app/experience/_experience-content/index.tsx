import { Heading2 } from "@/components/ui/styled/heading2";
import { routes } from "@/routes";
import { entriesOf } from "@/utils/object";

import {
  type Experience,
  sortedTypes,
  typeKikanMap,
  typeNameMap,
} from "./data";
import { Timeline, type TimelineItem } from "./timeline";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

export type JobCategory = "main" | "sub";

const jobCategoryLabelMap = {
  main: "フルタイム",
  sub: "副業",
} as const satisfies Record<JobCategory, string>;

export function ExperienceContent({
  experiences,
  initialSelectedValue,
}: {
  experiences: Experience[];
  initialSelectedValue: JobCategory;
}) {
  return (
    <>
      <ToggleGroup
        className="mx-auto mt-10"
        initialSelectedValue={initialSelectedValue}
      >
        {entriesOf(jobCategoryLabelMap).map(([value, label]) => (
          <ToggleGroupItem
            key={value}
            value={value}
            href={`${routes.experience.href}?jobCategory=${value}`}
          >
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="mt-10 space-y-12">
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
    </>
  );
}
