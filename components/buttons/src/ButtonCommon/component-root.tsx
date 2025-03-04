"use client";

import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import type { ComponentType } from "react";
import type { ButtonCommonProps } from "./types";

export const ButtonCommon = styled(Button, {
  shouldForwardProp: (p) => p !== "noTextTransform" && p !== "noWrap",
})<ButtonCommonProps>(({ noTextTransform, noWrap }) => ({
  ...(!!noTextTransform ? { textTransform: "none" } : {}),
  ...(!!noWrap ? { whiteSpace: "nowrap" } : {}),
})) as ComponentType<ButtonCommonProps>;
ButtonCommon.displayName = "ButtonCommon";
