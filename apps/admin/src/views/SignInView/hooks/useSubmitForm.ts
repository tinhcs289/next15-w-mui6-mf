"use client";

import { ENV_CONFIG } from "@/constants/environment";
import { authDataUtils, useGetAuthState } from "@packages/auth";
import type { FormSubmitCallback } from "@shared/form";
import { } from "@shared/form";
import { http } from "@packages/http-client";
import { useZoneRouter } from "@packages/navigation";
import tryDo from "@packages/utils/async/tryDo";
import { useCallback } from "react";
import { useGetSignInViewState, useSetSignInViewState } from "../context";
import type { FormSignInValues } from "../types";

const SIGN_IN_URL = `${ENV_CONFIG.internalRestApiBaseUrl}/sign-in`;

export type UseSubmitFormParams = {
  returnUrl?: string;
};

export default function useSubmitForm(args?: UseSubmitFormParams) {
  const { returnUrl } = args || {};
  const router = useZoneRouter(ENV_CONFIG.zoneName);
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
