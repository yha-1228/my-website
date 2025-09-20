"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/styled/button";

import { generateLogoutUrl } from "./auth";

export function LogoutButton() {
  return (
    <Button
      variant="outline"
      className="inline-flex items-center gap-2 px-4"
      onClick={async () => {
        const confirm = window.confirm(
          "ログアウトしますか？\n\nログアウト後は自動でホーム画面に戻ります。\n（切り替わるまでお待ちください）",
        );
        if (!confirm) return;

        const newWindow = window.open(generateLogoutUrl(), "_blank");

        setTimeout(() => {
          newWindow?.close();
          // ホーム画面にリダイレクト
          window.location.href = window.location.origin;
          // 暫く待たないとログアウトされずに遷移される
        }, 20);
      }}
    >
      <LogOut />
      ログアウト
    </Button>
  );
}
