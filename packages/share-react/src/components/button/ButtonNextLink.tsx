import Link from "next/link";
import type { ComponentType } from "react";
import { forwardRef } from "react";
import type { ButtonCommonProps } from "./ButtonCommon";
import ButtonCommon from "./ButtonCommon";

export type ButtonNextLinkProps = ButtonCommonProps & { to: string };

const ButtonNextLink: ComponentType<ButtonNextLinkProps> = forwardRef<
  HTMLButtonElement,
  ButtonNextLinkProps
>(({ children, to, ...otherProps }, ref) => {
  return (
    <ButtonCommon
      color="primary"
      variant="text"
      size="small"
      noTextTransform
      {...otherProps}
      component={Link}
      href={to || ""}
      ref={ref}
    >
      {children}
    </ButtonCommon>
  );
});

export default ButtonNextLink;
