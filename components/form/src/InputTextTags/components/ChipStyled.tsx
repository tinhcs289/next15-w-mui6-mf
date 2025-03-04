"use client";

import { styled } from "@mui/material";
import type { ChipProps } from "@mui/material/Chip";
import Chip from "@mui/material/Chip";

const ChipStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  margin: theme.spacing(0.5, 0.25),
}));
ChipStyled.displayName = "ChipStyled";

export default ChipStyled;