import {
  type ComponentProps,
  type ElementType,
  useEffect,
  useId,
  useState,
} from "react";

import {
  type ChildAsFunction,
  type CommonHTMLProps,
  type ElementTypeOf,
  type PropsWithAs,
} from "@/types/react";
import { getContextAndHook } from "@/utils/react";

// internal
// ----------------------------------------

interface UseFieldProps {
  isError?: boolean;
}

function useField({ isError }: UseFieldProps) {
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
    "aria-invalid": isError || undefined,
    "aria-describedby":
      [hasDescription && descriptionId, isError && errorId]
        .filter(Boolean)
        .join(" ") || undefined,
  } as const satisfies CommonHTMLProps;

  const descriptionProps = {
    id: descriptionId,
  } as const satisfies CommonHTMLProps;

  const errorProps = {
    id: errorId,
  } as const satisfies CommonHTMLProps;

  return { isError, labelProps, fieldProps, descriptionProps, errorProps };
}

type UseFieldReturn = ReturnType<typeof useField>;

const [useFieldContext, FieldContext] = getContextAndHook<UseFieldReturn>(
  "useFieldContext",
  "FieldProvider",
);

// ---

interface FieldProviderProps extends UseFieldProps {
  children?: ChildAsFunction<UseFieldProps>;
}

function FieldProvider(props: FieldProviderProps) {
  const { children, ...restProps } = props;
  const value = useField(restProps);

  return (
    <FieldContext value={value}>
      {children instanceof Function ? children(value) : children}
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
  "id"
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
  const { isError, errorProps } = useFieldContext();

  if (!isError) return null;

  return <Comp {...errorProps} {...restProps} />;
}

// exports
// ----------------------------------------

export { FieldProvider, FieldLabel, Field, FieldDescription, FieldError };
export type {
  FieldProviderProps,
  FieldLabelProps,
  FieldProps,
  FieldDescriptionProps,
  FieldErrorProps,
};
