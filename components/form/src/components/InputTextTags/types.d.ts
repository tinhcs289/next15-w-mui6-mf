import type { ComponentType } from "react";
import type { InputTextProps } from "../InputText";
import type { RHFInputProps, Tag, AnyObject } from "../../types";

export type TagOption<T extends AnyObject = AnyObject> = Tag<T>;

export type TagComponentProps<T extends AnyObject = AnyObject> = {
  tag: TagOption<T>;
  index: number;
  deleteTag: (tag: Tag<T>) => void;
};

export type TagComponent<T extends AnyObject = AnyObject> = ComponentType<
  TagComponentProps<T>
>;

export type InputTextTagsProps<T extends AnyObject = AnyObject> = Omit<
  InputTextProps,
  "value" | "onChange" | "defaultValue" | "slot"
> & {
  value?: TagOption<T>[];
  onChange?: (tags?: TagOption<T>[]) => void;
  maxOfTags?: number;
  slot?: {
    tag?: TagComponent<T>;
  };
};

export type RHFTextTagsProps = RHFInputProps &
  Omit<InputTextTagsProps, "errorText" | "error" | "onChange" | "value" | "name">;
