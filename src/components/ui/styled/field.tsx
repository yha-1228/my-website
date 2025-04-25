import { type ComponentPropsWithRef } from "react";

import { classVariants, cn } from "@/utils/styling";

// common
// ----------------------------------------

interface FieldVariantsProps {
  /**
   * @default false
   */
  invalid?: boolean;
}

const getVariantClass = classVariants<FieldVariantsProps>(
  cn(
    "w-full appearance-none rounded-md px-3 placeholder:text-base-light-400",
    "disabled:bg-base-light-100 disabled:text-base-foreground/70 disabled:cursor-not-allowed disabled:placeholder:text-base-light-400",
    "transition-[background-color] duration-200 ease-out",
  ),
  {
    invalid: {
      false: cn("border border-base-light-300"),
      true: cn("border border-danger-500"),
    },
  },
);

// ----------------------------------------

interface InputProps
  extends ComponentPropsWithRef<"input">,
    FieldVariantsProps {}

function Input(props: InputProps) {
  const { invalid = false, className, ...restProps } = props;

  return (
    <input
      className={cn("h-10", getVariantClass({ invalid }), className)}
      {...restProps}
    />
  );
}

// ----------------------------------------

interface TextareaProps
  extends ComponentPropsWithRef<"textarea">,
    FieldVariantsProps {}

function Textarea(props: TextareaProps) {
  const { invalid = false, className, ...restProps } = props;

  return (
    <textarea
      className={cn(
        getVariantClass({ invalid }),
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
