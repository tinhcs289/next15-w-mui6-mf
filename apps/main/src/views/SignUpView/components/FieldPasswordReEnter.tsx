"use client";

import { rules, useFormContext } from "@shared/form";
import { RHFText } from "@shared/form/inputs/text";
import { useWatch } from "react-hook-form";
import type { FormSignUpValues } from "../types";

export default function FieldPassword() {
  const { control } = useFormContext<FormSignUpValues>();
  const password = useWatch<FormSignUpValues>({ control, name: "password" });

  return (
    <RHFText
      control={control}
      name="passwordReEnter"
      label="Re-enter password"
      type="password"
      variant="bootstrap"
      autoComplete="password"
      rules={{
        ...rules.required("Please enter"),
        validate: {
          shouldBeTheSameAsPassword: (value: string) => {
            if (value === password) return true;
            return "text should be same as Password";
          },
        },
      }}
    />
  );
}