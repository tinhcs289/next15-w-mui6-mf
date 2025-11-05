"use client";

import { createStatesContext } from "@shared/states-context";
import { memo, PropsWithChildren, useCallback } from "react";
import type { AuthData } from "./auth-data";
import { authCookie, authDataUtils, authLocalStorage } from "./auth-data";

export type AuthStates = {
  auth?: AuthData | null;
  saveAuthToStore?: (data?: AuthData | null) => void;
};

const {
  StatesProvider,
  useGetState: useGetAuthState,
  useInitState: useInitAuthState,
  useSetState: useSetAuthState,
  useCallbackState: useCallbackAuthState,
} = createStatesContext<AuthStates>({
  auth: authDataUtils.convertToStates(authCookie.get()) || null,
});

export {
  useCallbackAuthState,
  useGetAuthState,
  useInitAuthState,
  useSetAuthState
};

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

export function AuthStatesProvider({ children }: PropsWithChildren) {
  return (
    <StatesProvider>
      <SetAuthCallbackInitializer />
      {children}
    </StatesProvider>
  );
}
