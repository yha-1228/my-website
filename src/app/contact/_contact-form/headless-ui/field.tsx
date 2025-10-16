import {
  type ComponentProps,
  type ElementType,
  useEffect,
  useId,
  useState,
} from "react";

import {
  type CommonHTMLProps,
  type ElementTypeOf,
  type PropsWithAs,
} from "@/types/react";
import { getContextAndHook } from "@/utils/react";

// internal
// ----------------------------------------

interface UseFieldProps {
  /**
   * @default false
   */
  invalid?: boolean;
}

function useField({ invalid = false }: UseFieldProps) {
  const fieldId = useId();
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;

  const [hasDescription, setHasDescription] = useState(false);

  useEffect(() => {
    const descriptionElem = document.getElementById(descriptionId);
    setHasDescription(!!descriptionElem);
  }, [descriptionId]);

  const labelProps = {
    htmlFor: fieldId,
  } as const satisfies ComponentProps<"label">;

  const fieldProps = {
    id: fieldId,
    "aria-invalid": invalid,
    "aria-describedby":
      [hasDescription && descriptionId, invalid && errorId]
        .filter(Boolean)
        .join(" ") || undefined,
  } as const satisfies CommonHTMLProps;

  const descriptionProps = {
    id: descriptionId,
  } as const satisfies CommonHTMLProps;

  const errorProps = {
    id: errorId,
  } as const satisfies CommonHTMLProps;

  return {
    invalid,
    labelProps,
    fieldProps,
    descriptionProps,
    errorProps,
  };
}

type UseFieldReturn = ReturnType<typeof useField>;

const [useFieldContext, FieldContext] = getContextAndHook<UseFieldReturn>(
  "useFieldContext",
  "FieldRoot",
);

// ---

type FieldRootProps<TAs extends ElementType> = UseFieldProps &
  PropsWithAs<TAs, "div">;

function FieldRoot<TAs extends ElementType>(props: FieldRootProps<TAs>) {
  const { invalid, as: Comp = "div", ...rest } = props;
  const value = useField({ invalid });

  return (
    <FieldContext value={value}>
      <Comp {...rest} />
    </FieldContext>
  );
}

// ---

type FieldLabelProps<TAs extends ElementTypeOf<"label">> = Omit<
  PropsWithAs<TAs, "label">,
  "htmlFor"
>;

function FieldLabel<TAs extends ElementTypeOf<"label">>(
  props: FieldLabelProps<TAs>,
) {
  const { as: Comp = "label", ...restProps } = props;
  const { labelProps } = useFieldContext();

  return <Comp {...labelProps} {...restProps} />;
}

// ---

type FieldProps<TAs extends ElementType> = Omit<
  PropsWithAs<TAs, "input">,
  "id" | "aria-invalid" | "aria-describedby"
>;

function Field<TAs extends ElementType>(props: FieldProps<TAs>) {
  const { as: Comp = "input", ...restProps } = props;
  const { fieldProps } = useFieldContext();

  return <Comp {...fieldProps} {...restProps} />;
}

// ---

type FieldDescriptionProps<TAs extends ElementTypeOf<"p">> = Omit<
  PropsWithAs<TAs, "p">,
  "id"
>;

function FieldDescription<TAs extends ElementTypeOf<"p">>(
  props: FieldDescriptionProps<TAs>,
) {
  const { as: Comp = "p", ...restProps } = props;
  const { descriptionProps } = useFieldContext();

  return <Comp {...descriptionProps} {...restProps} />;
}

// ---

type FieldErrorProps<TAs extends ElementTypeOf<"p">> = Omit<
  PropsWithAs<TAs, "p">,
  "id"
>;

function FieldError<TAs extends ElementTypeOf<"p">>(
  props: FieldErrorProps<TAs>,
) {
  const { as: Comp = "p", ...restProps } = props;
  const { invalid, errorProps } = useFieldContext();

  if (!invalid) return null;

  return <Comp {...errorProps} {...restProps} />;
}

// exports
// ----------------------------------------

export { FieldRoot, FieldLabel, Field, FieldDescription, FieldError };
export type {
  FieldRootProps,
  FieldLabelProps,
  FieldProps,
  FieldDescriptionProps,
  FieldErrorProps,
};
