import type { ComponentType } from "react";
import { forwardRef } from "react";
import ButtonCommon from "../ButtonCommon";
import type { ButtonNegativeProps } from "./types";

export const ButtonNegative = forwardRef<
  HTMLButtonElement,
  ButtonNegativeProps
>(({ children, ...otherProps }, ref) => {
  return (
    <ButtonCommon color="primary" size="small" {...otherProps} ref={ref}>
      {children}
    </ButtonCommon>
  );
}) as ComponentType<ButtonNegativeProps>;
ButtonNegative.displayName = "ButtonNegative";
