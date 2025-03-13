"use client";

import { RHFRadioWithLabel, required, useFormContext } from "@shared/form";
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
