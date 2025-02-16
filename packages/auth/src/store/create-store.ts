"use client";

import type { AuthData } from "@shared/types/auth";
import { createZustandStoreContext } from "@shared/utils-react/zustand-context";
import { authCookie } from "../authentication/auth-stored-in-browser";
import type { AuthStates } from "./types";

const { StoreProvider: AuthStoreProvider, useStoreContext: useAuthStore } =
  createZustandStoreContext<AuthStates>((set) => ({
    auth: authCookie.get() || null,
    saveAuthToStore: (data?: AuthData) => set(() => ({ auth: data || null })),
    permissions: [],
    roles: [],
  }));

export { AuthStoreProvider, useAuthStore };
