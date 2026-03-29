import { type Metadata } from "next";

import { getArticles } from "@/api/endpoints/blog";
import { Container } from "@/components/ui/styled/container";
import { SITE_TITLE } from "@/constants";
import { BaseTemplate } from "@/features/template/base-template";
import { SectionTemplate } from "@/features/template/section-template";

import { PageClient } from "./page.client";

export const metadata: Metadata = {
  title: `ブログ | ${SITE_TITLE}`,
};

export const dynamic = "force-static";

export default async function Page() {
  const articles = await getArticles();

  return (
    <BaseTemplate hasContactBanner>
      <Container className="md:max-w-(--breakpoint-md)">
        <SectionTemplate title="ブログ">
          <PageClient articles={articles} limit={8} />
        </SectionTemplate>
      </Container>
    </BaseTemplate>
  );
}
