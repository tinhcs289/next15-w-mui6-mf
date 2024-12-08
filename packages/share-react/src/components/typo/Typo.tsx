"use client";

import { styled } from "@mui/material";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import type { ElementType, JSX } from "react";

export type TypoProps<D extends ElementType<any> = "span"> = Omit<
  TypographyProps<D>,
  "lineHeight"
> & {
  clickable?: boolean;
  maxLines?: number;
  lineHeight?: number | `${number}rem` | `${number}px` | `${number}em`;
  breakSpaces?: boolean;
};

const Typo = styled(Typography, {
  shouldForwardProp: (p) =>
    p !== "maxLines" &&
    p !== "lineHeight" &&
    p !== "breakSpaces" &&
    p !== "clickable",
})<TypoProps>(
  ({ maxLines, lineHeight, breakSpaces, clickable }) => {
    let lineHeightValue = 0;
    let lineHeightUnit = "px";
    if (typeof lineHeight === "string") {
      ["rem", "em", "px"].forEach((u) => {
        if (lineHeight.indexOf(u) === -1) return;
        lineHeightUnit = u;
        lineHeightValue = +lineHeight.replace(u, "");
      });
    }

    return {
      lineHeight: lineHeight || "inherit",
      ...(maxLines === 1
        ? {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }
        : {}),
      ...(!!maxLines && !!lineHeightValue && maxLines > 1
        ? {
            lineHeight: `${lineHeightValue}${lineHeightUnit}`,
            height: `${lineHeightValue * maxLines}${lineHeightUnit}`,
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            display: "-webkit-box",
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: "vertical",
          }
        : {}),
      ...(!!breakSpaces ? { whiteSpace: "break-spaces" } : {}),
      ...(!!clickable ? { cursor: "pointer" } : {}),
    };
  }
) as <D extends ElementType<any> = "span">(
  props: TypoProps<D>
) => JSX.Element;

export default Typo;
