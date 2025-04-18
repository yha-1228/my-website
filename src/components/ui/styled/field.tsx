import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/css/cn";

// common
// ----------------------------------------

interface BaseProps {
  /**
   * エラー時のスタイルを指定する
   */
  invalid?: boolean;
}

const baseClassName = cn(
  "w-full appearance-none rounded-md px-3 placeholder:text-base-light-400",
  "border border-base-light-300 data-invalid:border-danger-500",
  "focus:outline-2 focus:outline-primary-600/30",
);

// ----------------------------------------

interface InputProps extends ComponentPropsWithRef<"input">, BaseProps {}

function Input(props: InputProps) {
  const { invalid, className, ...restProps } = props;

  return (
    <input
      data-invalid={invalid ? "true" : undefined}
      className={cn("h-10", baseClassName, className)}
      {...restProps}
    />
  );
}

// ----------------------------------------

interface TextareaProps extends ComponentPropsWithRef<"textarea">, BaseProps {}

function Textarea(props: TextareaProps) {
  const { invalid, className, ...restProps } = props;

  return (
    <textarea
      data-invalid={invalid ? "true" : undefined}
      className={cn(baseClassName, "block py-2.5 leading-normal", className)}
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
      data-error={isError ? "true" : undefined}
      className={cn("data-[error='true']:text-danger-500", className)}
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
