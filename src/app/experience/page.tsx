import { type Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLink } from "@/components/ui/styled/text-link";
import { SITE_TITLE } from "@/constants";
import { routes } from "@/routes";

import { ExperienceContent } from "./_experience-content";

export const metadata: Metadata = {
  title: `${routes.experience.label} | ${SITE_TITLE}`,
};

export default function Page() {
  return (
    <div className="py-14">
      <Container className="md:max-w-(--breakpoint-md)">
        <section>
          <div className="flex flex-col gap-4 text-center">
            <Heading1>{routes.experience.label}</Heading1>
            <p className="text-base-foreground-weak">
              詳細なスキルシートについては
              <TextLink
                href={routes.contact.href}
                as={Link}
                className="text-primary-600 font-bold"
                withUnderline
              >
                お問い合わせ
              </TextLink>
              からご連絡ください。
            </p>
          </div>
          <Suspense>
            <ExperienceContent />
          </Suspense>
        </section>
      </Container>
    </div>
  );
}
