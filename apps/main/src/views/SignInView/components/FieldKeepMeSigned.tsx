"use client";

import { rules, useFormContext } from "@shared/form";
import { RHFCheckWithLabel } from "@shared/form/inputs/check";
import type { FormSignInValues } from "../types";

export default function FieldKeepMeSigned() {
  const { control } = useFormContext<FormSignInValues>();
  return (
    <RHFCheckWithLabel
      control={control}
      name="keepMeSigned"
      rules={rules.required("Please select")}
      label="Keep me signed-in"
    />
  );
}
