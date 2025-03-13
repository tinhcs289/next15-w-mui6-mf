import { iconButtonClasses } from "@mui/material/IconButton";
import { Components, Theme } from "@mui/material/styles";

/* eslint-disable import/prefer-default-export */
export const paginationCustomizations: Components<Theme> = {
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: "flex",
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.Mui-selected": {
          color: "white",
          // @ts-ignore
          backgroundColor: (theme.vars || theme).palette.grey[900],
        },
        ...theme.applyStyles("dark", {
          "&.Mui-selected": {
            color: "black",
            // @ts-ignore
            backgroundColor: (theme.vars || theme).palette.grey[50],
          },
        }),
      }),
    },
  },
};
