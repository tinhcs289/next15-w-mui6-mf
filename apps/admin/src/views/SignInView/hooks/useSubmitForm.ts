"use client";

import type { FormSubmitCallback } from "@shared/form";
import { useCallback } from "react";
import type { FormSignInValues } from "../types";

export default function useSubmitForm(args?: { returnUrl?: string; }) {
  const { returnUrl } = args || {};

  const handleSubmit: FormSubmitCallback<FormSignInValues> = useCallback((values) => {
    console.log({ values });
  }, [returnUrl]);

 return { handleSubmit }
}
