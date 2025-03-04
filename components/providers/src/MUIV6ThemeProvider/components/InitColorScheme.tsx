import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

export type InitColorSchemeProps = Parameters<typeof InitColorSchemeScript>[0];

export default function InitColorScheme(props: Partial<InitColorSchemeProps>) {
  return <InitColorSchemeScript {...props} attribute="data-mui-color-scheme" />;
};