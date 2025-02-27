import type {
  LocalStorageItemMigrate,
  LocalStorageItemValidator,
} from "./types";

function localStorageRemoveItem(key: string) {
  if (
    !key ||
    typeof Storage === "undefined" ||
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined" ||
    typeof window.localStorage.removeItem !== "function"
  ) {
    return;
  }
  return window.localStorage.removeItem(key);
}

function localStorageUpdateItem<T>(key: string, value: T) {
  if (
    !key ||
    typeof Storage === "undefined" ||
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined" ||
    typeof window.localStorage.setItem !== "function"
  ) {
    return;
  }
  return window.localStorage.setItem(key, JSON.stringify(value));
}

function localStorageGetItem<T>(
  /**
   * the key in the LocalStorage.
   */
  key: string,
  /**
   * A function for validating the type of the current value of the `key` which was stored in the LocalStorage.
   * the `validate` function will returns `true` if the current value matches with the type of T, otherwise returns `false`.
   */
  validate?: LocalStorageItemValidator<T>,
  /**
   * if the current value of the `key` which was stored in the LocalStorage has a conflict type with T,
   * the `migrate` function will be used to convert or re-model the value into the type of T.
   * This will help the `localStorageGetItem` function always returns a valid value or null.
   */
  migrate?: LocalStorageItemMigrate<T>,
  /**
   * if the current value of the `key` which was stored in the LocalStorage has a conflict type with T,
   * provide the `overrideValueIfInvalid` to `true`/`false` to update the value in the LocalStorage with a new valid value or clear if the new value are null.
   */
  overrideValueIfInvalid?: boolean
): T | null {
  if (
    !key ||
    typeof Storage === "undefined" ||
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined" ||
    typeof window.localStorage.getItem !== "function"
  ) {
    return null;
  }

  const value = window.localStorage.getItem(key);
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
  } catch (_) {
    returns = value as T;
  } finally {
    if (isInvalid && !!overrideValueIfInvalid) {
      if (returns === null) localStorageRemoveItem(key);
      else localStorageUpdateItem(key, returns);
    }
    return returns;
  }
}

export const LS = {
  get: localStorageGetItem,
  update: localStorageUpdateItem,
  remove: localStorageRemoveItem,
};
