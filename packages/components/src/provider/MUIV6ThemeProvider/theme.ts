import { createTheme } from "@mui/material/styles";
import { accordionCustomizations } from "./customizations/accordion";
import { buttonsCustomizations } from "./customizations/buttons";
import { cardCustomizations } from "./customizations/card";
import { commonCustomizations } from "./customizations/common";
import { inputsCustomizations } from "./customizations/inputs";
import { listCustomizations } from "./customizations/lists";
import { menuCustomizations } from "./customizations/menu";
import { paginationCustomizations } from "./customizations/pagination";
import { stepCustomizations } from "./customizations/step";
import { tableCustomizations } from "./customizations/table";
import { tabsCustomizations } from "./customizations/tabs";
import { colorSchemes, shadows, shape, typography } from './customizations/themePrimitives';

const theme = createTheme({
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

export default theme;