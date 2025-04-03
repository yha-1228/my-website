import { type ReactNode } from "react";
import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
  BsX,
} from "react-icons/bs";
import { cn } from "@/utils/css/cn";

type Variant = "primary" | "danger";

const variantRootClassMap = {
  primary: cn("bg-primary-500"),
  danger: cn("bg-danger-500"),
} as const satisfies Record<Variant, string>;

const variantButtonClassMap = {
  primary: cn("hover:bg-primary-600 active:bg-primary-700"),
  danger: cn("hover:bg-danger-600 active:bg-danger-700"),
} as const satisfies Record<Variant, string>;

const variantIconMap = {
  primary: <BsFillCheckCircleFill className="size-6" />,
  danger: <BsFillExclamationCircleFill className="size-6" />,
} as const satisfies Record<Variant, ReactNode>;

export interface FeedbackNotificationProps {
  variant: Variant;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function FeedbackNotification(props: FeedbackNotificationProps) {
  const { variant, children, onClose, className } = props;

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg px-4 py-3 text-white",
        variantRootClassMap[variant],
        className,
      )}
    >
      <div className="flex items-center space-x-3">
        {variantIconMap[variant]}
        <div>{children}</div>
      </div>
      <button
        type="button"
        aria-label="閉じる"
        className={cn(
          "inline-flex items-center rounded-full",
          variantButtonClassMap[variant],
        )}
        onClick={onClose}
      >
        <BsX aria-hidden="true" className="size-8" />
      </button>
    </div>
  );
}
