"use client";

import { useFormContext } from "@shared/form/FormGrid";
import { RHFText } from "@shared/form/InputText";
import { required } from "@shared/form/rhf-rules";
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