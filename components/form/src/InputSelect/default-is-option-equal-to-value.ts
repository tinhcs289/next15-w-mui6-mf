import type { Any, SelectOption } from "./types";

export function isOptionEqualToValue<T extends Any = Any>(
  option: SelectOption<T>,
  value: SelectOption<T> | string
) {
  return (
    option?.value === (value as string) ||
    option?.value === (value as SelectOption<T>)?.value
  );
}
