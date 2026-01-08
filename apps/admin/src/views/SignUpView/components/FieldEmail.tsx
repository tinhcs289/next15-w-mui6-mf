"use client";

import { rules, useFormContext } from "@shared/form";
import { RHFText } from "@shared/form/inputs/text";
import type { FormSignUpValues } from "../types";

export default function FieldEmail() {
  const { control } = useFormContext<FormSignUpValues>();
  return (
    <RHFText
      control={control}
      name="email"
      label="Email"
      type="email"
      autoComplete="email"
      variant="bootstrap"
      rules={{
        ...rules.required("Please enter"),
        ...rules.shouldBeEmail("Email are invalid format"),
      }}
    />
  );
}