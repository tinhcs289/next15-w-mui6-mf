"use client";

import { styled } from "@mui/material";
import type { ComponentType } from "react";
import type { ButtonCommonProps } from "../ButtonCommon";
import ButtonCommon from "../ButtonCommon";

export const ButtonStyled = styled(ButtonCommon)<ButtonCommonProps>(
  ({ theme }) => ({
    background: theme.palette.grey[400],
    color: theme.palette.grey[900],
    px: theme.spacing(2),
    ":hover": {
      background: theme.palette.grey[400],
    },
  })
) as ComponentType<ButtonCommonProps>;
ButtonStyled.displayName = "ButtonCommonStyled";
