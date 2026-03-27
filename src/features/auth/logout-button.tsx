"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/styled/button";
import { useAsyncFunction } from "@/hooks/use-async-function";
import { sleep } from "@/utils/misc";

export function LogoutButton() {
  const router = useRouter();

  const { handleMutate, isPending, isSuccess } = useAsyncFunction({
    fn: async () => {
      await sleep(800);
      await fetch("/api/logout", { method: "POST" });
      router.push("/");
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
