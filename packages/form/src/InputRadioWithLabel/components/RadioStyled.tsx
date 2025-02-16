"use client";

import { styled } from "@mui/material";
import Radio, { RadioProps } from "@mui/material/Radio";

const RadioStyled = styled(Radio, {
  shouldForwardProp: (p) => p !== "data-error",
})<RadioProps & { ["data-error"]?: boolean }>(
  ({ theme, ["data-error"]: error = false }) => ({
    color: !error ? theme.palette.primary.main : theme.palette.error.main,
  })
);
RadioStyled.displayName = "RadioStyled";

export default RadioStyled;
