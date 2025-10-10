"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { TextLink } from "@/components/ui/styled/text-link";

export function BackButton() {
  const router = useRouter();
  return (
    <TextLink
      as="button"
      className="inline-flex items-center gap-1"
      onClick={() => {
        router.back();
      }}
    >
      <ChevronLeft />
      <span>戻る</span>
    </TextLink>
  );
}
