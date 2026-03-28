"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, useRef, useState } from "react";

import {
  Field,
  FieldError,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/headless/field";
import { Form } from "@/components/ui/headless/form";
import { Button } from "@/components/ui/styled/button";
import { PasswordInput } from "@/components/ui/styled/field";
import { FormErrorMessage } from "@/components/ui/styled/form-error-message";
import { Label } from "@/components/ui/styled/label";
import { useAsyncFunction } from "@/hooks/use-async-function";
import { sleep } from "@/utils/misc";
import { cx } from "@/utils/styling";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/experience";

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const { handleMutate, isPending, isSuccess, isError } = useAsyncFunction({
    fn: async () => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: value }),
      });

      await sleep(300);

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      } else {
        window.location.href = redirectUrl;
      }
    },
    onError: async () => {
      setErrorVisible(true);
      await sleep(10); // これがないとフォーカスされない
      inputRef.current?.focus();
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isError) {
      setErrorVisible(false);
    }

    setValue(event.target.value);
  };

  return (
    <div
      className={cx(
        "lg:shadow-wide lg:max-w-[800px] lg:rounded-xl lg:border lg:border-solid lg:border-gray-200 lg:bg-white lg:px-10 lg:pt-8 lg:pb-11",
      )}
    >
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleMutate();
        }}
        className="flex flex-col gap-6"
        allDisabled={isPending}
        noValidate
      >
        <FieldRoot invalid={errorVisible} className="flex flex-col gap-2">
          <FieldLabel as={Label} required>
            パスワード
          </FieldLabel>
          <Field
            as={PasswordInput}
            ref={inputRef}
            value={value}
            onChange={handleChange}
          />
          <FieldError as={FormErrorMessage}>
            ログインに失敗しました。
          </FieldError>
        </FieldRoot>

        <Button
          disabled={value.trim().length === 0}
          loading={isPending || isSuccess}
        >
          閲覧に進む
        </Button>
      </Form>
    </div>
  );
}
