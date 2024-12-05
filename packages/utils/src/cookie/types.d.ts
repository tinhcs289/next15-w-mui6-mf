export type CookieItemValueGetter<T> = () => T | null | undefined;

export type CookieItemValueSetter<T> = (value: T | null | undefined) => void;

export type CookieItemValueClear = () => void;

export type CookieItemValidator<T> = (value: T | null) => boolean;

export type CookieItemMigrate<T> = (value: string) => T | null;

export type CookieItem<T> = {
  key: string;
  get: CookieItemValueGetter<T>;
  set: CookieItemValueSetter<T>;
  clear: CookieItemValueClear;
};
