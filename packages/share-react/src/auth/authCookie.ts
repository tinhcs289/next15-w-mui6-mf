import { authDataSchema } from "@repo/constants/auth";
import type { AuthData } from "@repo/types/auth";
import { newCookieItem } from "@repo/utils/cookie";
import matchesSchema from "@repo/utils/data-validate/matchesSchema";

export const authCookie = newCookieItem<AuthData>({
  key: "cookie:authentication",
  validate: (value?: AuthData | null) => matchesSchema(value, authDataSchema),
});
