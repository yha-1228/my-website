"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/ui/styled/container";

import { LogoutButton } from "./logout-button";

export function LogoutBanner() {
  const [didLogoutClick, setDidLogoutClick] = useState(false);

  useEffect(() => {
    if (didLogoutClick) {
      document.title = "しばらくお待ちください...";
    }
  }, [didLogoutClick]);

  return (
    <div className="bg-brand-background py-4">
      <Container className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <p>ポートフォリオ実績ページにログイン中です。</p>
        <LogoutButton
          loading={didLogoutClick}
          onOkClick={() => setDidLogoutClick(true)}
        />
      </Container>
    </div>
  );
}
