import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "@/utils/css/cn";

const Container = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        className={cn("container mx-auto px-5", className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Container.displayName = "Container";

export { Container };
