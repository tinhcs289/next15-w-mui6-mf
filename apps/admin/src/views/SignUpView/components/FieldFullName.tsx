"use client";

import { required, RHFText, useFormContext } from "@shared/form";
import type { FormSignUpValues } from "../types";

export default function FieldFullName() {
  const { control } = useFormContext<FormSignUpValues>();
  return (
    <RHFText
      control={control}
      name="fullname"
      label="Full name"
      variant="bootstrap"
      rules={required("Please enter")}
    />
  );
}