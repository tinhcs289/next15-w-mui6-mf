import DefineFeature from "./DefineFeature";
import InitializePermissions from "./InitializePermissions";
import WithPermissionScope from "./WithPermissionScope";

export { PermissionScopeProvider, usePermissionScope } from "./context";
export type { DefineFeatureProps } from "./DefineFeature";
export type { InitializePermissionsProps } from "./InitializePermissions";
export { matchAll, oneOf, PermissionScope } from "./permission-scope";
export type { Permission, PermissionClause, Role } from "./permission-scope";
export type { WithPermissionScopeProps } from "./WithPermissionScope";
export { DefineFeature, InitializePermissions, WithPermissionScope };

