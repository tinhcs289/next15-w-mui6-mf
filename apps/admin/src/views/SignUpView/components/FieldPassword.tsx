"use client";

import { required, RHFText, useFormContext } from "@shared/form";
import type { FormSignUpValues } from "../types";

export default function FieldPassword() {
  const { control } = useFormContext<FormSignUpValues>();
  return (
    <RHFText
      control={control}
      name="password"
      label="Password"
      type="password"
      variant="bootstrap"
      autoComplete="password"
      rules={required("Please enter")}
    />
  );
}