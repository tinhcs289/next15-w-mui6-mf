"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { MenuProps } from "@mui/material/Menu";
import Menu from "@mui/material/Menu";
import type { MouseEventHandler } from "react";
import { useCallback, useMemo, useState } from "react";

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  background: theme.palette.grey[400],
  color: theme.palette.grey[900],
  px: theme.spacing(2),
  ":hover": {
    background: theme.palette.grey[400],
  },
}));

export type ComboBoxOption = {
  value: string;
  name?: string;
  label?: string;
  background?: string;
  textColor?: string;
};

export type ButtonComboBoxProps = ButtonProps & {
  selectedOption?: ComboBoxOption;
  options?: ComboBoxOption[];
  onSelectOption?: (option?: ComboBoxOption) => void;
  slotProps?: {
    menu?: Partial<MenuProps>;
  };
};

export default function ButtonComboBox({
  children,
  selectedOption,
  onSelectOption,
  options,
  slotProps = {},
  ...otherProps
}: ButtonComboBoxProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClickToggle: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.stopPropagation?.();
      e?.preventDefault?.();
      setAnchorEl(e?.currentTarget);
    },
    []
  );

  const handleSelectOption = useCallback(
    (option: ComboBoxOption) => {
      const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e?.stopPropagation?.();
        e?.preventDefault?.();
        setAnchorEl(null);
        onSelectOption?.(option);
      };
      return onClick;
    },
    [onSelectOption]
  );

  const $Options = useMemo(() => {
    if (!options?.length) return null;
    const notIncludeValueOptions = options.filter(
      (o) => o.value !== selectedOption?.value
    );

    return notIncludeValueOptions.map((o) => {
      const textPrimary = o.name || "";
      return (
        <ListItemButton key={o.value} onClick={handleSelectOption(o) as any}>
          <ListItemText primary={textPrimary} />
        </ListItemButton>
      );
    });
  }, [selectedOption?.value, options, handleSelectOption]);

  const $ButtonLabel = useMemo(() => {
    if (selectedOption?.name) return selectedOption.name;
    return children;
  }, [selectedOption?.name, children]);

  const $EndIcon = useMemo(
    () => (open ? <ExpandLessIcon /> : <ExpandMoreIcon />),
    [open]
  );

  const sxMemo: SxProps<Theme> = useMemo(
    () => ({
      ...otherProps?.sx,
      ...(selectedOption?.background
        ? {
            background: selectedOption.background,
          }
        : {}),
      ...(selectedOption?.textColor
        ? {
            color: selectedOption.textColor,
          }
        : {}),
    }),
    [otherProps?.sx, selectedOption?.background, selectedOption?.textColor]
  );

  const handleCloseCombobox: MenuProps["onClose"] = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <ButtonStyled
        size="small"
        onClick={handleClickToggle}
        endIcon={$EndIcon}
        {...otherProps}
        sx={sxMemo}
      >
        {$ButtonLabel}
      </ButtonStyled>
      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        {...slotProps?.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseCombobox}
      >
        {$Options}
      </Menu>
    </>
  );
}
