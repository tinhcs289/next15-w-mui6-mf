import type { AuthData, Roles, Permission } from "@repo/types/auth";

export type AuthStates = {
  auth: AuthData | null;
  saveAuthToStore: (data?: AuthData) => void;
  roles?: Roles[] | null;
  permissions?: Permission[] | null;
};