import type { ComponentType } from "react";
import { forwardRef } from "react";
import type { ButtonPositiveProps } from "./ButtonPositive";
import ButtonPositive from "./ButtonPositive";

export type ButtonSubmitProps = ButtonPositiveProps;

const ButtonSubmit: ComponentType<ButtonSubmitProps> = forwardRef<
  HTMLButtonElement,
  ButtonSubmitProps
>(({ children, ...otherProps }, ref) => {
  return (
    <ButtonPositive type="submit" {...otherProps} ref={ref}>
      {children}
    </ButtonPositive>
  );
});

export default ButtonSubmit;
