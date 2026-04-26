"use client";

import { styled } from "@mui/material";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField, { textFieldClasses } from "@mui/material/TextField";

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
  [`&.${textFieldClasses.root}`]: {
    [`.${inputLabelClasses.root}`]: {
      fontWeight: 600,
    },
    [`.${inputBaseClasses.root}`]: {
      [`&.${inputBaseClasses.adornedEnd}`]: {
        paddingRight: theme.spacing(0.5),
      },
      [`.${inputBaseClasses.input}`]: {
        "--tw-ring-color": "transparent !important",
        "--tw-ring-shadow": "transparent !important",
      },
    },
  },
}));
TextFieldStyled.displayName = "TextFieldStyled";
export default TextFieldStyled;