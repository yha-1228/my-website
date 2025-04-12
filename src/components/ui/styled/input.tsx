import { forwardRef, type ComponentPropsWithRef } from "react";
import { cn } from "@/utils/css/cn";

// common
// ----------------------------------------

interface InputBaseProps {
  /**
   * エラー時のスタイルを指定する
   */
  invalid?: boolean;
}

const baseClassName = cn(
  "w-full appearance-none rounded-md px-3 placeholder:text-base-light-400",
  "ring-1 ring-inset ring-base-light-300 data-[invalid]:ring-danger-500",
  "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600 data-[invalid]:focus:ring-danger-500",
);

// ----------------------------------------

interface InputProps extends ComponentPropsWithRef<"input">, InputBaseProps {}

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

interface TextareaProps
  extends ComponentPropsWithRef<"textarea">,
    InputBaseProps {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { invalid, className, ...restProps } = props;

    return (
      <textarea
        data-invalid={invalid ? "true" : undefined}
        className={cn(baseClassName, "py-2.5 leading-normal", className)}
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
