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
import { tabsCustomizations } from "./customizations/tabs";
import { colorSchemes, shadows, shape, typography } from './customizations/themePrimitives';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
    cssVarPrefix: "template",
    // @ts-ignore
    colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
    typography,
    shadows,
    shape,
    components: {
      ...commonCustomizations,
      ...paginationCustomizations,
      ...buttonsCustomizations,
      ...inputsCustomizations,
      ...listCustomizations,
      ...menuCustomizations,
      ...tabsCustomizations,
      ...stepCustomizations,
      ...cardCustomizations,
      //...dataDisplayCustomizations,
      //...feedbackCustomizations,
      //...navigationCustomizations,
      //...surfacesCustomizations,
      ...accordionCustomizations,
    }
  },
});

export default theme;