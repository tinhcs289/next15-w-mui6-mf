import type {
  AutocompleteOwnerState,
  AutocompleteProps,
  AutocompleteRenderOptionState,
  AutocompleteChangeDetails as ChangeDetails,
  AutocompleteChangeReason as ChangeReason,
  AutocompleteRenderGetTagProps as GetTagProps,
} from "@mui/material/Autocomplete";
import type { ChipTypeMap } from "@mui/material/Chip";
import type { HTMLAttributes, JSX, ReactNode, SyntheticEvent } from "react";
import type { InputTextProps } from "../InputText";
import type { Option, RHFInputProps } from "../types";

export type Any = { [x: string]: any };

export type SelectOption<T extends Any = Any> = Option<T>;

export type OptionComponentProps<T extends Any = Any> = {
  liElementProps: HTMLAttributes<HTMLLIElement>;
  option: SelectOption<T>;
  renderState: AutocompleteRenderOptionState;
};

export type RenderSelectOptionCallback<T extends Any = Any> = (
  props: HTMLAttributes<HTMLLIElement>,
  option: SelectOption<T>,
  state: AutocompleteRenderOptionState
) => JSX.Element;

export type BaseSelectProps = AutocompleteProps<
SelectOption,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined,
  ChipTypeMap["defaultComponent"]
>;

export type OnChangeValue<T extends Any = Any> =
  | NonNullable<string | SelectOption<T>>
  | (string | SelectOption<T>)[]
  | null;

export type OnChange<T extends Any = Any> = (
  event: SyntheticEvent<Element, Event>,
  value: OnChangeValue<T>,
  reason: ChangeReason,
  details: ChangeDetails<SelectOption<T>> | undefined
) => void;

export type OwnerState<T extends Any = Any> = AutocompleteOwnerState<
SelectOption<T>,
  boolean,
  boolean,
  boolean,
  "div"
>;

export type RenderTags<T extends Any = Any> = (
  value: SelectOption<T>[],
  getTagProps: GetTagProps,
  ownerState: OwnerState<T>
) => ReactNode;

export type InputSelectProps<T extends Any = Any> = Pick<
  InputTextProps,
  "label" | "error" | "required" | "errorText" | "placeholder"
> &
  Omit<BaseSelectProps, "renderInput" | "options"> & {
    options?: SelectOption<T>[];
    TextFieldProps?: Partial<InputTextProps>;
    enableClientFilter?: boolean;
    filter?:
      | ((option: SelectOption<T>, inputValue: string) => boolean)
      | "startWith"
      | "contains";
    textChangeTimout?: number;
  };

export type RHFSelectProps = RHFInputProps & Omit<InputSelectProps, "name">;
