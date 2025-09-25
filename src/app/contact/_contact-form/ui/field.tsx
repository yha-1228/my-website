import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/styling";

// common
// ----------------------------------------

const baseClassName =
  "placeholder:text-foreground-placeholder w-full appearance-none rounded-md px-3 disabled:bg-gray-100 disabled:text-foreground-primary/70 disabled:placeholder:text-foreground-placeholder disabled:cursor-not-allowed transition-[background-color] duration-200 ease-out";

const invalidClassNames = {
  false: "border border-gray-300 ",
  true: "border border-danger-base",
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
      className={cn(isError && "text-danger-base", className)}
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
