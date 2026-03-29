import { type Metadata } from "next";

import { Container } from "@/components/ui/styled/container";
import { SITE_TITLE } from "@/constants";
import { BaseTemplate } from "@/features/template/base-template";
import { SectionTemplate } from "@/features/template/section-template";

import { ContactForm } from "./_contact-form";

export const metadata: Metadata = {
  title: `お問い合わせ | ${SITE_TITLE}`,
};

export default function Page() {
  return (
    <BaseTemplate>
      <Container>
        <SectionTemplate title="お問い合わせ">
          <ContactForm />
        </SectionTemplate>
      </Container>
    </BaseTemplate>
  );
}
