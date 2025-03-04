"use client";

import { createStatesContext } from "@shared/states-context";
import type { AuthData } from "@shared/types/auth";
import { memo, PropsWithChildren, useCallback } from "react";
import { authCookie, authLocalStorage } from "../authentication/auth-stored-in-browser";
import type { AuthStates } from "./types";

const {
  StatesProvider,
  useGetState: useGetAuthState,
  useInitState: useInitAuthState,
  useSetState: useSetAuthState,
  useCallbackState: useCallbackAuthState,
} = createStatesContext<AuthStates>({
  auth: authCookie.get() || null,
  permissions: [],
  roles: [],
});

const SetAuthCallbackInitializer = memo(() => {
  const setState = useSetAuthState();

  const updateAuth = useCallback((data?: AuthData) => {
    authCookie.set(data);
    authLocalStorage.set(data, true);
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
  useSetAuthState,
};

