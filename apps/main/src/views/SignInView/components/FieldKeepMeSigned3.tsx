"use client";

import { useFormContext } from "@shared/form/FormGrid";
import { RHFSwitchWithLabel } from "@shared/form/InputSwitchWithLabel";
import { required } from "@shared/form/rhf-rules";
import type { FormSignInValues } from "../types";

export default function FieldKeepMeSigned3() {
  const { control } = useFormContext<FormSignInValues>();
  return (
    <RHFSwitchWithLabel
      control={control}
      name="keepMeSigned"
      rules={required("Please select")}
      label="Keep me signed-in"
    />
  );
}
