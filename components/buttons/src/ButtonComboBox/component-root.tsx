"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { SxProps, Theme } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type { MenuProps } from "@mui/material/Menu";
import Menu from "@mui/material/Menu";
import type { ComponentType, MouseEventHandler } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { ButtonStyled } from "./components-styled";
import type { ButtonComboBoxOption, ButtonComboBoxProps } from "./types";

export const ButtonComboBox = forwardRef<
  HTMLButtonElement,
  ButtonComboBoxProps
>(
  (
    {
      children,
      selectedOption,
      onSelectOption,
      options,
      slotProps = {},
      sx,
      ...otherProps
    },
    ref
  ) => {
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
      (option: ButtonComboBoxOption) => {
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

    const sxMemo: SxProps<Theme> = useMemo(() => {
      if (!selectedOption) return sx as SxProps<Theme>;
      const _sx = { ...sx } as unknown as SxProps<Theme>;
      if (!!selectedOption?.background) {
        // @ts-ignore
        _sx["background"] = selectedOption.background;
      }
      if (!!selectedOption?.textColor) {
        // @ts-ignore
        _sx["color"] = selectedOption.textColor;
      }
      return _sx;
    }, [sx, selectedOption]);

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
          ref={ref}
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
) as ComponentType<ButtonComboBoxProps>;
ButtonComboBox.displayName = "ButtonComboBox";
