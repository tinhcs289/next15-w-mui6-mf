"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useRef, useSyncExternalStore } from "react";
import { PermissionScope } from "./permission-scope";

const PermissionScopeContext = createContext<PermissionScope | null>(null);

function usePermissionScopeContext() {
  const ctx = useContext(PermissionScopeContext);
  if (!ctx) {
    throw new Error(
      "[usePermissionScopeContext] must be used within a [PermissionScopeProvider]"
    );
  }
  return ctx as PermissionScope;
}

export function PermissionScopeProvider({ children }: PropsWithChildren) {
  const scopeRef = useRef(new PermissionScope());

  return (
    <PermissionScopeContext.Provider value={scopeRef.current}>
      {children}
    </PermissionScopeContext.Provider>
  );
}

export function usePermissionScope() {
  const scope = usePermissionScopeContext();

  const subscribe = (callback: () => void) => scope.subscribe(callback);
  const getSnapshot = () => scope.__version;

  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return scope;
}

export type UsePermissionScope = ReturnType<typeof usePermissionScope>;