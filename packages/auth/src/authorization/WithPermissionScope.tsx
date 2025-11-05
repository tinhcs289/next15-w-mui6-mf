"use client";

import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import { memo } from "react";
import { usePermissionScope } from "./context";

export type WithPermissionScopeProps = PropsWithChildren<{
  /**
   * Each `function|view|component` in the Application will correspond to a number of permissions.
   * If the current user has those permissions, the `function|view|component` will be available.
   * Otherwise, the `function|view|component` must be invisibled or disabled.
   */
  allowFor: string;
  /**
   * fallback `Component` will be render if the children component do not pass the clause
   */
  fallback?: ComponentType<any> | ReactNode;
}>;

/**
 * Wrapping a `Component` which is permitted to be visibled by a `PermissionClause` from the object `ALLOWED_TO_USE` in `@/permissions/constants`.
 * If the permissions do not match, a "fallback" Component will be visibled.
 * @example
    import WithPermissionScope from "@shared/auth/components/WithPermissionScope";
    .....
    <WithPermissionScope allowFor="product_management" fallback={NotPermittedComponent}>
      <CreateProductView />
      <CreateListView />
      <CreateDetailView />
    </WithPermissionScope>
 */
const WithPermissionScope = memo(
  ({ allowFor, children, fallback: Fallback }: WithPermissionScopeProps) => {
    const scope = usePermissionScope();
    const isAllowed = scope.canUseFeature(allowFor);

    if (!isAllowed) {
      if (!Fallback) return null;
      return typeof Fallback === "function" ? <Fallback /> : Fallback;
    }

    return children;
  }
) as ComponentType<WithPermissionScopeProps>;
WithPermissionScope.displayName = "WithPermissionScope";

export default WithPermissionScope;
