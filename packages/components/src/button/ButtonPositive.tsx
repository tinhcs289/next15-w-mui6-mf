import type { ComponentType } from "react";
import { forwardRef } from "react";
import type { ButtonCommonProps } from "./ButtonCommon";
import ButtonCommon from "./ButtonCommon";

export type ButtonPositiveProps = ButtonCommonProps;

const ButtonPositive: ComponentType<ButtonPositiveProps> = forwardRef<
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
});

export default ButtonPositive;
