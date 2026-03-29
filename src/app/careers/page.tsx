import { type Metadata } from "next";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLinkNext } from "@/components/ui/styled/text-link-next";
import { SITE_TITLE } from "@/constants";
import { LogoutBanner } from "@/features/auth/logout-banner";
import { ContactLinkBanner } from "@/features/contact-link-banner";

import { ExperienceContent } from "./_experience-content";
import { ExperienceToggle } from "./_experience-toggle";

export const metadata: Metadata = {
  title: `職務経歴 | ${SITE_TITLE}`,
};

export const dynamic = "force-static";

export default function Page() {
  return (
    <>
      <LogoutBanner />
      <div className="flex flex-col gap-20 pb-28">
        <div className="py-14">
          <Container className="md:max-w-(--breakpoint-md)">
            <section className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 text-center">
                <Heading1>職務経歴</Heading1>
                <p className="text-foreground-secondary">
                  詳細なスキルシートについては
                  <TextLinkNext
                    href="/contact"
                    className="text-foreground-primary"
                    withUnderline
                  >
                    お問い合わせ
                  </TextLinkNext>
                  からご連絡ください。
                </p>
              </div>
              <div className="flex flex-col gap-8">
                <ExperienceToggle className="z-header sticky top-[80px]" />
                <ExperienceContent />
              </div>
            </section>
          </Container>
        </div>
        <ContactLinkBanner />
      </div>
    </>
  );
}
