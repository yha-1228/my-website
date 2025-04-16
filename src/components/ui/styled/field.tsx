import { type ComponentPropsWithRef,forwardRef } from "react";

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
  "border border-base-light-300 data-[invalid]:border-danger-500",
  "focus:outline-2 focus:outline focus:outline-primary-600/30",
);

// ----------------------------------------

interface InputProps extends ComponentPropsWithRef<"input">, BaseProps {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { invalid, className, ...restProps } = props;

  return (
    <input
      data-invalid={invalid ? "true" : undefined}
      className={cn("h-10", baseClassName, className)}
      {...restProps}
      ref={ref}
    />
  );
});

Input.displayName = "Input";

// ----------------------------------------

interface TextareaProps extends ComponentPropsWithRef<"textarea">, BaseProps {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { invalid, className, ...restProps } = props;

    return (
      <textarea
        data-invalid={invalid ? "true" : undefined}
        className={cn(baseClassName, "block py-2.5 leading-normal", className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Textarea.displayName = "Textarea";

// ----------------------------------------

interface InputLengthCounterProps
  extends Omit<ComponentPropsWithRef<"span">, "children"> {
  currentLength: number;
  maxLength: number;
}

const InputLengthCounter = forwardRef<HTMLSpanElement, InputLengthCounterProps>(
  (props, ref) => {
    const { currentLength, maxLength, className, ...restProps } = props;

    const isError = currentLength > maxLength;

    return (
      <span
        data-error={isError ? "true" : undefined}
        className={cn("data-[error='true']:text-danger-500", className)}
        {...restProps}
        ref={ref}
      >
        {isError
          ? `${maxLength - currentLength}`
          : `${currentLength} / ${maxLength}`}
      </span>
    );
  },
);

InputLengthCounter.displayName = "InputLengthCounter";

// ----------------------------------------

export {
  Input,
  type InputProps,
  Textarea,
  type TextareaProps,
  InputLengthCounter,
  type InputLengthCounterProps,
};
