import type { BoxProps } from "@mui/material/Box";

export type BoxSymbolProps = BoxProps<"span"> & {
  variant?: "outlined" | "rounded" | "sharp";
};
