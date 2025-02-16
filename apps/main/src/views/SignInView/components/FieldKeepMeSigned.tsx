"use client";

import { useFormContext } from "@shared/form/FormGrid";
import { RHFCheckWithLabel } from "@shared/form/InputCheckWithLabel";
import { required } from "@shared/form/rhf-rules";
import type { FormSignInValues } from "../types";

export default function FieldKeepMeSigned() {
  const { control } = useFormContext<FormSignInValues>();
  return (
    <RHFCheckWithLabel
      control={control}
      name="keepMeSigned"
      rules={required("Please select")}
      label="Keep me signed-in"
    />
  );
}
