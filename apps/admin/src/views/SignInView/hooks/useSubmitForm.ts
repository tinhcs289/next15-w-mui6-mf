"use client";

import type { FormSubmitCallback } from "@shared/form";
import { signInApi } from "@shared/mock";
import { useCallback } from "react";
import type { FormSignInValues } from "../types";

export default function useSubmitForm(args?: { returnUrl?: string; }) {
  const { returnUrl } = args || {};

  const handleSubmit: FormSubmitCallback<FormSignInValues> = useCallback(async ({ 
    email, password
  }) => {
    const result = await signInApi({
      username: email as string,
      password: password as string,
    });

    if (!result.jwttoken) return;

    console.log({ jwttoken: result.jwttoken });

  }, [returnUrl]);

 return { handleSubmit }
}
