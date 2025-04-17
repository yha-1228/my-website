import { type Metadata } from "next";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { routes } from "@/routes";

import { ContactForm } from "./_contact-form";

export const metadata: Metadata = {
  title: routes.contact.label,
};

export default function Page() {
  return (
    <div className="py-14">
      <Container>
        <section>
          <div className="pb-10 text-center">
            <Heading1>{routes.contact.label}</Heading1>
          </div>
          <ContactForm />
        </section>
      </Container>
    </div>
  );
}
