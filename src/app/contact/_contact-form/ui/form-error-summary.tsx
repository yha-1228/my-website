import { type ComponentPropsWithRef, type ReactNode } from "react";

import { TextLink } from "@/components/ui/styled/text-link";
import { cn } from "@/utils/styling";

interface FormErrorSummaryListProps
  extends Omit<ComponentPropsWithRef<"div">, "role"> {
  heading: ReactNode;
}

function FormErrorSummaryList(props: FormErrorSummaryListProps) {
  const { heading, children, className, ...restProps } = props;

  return (
    <div
      role="alert"
      className={cn(
        "border-danger-base rounded-sm border-2 py-4 pl-6",
        className,
      )}
      {...restProps}
    >
      <div className="text-danger-base text-lg font-bold">{heading}</div>
      <ul className="mt-2 space-y-1 sm:list-disc sm:space-y-0.5 sm:pl-4">
        {children}
      </ul>
    </div>
  );
}

interface FormErrorSummaryItemProps extends ComponentPropsWithRef<"li"> {
  label: ReactNode;
  onClick?: () => void;
}

function FormErrorSummaryItem(props: FormErrorSummaryItemProps) {
  const { label, onClick, className, children, ...restProps } = props;

  return (
    <li className={cn("text-sm", className)} {...restProps}>
      <span>{label}:</span>
      <br className="sm:hidden" />
      <TextLink
        href="/"
        className="decoration-danger-base font-bold sm:ml-1"
        withUnderline
        preventLink
        onClick={onClick}
      >
        {children}
      </TextLink>
    </li>
  );
}

export { FormErrorSummaryList, FormErrorSummaryItem };
