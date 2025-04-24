import {
  type ComponentProps,
  type ElementType,
  type PropsWithChildren,
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
  whenError?: boolean;
  fieldId?: string;
}

function useField(props: UseFieldProps) {
  const { whenError, fieldId: fieldIdProp } = props;

  const id = useId();

  const fieldId = fieldIdProp || `${id}-field`;
  const descriptionId = `${id}-field-description`;
  const errorId = `${id}-field-error`;

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
    "aria-invalid": whenError || undefined,
    "aria-describedby":
      [hasDescription && descriptionId, whenError && errorId]
        .filter(Boolean)
        .join(" ") || undefined,
  } as const satisfies CommonHTMLProps;

  const descriptionProps = {
    id: descriptionId,
  } as const satisfies CommonHTMLProps;

  const errorProps = {
    id: errorId,
  } as const satisfies CommonHTMLProps;

  return { whenError, labelProps, fieldProps, descriptionProps, errorProps };
}

type UseFieldReturn = ReturnType<typeof useField>;

const [useFieldContext, FieldContext] = getContextAndHook<UseFieldReturn>(
  "useFieldContext",
  "FieldProvider",
);

function FieldProvider(props: PropsWithChildren<UseFieldProps>) {
  const { children, ...restProps } = props;
  const value = useField(restProps);

  return <FieldContext value={value}>{children}</FieldContext>;
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

type FieldProps<TAs extends ElementType> = PropsWithAs<TAs, "input">;

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
  const { whenError, errorProps } = useFieldContext();

  if (!whenError) return null;

  return <Comp {...errorProps} {...restProps} />;
}

// exports
// ----------------------------------------

export { FieldProvider, FieldLabel, Field, FieldDescription, FieldError };
export type {
  FieldLabelProps,
  FieldProps,
  FieldDescriptionProps,
  FieldErrorProps,
};
