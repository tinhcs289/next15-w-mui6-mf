import type { GlobalStylesProps } from "@mui/material/GlobalStyles";
import { scrollbarStyleMaker } from "./scroll-bar";

export const globalStyleMaker: Required<GlobalStylesProps>["styles"] = (theme) => ({
  // @ts-ignore
  ...scrollbarStyleMaker(theme),
});