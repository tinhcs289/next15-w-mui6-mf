"use client";

import type { ChangeEventHandler, ComponentType } from "react";
import { forwardRef, useCallback } from "react";
import type { ButtonPositiveProps } from "./ButtonPositive";
import ButtonPositive from "./ButtonPositive";

export type ButtonUploadProps = ButtonPositiveProps & {
  multiple?: boolean;
  onUpload?: (files: Array<File>) => void;
};

const ButtonUpload: ComponentType<ButtonUploadProps> = forwardRef<
  HTMLButtonElement,
  ButtonUploadProps
>(({ children, onUpload, multiple = false, ...otherProps }, ref) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (!event?.target?.files) return;
      const fileList = event.target.files;
      if (!fileList || !fileList.length) return;
      const files = Array.from(fileList);
      event.target.files = null;
      onUpload?.(Array.from(files));
    },
    [onUpload]
  );

  return (
    <ButtonPositive component="label" {...otherProps} ref={ref}>
      <input type="file" hidden onChange={handleChange} multiple={multiple} />
      {children}
    </ButtonPositive>
  );
});

export default ButtonUpload;
