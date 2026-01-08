"use client";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Divider, { dividerClasses } from "@mui/material/Divider";
import { listClasses } from "@mui/material/List";
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useZoneRouter } from "@packages/navigation";
import type { MouseEvent } from "react";
import { useCallback, useState } from "react";
import MenuButton from "./MenuButton";

const MenuItemStyled = styled(MuiMenuItem)({
  margin: "2px 0",
});
MenuItemStyled.displayName = "MenuItemStyled";

const MenuItemLastStyled = styled(MenuItemStyled)({
  [`& .${listItemIconClasses.root}`]: {
    ml: "auto",
    minWidth: 0,
  },
});
MenuItemLastStyled.displayName = "MenuItemLastStyled";

const MenuStyled = styled(Menu)({
  [`& .${listClasses.root}`]: {
    padding: "4px",
  },
  [`& .${paperClasses.root}`]: {
    padding: 0,
  },
  [`& .${dividerClasses.root}`]: {
    margin: "4px -4px",
  },
});
MenuStyled.displayName = "MenuStyled";

export default function OptionsMenu() {
  const router = useZoneRouter("admin");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToLogout = useCallback(() => {
    debugger;
    router.push("/sign-out");
  }, [router.push]);

  return (
    <>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <MenuStyled
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItemStyled onClick={handleClose}>Profile</MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>My account</MenuItemStyled>
        <Divider />
        <MenuItemStyled onClick={handleClose}>
          Add another account
        </MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>Settings</MenuItemStyled>
        <Divider />
        <MenuItemLastStyled onClick={navigateToLogout}>
          <ListItemText>Logout 324324234</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItemLastStyled>
      </MenuStyled>
    </>
  );
}
