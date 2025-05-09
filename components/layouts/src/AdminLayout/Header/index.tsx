import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import Stack from "@mui/material/Stack";
import ColorModeIconDropdown from "../components/ColorModeIconDropdown";
import MenuButton from "../components/MenuButton";
import HeaderStack from "./HeaderStack";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import Search from "./Search";

export default function Header() {
  return (
    <HeaderStack
      data-aos="fade-down"
      data-aos-easing="ease"
      data-aos-delay="200"
      data-aos-duration="500"
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1, zIndex: 1 }}>
        <Search />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </HeaderStack>
  );
}