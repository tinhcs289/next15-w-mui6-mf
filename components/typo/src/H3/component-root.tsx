import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import Text from "../Text";
import type { H3Props } from "./types";

const H3 = forwardRef(function H3ForwardRef(
  { children, ...props }: H3Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h3" {...(props as any)} ref={ref} component="h3">
      {children}
    </Text>
  );
}) as ComponentType<H3Props>;
H3.displayName = "H3";

export default H3;
