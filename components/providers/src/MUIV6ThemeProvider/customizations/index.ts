import { createTheme } from "@mui/material/styles";
import { accordionCustomizations } from "./accordion";
import { buttonsCustomizations } from "./buttons";
import { cardCustomizations } from "./card";
import { commonCustomizations } from "./common";
import { inputsCustomizations } from "./inputs";
import { listCustomizations } from "./lists";
import { menuCustomizations } from "./menu";
import { paginationCustomizations } from "./pagination";
import { stepCustomizations } from "./step";
import { tableCustomizations } from "./table";
import { tabsCustomizations } from "./tabs";
import { colorSchemes, shadows, shape, typography } from "./themePrimitives";

export const theme = createTheme({
  cssVariables: {
    // @ts-ignore
    colorSchemes,
    colorSchemeSelector: "data-mui-color-scheme",
    cssVarPrefix: "template",
    typography,
    shadows,
    shape,
    components: {
      ...tableCustomizations,
      ...commonCustomizations,
      ...paginationCustomizations,
      ...buttonsCustomizations,
      ...inputsCustomizations,
      ...listCustomizations,
      ...menuCustomizations,
      ...tabsCustomizations,
      ...stepCustomizations,
      ...cardCustomizations,
      ...accordionCustomizations,
    },
  },
});

export {
  brand,
  colorSchemes,
  getDesignTokens,
  gray,
  green,
  orange,
  red,
  shadows,
  shape,
  typography,
} from "./themePrimitives";
