import type { AuthData } from "@shared/types/auth";
import { newCookieItem } from "@shared/utils/cookie";
import { newLocalStorageListenableItem } from "@shared/utils/local-storage";
import { validateAuthData } from "./validate-auth-data";


export const authCookie = newCookieItem<AuthData>({
  key: "cookie:authentication",
  validate: validateAuthData,
});

export const authLocalStorage = newLocalStorageListenableItem<AuthData>({
  key: "ls:authentication",
  validate: validateAuthData,
});
