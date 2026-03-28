"use client";

import { Button } from "@/components/ui/styled/button";
import { LOADING_DELAY_MS } from "@/constants";
import { useAsyncFunction } from "@/hooks/use-async-function";
import { sleep } from "@/utils/misc";

export function LogoutButton() {
  const { handleMutate, isPending, isSuccess } = useAsyncFunction({
    fn: async () => {
      await sleep(LOADING_DELAY_MS);
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/";
    },
    onError: () => {
      window.alert("ログアウトに失敗しました");
    },
  });

  return (
    <Button
      variant="outline"
      onClick={handleMutate}
      loading={isPending || isSuccess}
    >
      ログアウト
    </Button>
  );
}
