"use client";

import { createZustandStoreContext } from "../utils/zustand-context";
import type { AuthData } from "@repo/types/auth";
import { authCookie } from "./authCookie";
import type { AuthStates } from "./types";

export const { StoreProvider: AuthStoreProvider, useStoreContext: useAuthStore } =
  createZustandStoreContext<AuthStates>((set) => ({
    auth: authCookie.get() || null,
    saveAuthToStore: (data?: AuthData) => set(() => ({ auth: data || null })),
    permissions: [],
    roles: [],
  }));