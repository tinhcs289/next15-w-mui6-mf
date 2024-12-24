"use client";

import type { AuthData } from "@repo/types/auth";
import { createZustandStoreContext } from "@repo/utils-react/zustand-context";
import { authCookie } from "./auth-cookie";
import type { AuthStates } from "./auth-store.types";

const { StoreProvider: AuthStoreProvider, useStoreContext: useAuthStore } =
  createZustandStoreContext<AuthStates>((set) => ({
    auth: authCookie.get() || null,
    saveAuthToStore: (data?: AuthData) => set(() => ({ auth: data || null })),
    permissions: [],
    roles: [],
  }));

export { AuthStoreProvider, useAuthStore };
