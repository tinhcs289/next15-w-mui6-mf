"use client";

import { styled } from "@mui/material";
import Switch, { switchClasses, SwitchProps } from "@mui/material/Switch";

const SwitchStyled = styled(Switch, {
  shouldForwardProp: (p) => p !== "data-error",
})<SwitchProps & { ["data-error"]?: boolean }>(({ theme, ["data-error"]: error = false }) => ({
  width: theme.spacing(4),
  alignItems: "center",
  color: !error ? theme.palette.primary.main : theme.palette.error.main,
  padding: 0,
  [`& .${switchClasses.switchBase}`]: {
    padding: theme.spacing(0.75, 0.25), // "6px 2px",
  },
  [`& .${switchClasses.track}`]: {
    height: theme.spacing(2.25),
    width: theme.spacing(4),
    borderRadius: theme.spacing(5),
  },
  [`& .${switchClasses.thumb}`]: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
  },
}));
SwitchStyled.displayName = "SwitchStyled";

export default SwitchStyled;