"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";

import { sendContactAction } from "./action";

export default function Page() {
  const [state, action, pending] = useActionState(sendContactAction, {
    ok: true,
  });

  return (
    <Container className="py-20">
      <form className="flex flex-col gap-y-5" action={action}>
        <input
          type="text"
          name="fullname"
          placeholder="fullname"
          className="block border p-4"
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          className="block border p-4"
        />
        <input
          type="text"
          name="company"
          placeholder="company"
          className="block border p-4"
        />
        <input
          type="text"
          name="message"
          placeholder="message"
          className="block border p-4"
        />

        <Button type="submit" disabled={pending}>
          送信
        </Button>

        {!state.ok && <p className="text-danger-600">{state.error}</p>}
      </form>
    </Container>
  );
}
