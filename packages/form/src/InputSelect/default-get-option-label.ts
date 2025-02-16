import type { Any, SelectOption } from "./types";

export function defaultGetOptionLabel<T extends Any = Any>(
  option: string | SelectOption<T>
) {
  return typeof option === "string" ? option : option?.label || "";
}
