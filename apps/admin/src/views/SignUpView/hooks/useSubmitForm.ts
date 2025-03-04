"use client";

import type { FormSubmitCallback } from "@shared/form";
import { useCallback } from "react";
import type { FormSignUpValues } from "../types";

export default function useSubmitForm() {
  const handleSubmit: FormSubmitCallback<FormSignUpValues> = useCallback((values) => {
    console.log({ values });
  }, []);

 return { handleSubmit }
}
