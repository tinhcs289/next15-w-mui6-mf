import type { AuthData, Permission, Roles } from "../types";

export type AuthStates = {
  auth?: AuthData | null;
  saveAuthToStore?: (data?: AuthData) => void;
  roles?: Roles[] | null;
  permissions?: Permission[] | null;
};