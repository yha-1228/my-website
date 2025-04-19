import { type Metadata } from "next";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Heading2 } from "@/components/ui/styled/heading2";
import { Timeline, type TimelineItem } from "@/components/ui/styled/timeline";
import { type Experience, experiencesOverviewItems } from "@/data/experience";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.experience.label,
};

function experienceToTimelineItem(experience: Experience): TimelineItem {
  const { kikan, title, projectCompanyName, description } = experience;

  const heading = projectCompanyName ? (
    <>
      {title} <br />
      <div className="text-base-foreground mt-2 text-lg font-normal">
        {projectCompanyName}
      </div>
    </>
  ) : (
    title
  );

  return {
    point: kikan,
    heading: heading,
    content: description,
  };
}

export default function Page() {
  return (
    <div className="py-14">
      <Container className="md:max-w-(--breakpoint-md)">
        <section>
          <div className="pb-10 text-center">
            <Heading1>{routes.experience.label}</Heading1>
          </div>
          <div className="space-y-12">
            {experiencesOverviewItems.map((experiencesOverviewItem) => (
              <section
                className="space-y-5"
                key={experiencesOverviewItem.company}
              >
                <div>
                  <Heading2>{experiencesOverviewItem.company}</Heading2>
                  <div className="text-base-foreground-weak mt-6 text-sm">
                    {experiencesOverviewItem.kikan}
                  </div>
                </div>
                <Timeline
                  items={experiencesOverviewItem.experiences.map((experience) =>
                    experienceToTimelineItem(experience),
                  )}
                />
              </section>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
