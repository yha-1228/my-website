import { type Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { routes } from "@/routes";

import { ExperienceContent } from "./experience-content";

export const metadata: Metadata = {
  title: routes.experience.label,
};

export default function Page() {
  return (
    <div className="py-14">
      <Container className="md:max-w-(--breakpoint-md)">
        <section>
          <div className="text-center">
            <Heading1>{routes.experience.label}</Heading1>
          </div>
          <Suspense>
            <ExperienceContent />
          </Suspense>
        </section>
      </Container>
    </div>
  );
}
