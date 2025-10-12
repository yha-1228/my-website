"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/styled/container";
import { TextLink } from "@/components/ui/styled/text-link";
import { routes } from "@/routes";

function useInterval(delay: number, callback: () => void) {
  const savedCallback = useRef<() => void | undefined>(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => {
      savedCallback.current?.();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default function Page() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useInterval(1000, () => {
    if (countdown === 0) {
      router.replace("/");
    } else {
      setCountdown((prev) => prev - 1);
    }
  });

  return (
    <Container className="pt-14">
      <p>
        このページの内容は
        <TextLink href={routes.index.href} withUnderline>
          トップページ
        </TextLink>
        に移動しました。
      </p>

      <p>{countdown}秒後にリダイレクトします...</p>
    </Container>
  );
}
