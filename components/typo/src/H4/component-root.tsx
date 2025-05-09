import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import Text from "../Text";
import type { H4Props } from "./types";

const H4 = forwardRef(function H4ForwardRef(
  { children, ...props }: H4Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h4" {...(props as any)} ref={ref} component="h4">
      {children}
    </Text>
  );
}) as ComponentType<H4Props>;
H4.displayName = "H4";

export default H4;
