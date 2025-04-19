import {
  type ComponentPropsWithRef,
  type DetailedHTMLProps,
  type ElementType,
  type HTMLAttributes,
} from "react";

import { type DistributiveOmit } from "./utils";

export type CommonHTMLProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

/**
 * @see https://www.totaltypescript.com/pass-component-as-prop-react#passing-any-component-as-a-prop-and-inferring-its-props
 *
 */
export type ComponentPropsWithAs<
  TAs extends ElementType,
  TDefaultAs extends ElementType,
> = {
  as?: TAs;
} & DistributiveOmit<
  ComponentPropsWithRef<ElementType extends TAs ? TDefaultAs : TAs>,
  "as"
>;

export type HTMLElementHasNameAndValue =
  | HTMLButtonElement
  | HTMLFormElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
