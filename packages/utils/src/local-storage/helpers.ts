/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-finally */
import isEqual from "lodash/isEqual";
import type {
  CreateNewLocalStorageItemArgs,
  LocalStorageChangeItemEvent,
  LocalStorageChangeItemValue,
  LocalStorageItem,
  LocalStorageItemMigrate,
  LocalStorageItemValidator,
  LocalStorageSyncItem,
  LocalStorageSyncKey
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    returns = value as T;
  } finally {
    if (isInvalid && !!overrideValueIfInvalid) {
      if (returns === null) localStorageRemoveItem(key);
      else localStorageUpdateItem(key, returns);
    }
    return returns;
  }
}

export function newLocalStorageItem<T>(args: CreateNewLocalStorageItemArgs<T>) {
  return {
    key: args.key,
    get:
      args?.get ||
      (() =>
        localStorageGetItem(
          args.key,
          args?.validate,
          args?.migrate,
          args?.overrideValueIfInvalid
        )),
    set:
      args?.set ||
      ((value: T | null | undefined) =>
        localStorageUpdateItem(args.key, value)),
    clear: args?.clear || (() => localStorageRemoveItem(args.key)),
  } as LocalStorageItem<T>;
}



//---------------------------------------------------------------------------
let isInitialized = false;
const prefix = "lsSync:";
const prefixEventName = "ls:changes";
const defaultSyncValue = "lsSync:default";
/**
 * Array of items which used to compare with values in LS
 */
const initializedKeys: LocalStorageSyncKey[] = [];
/**
 * Array of item keys which is marked as stop event-listener in current tab
 */
let stopList: string[] = [];

function __markStopListen(key: string) {
  if (!key || stopList.includes(key)) return;
  stopList.push(key);
}

function __unmarkStopListen(key: string) {
  if (!key || !stopList.includes(key)) return;
  stopList = stopList.filter((k) => k !== key);
}

function __isMarkStopListen(key: string) {
  return !!key && stopList.includes(key);
}

function __setSyncItem(key: string, value: string) {
  if (!key) return;
  const previousValue = localStorageGetItem<string>(key);
  localStorageUpdateItem(key, value);
  if (previousValue) {
    const i = initializedKeys.findIndex((syncKey) => syncKey.name === key);
    if (i !== -1 && typeof initializedKeys[i] !== "undefined") {
      initializedKeys[i].value = value;
      initializedKeys[i].previousValue = previousValue;

      if (__isMarkStopListen(key)) return;
      __pushEvent(initializedKeys[i].name, initializedKeys[i]);
    }
  } else {
    initializedKeys.push({
      name: key,
      value: value,
      previousValue: undefined,
    });
  }
}

function __getSyncItem(key: string) {
  if (!key) return null;
  const value = localStorageGetItem<string>(key);
  if (!value) return null;
  try {
    if (JSON.parse(value) === defaultSyncValue) return null;
    // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
  } catch (error) {}
  return value;
}

function __detectChangeAndSync() {
  const changes: LocalStorageSyncKey[] = [];
  const state = {} as { [x: string]: string };
  if (
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined" ||
    typeof window.localStorage.getItem !== "function"
  )
    return changes;
  Object.keys(window.localStorage)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => {
      state[key] = window.localStorage.getItem(key) || "";
    });
  for (let i = 0; i < initializedKeys.length; i++) {
    // @ts-ignore
    const currentValue = __extractJsonValue<any>(initializedKeys[i].value);
    const incomingValue = __extractJsonValue<any>(
      // @ts-ignore
      state[initializedKeys[i].name]
    );
    if (isEqual(currentValue, incomingValue)) continue;
    const change = {
      // @ts-ignore
      name: initializedKeys[i].name,
      // @ts-ignore
      value: state[initializedKeys[i].name],
      // @ts-ignore
      previousValue: initializedKeys[i].value,
    };
    // @ts-ignore
    changes.push(change);
    // @ts-ignore
    initializedKeys[i].value = change.value;
    // @ts-ignore
    initializedKeys[i].previousValue = change.previousValue;
  }
  return changes;
}

function __pushEvent(key: string, detail: LocalStorageSyncKey) {
  if (
    typeof window === "undefined" ||
    typeof window.document === "undefined" ||
    typeof window.document.dispatchEvent !== "function"
  ) {
    return;
  }
  const event = new CustomEvent(`${prefixEventName}${key}`, { detail });
  document.dispatchEvent(event);
}

