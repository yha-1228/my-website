"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/styled/button";

import { generateLogoutUrl } from "./auth";

export function LogoutButton({
  loading,
  onOkClick,
}: {
  loading?: boolean;
  onOkClick?: () => void;
}) {
  return (
    <Button
      variant="outline"
      className="inline-flex items-center gap-2 px-4"
      loading={loading}
      onClick={async () => {
        const confirm = window.confirm(
          [
            "ログアウトしますか？\n\n",
            "・ログアウト後はポートフォリオのホーム画面に戻ります。\n",
            "・新規ウィンドウが開きますが、自動で閉じられるまでお待ちください。",
          ].join(""),
        );
        if (!confirm) return;

        onOkClick?.();

        const newWindow = window.open(generateLogoutUrl(), "_blank");

        setTimeout(() => {
          newWindow?.close();
          window.location.href = window.location.origin + "/portfolio";
          // 暫く待たないとログアウトされずに遷移される
        }, 1000);
      }}
    >
      <LogOut />
      ログアウト
    </Button>
  );
}
