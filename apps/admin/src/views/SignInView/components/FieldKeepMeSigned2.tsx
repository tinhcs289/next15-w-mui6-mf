"use client";

import { required, useFormContext } from "@shared/form";
import { RHFRadioWithLabel } from "@shared/form/inputs/radio-with-label";
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
