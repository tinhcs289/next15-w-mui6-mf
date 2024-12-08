import Cookies from "js-cookie";
import type { CookieItem, CookieItemMigrate, CookieItemValidator } from "./types";

function cookieRemoveItem(key: string) {
  if (!key) return;
  return Cookies.remove(key);
}

function cookieUpdateItem<T>(key: string, value: T) {
  if (!key) return;
  const valueStringified = JSON.stringify(value);
  return Cookies.set(key, valueStringified);
}

function cookieGetItem<T>(
  /**
   * the key in the cookies.
   */
  key: string,
  /**
   * A function for validating the type of the current value of the `key` which was stored in the browser's cookie.
   * the `validate` function will returns `true` if the current value matches with the type of T, otherwise returns `false`.
   */
  validate?: CookieItemValidator<T>,
  /**
   * if the current value of the `key` which was stored in the browser's cookie has a conflict type with T,
   * the `migrate` function will be used to convert or re-model the value into the type of T.
   * This will help the `cookieGetItem` function always returns a valid value or null.
   */
  migrate?: CookieItemMigrate<T>,
  /**
   * if the current value of the `key` which was stored in the browser's cookie has a conflict type with T,
   * provide the `overrideValueIfInvalid` to `true`/`false` to update the value in the browser's cookie with a new valid value or clear if the new value are null.
   */
  overrideValueIfInvalid?: boolean
): T | null {
  if (!key) return null;
  const value = Cookies.get(key);
  if (!value) return null;
  let returns = null;
  let isInvalid = false;
  try {
    const val = JSON.parse(value) as T;
    if (typeof validate === "function") {
      if (validate(val) === true) returns = val;
      else {
        isInvalid = true;
        if (typeof migrate !== "function") returns = null;
        else returns = migrate(value || "");
      }
    } else returns = val;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    returns = value as T;
  } finally {
    if (isInvalid && !!overrideValueIfInvalid) {
      if (returns === null) cookieRemoveItem(key);
      else cookieUpdateItem(key, returns);
    }
    // eslint-disable-next-line no-unsafe-finally
    return returns;
  }
}

export function newCookieItem<T>(
  args: {
    key: string;
    validate?: CookieItemValidator<T>;
    migrate?: CookieItemMigrate<T>;
    overrideValueIfInvalid?: boolean;
  } & Partial<Omit<CookieItem<T>, "key">>
): CookieItem<T> {
  return {
    key: args.key,
    get:
      args?.get ||
      (() =>
        cookieGetItem(
          args.key,
          args?.validate,
          args?.migrate,
          args?.overrideValueIfInvalid
        )),
    set:
      args?.set ||
      ((value: T | null | undefined) => cookieUpdateItem(args.key, value)),
    clear: args?.clear || (() => cookieRemoveItem(args.key)),
  };
}