import type { AuthData, Permission, Roles } from "@shared/types/auth";

export type AuthStates = {
  auth: AuthData | null;
  saveAuthToStore: (data?: AuthData) => void;
  roles?: Roles[] | null;
  permissions?: Permission[] | null;
};