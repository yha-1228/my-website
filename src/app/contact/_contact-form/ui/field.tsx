import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/styling";

// common
// ----------------------------------------

const baseClassName =
  "placeholder:text-base-light-400 w-full appearance-none rounded-md px-3 disabled:bg-base-light-100 disabled:text-base-foreground/70 disabled:placeholder:text-base-light-400 disabled:cursor-not-allowed transition-[background-color] duration-200 ease-out";

const invalidClassNames = {
  false: "border border-base-light-300",
  true: "border border-danger-500",
} as const;

// ----------------------------------------

interface InputProps extends ComponentPropsWithRef<"input"> {
  /**
   * @default false
   */
  invalid?: boolean;
}

function Input(props: InputProps) {
  const { invalid = false, className, ...restProps } = props;

  return (
    <input
      className={cn(
        baseClassName,
        invalidClassNames[`${invalid}`],
        "h-10",
        className,
      )}
      {...restProps}
    />
  );
}

// ----------------------------------------

interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  /**
   * @default false
   */
  invalid?: boolean;
}

function Textarea(props: TextareaProps) {
  const { invalid = false, className, ...restProps } = props;

  return (
    <textarea
      className={cn(
        baseClassName,
        invalidClassNames[`${invalid}`],
        "block py-2.5 leading-normal",
        className,
      )}
      {...restProps}
    />
  );
}

// ----------------------------------------

interface InputLengthCounterProps
  extends Omit<ComponentPropsWithRef<"span">, "children"> {
  currentLength: number;
  maxLength: number;
}

function InputLengthCounter(props: InputLengthCounterProps) {
  const { currentLength, maxLength, className, ...restProps } = props;

  const isError = currentLength > maxLength;

  return (
    <span
      className={cn(isError && "text-danger-500", className)}
      {...restProps}
    >
      {isError
        ? `${maxLength - currentLength}`
        : `${currentLength} / ${maxLength}`}
    </span>
  );
}

// ----------------------------------------

export {
  Input,
  type InputProps,
  Textarea,
  type TextareaProps,
  InputLengthCounter,
  type InputLengthCounterProps,
};
