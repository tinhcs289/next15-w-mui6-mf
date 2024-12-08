import type { AuthData } from "@repo/types/auth";
import type { YupObjectSchema } from "@repo/types/common";
import * as yup from "yup";

export const AUTH_PROVIDER = {
  CREDENTIALS: "credentials",
  GOOGLE: "google",
  AZURE: "azure",
  KEYCLOAK: "keycloak",
  OKTA: "okta",
};

export const authDataSchema: YupObjectSchema<AuthData> = yup.object().shape({
  provider: yup.string().required(),
  accessToken: yup.string().required(),
  refreshToken: yup.string().nullable(),
  expiredTimeInSecond: yup.number().nullable(),
  expiredIn: yup.number().nullable(),
  ssoAccessToken: yup.string().nullable(),
});