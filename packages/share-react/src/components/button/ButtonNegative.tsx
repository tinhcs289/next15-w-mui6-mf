import type { ComponentType } from "react";
import { forwardRef } from "react";
import type { ButtonCommonProps } from "./ButtonCommon";
import ButtonCommon from "./ButtonCommon";

export type ButtonNegativeProps = ButtonCommonProps;

const ButtonNegative: ComponentType<ButtonNegativeProps> = forwardRef<
  HTMLButtonElement,
  ButtonNegativeProps
>(({ children, ...otherProps }, ref) => {
  return (
    <ButtonCommon color="primary" size="small" {...otherProps} ref={ref}>
      {children}
    </ButtonCommon>
  );
});

export default ButtonNegative;
