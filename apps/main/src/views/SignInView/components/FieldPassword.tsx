"use client";

import { required, useFormContext } from "@shared/form";
import { RHFText } from "@shared/form/inputs/text";
import type { FormSignInValues } from "../types";

export default function FieldPassword() {
  const { control } = useFormContext<FormSignInValues>();
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