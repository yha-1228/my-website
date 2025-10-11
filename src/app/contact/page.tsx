import { type Metadata } from "next";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { SITE_TITLE } from "@/constants";
import { routes } from "@/routes";

import { ContactForm } from "./_contact-form";

export const metadata: Metadata = {
  title: `${routes.contact.label} | ${SITE_TITLE}`,
};

export default function Page() {
  return (
    <div className="pb-28">
      <div className="py-14">
        <Container>
          <section className="flex flex-col gap-10">
            <div className="text-center">
              <Heading1>{routes.contact.label}</Heading1>
            </div>
            <ContactForm />
          </section>
        </Container>
      </div>
    </div>
  );
}
