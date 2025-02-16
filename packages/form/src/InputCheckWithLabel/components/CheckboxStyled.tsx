"use client";

import { styled } from "@mui/material";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

const CheckboxStyled = styled(Checkbox, {
  shouldForwardProp: (p) => p !== "data-error",
})<CheckboxProps & { ["data-error"]?: boolean }>(
  ({ theme, ["data-error"]: error = false }) => ({
    padding: 0,
    color: !error ? theme.palette.primary.main : theme.palette.error.main,
  })
);
CheckboxStyled.displayName = "CheckboxStyled";

export default CheckboxStyled;