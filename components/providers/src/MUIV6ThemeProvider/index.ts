import { default as MUIV6ThemeProvider } from "./component-root";

import InitColorScheme from "./components/InitColorScheme";

export default MUIV6ThemeProvider;
export type { MUIV6ThemeProviderProps } from "./types";

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
  typography
} from "./customizations";

export type { InitColorSchemeProps } from "./components/InitColorScheme";
export { InitColorScheme };
