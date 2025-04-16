import {
  type ComponentProps,
  createContext,
  type ElementType,
  type PropsWithChildren,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";

import {
  type CommonHTMLProps,
  type ComponentPropsWithAs,
  type ForwardedElementRef,
} from "@/types/react";
import { fixedForwardRef } from "@/utils/react";

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

const FieldContext = createContext<ReturnType<typeof useField> | null>(null);

function useFieldContext() {
  const value = useContext(FieldContext);
  if (!value) throw new Error(`useContext must be inside <Context.Provider />`);
  return value;
}

function FieldProvider(props: PropsWithChildren<UseFieldProps>) {
  const { children, ...restProps } = props;
  const value = useField(restProps);

  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
}

// ---

type FieldLabelProps<TAs extends ElementType> = Omit<
  ComponentPropsWithAs<TAs, "label">,
  "htmlFor"
>;

const FieldLabel = fixedForwardRef(
  <TAs extends ElementType>(
    props: FieldLabelProps<TAs>,
    ref: ForwardedElementRef<TAs>,
  ) => {
    const { as: Comp = "label", ...restProps } = props;
    const { labelProps } = useFieldContext();

    return <Comp {...labelProps} {...restProps} ref={ref} />;
  },
);

// ---

type FieldProps<TAs extends ElementType> = ComponentPropsWithAs<TAs, "input">;

const Field = fixedForwardRef(
  <TAs extends ElementType>(
    props: FieldProps<TAs>,
    ref: ForwardedElementRef<TAs>,
  ) => {
    const { as: Comp = "input", ...restProps } = props;
    const { fieldProps } = useFieldContext();

    return <Comp {...fieldProps} {...restProps} ref={ref} />;
  },
);

// ---

type FieldDescriptionProps<TAs extends ElementType> = Omit<
  ComponentPropsWithAs<TAs, "p">,
  "id"
>;

const FieldDescription = fixedForwardRef(
  <TAs extends ElementType>(
    props: FieldDescriptionProps<TAs>,
    ref: ForwardedElementRef<TAs>,
  ) => {
    const { as: Comp = "p", ...restProps } = props;
    const { descriptionProps } = useFieldContext();

    return <Comp {...descriptionProps} {...restProps} ref={ref} />;
  },
);

// ---

type FieldErrorProps<TAs extends ElementType> = Omit<
  ComponentPropsWithAs<TAs, "p">,
  "id"
>;

const FieldError = fixedForwardRef(
  <TAs extends ElementType>(
    props: FieldErrorProps<TAs>,
    ref: ForwardedElementRef<TAs>,
  ) => {
    const { as: Comp = "p", ...restProps } = props;
    const { whenError, errorProps } = useFieldContext();

    if (!whenError) return null;

    return <Comp {...errorProps} {...restProps} ref={ref} />;
  },
);

// exports
// ----------------------------------------

export { FieldProvider, FieldLabel, Field, FieldDescription, FieldError };
export type {
  FieldLabelProps,
  FieldProps,
  FieldDescriptionProps,
  FieldErrorProps,
};
