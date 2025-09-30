import { type Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLink } from "@/components/ui/styled/text-link";
import { SITE_TITLE } from "@/constants";
import { TransitionUpdateProvider } from "@/contexts/transition-context";
import {
  type JobCategory,
  parseSearchParams,
} from "@/features/experience/query";
import { routes } from "@/routes";
import { entriesOf } from "@/utils/object";

import { ExperienceContent } from "./_experience-content";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "./_experience-content/toggle-group";

const jobCategoryLabelMap = {
  main: "フルタイム",
  sub: "副業",
} as const satisfies Record<JobCategory, string>;

export const metadata: Metadata = {
  title: `${routes.experience.label} | ${SITE_TITLE}`,
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const parsedSearchParams = await parseSearchParams(searchParams);

  return (
    <TransitionUpdateProvider>
      <div className="py-14">
        <Container className="md:max-w-(--breakpoint-md)">
          <section>
            <div className="flex flex-col gap-4 text-center">
              <Heading1>{routes.experience.label}</Heading1>
              <p className="text-foreground-secondary">
                詳細なスキルシートについては
                <TextLink
                  href={routes.contact.href}
                  as={Link}
                  className="text-foreground-primary"
                  withUnderline
                >
                  お問い合わせ
                </TextLink>
                からご連絡ください。
              </p>
            </div>
            <ToggleGroup className="mx-auto mt-10">
              {entriesOf(jobCategoryLabelMap).map(([value, label]) => (
                <ToggleGroupItem
                  key={value}
                  checked={parsedSearchParams === value}
                  href={`${routes.experience.href}?jobCategory=${value}`}
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <ExperienceContent parsedSearchParams={parsedSearchParams} />
          </section>
        </Container>
      </div>
    </TransitionUpdateProvider>
  );
}