function __triggerListeners(changes: LocalStorageSyncKey[] = []) {
  if (
    typeof document === "undefined" ||
    typeof document.dispatchEvent !== "function" ||
    !(Array.isArray(changes) && changes.length > 0)
  )
    return;
  for (let i = 0; i < changes.length; i++) {
    // @ts-ignore
    __pushEvent(changes[i].name, {
      ...changes[i],
      value:
        // @ts-ignore
        changes[i].value !== defaultSyncValue ? changes[i].value : undefined,
      previousValue:
        // @ts-ignore
        changes[i].previousValue !== defaultSyncValue
          ? // @ts-ignore
            changes[i].previousValue
          : undefined,
    } as LocalStorageSyncKey);
  }
}

function __initListener() {
  if (
    isInitialized ||
    typeof window === "undefined" ||
    typeof window.addEventListener !== "function"
  )
    return;
  window.addEventListener("storage", () => {
    const changes = __detectChangeAndSync();
    __triggerListeners(changes);
  });
  isInitialized = true;
}

function __extractJsonValue<T>(
  value: string | null | undefined,
  validate?: LocalStorageItemValidator<T>
): T | null {
  if (!value) return null;
  let returns = null;
  try {
    // Object
    returns = JSON.parse(JSON.parse(value)) as T;
    if (returns === defaultSyncValue) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e1) {
    // number | boolean
    try {
      returns = JSON.parse(value) as T;
      if (returns === defaultSyncValue) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e2) {
      // plain text
      returns = value as T;
      if (returns === defaultSyncValue) return null;
    }
  } finally {
    if (typeof validate === "function") {
      return validate(returns) === true ? returns : null;
    }
    return returns;
  }
}

function __addLocalStorageListener(
  key: string,
  handler: (event: LocalStorageChangeItemEvent) => void
) {
  if (typeof document !== "undefined") {
    document.addEventListener(`${prefixEventName}${key}`, handler as any);
  }
}

export function newLocalStorageListenableItem<T>(args: {
  key: string;
  defaultValue?: T;
  validate?: LocalStorageItemValidator<T>;
  migrate?: LocalStorageItemMigrate<T>;
  overrideValueIfInvalid?: boolean;
}): LocalStorageSyncItem<T> {
  const syncKey = `${prefix}${args.key}`;
  const previousValue = localStorageGetItem<string>(syncKey);
  if (previousValue) {
    initializedKeys.push({
      name: syncKey,
      value: previousValue,
      previousValue: undefined,
    });
  } else {
    localStorageUpdateItem(syncKey, defaultSyncValue);
    initializedKeys.push({
      name: syncKey,
      // eslint-disable-next-line no-extra-boolean-cast
      value: !!args?.defaultValue
        ? JSON.stringify(args.defaultValue)
        : defaultSyncValue,
      previousValue: undefined,
    });
  }
  __initListener();
  return {
    key: syncKey,
    get: () => {
      const value = __getSyncItem(syncKey);
      if (!value || value === defaultSyncValue) return null;
      return __extractJsonValue<T>(value, args?.validate);
    },
    set: (value: T | null | undefined, stopListenerInThisTab?: boolean) => {
      if (stopListenerInThisTab) __markStopListen(syncKey);
      __setSyncItem(syncKey, JSON.stringify(value || defaultSyncValue));
    },
    onChange: (
      handler: (
        event: LocalStorageChangeItemEvent,
        value: LocalStorageChangeItemValue<T>
      ) => void
    ) => {
      if (__isMarkStopListen(syncKey)) {
        __unmarkStopListen(syncKey);
        return;
      }
      if (!handler) return;
      console.log(`LocalStorage key <${syncKey}> value change listener`);
      __addLocalStorageListener(
        syncKey,
        (event: LocalStorageChangeItemEvent) => {
          const { detail } = event;
          const value: LocalStorageChangeItemValue<T> = {
            name: detail.name,
            value: __extractJsonValue(detail.value, args?.validate),
            previousValue: __extractJsonValue(
              detail.previousValue,
              args?.validate
            ),
          };
          console.log(
            `LocalStorage key <${syncKey}> value has changed, event detail:`,
            value
          );
          handler(event, value);
        }
      );
    },
  };
}

export function resetAllSyncKeys() {
  if (!(Array.isArray(initializedKeys) && initializedKeys.length > 0)) return;
  for (let i = 0; i < initializedKeys.length; i++) {
    // @ts-ignore
    if (typeof initializedKeys[i].name !== "string") continue;
    // @ts-ignore
    initializedKeys[i].value = defaultSyncValue;
    // @ts-ignore
    initializedKeys[i].previousValue = undefined;
    // @ts-ignore
    localStorageUpdateItem(initializedKeys[i].name, defaultSyncValue);
  }
}