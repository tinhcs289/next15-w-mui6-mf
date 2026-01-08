"use client";

import { rules, useFormContext } from "@shared/form";
import { RHFText } from "@shared/form/inputs/text";
import type { FormSignUpValues } from "../types";

export default function FieldFullName() {
  const { control } = useFormContext<FormSignUpValues>();
  return (
    <RHFText
      control={control}
      name="fullname"
      label="Full name"
      variant="bootstrap"
      rules={rules.required("Please enter")}
    />
  );
}