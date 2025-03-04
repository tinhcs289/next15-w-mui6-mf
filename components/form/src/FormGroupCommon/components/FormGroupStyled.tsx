"use client";

import { alpha, styled } from "@mui/material";
import FormGroup, { FormGroupProps } from "@mui/material/FormGroup";

const brand = {
  400: "hsl(210, 98%, 48%)",
  500: "hsl(210, 98%, 42%)",
};

const FormGroupStyled = styled(FormGroup)<FormGroupProps>(
  ({ theme }) => ({
    width: "100%",
    minHeight: "33.75px",
    padding: theme.spacing(0.25),
    // @ts-ignore
    color: (theme.vars || theme).palette.text.primary,
    // @ts-ignore
    borderRadius: (theme.vars || theme).shape.borderRadius,
    // @ts-ignore
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
    // @ts-ignore
    backgroundColor: (theme.vars || theme).palette.background.default,
    ["&:hover"]: {
      borderColor: "hsl(220, 20%, 65%)",
    },

    ["&.Mui-focusVisible"]: {
      outline: `3px solid ${alpha(brand[500], 0.5)}`,
      outlineOffset: "2px",
      borderColor: brand[400],
    },
    ...theme.applyStyles("dark", {
      ["&.Mui-focusVisible"]: {
        outline: `3px solid ${alpha(brand[500], 0.5)}`,
        outlineOffset: "2px",
        borderColor: brand[400],
      },
    }),
  })
);
FormGroupStyled.displayName = "FormGroupStyled";

export default FormGroupStyled;