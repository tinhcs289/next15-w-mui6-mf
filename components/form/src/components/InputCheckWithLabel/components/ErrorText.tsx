import type { InputErrorProps } from "../../InputError";
import InputError from "../../InputError";

export default function ErrorText({
  sx,
  children,
  slotProps = {},
  ...props
}: InputErrorProps) {
  const { text: textProps, ...otherSlotProps } = slotProps;
  return (
    <InputError
      {...props as any}
      sx={{ display: "flex", py: 0, ...sx }}
      slotProps={{
        ...otherSlotProps,
        text: {
          ...textProps,
          sx: {
            ...textProps?.sx,
            right: "unset",
            left: "-110%",
          },
        },
      }}
    >
      {children}
    </InputError>
  );
}