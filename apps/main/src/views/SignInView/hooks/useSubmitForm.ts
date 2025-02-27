"use client";

import type { FormSubmitCallback } from "@shared/form";
import { useCallback } from "react";
import type { FormSignInValues } from "../types";

export default function useSubmitForm() {
  const handleSubmit: FormSubmitCallback<FormSignInValues> = useCallback((values) => {
    console.log({ values });
  }, []);

 return { handleSubmit }
}
