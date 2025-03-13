/**
 * @type {import("eslint").Linter.Config}
 * */
export const esLintConfigBase = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "@next/next/no-document-import-in-page": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    indent: ["error", 2],
    "no-extra-boolean-cast": "off",
    "no-restricted-imports": [
      "error",
      {
        name: "@mui/material/Grid",
        message:
          "Grid is deprecated in MUI V6, please use Grid2 by using \"import Grid from \"@mui/material/Grid2\"",
      },
    ],
    "react-refresh/only-export-components": "off",
  },
};
