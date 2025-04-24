import { type ComponentPropsWithRef } from "react";

interface FormProps extends ComponentPropsWithRef<"form"> {
  allDisabled?: boolean;
}

function Form(props: FormProps) {
  const { children, allDisabled, ...restProps } = props;

  return (
    <form {...restProps}>
      {typeof allDisabled !== "undefined" ? (
        <fieldset disabled={allDisabled}>{children}</fieldset>
      ) : (
        children
      )}
    </form>
  );
}

export { Form };
export type { FormProps };
