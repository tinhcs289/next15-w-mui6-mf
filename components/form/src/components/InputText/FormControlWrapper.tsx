import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import type { PropsWithChildren, ReactNode } from "react";
import textInputClasses from "./textInputClasses";
import type { TextInputVariants } from "./types";

const FormControlWrapper = ({
  children,
  required = false,
  error = false,
  size = "small",
  label = "",
  variant,
}: PropsWithChildren<{
  required?: boolean;
  error?: boolean;
  size?: "small" | "medium";
  label?: ReactNode;
  variant?: TextInputVariants;
}>) => {
  return variant === "bootstrap" ? (
    <FormControl
      className={textInputClasses.bootstrapFormControl}
      required={required}
      error={error}
      size={size}
      fullWidth
    >
      <FormLabel
        className={textInputClasses.bootstrapFormLabel}
        sx={{ fontWeight: 600, mb: "4px" }}
      >
        {label}
      </FormLabel>
      {children}
    </FormControl>
  ) : (
    children
  );
};

export default FormControlWrapper;