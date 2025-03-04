"use client";

import { styled } from "@mui/material";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import type { ComponentType } from "react";

const TypographyStyled = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    position: "absolute",
    color: theme.palette.error.contrastText,
    background: theme.palette.error.main,
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    zIndex: 1,
    top: theme.spacing(3),
    right: "-50%",
    fontSize: theme.spacing(1.2),
    boxShadow: theme.shadows[6],
    "::before": {
      position: "absolute",
      content: '""',
      display: "block",
      right: theme.spacing(2),
      top: theme.spacing(-0.5),
      width: 0,
      height: 0,
      borderLeft: `${theme.spacing(0.5)}px solid transparent`,
      borderRight: `${theme.spacing(0.5)}px solid transparent`,
      borderBottom: `${theme.spacing(0.5)}px solid ${theme.palette.error.main}`,
    },
    whiteSpace: "nowrap",
    userSelect: "none",
    opacity: 0.75,
  })
) as ComponentType<TypographyProps>;
TypographyStyled.displayName = "TypographyStyled";

export default TypographyStyled;