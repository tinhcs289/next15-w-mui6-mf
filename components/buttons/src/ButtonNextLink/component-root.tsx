import Link from "next/link";
import type { ComponentType } from "react";
import { forwardRef } from "react";
import ButtonCommon from "../ButtonCommon";
import type { ButtonNextLinkProps } from "./types";

export const ButtonNextLink = forwardRef<
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
}) as ComponentType<ButtonNextLinkProps>;
ButtonNextLink.displayName = "ButtonNextLink";
