import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import Text from "../Text";
import type { H1Props, H2Props, H3Props, H4Props, H5PRops, H6Props } from "./types";

export const H1 = forwardRef(function H1ForwardRef(
  { children, ...props }: H1Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h1" {...(props as any)} ref={ref} component="h1">
      {children}
    </Text>
  );
}) as ComponentType<H1Props>;

export const H2 = forwardRef(function H1ForwardRef(
  { children, ...props }: H2Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h2" {...(props as any)} ref={ref} component="h2">
      {children}
    </Text>
  );
}) as ComponentType<H2Props>;

export const H3 = forwardRef(function H1ForwardRef(
  { children, ...props }: H3Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h3" {...(props as any)} ref={ref} component="h3">
      {children}
    </Text>
  );
}) as ComponentType<H3Props>;

export const H4 = forwardRef(function H1ForwardRef(
  { children, ...props }: H4Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h4" {...(props as any)} ref={ref} component="h4">
      {children}
    </Text>
  );
}) as ComponentType<H4Props>;

export const H5 = forwardRef(function H1ForwardRef(
  { children, ...props }: H5PRops,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h5" {...(props as any)} ref={ref} component="h5">
      {children}
    </Text>
  );
}) as ComponentType<H5PRops>;

export const H6 = forwardRef(function H1ForwardRef(
  { children, ...props }: H6Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h6" {...(props as any)} ref={ref} component="h6">
      {children}
    </Text>
  );
}) as ComponentType<H6Props>;
