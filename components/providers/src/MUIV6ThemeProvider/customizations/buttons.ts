import { alpha, Components, Theme } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { toggleButtonClasses } from "@mui/material/ToggleButton";
import { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import { brand, gray } from "./themePrimitives";

export const buttonsCustomizations: Components<Theme> = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: "border-box",
        transition: "all 100ms ease-in",
        "&:focus-visible": {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: "2px",
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        // @ts-ignore
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: "none",
        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              height: "2.25rem",
              padding: "8px 12px",
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              height: "2.5rem", // 40px
            },
          },
          {
            props: {
              color: "primary",
              variant: "contained",
            },
            style: {
              color: "white",
              backgroundColor: gray[900],
              backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
              boxShadow: `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
              border: `1px solid ${gray[700]}`,
              "&:hover": {
                backgroundImage: "none",
                backgroundColor: gray[700],
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: gray[800],
              },
              ...theme.applyStyles("dark", {
                color: "black",
                backgroundColor: gray[50],
                backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                boxShadow: "inset 0 -1px 0  hsl(220, 30%, 80%)",
                border: `1px solid ${gray[50]}`,
                "&:hover": {
                  backgroundImage: "none",
                  backgroundColor: gray[300],
                  boxShadow: "none",
                },
                "&:active": {
                  backgroundColor: gray[400],
                },
              }),
            },
          },
          {
            props: {
              color: "secondary",
              variant: "contained",
            },
            style: {
              color: "white",
              backgroundColor: brand[300],
              backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
              boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
              border: `1px solid ${brand[500]}`,
              "&:hover": {
                backgroundColor: brand[700],
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: brand[700],
                backgroundImage: "none",
              },
            },
          },
          {
            props: {
              variant: "outlined",
            },
            style: {
              // @ts-ignore
              color: (theme.vars || theme).palette.text.primary,
              border: "1px solid",
              borderColor: gray[200],
              backgroundColor: alpha(gray[50], 0.3),
              "&:hover": {
                backgroundColor: gray[100],
                borderColor: gray[300],
              },
              "&:active": {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles("dark", {
                backgroundColor: gray[800],
                borderColor: gray[700],

                "&:hover": {
                  backgroundColor: gray[900],
                  borderColor: gray[600],
                },
                "&:active": {
                  backgroundColor: gray[900],
                },
              }),
            },
          },
          {
            props: {
              color: "secondary",
              variant: "outlined",
            },
            style: {
              color: brand[700],
              border: "1px solid",
              borderColor: brand[200],
              backgroundColor: brand[50],
              "&:hover": {
                backgroundColor: brand[100],
                borderColor: brand[400],
              },
              "&:active": {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles("dark", {
                color: brand[50],
                border: "1px solid",
                borderColor: brand[900],
                backgroundColor: alpha(brand[900], 0.3),
                "&:hover": {
                  borderColor: brand[700],
                  backgroundColor: alpha(brand[900], 0.6),
                },
                "&:active": {
                  backgroundColor: alpha(brand[900], 0.5),
                },
              }),
            },
          },
          {
            props: {
              variant: "text",
            },
            style: {
              color: gray[600],
              "&:hover": {
                backgroundColor: gray[100],
              },
              "&:active": {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles("dark", {
                color: gray[50],
                "&:hover": {
                  backgroundColor: gray[700],
                },
                "&:active": {
                  backgroundColor: alpha(gray[700], 0.7),
                },
              }),
            },
          },
          {
            props: {
              color: "secondary",
              variant: "text",
            },
            style: {
              color: brand[700],
              "&:hover": {
                backgroundColor: alpha(brand[100], 0.5),
              },
              "&:active": {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles("dark", {
                color: brand[100],
                "&:hover": {
                  backgroundColor: alpha(brand[900], 0.5),
                },
                "&:active": {
                  backgroundColor: alpha(brand[900], 0.3),
                },
              }),
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        // @ts-ignore
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: "none",
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        // @ts-ignore
        color: (theme.vars || theme).palette.text.primary,
        border: "1px solid ",
        borderColor: gray[200],
        backgroundColor: alpha(gray[50], 0.3),
        "&:hover": {
          backgroundColor: gray[100],
          borderColor: gray[300],
        },
        "&:active": {
          backgroundColor: gray[200],
        },
        ...theme.applyStyles("dark", {
          backgroundColor: gray[800],
          borderColor: gray[700],
          "&:hover": {
            backgroundColor: gray[900],
            borderColor: gray[600],
          },
          "&:active": {
            backgroundColor: gray[900],
          },
        }),
        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              width: "2.25rem",
              height: "2.25rem",
              padding: "0.25rem",
              [`& .${svgIconClasses.root}`]: { fontSize: "1rem" },
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              width: "2.5rem",
              height: "2.5rem",
            },
          },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "10px",
        boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: brand[500],
        },
        ...theme.applyStyles("dark", {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: "#fff",
          },
          boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
        }),
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "12px 16px",
        textTransform: "none",
        borderRadius: "10px",
        fontWeight: 500,
        ...theme.applyStyles("dark", {
          color: gray[400],
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
          [`&.${toggleButtonClasses.selected}`]: {
            color: brand[300],
          },
        }),
      }),
    },
  },
};
