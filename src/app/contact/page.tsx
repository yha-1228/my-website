import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";

import { ContactForm } from "./_contact-form";

export default function Page() {
  return (
    <div className="py-14">
      <Container>
        <section>
          <div className="pb-10 text-center">
            <Heading1>お問い合わせ</Heading1>
          </div>
          <ContactForm />
        </section>
      </Container>
    </div>
  );
}
