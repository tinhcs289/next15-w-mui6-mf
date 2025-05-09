"use client";

import { required, useFormContext } from "@shared/form";
import { RHFCheckWithLabel } from "@shared/form/inputs/check-with-label";
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
