"use client";

import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { ComponentType } from "react";
import type { SlotProps } from "../types";

const StyledDialogTitleText = styled(Typography)<SlotProps["titleText"]>(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.spacing(2.5),
  lineHeight: theme.spacing(4),
  color: theme.palette.primary.main,
})) as ComponentType<SlotProps["titleText"]>;
StyledDialogTitleText.displayName = "StyledDialogTitleText";
export default StyledDialogTitleText;
