import { Suspense } from "react";

import { Container } from "@/components/ui/styled/container";
import { SectionTemplate } from "@/features/template/section-template";

import { LoginForm } from "./_login-form";

export default function Page() {
  return (
    <div className="pb-28">
      <div className="py-14">
        <Container>
          <SectionTemplate
            title="ログイン"
            description="職務経歴の閲覧にはログインが必要です。"
          >
            <Suspense>
              <LoginForm />
            </Suspense>
          </SectionTemplate>
        </Container>
      </div>
    </div>
  );
}
