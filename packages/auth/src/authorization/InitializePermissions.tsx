"use client";

import type { ComponentType } from "react";
import { memo, useEffect } from "react";
import { usePermissionScope } from "./context";
import type { Permission } from "./permission-scope";

export type InitializePermissionsProps = {
  permissions: Permission[];
};

const InitializePermissions = memo(
  ({ permissions }: InitializePermissionsProps) => {
    const scope = usePermissionScope();

    useEffect(() => {
      if (!scope || !permissions?.length) return;
      scope.setUserPolicies(permissions);
    }, [permissions, scope]);

    return null;
  }
) as ComponentType<InitializePermissionsProps>;
InitializePermissions.displayName = "InitializePermissions";

export default InitializePermissions;