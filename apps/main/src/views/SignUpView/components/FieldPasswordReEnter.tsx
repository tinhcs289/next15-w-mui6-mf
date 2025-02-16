"use client";

import { useFormContext } from "@shared/form/FormGrid";
import { required } from "@shared/form/rhf-rules";
import type { RHFTextProps } from "@shared/form/InputText";
import { RHFText, } from "@shared/form/InputText";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import type { FormSignUpValues } from "../types";

export default function FieldPassword() {
  const { control } = useFormContext<FormSignUpValues>();
  const password = useWatch<FormSignUpValues>({ control, name: "password" });

  const rules: Required<RHFTextProps>["rules"] = useMemo(() => ({
    ...required("Please enter"),
    validate: {
      shouldBeTheSameAsPassword: (value: string) => {
        if (value === password) return true;
        return "text should be same as Password";
      }
    }
  }), [password]);

  return (
    <RHFText
      control={control}
      name="passwordReEnter"
      label="Re-enter password"
      type="password"
      variant="bootstrap"
      autoComplete="password"
      rules={rules}
    />
  );
}