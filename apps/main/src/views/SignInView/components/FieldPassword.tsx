"use client";

import { useFormContext } from "@shared/form/FormGrid";
import { RHFText } from "@shared/form/InputText";
import { required } from "@shared/form/rhf-rules";
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