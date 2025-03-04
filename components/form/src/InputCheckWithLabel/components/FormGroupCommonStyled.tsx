"use client";

import { styled } from "@mui/material";
import FormGroupCommon, { FormGroupCommonProps } from "../../FormGroupCommon";

const FormGroupCommonStyled = styled(FormGroupCommon)<FormGroupCommonProps>({
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  alignItems: "flex-start",
});
FormGroupCommonStyled.displayName = "FormGroupCommonStyled";

export default FormGroupCommonStyled;