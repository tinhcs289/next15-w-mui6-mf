import { Components, Theme } from "@mui/material/styles";
import { gray } from "./themePrimitives";

/* eslint-disable import/prefer-default-export */
export const accordionCustomizations: Components<Theme> = {
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      disableGutters: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 4,
        overflow: "clip",
        // @ts-ignore
        backgroundColor: (theme.vars || theme).palette.background.default,
        border: "1px solid",
        // @ts-ignore
        borderColor: (theme.vars || theme).palette.divider,
        ":before": {
          backgroundColor: "transparent",
        },
        "&:not(:last-of-type)": {
          borderBottom: "none",
        },
        "&:first-of-type": {
          // @ts-ignore
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
          // @ts-ignore
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        "&:last-of-type": {
          // @ts-ignore
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
          // @ts-ignore
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: "none",
        borderRadius: 8,
        "&:hover": { backgroundColor: gray[50] },
        "&:focus-visible": { backgroundColor: "transparent" },
        ...theme.applyStyles("dark", {
          "&:hover": { backgroundColor: gray[800] },
        }),
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: { mb: 20, border: "none" },
    },
  },
};
