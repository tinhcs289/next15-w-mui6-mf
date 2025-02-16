"use client";

import { useFormContext } from "@shared/form/FormGrid";
import { RHFRadioWithLabel } from "@shared/form/InputRadioWithLabel";
import { required } from "@shared/form/rhf-rules";
import type { FormSignInValues } from "../types";

export default function FieldKeepMeSigned2() {
  const { control } = useFormContext<FormSignInValues>();
  return (
    <RHFRadioWithLabel
      control={control}
      name="keepMeSigned"
      rules={required("Please select")}
      label="Keep me signed-in"
    />
  );
}
