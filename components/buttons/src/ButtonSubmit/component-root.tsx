import type { ComponentType } from "react";
import { forwardRef } from "react";
import ButtonPositive from "../ButtonPositive";
import type { ButtonSubmitProps } from "./types";

export const ButtonSubmit = forwardRef<HTMLButtonElement, ButtonSubmitProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <ButtonPositive type="submit" {...otherProps} ref={ref}>
        {children}
      </ButtonPositive>
    );
  }
) as ComponentType<ButtonSubmitProps>;
ButtonSubmit.displayName = "ButtonSubmit";
