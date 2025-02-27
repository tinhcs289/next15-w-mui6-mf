import { newCookieItem, newLocalStorageListenableItem } from "@shared/browser-storage";
import type { AuthData } from "@shared/types/auth";
import { validateAuthData } from "./validate-auth-data";

export const authCookie = newCookieItem<AuthData>({
  key: "cookie:authentication",
  validate: validateAuthData,
});

export const authLocalStorage = newLocalStorageListenableItem<AuthData>({
  key: "ls:authentication",
  validate: validateAuthData,
});
