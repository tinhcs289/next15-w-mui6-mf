"use client";

import { useAuthStore } from '@/auth/store';
import type { AppFeatureKey } from "@/permissions/types";
import { ALLOWED_TO_USE } from '@repo/constants/permissions';
import { useMemo } from 'react';
import { isAllowedIf } from "./functions";

/**
 * check the ability to use a `function|view|component` by a `AppFeatureKey` from the object `ALLOWED_TO_USE` in `@repo/constants/permissions`
 * @example
   import { usePermissions } from '@repo/share-react/permissions';
   .....
   const { isAllowed } = usePermissions("CreateProduct");
   .....
   // do something with `isAllowed`
 */
export default function usePermissions(featureKey: AppFeatureKey) {
  const permissions = useAuthStore((s) => s?.permissions);

  const isAllowed = useMemo(
    () => {
      const clause = ALLOWED_TO_USE[featureKey];
      if (!clause) return false;
      return !permissions ? false : isAllowedIf(permissions).matchesWith(clause);
    },
    [permissions, featureKey]
  );

  return { isAllowed };
}