"use client";

import { styled } from "@mui/material";
import type { ChipProps } from "@mui/material/Chip";
import Chip from "@mui/material/Chip";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";

export const ChipStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  margin: theme.spacing(0.5, 0.25),
}));
ChipStyled.displayName = "ChipStyled";

export const TextStyled = styled(TextField)<TextFieldProps>({
  display: "flex",
  "& div.MuiInputBase-root": {
    display: "flex",
    flexGrow: 0,
    flexWrap: "wrap",
  },
  "& textarea": {
    alignItems: "baseline",
    width: "auto",
    flex: "1",
    minWidth: "30px",
    "&::placeholder": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
});
TextStyled.displayName = "TextStyled";