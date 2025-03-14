import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import Text from "../Text";
import type { H1Props } from "./types";

const H1 = forwardRef(function H1ForwardRef(
  { children, ...props }: H1Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h1" {...(props as any)} ref={ref} component="h1">
      {children}
    </Text>
  );
}) as ComponentType<H1Props>;
H1.displayName = "H1";

export default H1;
