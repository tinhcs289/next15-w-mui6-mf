import {
  newCookieItem,
  newLocalStorageListenableItem,
} from "@shared/browser-storage";
import type { AuthPlainData, AuthData } from "../types";
import { validateAuthData } from "./validate-auth-data";
import moment from "moment";

export const authCookie = newCookieItem<AuthPlainData>({
  key: "cookie:authentication",
  validate: validateAuthData,
});

export const authLocalStorage = newLocalStorageListenableItem<AuthPlainData>({
  key: "ls:authentication",
  validate: validateAuthData,
});

export const formatAuth = {
  get: function (plainData?: AuthPlainData | null): AuthData | null {
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
  toPlain: function (data?: AuthData | null): AuthPlainData | null {
    if (!data) return null;

    const plainData: AuthPlainData = {
      provider: data.provider,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      ssoAccessToken: data.ssoAccessToken,
      issuedAt_ts: data?.issuedAt?.timestamp || null,
      expiredAt_ts: data?.expiredAt?.timestamp || null,
      expiredAt_interval: data?.expiredAt?.interval || null,
    };
    return plainData;
  },
};
