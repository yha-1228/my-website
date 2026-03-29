import { ChevronLeft } from "lucide-react";

import { TextLink } from "@/components/ui/styled/text-link";
import { cn } from "@/utils/styling";

export interface BackLinkProps {
  href: string;
  className?: string;
}

export function BackLink({ href, className }: BackLinkProps) {
  return (
    <TextLink
      className={cn(
        "inline-flex items-center gap-1 text-base font-normal",
        className,
      )}
      href={href}
    >
      <ChevronLeft />
      <span>戻る</span>
    </TextLink>
  );
}
