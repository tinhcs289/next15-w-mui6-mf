"use client";

import type { AuthData } from "@shared/types/auth";
import { createStatesContext } from "@shared/utils-react/states-context";
import { createZustandStoreContext } from "@shared/utils-react/zustand-context";
import { memo, PropsWithChildren, useCallback } from "react";
import { authCookie, authLocalStorage } from "../authentication/auth-stored-in-browser";
import type { AuthStates } from "./types";


const { StoreProvider: AuthStoreProvider, useStoreContext: useAuthStore } =
  createZustandStoreContext<AuthStates>((set) => ({
    auth: authCookie.get() || null,
    saveAuthToStore: (data?: AuthData) => {
      authCookie.set(data);
      authLocalStorage.set(data, true);
      set(() => ({ auth: data || null }))
    },
    permissions: [],
    roles: [],
  }));

export { AuthStoreProvider, useAuthStore };


const {
  StatesProvider,
  useGetState: useGetAuthState,
  useInitState: useInitAuthState,
  useSetState: useSetAuthState,
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
  AuthStatesProvider, useGetAuthState,
  useInitAuthState,
  useSetAuthState
};
