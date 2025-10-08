"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/styled/button";
import { Dialog } from "@/components/ui/styled/dialog";
import { DialogTrigger } from "@/components/ui/unstyled/dialog";

import { generateLogoutUrl } from "./auth";

export function LogoutButton({
  loading,
  onOkClick,
}: {
  loading?: boolean;
  onOkClick?: () => void;
}) {
  return (
    <Dialog
      trigger={
        <DialogTrigger
          as={Button}
          variant="outline"
          loading={loading}
          className="inline-flex items-center gap-2 px-4"
        >
          <LogOut />
          ログアウト
        </DialogTrigger>
      }
      dialogTitle="ログアウトしますか？"
      dialogBody={
        <>
          <p>ログアウト後はホーム画面に戻ります。</p>
          <p>新規ウィンドウが開きますが、自動で閉じるまでお待ちください。</p>
        </>
      }
      dialogButtons={[
        {
          content: "キャンセル",
          variant: "outline",
        },
        {
          content: "ログアウトする",
          variant: "fill",
          onClick: async () => {
            onOkClick?.();

            const newWindow = window.open(generateLogoutUrl(), "_blank");

            setTimeout(() => {
              newWindow?.close();
              window.location.href = window.location.origin;
              // 暫く待たないとログアウトされずに遷移される
            }, 1000);
          },
        },
      ]}
    />
  );
}
