import {
  type ComponentPropsWithRef,
  type DetailedHTMLProps,
  type ElementRef,
  type ElementType,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
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

export type ForwardedElementRef<T extends ElementType> = ForwardedRef<
  ElementRef<T>
>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: ForwardedRef<T>) => ReactNode,
) => (props: P & RefAttributes<T>) => ReactNode;

export type HTMLElementHasNameAndValue =
  | HTMLButtonElement
  | HTMLFormElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
