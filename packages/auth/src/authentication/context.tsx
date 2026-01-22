"use client";

import { createStatesContext } from "@packages/states-context";
import { memo, useCallback, useEffect } from "react";
import type { JSX, PropsWithChildren } from "react";
import type { AuthData } from "./auth-data";
import { authCookie, authDataUtils, authLocalStorage } from "./auth-data";

export type AuthStates = {
  auth?: AuthData | null;
  saveAuthToStore?: (data?: AuthData | null) => void;
  verifyAuth?: () => Promise<void>;
  verifiedAuth?: boolean;
  isVerifyingAuth?: boolean;
};

const {
  StatesProvider,
  useGetState: useGetAuthState,
  useInitState: useInitAuthState,
  useSetState: useSetAuthState,
  useCallbackState: useCallbackAuthState,
} = createStatesContext<AuthStates>({
  auth: authDataUtils.convertToStates(authCookie.get()) || null,
  verifiedAuth: false,
  isVerifyingAuth: false,
});

export {
  useCallbackAuthState,
  useGetAuthState,
  useInitAuthState,
  useSetAuthState,
};

const simulateVerifyAuth = async (_accessToken: string) =>
  new Promise<boolean>((resolve) => {
    // bypass the actual verification for demo purposes
    setTimeout(() => {
      resolve(true);
    }, 100);
  });

export const VerifyAuthCallbackInitializer = memo(
  ({
    callback = simulateVerifyAuth,
  }: {
    callback?: (accessToken: string) => Promise<boolean>;
  }) => {
    const setState = useSetAuthState();
    const accessToken = useGetAuthState((s) => s?.auth?.accessToken);
    const isVerifyingAuth = useGetAuthState((s) => s?.isVerifyingAuth);

    useCallbackAuthState(
      "verifyAuth",
      async () => {
        if (isVerifyingAuth) return;
        if (!callback) return;

        if (!accessToken) {
          setState({ verifiedAuth: false });
          return;
        }

        try {
          const isVerified = await callback(accessToken);
          setState({ verifiedAuth: isVerified });
        } catch {
          setState({ verifiedAuth: false });
        }
      },
      [setState, isVerifyingAuth, accessToken, callback]
    );
  }
);
VerifyAuthCallbackInitializer.displayName = "VerifyAuthCallbackInitializer";

const SetAuthCallbackInitializer = memo(() => {
  const setState = useSetAuthState();

  const updateAuth = useCallback(
    (data?: AuthData | null) => {
      if (!data) {
        authCookie.set(null);
        authLocalStorage.set(null, { skipTriggerChangeInThisTab: true });
        setState({ auth: null });
        return;
      }

      const plainData = authDataUtils.convertToPlain(data);
      authCookie.set(plainData);
      authLocalStorage.set(plainData, { skipTriggerChangeInThisTab: true });
      setState({ auth: data });
    },
    [setState]
  );

  useInitAuthState("saveAuthToStore", updateAuth, {
    when: "whenever-value-changes",
  });

  return null;
});
SetAuthCallbackInitializer.displayName = "SetAuthCallbackInitializer";

const VerifyAuthOnMount = memo(() => {
  const verifyAuth = useGetAuthState((s) => s?.verifyAuth);
  useEffect(() => {
    if (!verifyAuth) return;
    void verifyAuth();
  }, [verifyAuth]);
  return null as unknown as JSX.Element;
});
VerifyAuthOnMount.displayName = "VerifyAuthOnMount";

export function AuthStatesProvider({ children }: PropsWithChildren) {
  return (
    <StatesProvider>
      <SetAuthCallbackInitializer />
      <VerifyAuthOnMount />
      {children}
    </StatesProvider>
  );
}


