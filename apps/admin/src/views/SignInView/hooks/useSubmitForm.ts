"use client";

import { ZONE_NAME } from "@/constants/zone";
import { authDataUtils, useGetAuthState } from "@shared/auth";
import type { FormSubmitCallback } from "@shared/form";
import { } from "@shared/form";
import { http } from "@shared/http-client";
import { useZoneRouter } from "@shared/navigation";
import tryDo from "@shared/utils/async/tryDo";
import { useCallback } from "react";
import { useGetSignInViewState, useSetSignInViewState } from "../context";
import type { FormSignInValues } from "../types";

const SIGN_IN_URL = "http://localhost:4444/auth/sign-in";

export type UseSubmitFormParams = {
  returnUrl?: string;
};

export default function useSubmitForm(args?: UseSubmitFormParams) {
  const { returnUrl } = args || {};
  const router = useZoneRouter(ZONE_NAME);
  const submitting = useGetSignInViewState((s) => !!s?.submitting);

  const saveAuthToStore = useGetAuthState((s) => s?.saveAuthToStore);
  const setState = useSetSignInViewState();

  const handleSubmit: FormSubmitCallback<FormSignInValues> = useCallback(
    async ({ email, password, keepMeSigned }) => {
      if (submitting) return;
      setState({ submitting: true });

      const request = http.post<{ jwt: string }>(SIGN_IN_URL, {
        username: email,
        password,
        keepMeSigned,
      });

      const [error, response] = await tryDo(request);

      setState({ submitting: false });

      if (error || !response?.data?.jwt) return;

      const authData = authDataUtils.decodeJWT(response.data.jwt);
      if (!authData) return;

      saveAuthToStore?.(authData);

      if (!returnUrl) return;

      router.push(returnUrl);
    },
    [returnUrl, submitting, saveAuthToStore, setState]
  );

  return { handleSubmit };
}
