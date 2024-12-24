"use client";

import { ALLOWED_TO_USE } from "@repo/constants/permissions";
import { useMemo } from "react";
import { useAuthStore } from "./auth-store";
import { isAllowedIf } from "./permissions-utils";
import type { AppFeatureKey } from "./permissions.types";

/**
 * check the ability to use a `function|view|component` by a `AppFeatureKey` from the object `ALLOWED_TO_USE` in `@repo/constants/permissions`
 * @example
   import { usePermissions } from '@repo/auth';
   .....
   const { isAllowed } = usePermissions("CreateProduct");
   .....
   // do something with `isAllowed`
 */
export function usePermissions(featureKey: AppFeatureKey) {
  const permissions = useAuthStore((s) => s?.permissions);

  const isAllowed = useMemo(() => {
    const clause = ALLOWED_TO_USE[featureKey];
    if (!clause) return false;
    return !permissions ? false : isAllowedIf(permissions).matchesWith(clause);
  }, [permissions, featureKey]);

  return { isAllowed };
}
