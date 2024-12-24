"use client";

import type { ComponentType, ReactNode } from "react";
import { useMemo } from "react";
import { usePermissions } from "./permissions-hooks";
import type { AppFeatureKey } from "./permissions.types";

export type WithPermissionsProps = {
  /**
   * Each `function|view|component` in the Application will correspond to a number of permissions. If the current user has those permissions, the `function|view|component` will be available. Otherwise, the `function|view|component` must be invisibled or disabled.
   */
  allowTo: AppFeatureKey;
  children?: ReactNode;
  /**
   * fallback `Component` will be render if the children component do not pass the clause
   */
  fallback?: ComponentType<any>;
  /**
   * fallback `ReactNode` will be render if the children component do not pass the clause
   */
  fallbackRender?: ReactNode;
};

/**
 * Wrapping a `Component` which is permitted to be visibled by a `PermissionClause` from the object `ALLOWED_TO_USE` in `@/permissions/constants`.
 * If the permissions do not match, a "fallback" Component will be visibled.
 * @example
   import { WithPermissions } from '@repo/permissions';
   .....
  <WithPermissions
    allowTo="CreateProduct"
    fallback={NotPermittedComponent}
  >
    <CreateProductView />
  </WithPermissions>
 */
export function WithPermissions(props: WithPermissionsProps) {
  const { allowTo, children, fallback: Fallback, fallbackRender } = props;
  const { isAllowed } = usePermissions(allowTo);

  const $Returns = useMemo(() => {
    if (!isAllowed) {
      if (!!Fallback) return <Fallback />;
      if (!!fallbackRender) return fallbackRender;
      return null;
    }
    return children;
  }, [isAllowed, children, Fallback, fallbackRender]);

  return <>{$Returns}</>;
}
