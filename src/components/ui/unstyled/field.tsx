import {
  type ComponentProps,
  type ElementType,
  type PropsWithChildren,
  useEffect,
  useId,
  useState,
} from "react";

import { type CommonHTMLProps, type ComponentPropsWithAs } from "@/types/react";
import { getContextAndProvider } from "@/utils/react";

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

const [useFieldContext, FieldContextProvider] =
  getContextAndProvider<ReturnType<typeof useField>>();

function FieldProvider(props: PropsWithChildren<UseFieldProps>) {
  const { children, ...restProps } = props;
  const value = useField(restProps);

  return <FieldContextProvider value={value}>{children}</FieldContextProvider>;
}

// ---

type FieldLabelProps<TAs extends ElementType> = Omit<
  ComponentPropsWithAs<TAs, "label">,
  "htmlFor"
>;

function FieldLabel<TAs extends ElementType>(props: FieldLabelProps<TAs>) {
  const { as: Comp = "label", ...restProps } = props;
  const { labelProps } = useFieldContext();

  return <Comp {...labelProps} {...restProps} />;
}

// ---

type FieldProps<TAs extends ElementType> = ComponentPropsWithAs<TAs, "input">;

function Field<TAs extends ElementType>(props: FieldProps<TAs>) {
  const { as: Comp = "input", ...restProps } = props;
  const { fieldProps } = useFieldContext();

  return <Comp {...fieldProps} {...restProps} />;
}

// ---

type FieldDescriptionProps<TAs extends ElementType> = Omit<
  ComponentPropsWithAs<TAs, "p">,
  "id"
>;

function FieldDescription<TAs extends ElementType>(
  props: FieldDescriptionProps<TAs>,
) {
  const { as: Comp = "p", ...restProps } = props;
  const { descriptionProps } = useFieldContext();

  return <Comp {...descriptionProps} {...restProps} />;
}

// ---

type FieldErrorProps<TAs extends ElementType> = Omit<
  ComponentPropsWithAs<TAs, "p">,
  "id"
>;

function FieldError<TAs extends ElementType>(props: FieldErrorProps<TAs>) {
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
