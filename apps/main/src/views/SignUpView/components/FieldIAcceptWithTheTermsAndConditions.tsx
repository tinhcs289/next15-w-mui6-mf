"use client";

import { useFormContext } from "@shared/form/FormGrid";
import { RHFCheckWithLabel } from "@shared/form/InputCheckWithLabel";
import { required } from "@shared/form/rhf-rules";
import type { FormSignUpValues } from "../types";

const TERM_AND_CONDITIONS = "Please read the following Terms & Conditions carefully as they affect your legal rights. These Terms & Conditions contain an arbitration agreement that requires the use of arbitration on an individual basis to resolve disputes rather than jury or any other court proceedings, or class actions of any kind. The arbitration agreement is set forth in the “Arbitration Agreement” section below.";

export default function FieldIAcceptWithTheTermsAndConditions() {
  const { control } = useFormContext<FormSignUpValues>();
  return (
    <RHFCheckWithLabel
      control={control}
      name="iAcceptWithTheTermsAndConditions"
      rules={required("Please select")}
      label={TERM_AND_CONDITIONS}
    />
  );
}
