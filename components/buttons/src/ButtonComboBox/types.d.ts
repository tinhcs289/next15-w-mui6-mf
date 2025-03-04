import type { MenuProps } from "@mui/material/Menu";
import type { ButtonCommonProps } from "../ButtonCommon";

export type ButtonComboBoxOption = {
  value: string;
  name?: string;
  label?: string;
  background?: string;
  textColor?: string;
};

export type ButtonComboBoxProps = ButtonCommonProps & {
  selectedOption?: ButtonComboBoxOption;
  options?: ButtonComboBoxOption[];
  onSelectOption?: (option?: ButtonComboBoxOption) => void;
  slotProps?: {
    menu?: Partial<MenuProps>;
  };
};
