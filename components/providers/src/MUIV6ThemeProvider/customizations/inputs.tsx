import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { selectClasses } from "@mui/material/Select";
import { alpha, Components, Theme } from "@mui/material/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";
import * as React from "react";
import { brand, gray } from "./themePrimitives";

export const inputsCustomizations: Components<Theme> = {
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: (
        <CheckBoxOutlineBlankRoundedIcon
          sx={{ color: "hsla(210, 0%, 0%, 0.0)" }}
        />
      ),
      checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 10,
        height: 16,
        width: 16,
        borderRadius: 5,
        border: "1px solid ",
        borderColor: alpha(gray[300], 0.8),
        boxShadow: "0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset",
        backgroundColor: alpha(gray[100], 0.4),
        transition: "border-color, background-color, 120ms ease-in",
        "&:hover": {
          borderColor: brand[300],
        },
        "&.Mui-focusVisible": {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: "2px",
          borderColor: brand[400],
        },
        "&.Mui-checked": {
          color: "white",
          backgroundColor: brand[500],
          borderColor: brand[500],
          boxShadow: `none`,
          "&:hover": {
            backgroundColor: brand[600],
          },
        },
        ...theme.applyStyles("dark", {
          borderColor: alpha(gray[700], 0.8),
          boxShadow: "0 0 0 1.5px hsl(210, 0%, 0%) inset",
          backgroundColor: alpha(gray[900], 0.8),
          "&:hover": {
            borderColor: brand[300],
          },
          "&.Mui-focusVisible": {
            borderColor: brand[400],
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: "2px",
          },
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: "none",
      },
      input: {
        "&::placeholder": {
          opacity: 0.7,
          color: gray[500],
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      root: ({ theme }) => ({
        padding: "8px 12px",
        // @ts-ignore
        color: (theme.vars || theme).palette.text.primary,
        // @ts-ignore
        borderRadius: (theme.vars || theme).shape.borderRadius,
        // @ts-ignore
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        // @ts-ignore
        backgroundColor: (theme.vars || theme).palette.background.default,
        transition: "border 120ms ease-in",
        "&:hover": {
          borderColor: gray[400],
        },
        [`&.${outlinedInputClasses.focused}`]: {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          borderColor: brand[400],
        },
        ...theme.applyStyles("dark", {
          "&:hover": {
            borderColor: gray[500],
          },
        }),
        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              height: "2.25rem",
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              height: "2.5rem",
            },
          },
        ],
      }),
      notchedOutline: {
        border: "none",
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        // @ts-ignore
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles("dark", {
          // @ts-ignore
          color: (theme.vars || theme).palette.grey[400],
        }),
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        marginBottom: 8,
      }),
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef<SVGSVGElement, SvgIconProps>(
        (props, ref) => (
          <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
        )
      ),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        // @ts-ignore
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: "1px solid",
        borderColor: gray[200],
        // @ts-ignore
        backgroundColor: (theme.vars || theme).palette.background.paper,
        boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
        "&:hover": {
          borderColor: gray[300],
          // @ts-ignore
          backgroundColor: (theme.vars || theme).palette.background.paper,
          boxShadow: "none",
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: gray[400],
        },
        "&:before, &:after": {
          display: "none",
        },

        ...theme.applyStyles("dark", {
          // @ts-ignore
          borderRadius: (theme.vars || theme).shape.borderRadius,
          borderColor: gray[700],
          // @ts-ignore
          backgroundColor: (theme.vars || theme).palette.background.paper,
          boxShadow: `inset 0 1px 0 1px ${alpha(gray[700], 0.15)}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
          "&:hover": {
            borderColor: alpha(gray[700], 0.7),
            // @ts-ignore
            backgroundColor: (theme.vars || theme).palette.background.paper,
            boxShadow: "none",
          },
          [`&.${selectClasses.focused}`]: {
            outlineOffset: 0,
            borderColor: gray[900],
          },
          "&:before, &:after": {
            display: "none",
          },
        }),
      }),
      select: ({ theme }) => ({
        display: "flex",
        alignItems: "center",
        ...theme.applyStyles("dark", {
          display: "flex",
          alignItems: "center",
          "&:focus-visible": {
            backgroundColor: gray[900],
          },
        }),
      }),
    },
  },
};
