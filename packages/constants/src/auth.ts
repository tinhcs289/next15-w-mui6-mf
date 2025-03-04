import type { AuthData } from "@shared/types/auth";
import type { YupObjectSchema } from "@shared/types/common";
import * as yup from "yup";

export const AUTH_PROVIDER = {
  CREDENTIALS: "credentials",
  GOOGLE: "google",
  AZURE: "azure",
  KEYCLOAK: "keycloak",
  OKTA: "okta",
};

// export type AuthData = {
//   // type of authentication logic
//   provider: AuthProvider;
//   ssoAccessToken?: string | null;
//   // standard jwt properties
//   accessToken: string;
//   refreshToken?: string | null;
//   expiredTimeInSecond?: number | null;
//   // extended properties
//   issuedAt_timestamp?: number | null;
//   issuedAt?: Moment | null;
//   expired_timestamp?: number | null;
//   expiredAt?: Moment | null;
// };

// @ts-ignore
export const authDataSchema: YupObjectSchema<AuthData> = yup.object().shape({
  provider: yup.mixed().oneOf<string>([
    "credentials",
    "facebook",
    "google",
    "okta",
    "keycloak",
    "azure",
    "aws",
    "firebase",
  ]),
  ssoAccessToken: yup.string().nullable(),
  accessToken: yup.string().required(),
  refreshToken: yup.string().nullable(),
  expiredTimeInSecond: yup.number().nullable(),
  issuedAt: yup.object().nullable(),
  issuedAt_timestamp: yup.number().nullable(),
  expiredAt: yup.object().nullable(),
  expired_timestamp: yup.number().nullable(),
});
