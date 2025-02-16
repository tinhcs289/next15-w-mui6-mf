"use client";

import { useMemo } from "react";
import { useAuthStore } from "../store";
import { FEATURE_MAP } from "./constants";
import type { AppFeatureKey } from "./types";
import { isAllowedIf } from "./utils";

/**
 * check the ability to use a `function|view|component` by a `AppFeatureKey` from the object `ALLOWED_TO_USE` in `@shared/constants/permissions`
 * @example
   import { usePermissions } from '@shared/auth';
   .....
   const { isAllowed } = usePermissions("CreateProduct");
   .....
   // do something with `isAllowed`
 */
export function usePermissions(featureKey: AppFeatureKey) {
  const permissions = useAuthStore((s) => s?.permissions);

  const isAllowed = useMemo(() => {
    const clause = FEATURE_MAP[featureKey];
    if (!clause) return false;
    return !permissions ? false : isAllowedIf(permissions).matchesWith(clause);
  }, [permissions, featureKey]);

  return { isAllowed };
}
