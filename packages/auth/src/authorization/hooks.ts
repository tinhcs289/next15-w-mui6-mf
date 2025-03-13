"use client";

import { useMemo } from "react";
import { useGetAuthState } from "../store";
import { FEATURE_MAP } from "./feature-map";
import { isAllowedIf } from "./utils";

/**
 * check the ability to use a `function|view|component` by a `field` from the object `FEATURE_MAP` in `@shared/auth`
 * @example
   import { usePermissions } from "@shared/auth";
   .....
   const { isAllowed } = usePermissions("CreateProduct");
   .....
   // do something with `isAllowed`
 */
export function usePermissions(featureKey: string) {
  const permissions = useGetAuthState((s) => s?.permissions);

  const isAllowed = useMemo(() => {
    const clause = FEATURE_MAP[featureKey];
    if (!clause) return false;
    return !permissions ? false : isAllowedIf(permissions).matchesWith(clause);
  }, [permissions, featureKey]);

  return { isAllowed };
}
