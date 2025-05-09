"use client";

import { required, shouldBeEmail, useFormContext } from "@shared/form";
import { RHFText } from "@shared/form/inputs/text";
import type { FormSignInValues } from "../types";

export default function FieldEmail() {
  const { control } = useFormContext<FormSignInValues>();
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