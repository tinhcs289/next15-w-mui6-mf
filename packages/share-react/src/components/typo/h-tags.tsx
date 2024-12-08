import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import type { TypoProps } from "./Typo";
import Typo from "./Typo";

export const H1 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypoProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Typo variant="h1" {...(props as any)} ref={ref} component="h1">
      {children}
    </Typo>
  );
}) as ComponentType<TypoProps<"h1">>;

export const H2 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypoProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Typo variant="h2" {...(props as any)} ref={ref} component="h2">
      {children}
    </Typo>
  );
}) as ComponentType<TypoProps<"h2">>;

export const H3 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypoProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Typo variant="h3" {...(props as any)} ref={ref} component="h3">
      {children}
    </Typo>
  );
}) as ComponentType<TypoProps<"h3">>;

export const H4 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypoProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Typo variant="h4" {...(props as any)} ref={ref} component="h4">
      {children}
    </Typo>
  );
}) as ComponentType<TypoProps<"h4">>;

export const H5 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypoProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Typo variant="h5" {...(props as any)} ref={ref} component="h5">
      {children}
    </Typo>
  );
}) as ComponentType<TypoProps<"h5">>;

export const H6 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypoProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Typo variant="h6" {...(props as any)} ref={ref} component="h6">
      {children}
    </Typo>
  );
}) as ComponentType<TypoProps<"h6">>;
