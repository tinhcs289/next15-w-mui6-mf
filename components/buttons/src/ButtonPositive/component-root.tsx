import type { ComponentType } from "react";
import { forwardRef } from "react";
import ButtonCommon from "../ButtonCommon";
import type { ButtonPositiveProps } from "./types";

export const ButtonPositive: ComponentType<ButtonPositiveProps> = forwardRef<
  HTMLButtonElement,
  ButtonPositiveProps
>(({ children, ...otherProps }, ref) => {
  return (
    <ButtonCommon
      color="primary"
      variant="contained"
      size="small"
      {...otherProps}
      ref={ref}
    >
      {children}
    </ButtonCommon>
  );
}) as ComponentType<ButtonPositiveProps>;
ButtonPositive.displayName = "ButtonPositive";
