import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import Text from "../Text";
import type { H5Props } from "./types";

const H5 = forwardRef(function H5ForwardRef(
  { children, ...props }: H5Props,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <Text variant="h5" {...(props as any)} ref={ref} component="h5">
      {children}
    </Text>
  );
}) as ComponentType<H5Props>;
H5.displayName = "H5";

export default H5;
