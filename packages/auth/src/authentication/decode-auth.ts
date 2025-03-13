import { decode } from "jsonwebtoken";
import { cloneDeep } from "lodash";
import moment, { Moment } from "moment";
import type { AuthData, AuthTokenPayload } from "../types";

function getIssuedAt(iat?: number): AuthData["issuedAt"] {
  return {
    timestamp: iat,
    date: Number.isInteger(iat)
      ? moment(iat)
      : null
  }
}

function getExpiredAt(exp?: number, issuedAt?: Moment | null): AuthData["expiredAt"] {
  const expiredTimeInSecond = Number.isInteger(exp) ? exp : null;
  const date = !issuedAt || !exp ? null : cloneDeep(issuedAt).add(exp, "millisecond");
  return {
    interval: expiredTimeInSecond,
    date: date,
    timestamp: !date ? null : +`${date.format("X")}`
  };
}

export function decodeAuthData(jwtString: string): AuthData {
  const encryptData = decode(jwtString) as AuthTokenPayload;
  const refreshToken = encryptData["refresh_token"];
  const issuedAt = getIssuedAt(encryptData["iat"]);
  const expiredAt = getExpiredAt(encryptData["exp"], issuedAt?.date);

  const data: AuthData = {
    provider: "credentials",
    accessToken: jwtString,
    refreshToken,
    expiredAt,
    issuedAt,
  };

  return data;
}