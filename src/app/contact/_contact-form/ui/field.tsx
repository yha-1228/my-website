import { type ComponentProps } from "react";

import { cn, cx } from "@/utils/styling";

// common
// ----------------------------------------

const baseClassName = cx(
  "w-full appearance-none rounded-touchable px-3 transition-[background-color] duration-200 ease-out border border-stone-400",
  "disabled:bg-stone-100 disabled:text-foreground-primary/70 disabled:placeholder:text-foreground-placeholder disabled:cursor-not-allowed",
  "placeholder:text-foreground-placeholder",
  "aria-invalid:border-danger-base/40 aria-invalid:bg-danger-background/50",
);

// ----------------------------------------

function Input(props: ComponentProps<"input">) {
  const { className, ...restProps } = props;

  return (
    <input className={cn(baseClassName, "h-10", className)} {...restProps} />
  );
}

// ----------------------------------------

function Textarea(props: ComponentProps<"textarea">) {
  const { className, ...restProps } = props;

  return (
    <textarea
      className={cn(baseClassName, "block py-2.5 leading-normal", className)}
      {...restProps}
    />
  );
}

// ----------------------------------------

interface InputLengthCounterProps
  extends Omit<ComponentProps<"span">, "children"> {
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

export { Input, Textarea, InputLengthCounter, type InputLengthCounterProps };
