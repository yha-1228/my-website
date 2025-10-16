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

  const baseFieldProps = {
    id: fieldId,
    "aria-invalid": isError || undefined,
    "aria-describedby":
      [hasDescription && descriptionId, isError && errorId]
        .filter(Boolean)
        .join(" ") || undefined,
  } as const satisfies CommonHTMLProps;

  const fieldProps = {
    ...baseFieldProps,
    "data-invalid": isError || undefined,
  } as const;

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
  "FieldRoot",
);

// ---

type FieldRootProps<TAs extends ElementType> = UseFieldProps &
  PropsWithAs<TAs, "div">;

function FieldRoot<TAs extends ElementType>(props: FieldRootProps<TAs>) {
  const { isError, as: Comp = "div", ...rest } = props;
  const value = useField({ isError });

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

export { FieldRoot, FieldLabel, Field, FieldDescription, FieldError };
export type {
  FieldRootProps,
  FieldLabelProps,
  FieldProps,
  FieldDescriptionProps,
  FieldErrorProps,
};
