import { Components, Theme } from "@mui/material/styles";
import { tabClasses } from "@mui/material/Tab";
import { gray } from "./themePrimitives";

/* eslint-disable import/prefer-default-export */
export const tabsCustomizations: Components<Theme> = {
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: "fit-content" },
      indicator: ({ theme }) => ({
        // @ts-ignore
        backgroundColor: (theme.vars || theme).palette.grey[800],
        ...theme.applyStyles("dark", {
          // @ts-ignore
          backgroundColor: (theme.vars || theme).palette.grey[200],
        }),
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "6px 8px",
        marginBottom: "8px",
        textTransform: "none",
        minWidth: "fit-content",
        minHeight: "fit-content",
        // @ts-ignore
        color: (theme.vars || theme).palette.text.secondary,
        // @ts-ignore
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: "1px solid",
        borderColor: "transparent",
        ":hover": {
          // @ts-ignore
          color: (theme.vars || theme).palette.text.primary,
          backgroundColor: gray[100],
          borderColor: gray[200],
        },
        [`&.${tabClasses.selected}`]: {
          color: gray[900],
        },
        ...theme.applyStyles("dark", {
          ":hover": {
            // @ts-ignore
            color: (theme.vars || theme).palette.text.primary,
            backgroundColor: gray[800],
            borderColor: gray[700],
          },
          [`&.${tabClasses.selected}`]: {
            color: "#fff",
          },
        }),
      }),
    },
  },
};
