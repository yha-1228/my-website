import { type Metadata } from "next";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLinkNext } from "@/components/ui/styled/text-link-next";
import { SITE_TITLE } from "@/constants";
import { ContactLinkBanner } from "@/features/contact-link-banner";
import { routes } from "@/routes";

import { ExperienceContent } from "./_experience-content";
import { ExperienceToggle } from "./_experience-toggle";

export const metadata: Metadata = {
  title: `${routes.experience.label} | ${SITE_TITLE}`,
};

export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="flex flex-col gap-20 pb-28">
      <div className="py-14">
        <Container className="md:max-w-(--breakpoint-md)">
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center">
              <Heading1>{routes.experience.label}</Heading1>
              <p className="text-foreground-secondary">
                詳細なスキルシートについては
                <TextLinkNext
                  href={routes.contact.href}
                  className="text-foreground-primary"
                  withUnderline
                >
                  お問い合わせ
                </TextLinkNext>
                からご連絡ください。
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <ExperienceToggle className="sticky top-[80px]" />
              <ExperienceContent />
            </div>
          </section>
        </Container>
      </div>
      <ContactLinkBanner />
    </div>
  );
}
