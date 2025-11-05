"use client";

import { CookieItem } from "@shared/browser-storage/cookie-item";
import { yupMigration as cookieItemMigration } from "@shared/browser-storage/cookie-item/adapters/yup";
import { LocalStorageItem } from "@shared/browser-storage/local-storage-item";
import { yupMigration as localStorageItemMigration } from "@shared/browser-storage/local-storage-item/adapters/yup";
import type { JwtPayload } from "jsonwebtoken";
import { decode } from "jsonwebtoken";
import { cloneDeep } from "lodash";
import type { Moment } from "moment";
import moment from "moment";
import * as y from "yup";

export enum AuthTypeEnum {
  CREDENTIALS = "credentials",
  FACEBOOK = "facebook",
  GOOGLE = "google",
  OKTA = "okta",
  KEYCLOAK = "keycloak",
  FIREBASE = "firebase",
  AZURE_AD = "azure_ad",
  AWS_COGNITO = "aws_cognito",
}

export type AuthType = `${AuthTypeEnum}`;

export type AuthPlainData = {
  provider: AuthType;
  accessToken: string;
  ssoAccessToken?: string | null;
  refreshToken?: string | null;
  issuedAt_ts?: number | null;
  expiredAt_ts?: number | null;
  expiredAt_interval?: number | null;
};

export type AuthData = Omit<
  AuthPlainData,
  "issuedAt_ts" | "expiredAt_ts" | "expiredAt_interval"
> & {
  issuedAt?: {
    date?: Moment | null;
    timestamp?: number | null;
  } | null;
  expiredAt?: {
    date?: Moment | null;
    timestamp?: number | null;
    interval?: number | null;
  } | null;
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

export const authDataSchema = y.object({
  provider: y.mixed<AuthType>().oneOf(Object.values(AuthTypeEnum)).required(),
  ssoAccessToken: y.string().nullable(),
  accessToken: y.string().required(),
  refreshToken: y.string().nullable(),
  issuedAt_ts: y.number().nullable(),
  expiredAt_ts: y.number().nullable(),
  expiredAt_interval: y.number().nullable(),
});

const getIssuedAt = (iat?: number): AuthData["issuedAt"] => ({
  timestamp: iat,
  date: Number.isInteger(iat) ? moment(iat) : null,
});

const getExpiredAt = (
  exp?: number,
  issuedAt?: Moment | null
): AuthData["expiredAt"] => {
  const date =
    !issuedAt || !exp ? null : cloneDeep(issuedAt).add(exp, "millisecond");
  return {
    interval: Number.isInteger(exp) ? exp : null,
    date: date,
    timestamp: !date ? null : +`${date.format("X")}`,
  };
};

export const authDataUtils = {
  decodeJWT: (jwtString: string): AuthData | null => {
    try {
      const encryptData = decode(jwtString) as AuthTokenPayload;
      const issuedAt = getIssuedAt(encryptData["iat"]);
      const expiredAt = getExpiredAt(encryptData["exp"], issuedAt?.date);
      const refreshToken = encryptData["refresh_token"];
      return {
        provider: "credentials",
        accessToken: jwtString,
        refreshToken,
        expiredAt,
        issuedAt,
      };
    } catch (_) {
      console.warn("[authDataUtils.decodeJWT]: could not decode JWT string");
      return null;
    }
  },
  validatePlainData: (value?: AuthPlainData | null) => {
    try {
      authDataSchema.validateSync(value);
      return true;
    } catch (_) {
      console.warn("[authDataUtils.validatePlainData]: invalid data");
      return false;
    }
  },
  convertToStates: (plainData?: AuthPlainData | null): AuthData | null => {
    if (!plainData) return null;
    const data: AuthData = {
      provider: plainData.provider,
      accessToken: plainData.accessToken,
      refreshToken: plainData.refreshToken,
      ssoAccessToken: plainData.ssoAccessToken,
    };

    const iat = plainData.issuedAt_ts;

    data.issuedAt = {
      timestamp: iat,
      date: Number.isInteger(iat) ? moment(iat) : null,
    };

    const exp = plainData.expiredAt_ts;

    data.expiredAt = {
      timestamp: exp,
      date: Number.isInteger(exp) ? moment(exp) : null,
      interval: plainData.expiredAt_interval,
    };

    return data;
  },
  convertToPlain: (data?: AuthData | null): AuthPlainData | null =>
    !data
      ? null
      : {
          provider: data.provider,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          ssoAccessToken: data.ssoAccessToken,
          issuedAt_ts: data?.issuedAt?.timestamp || null,
          expiredAt_ts: data?.expiredAt?.timestamp || null,
          expiredAt_interval: data?.expiredAt?.interval || null,
        },
};

export const authCookie = new CookieItem<AuthPlainData>(
  "ck:authentication",
  {
    migrations: [
      cookieItemMigration({
        version: 1,
        schema: authDataSchema,
      }),
    ],
  }
);

export const authLocalStorage = new LocalStorageItem<AuthPlainData>(
  "ls:authentication",
  {
    migrations: [
      localStorageItemMigration({
        version: 1,
        schema: authDataSchema,
      }),
    ],
  }
);
