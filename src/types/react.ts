import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type DetailedHTMLProps,
  type ElementType,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from "react";

import { type DistributiveOmit } from "./utils";

export type CommonHTMLProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export type ElementTypeOf<T extends keyof JSX.IntrinsicElements> = ElementType<
  ComponentPropsWithoutRef<T>,
  T
>;

/**
 * @see https://www.totaltypescript.com/pass-component-as-prop-react#passing-any-component-as-a-prop-and-inferring-its-props
 *
 */
export type PropsWithAs<
  TAs extends ElementType,
  TDefaultAs extends keyof JSX.IntrinsicElements,
> = {
  as?: TAs;
} & DistributiveOmit<
  ComponentPropsWithRef<ElementType extends TAs ? TDefaultAs : TAs>,
  "as"
>;

export type ChildAsFunction<P> = ReactNode | ((props: P) => ReactNode);
