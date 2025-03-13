"use client";

import { RHFCheckWithLabel, required, useFormContext } from "@shared/form";
import type { FormSignInValues } from "../types";

export default function FieldKeepMeSigned() {
  const { control } = useFormContext<FormSignInValues>();
  return (
    <RHFCheckWithLabel
      control={control}
      name="keepMeSigned"
      rules={required("Please select")}
      label="Keep me signed-in"
    />
  );
}
