import type { JwtPayload } from "jsonwebtoken";
import type { Moment } from "moment";

export type Permission = {
  id?: string | number;
  key: string;
  name: string;
};
export type Roles = {
  id?: string | number;
  key: string;
  name: string;
  permissions?: Permission[];
};
/**
 * The comparative clause which define the permissions corresponding to `function|view|component`.
 * Each `function|view|component` in the Application will correspond to a number of permission.
 * If the current user has those permissions, the `function|view|component` will be available.
 * Otherwise, the `function|view|component` must be invisibled or disabled.
 */
export type PermissionClause = {
  /**
   * - `matchAll` This type means the permission check will return `true` if the user has all the permissions of `permissions`.
   * - `oneOf` This type means the permission check will return `true` if the user has one of the permissions of `permissions`
   */
  type: "oneOf" | "matchAll";
  /**
   * Array of permisstion key as string or a nested clause
   */
  permissions: Array<string | PermissionClause>;
};

export type AuthProvider =
  | "credentials"
  | "facebook"
  | "google"
  | "okta"
  | "keycloak"
  | "azure"
  | "aws"
  | "firebase";


export type DateData = {
  date?: Moment | null;
  timestamp?: number | null;
};

export type DateWithIntervalData = DateData & { interval?: number | null };

export type AuthData = {
  // type of authentication logic
  provider: AuthProvider;
  ssoAccessToken?: string | null;
  // standard jwt properties
  accessToken: string;
  refreshToken?: string | null;
  issuedAt?: DateData | null;
  expiredAt?: DateWithIntervalData | null;
};

export type AuthTokenPayload = JwtPayload & {
  user_id?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  preference_language?: string;
  avatar?: string;
  refresh_token?: string;
};
