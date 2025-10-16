import { type ComponentProps } from "react";

interface FormProps extends ComponentProps<"form"> {
  allDisabled?: boolean;
}

function Form(props: FormProps) {
  const { allDisabled, ...restProps } = props;

  if (typeof allDisabled === "undefined") {
    return <form {...restProps} />;
  } else {
    const { children, className, style, ...restFormProps } = restProps;
    return (
      <form {...restFormProps}>
        {typeof allDisabled !== "undefined" ? (
          <fieldset disabled={allDisabled} className={className} style={style}>
            {children}
          </fieldset>
        ) : (
          children
        )}
      </form>
    );
  }
}

export { Form };
export type { FormProps };
