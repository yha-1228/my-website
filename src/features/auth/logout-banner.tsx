import { Container } from "@/components/ui/styled/container";

import { LogoutButton } from "./logout-button";

export function LogoutBanner() {
  return (
    <div className="bg-brand-background py-4">
      <Container className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <p>非公開ページを閲覧中です</p>
        <LogoutButton />
      </Container>
    </div>
  );
}
