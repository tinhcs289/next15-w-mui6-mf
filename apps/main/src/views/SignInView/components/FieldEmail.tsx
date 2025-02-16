"use client";

import { useFormContext } from "@shared/form/FormGrid";
import { RHFText } from "@shared/form/InputText";
import { required, shouldBeEmail } from "@shared/form/rhf-rules";
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