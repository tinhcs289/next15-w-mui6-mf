"use client";

import { createStatesContext } from "@shared/states-context";
import { memo, PropsWithChildren, useCallback } from "react";
import { authCookie, authLocalStorage, formatAuth } from "../authentication";
import type { AuthData } from "../types";
import type { AuthStates } from "./types";

const {
  StatesProvider,
  useGetState: useGetAuthState,
  useInitState: useInitAuthState,
  useSetState: useSetAuthState,
  useCallbackState: useCallbackAuthState,
} = createStatesContext<AuthStates>({
  auth: formatAuth.get(authCookie.get()) || null,
  permissions: [],
  roles: [],
});

const SetAuthCallbackInitializer = memo(() => {
  const setState = useSetAuthState();

  const updateAuth = useCallback((data?: AuthData) => {
    const plainData = formatAuth.toPlain(data);
    authCookie.set(plainData);
    authLocalStorage.set(plainData, true);
    setState({ auth: data || null });
  }, [setState]);

  useInitAuthState("saveAuthToStore", updateAuth, {
    when: "whenever-value-changes",
  });

  return null;
});
SetAuthCallbackInitializer.displayName = "SetAuthCallbackInitializer";

function AuthStatesProvider({ children }: PropsWithChildren) {
  return (
    <StatesProvider>
      <SetAuthCallbackInitializer />
      {children}
    </StatesProvider>
  );
}

export {
  AuthStatesProvider,
  useCallbackAuthState,
  useGetAuthState,
  useInitAuthState,
  useSetAuthState
};

