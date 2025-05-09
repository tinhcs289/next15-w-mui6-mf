import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import Text from "../Text";
import type { H2Props } from "./types";

const H2 = forwardRef(function H2ForwardRef(
  { children, ...props }: H2Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h2" {...(props as any)} ref={ref} component="h2">
      {children}
    </Text>
  );
}) as ComponentType<H2Props>;
H2.displayName = "H2";

export default H2;
