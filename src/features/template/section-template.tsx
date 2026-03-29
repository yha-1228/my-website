import { type ElementType, type ReactNode } from "react";

import { Heading1 } from "@/components/ui/styled/heading1";

export interface SectionTemplateProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  /**
   * @default "section"
   */
  as?: ElementType;
}

export function SectionTemplate({
  title,
  description,
  children,
  as: Comp = "section",
}: SectionTemplateProps) {
  return (
    <Comp className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-4 self-stretch">
        <Heading1 className="flex w-full justify-center">{title}</Heading1>
        {description && (
          <p className="text-foreground-secondary">{description}</p>
        )}
      </div>
      <div className="flex w-full justify-center *:w-full">{children}</div>
    </Comp>
  );
}
