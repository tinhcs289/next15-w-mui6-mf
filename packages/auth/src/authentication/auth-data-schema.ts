import type { YupObjectSchema } from "@shared/types/common";
import * as yup from "yup";
import { AuthTypeEnum } from "../enums";
import type { AuthPlainData } from "../types";

// @ts-ignore
export const authDataSchema: YupObjectSchema<AuthPlainData> = yup.object().shape({
  provider: yup.mixed().oneOf<string>(Object.values(AuthTypeEnum)),
  ssoAccessToken: yup.string().nullable(),
  accessToken: yup.string().required(),
  refreshToken: yup.string().nullable(),
  issuedAt_ts: yup.number().nullable(),
  expiredAt_ts: yup.number().nullable(),
  expiredAt_interval: yup.number().nullable(),
});