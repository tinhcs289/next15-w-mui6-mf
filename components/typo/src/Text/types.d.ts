import type { TypographyProps } from "@mui/material/Typography";
import type { ElementType } from "react";

export type TextProps<D extends ElementType<any> = "span"> = Omit<
  TypographyProps<D>,
  "lineHeight"
> & {
  clickable?: boolean;
  maxLines?: number;
  lineHeight?: number | `${number}rem` | `${number}px` | `${number}em`;
  breakSpaces?: boolean;
};
