import { ChevronLeft } from "lucide-react";

import { TextLink } from "@/components/ui/styled/text-link";

export interface BackLinkProps {
  href: string;
}

export function BackLink({ href }: BackLinkProps) {
  return (
    <TextLink className="inline-flex items-center gap-1" href={href}>
      <ChevronLeft />
      <span>戻る</span>
    </TextLink>
  );
}
