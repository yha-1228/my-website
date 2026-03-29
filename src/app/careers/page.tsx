import { type Metadata } from "next";

import { Container } from "@/components/ui/styled/container";
import { TextLinkNext } from "@/components/ui/styled/text-link-next";
import { SITE_TITLE } from "@/constants";
import { BaseTemplate } from "@/features/template/base-template";
import { SectionTemplate } from "@/features/template/section-template";

import { ExperienceContent } from "./_experience-content";
import { ExperienceToggle } from "./_experience-toggle";

export const metadata: Metadata = {
  title: `職務経歴 | ${SITE_TITLE}`,
};

export const dynamic = "force-static";

export default function Page() {
  return (
    <BaseTemplate insertLogoutBanner hasContactBanner>
      <Container className="md:max-w-(--breakpoint-md)">
        <SectionTemplate
          title="職務経歴"
          description={
            <>
              詳細なスキルシートについては
              <TextLinkNext
                href="/contact"
                className="text-foreground-primary"
                withUnderline
              >
                お問い合わせ
              </TextLinkNext>
              からご連絡ください。
            </>
          }
        >
          <div className="flex flex-col gap-8">
            <ExperienceToggle className="z-header sticky top-[80px]" />
            <ExperienceContent />
          </div>
        </SectionTemplate>
      </Container>
    </BaseTemplate>
  );
}
