import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import Text from "../Text";
import type { H6Props } from "./types";

const H6 = forwardRef(function H6ForwardRef(
  { children, ...props }: H6Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h6" {...(props as any)} ref={ref} component="h6">
      {children}
    </Text>
  );
}) as ComponentType<H6Props>;
H6.displayName = "H6";

export default H6;
