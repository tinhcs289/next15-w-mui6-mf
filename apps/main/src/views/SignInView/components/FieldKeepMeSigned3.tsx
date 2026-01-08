"use client";

import { rules, useFormContext } from "@shared/form";
import { RHFSwitchWithLabel } from "@shared/form/inputs/switch";
import type { FormSignInValues } from "../types";

export default function FieldKeepMeSigned3() {
  const { control } = useFormContext<FormSignInValues>();
  return (
    <RHFSwitchWithLabel
      control={control}
      name="keepMeSigned"
      rules={rules.required("Please select")}
      label="Keep me signed-in"
    />
  );
}
