import { Eye, EyeOff } from "lucide-react";
import mergeRefs from "merge-refs";
import { type ComponentProps, useRef, useState } from "react";

import { cn, cx } from "@/utils/styling";

import { Button } from "./button";

// common
// ----------------------------------------

const baseClassName = cx(
  "w-full appearance-none rounded-touchable px-3 transition-[background-color,border-color] duration-200 ease-out border border-stone-400",
  // TODO: hover実装
  // "hover:border-foreground-primary",
  "disabled:bg-stone-100 disabled:text-foreground-primary/70 disabled:placeholder:text-foreground-placeholder disabled:cursor-not-allowed",
  "placeholder:text-foreground-placeholder",
  "aria-invalid:border-danger-base/40 aria-invalid:bg-danger-background/50",
  // TODO: hover実装
  // "aria-invalid:hover:border-danger-base",
);

// ----------------------------------------

function Input(props: ComponentProps<"input">) {
  const { className, ...restProps } = props;

  return (
    <input className={cn(baseClassName, "h-10", className)} {...restProps} />
  );
}

// ----------------------------------------

function PasswordInput(props: Omit<ComponentProps<"input">, "type">) {
  const { ref, className, ...restProps } = props;
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onToggleClick = () => {
    inputRef.current?.focus();
    setVisible((prevState) => !prevState);
  };

  return (
    // <div className={cn("flex gap-2", className)}>
    <div className={cn("relative", className)}>
      <Input
        ref={mergeRefs(inputRef, ref)}
        type={visible ? "type" : "password"}
        {...restProps}
      />
      <Button
        size="iconOnlySM"
        variant="outline"
        type="button"
        onClick={onToggleClick}
        className="absolute top-[50%] right-1 shrink-0 translate-y-[-50%] border-0 bg-transparent"
        aria-label={visible ? "パスワードを隠す" : "パスワードを表示する"}
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
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

export {
  Input,
  PasswordInput,
  Textarea,
  InputLengthCounter,
  type InputLengthCounterProps,
};
