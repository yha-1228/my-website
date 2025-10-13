import { Link } from "lucide-react";

import { TextLink } from "@/components/ui/styled/text-link";
import { cn } from "@/utils/styling";

export function AnchorLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <TextLink
      href={href}
      className={cn(
        "rounded-touchable text-brand-base inline-flex size-9 items-center justify-center transition-opacity hover:opacity-60 active:opacity-60",
        className,
      )}
    >
      <Link />
    </TextLink>
  );
}
