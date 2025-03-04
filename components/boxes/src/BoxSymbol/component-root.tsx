import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { ComponentType } from "react";
import { forwardRef } from "react";

export type BoxSymbolProps = BoxProps<"span"> & {
  variant?: "outlined" | "rounded" | "sharp";
};

/**
 * @see https://fonts.google.com/icons
 */
export const BoxSymbol = forwardRef<HTMLSpanElement, BoxSymbolProps>(
  ({ children, className = "", variant = "outlined", ...otherProps }, ref) => {
    return (
      <Box
        className={`material-symbols-${variant} ${className}`}
        {...otherProps}
        ref={ref}
        component="span"
      >
        {children}
      </Box>
    );
  }
) as ComponentType<BoxSymbolProps>;
BoxSymbol.displayName = "BoxSymbol";