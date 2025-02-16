"use client";

import { styled } from "@mui/material";
import type { FormLabelProps } from "@mui/material/FormLabel";
import FormLabel from "@mui/material/FormLabel";
import type { ComponentType } from "react";

const FormLabelStyled = styled(FormLabel, {
  shouldForwardProp: (p) => p !== "data-error",
})<FormLabelProps & { ["data-error"]?: boolean }>(
  ({ theme, ["data-error"]: error = false }) => ({
    fontSize: "11px",
    fontWeight: 600,
    alignItems: "center",
    color: !error ? theme.palette.text.primary : theme.palette.error.main,
  })
) as ComponentType<FormLabelProps>;
FormLabelStyled.displayName = "FormLabelStyled";

export default FormLabelStyled;