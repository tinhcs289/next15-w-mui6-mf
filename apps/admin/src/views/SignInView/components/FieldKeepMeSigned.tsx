"use client";

import { RHFCheckWithLabel, useFormContext } from "@shared/form";
import type { FormSignInValues } from "../types";

export default function FieldKeepMeSigned() {
  const { control } = useFormContext<FormSignInValues>();
  return (
    <RHFCheckWithLabel
      control={control}
      name="keepMeSigned"
      label="Keep me signed-in"
    />
  );
}
