import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";

import { LoginForm } from "./_login-form";

export default function Page() {
  return (
    <div className="pb-28">
      <div className="py-14">
        <Container>
          <section className="flex flex-col items-center gap-10 *:w-full">
            <div className="flex flex-col gap-4 text-center">
              <Heading1>ログイン</Heading1>
              <p className="text-foreground-secondary">
                職務経歴の閲覧にはログインが必要です。
              </p>
            </div>
            <LoginForm />
          </section>
        </Container>
      </div>
    </div>
  );
}
