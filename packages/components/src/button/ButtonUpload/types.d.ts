import type { ButtonPositiveProps } from "../ButtonPositive";

export type ButtonUploadProps = ButtonPositiveProps & {
  multiple?: boolean;
  onUpload?: (files: Array<File>) => void;
};
