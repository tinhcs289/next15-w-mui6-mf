import type { AutocompleteRenderOptionState } from "@mui/material/Autocomplete";
import type { HTMLAttributes } from "react";
import type { Any, SelectOption } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function defaultRenderOption<T extends Any = Any>(_multiple: boolean) {
  return (
    props: HTMLAttributes<HTMLLIElement>,
    option: SelectOption<T>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _state: AutocompleteRenderOptionState
  ) => {
    return (
      <li {...props} key={`${option.value}`}>
        {option?.label || ""}
      </li>
    );
  };
}
