"use client";

import { required, RHFText, shouldBeEmail, useFormContext } from "@shared/form";
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
        ...required("Please enter"),
        ...shouldBeEmail("Email are invalid format"),
      }}
    />
  );
}