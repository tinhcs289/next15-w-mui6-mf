export type LocalStorageItemGetter<T> = () => T | null | undefined;

export type LocalStorageItemSetter<T> = (value: T | null | undefined) => void;

export type LocalStorageSyncItemSetter<T> = (
  value: T | null | undefined,
  stopListenerInThisTab?: boolean
) => void;

export type LocalStorageItemValidator<T> = (value: T | null) => boolean;

export type LocalStorageItemMigrate<T> = (value: string) => T | null;

export type LocalStorageItem<T> = {
  key: string;
  get: LocalStorageItemGetter<T>;
  set: LocalStorageItemSetter<T>;
  clear: () => void;
};

export type CreateNewLocalStorageItemArgs<T> = Partial<
  Omit<LocalStorageItem<T>, "key">
> & {
  key: string;
  validate?: LocalStorageItemValidator<T>;
  migrate?: LocalStorageItemMigrate<T>;
  overrideValueIfInvalid?: boolean;
};

export type LocalStorageSyncKey = {
  value: string;
  name: string;
  previousValue?: string;
};

export type LocalStorageChangeItemEvent = CustomEvent<LocalStorageSyncKey>;

export type LocalStorageChangeItemValue<T> = {
  name: string;
  value: T | null | undefined;
  previousValue: T | null | undefined;
};

export type LocalStorageChangeItemHandler<DataType> = (
  event: LocalStorageChangeItemEvent,
  detail: LocalStorageChangeItemValue<DataType>
) => void;

export type LocalStorageSyncItem<DataType> = {
  key: string;
  get: LocalStorageItemGetter<DataType>;
  /**
   * @example
      auth.set(jwt)
      // used for normal cases the change event will affect all tabs which subscribe to changes of `auth`
   * @example
      auth.set(jwt, true)
      // the listener for `auth` in the current tab will be stopped till the next change happen.
      // used in case the change event will affect other tabs not the current
   */
  set: LocalStorageSyncItemSetter<DataType>;
  onChange: (handler: LocalStorageChangeItemHandler<DataType>) => void;
};

