"use styled";

import { styled } from "@mui/material";
import type { ChipProps } from "@mui/material/Chip";
import Chip from "@mui/material/Chip";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import type { AnyObject } from "@repo/types/common";
import { GUID } from "@repo/utils/string/guid";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import type { ComponentType, KeyboardEvent } from "react";
import { createRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import type { RHFInputProps, RHFRenderInput, Tag } from "@repo/types-react/rhf";
import type { TextProps } from "./Text";
import Text from "./Text";

type TagComponentProps<T extends AnyObject = AnyObject> = {
  tag: Tag<T>;
  index: number;
  deleteTag: (tag: Tag<T>) => void;
};

type TagComponent<T extends AnyObject = AnyObject> = ComponentType<
  TagComponentProps<T>
>;

type TextTagsProps<T extends AnyObject = AnyObject> = Omit<
  TextProps,
  "value" | "onChange" | "defaultValue" | "slot"
> & {
  value?: Tag<T>[];
  onChange?: (tags?: Tag<T>[]) => void;
  maxOfTags?: number;
  slot?: {
    tag?: TagComponent<T>;
  };
};

const ChipStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  margin: theme.spacing(0.5, 0.25),
}));

const TextStyled = styled(TextField)<TextFieldProps>({
  display: "flex",
  "& div.MuiInputBase-root": {
    display: "flex",
    flexGrow: 0,
    flexWrap: "wrap",
  },
  "& textarea": {
    alignItems: "baseline",
    width: "auto",
    flex: "1",
    minWidth: "30px",
    "&::placeholder": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
});

function TextTags<T extends AnyObject = AnyObject>({
  value,
  onChange,
  placeholder,
  InputProps,
  slot = {},
  StyledComponent = TextStyled,
  ...otherProps
}: TextTagsProps<T>) {
  const inputRef = createRef<HTMLInputElement | HTMLTextAreaElement>();

  const { tag: CustomTagComponent } = slot;

  const clearTextInput = useCallback(() => {
    if (!(inputRef?.current instanceof Element)) return;
    let input = inputRef.current.querySelector("input");
    if (!(input instanceof Element))
      input = inputRef.current.querySelector("textarea") as any;
    if (!(input instanceof Element)) return;
    input.value = "";
    return;
  }, [inputRef]);

  const addTag = useCallback(
    (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!event?.target || !event?.key) return;
      if (
        event.key !== "Enter" &&
        event.key !== "SemiColon" &&
        event.key !== "Tab"
      )
        return;
      event.preventDefault();
      event.stopPropagation();
      const text = `${get(event.target, "value", "")}`.trim();
      if (!text) return;
      const newValue = cloneDeep(value) || [];
      newValue.push({
        value: GUID(),
        label: text,
      } as Tag<T>);
      clearTextInput();
      onChange?.(newValue);
    },
    [value, onChange, clearTextInput]
  );

  const deleteTag = useCallback(
    (tag: Tag<T>) => {
      if (!tag || !tag?.value || !Array.isArray(value)) return;
      const newTags = value.filter((t) => t.value !== tag.value);
      onChange?.(newTags);
    },
    [onChange, value]
  );

  const handleDeleteTag = useCallback(
    (tag: Tag<T>) => {
      return function handleDelete(event: any) {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        deleteTag(tag);
      };
    },
    [deleteTag]
  );

  const $Tags = useMemo(() => {
    if (!value || !Array.isArray(value)) return null;
    return value.map((tag, index) => {
      if (!!CustomTagComponent) {
        return (
          <CustomTagComponent
            key={tag.value}
            tag={tag}
            index={index}
            deleteTag={deleteTag}
          />
        );
      }

      return (
        <ChipStyled
          size="small"
          color="primary"
          key={tag.value}
          tabIndex={-1}
          label={tag?.label || ""}
          onDelete={handleDeleteTag(tag)}
        />
      );
    });
  }, [value, CustomTagComponent, deleteTag, handleDeleteTag]);

  return (
    <Text
      StyledComponent={StyledComponent}
      {...otherProps}
      InputProps={{
        ...InputProps,
        startAdornment: $Tags,
      }}
      placeholder={placeholder}
      multiline
      ref={inputRef as any}
      onKeyDown={addTag as any}
    />
  );
}

type RHFTextTagsProps = RHFInputProps &
  Omit<TextTagsProps, "errorText" | "error" | "onChange" | "value" | "name">;

function RHFTextTags(props: RHFTextTagsProps) {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    label,
    ...inputProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onBlur, onChange, value, name },
      fieldState: { invalid, error },
    }) => (
      <TextTags
        label={label}
        name={name}
        value={value}
        onChange={(tags) => {
          onChange(tags);
        }}
        onBlur={onBlur}
        error={invalid}
        {...(!!rules?.required ? { required: true } : {})}
        {...(!!error?.message ? { errorText: error?.message } : {})}
        {...inputProps}
      />
    ),
    [rules?.required, inputProps, label]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === "boolean" ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}

export default TextTags;
export { RHFTextTags };
export type {
  RHFTextTagsProps,
  TagComponent,
  TagComponentProps,
  TextTagsProps,
};
