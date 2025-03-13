import { Components, Theme } from "@mui/material/styles";

/* eslint-disable import/prefer-default-export */
export const tableCustomizations: Components<Theme> = {
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0.5),
      }),
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
      }),
    },
  },
};
