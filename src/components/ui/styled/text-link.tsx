import Link from "next/link";
import { type ComponentPropsWithRef } from "react";

import { classVariants, cn } from "@/utils/styling";

export interface TextLinkVariantsProps {
  /**
   * @default false
   */
  withUnderline?: boolean;
}

const getVariantClass = classVariants<TextLinkVariantsProps>(
  cn("rounded-xs underline-offset-4"),
  {
    withUnderline: {
      true: cn("underline hover:decoration-2"),
      false: cn("hover:underline hover:decoration-2"),
    },
  },
);

// ----------------------------------------

interface TextLinkProps
  extends ComponentPropsWithRef<typeof Link>,
    TextLinkVariantsProps {
  preventLink?: boolean;
}

function TextLink(props: TextLinkProps) {
  const {
    withUnderline = false,
    preventLink,
    onClick,
    className,
    ...restProps
  } = props;

  return (
    <Link
      className={cn(getVariantClass({ withUnderline }), className)}
      onClick={(event) => {
        if (preventLink) {
          event.preventDefault();
        }
        onClick?.(event);
      }}
      {...restProps}
    />
  );
}

// ----------------------------------------

export { TextLink };
export type { TextLinkProps };
