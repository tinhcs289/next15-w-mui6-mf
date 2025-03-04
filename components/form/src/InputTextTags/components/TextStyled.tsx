"use client";

import { styled } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";

const TextStyled = styled(TextField)<TextFieldProps>({
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

export default TextStyled;